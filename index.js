var connect = require('connect'),
    fs = require('fs'),
    remove = require('remove'),
    parse = require('url').parse,
    fmf = require('./lib/fmf'),
    http = require('http'),
    forks = {},
    timeout = 5 * 60 * 1000;

var app = connect().use(connect.logger('dev')).use(function subdomains(req, res, next){
  req.subdomains = req.headers.host
    .split('.')
    .slice(0, -2);

  next();
}).use(function (req, res, next) {
  // TODO sanitise
  if (req.subdomains.length) {
    var dir = './forks/' + req.subdomains[0] + '/' + req.subdomains.slice(1).join('.') + '/';
    fs.exists(dir, function (exists) {
      if (exists && forks[dir]) {
        // route static router through this directory

        // reset timeout on this path
        clearTimeout(forks[dir].timer);
        forks[dir].timer = setTimeout(function () {
          forks[dir].clear();
        }, timeout);

        return forks[dir].router(req, res, next);
      } else {
        fmf.fork(req.subdomains, function (path) {
          forks[dir] = {
            router: connect.static(path),
            clear: function () {
              delete forks[dir].router;
              delete forks[dir];
              remove(path, function (err) {
                // console.log('deleted ' + path + ' (err? ' + err + ')');
              });
            },
            timer: setTimeout(function () {
              forks[dir].clear();
            }, timeout)
          };
          
          return forks[dir].router(req, res, next);
        });
      }
    });    
  } else {
    next();
  }
}).use(connect.static('./public'))
.use(function (req, res, next) {
  // means no subdomain, and no real file found
  var url = req.url.replace(/\/$/, '').split('/');

  url.shift(); // remove leading slash

  if (url.length === 2) {
    res.writeHead(302, { 'location': 'http://' + url.join('.') + '.' + req.headers.host });
    res.end('Redirect to ' + 'http://' + url.join('.') + '.' + req.headers.host);
  } else {
    res.end('404');
  }
});

var server = http.createServer(app).listen(process.env.PORT || 8000);