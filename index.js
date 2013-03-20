"use strict";
var connect = require('connect'),
    fs = require('fs'),
    remove = require('remove'),
    parse = require('url').parse,
    fmf = require('./lib/fmf'),
    crypto = require('crypto'),
    request = require('request'),
    http = require('http'),
    mustache = require('mustache'),
    credentials = require('./credentials.json'),
    forks = {},
    template = mustache.compile(fs.readFileSync(__dirname + '/public/forking.html', 'utf8')),
    error = fs.readFileSync(__dirname + '/public/error.html', 'utf8'),
    timeout = 5 * 60 * 1000;

function createRoute(dir) {
  return connect()
    .use(connect.static(dir))
    .use(connect.directory(dir))
    .use(function (req, res, next) {
      // if we hit this point, then we have a 404
      res.writeHead(404, { 'content-type': 'text/html' });
      res.end(error);
    });
}

var app = connect().use(connect.logger('dev')).use(connect.favicon(__dirname + '/public/favicon.ico')).use(function subdomains(req, res, next) {
  req.subdomains = req.headers.host
    .split('.')
    .slice(0, -2);

  next();
}).use(function xhr(req, res, next) {
  req.xhr = req.headers['x-requested-with'] === 'XMLHttpRequest';
  next();
}).use(function (req, res, next) {
  var hash = req.subdomains[0];
  var fork = forks[hash];

  if (fork) {
    var url = fork.url;
    var dir = './forks/' + url.join('/') + '/';

    fs.exists(dir, function (exists) {
      if (exists) {
        // route static router through this directory
        if (!fork.error) {
          // reset timeout on this path
          fork.accessed = Date.now();

          if (!fork.router) {
            fork.router = createRoute(dir);
          }

          return fork.router(req, res, next);
        } else {
          res.writeHead(404, { 'content-type': 'text/html' });
          res.end(error);
        }
      } else if (fork.forking) {
        if (req.xhr) {
          var timer = setInterval(function () {
            if (fork.forking === false) {
              clearInterval(timer);
              res.writeHead(200, { 'content-type': 'text/plain' });
              res.end('true');
            }
          }, 500);
        } else {
          res.writeHead(200, { 'content-type': 'text/html' });
          res.end(template(fork.gitdata));
        }
      } else {
        // render a holding page, and place xhr request
        if (req.xhr) {
          fmf.fork(fork, function (err, dir) {
            fork = forks[hash] = {
              error: err,
              repo: fork.repo,
              url: fork.url,
              gitdata: fork.gitdata,
              router: createRoute(dir),
              accessed: Date.now(),
              clear: function () {
                clearInterval(fork.timer);
                delete forks[hash];
                console.log('deleting path: ' + dir);
                remove(dir, function () {});
              },
              timer: setInterval(function () {
                var now = Date.now();
                if (now - fork.accessed > timeout) {
                  fork.clear();
                }
              }, 1000 * 10)
            };
            res.writeHead(200, { 'content-type': 'text/plain' });
            res.end('true');
          });
        } else {
          request('https://api.github.com/repos/' + fork.url.join('/'), {
            'auth': credentials
          }, function (e, r, body) {
            fork.gitdata = JSON.parse(body);
            fork.repo = fork.gitdata.git_url;
            res.writeHead(200, { 'content-type': 'text/html' });
            res.end(template(fork.gitdata));
          }).end();
        }
      }
    });
  } else {
    next();
  }
}).use(connect.static('./public'))
.use(function (req, res, next) {
  if (req.subdomain) {
    return next();
  }

  // means no subdomain, and no real file found,
  // and ignore the leading slash, and only return
  // 2 parts
  var url = req.url.replace(/\/$/, '').split('/').slice(1, 3);

  if (url.length === 2) {
    var sha1 = crypto.createHash('sha1');
    sha1.update(url.join('.'));
    var hash = sha1.digest('hex').substr(0, 7);
    if (!forks[hash]) {
      forks[hash] = { url: url };
    }
    res.writeHead(302, { 'location': 'http://' + hash + '.' + req.headers.host });
    res.end('Redirect to ' + 'http://' + hash + '.' + req.headers.host);
  } else {
    res.writeHead(404, { 'content-type': 'text/html' });
    res.end('404');
  }
});

var server = http.createServer(app).listen(process.env.PORT || 8000);
