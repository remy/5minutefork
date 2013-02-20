"use strict";
var connect = require('connect'),
    fs = require('fs'),
    remove = require('remove'),
    parse = require('url').parse,
    fmf = require('./lib/fmf'),
    crypto = require('crypto'),
    http = require('http'),
    forks = {},
    timeout = 5 * 60 * 1000;

var app = connect().use(connect.logger('dev')).use(function subdomains(req, res, next){
  req.subdomains = req.headers.host
    .split('.')
    .slice(0, -2);

  next();
}).use(function (req, res, next) {
  var hash = req.subdomains[0];
  var fork = forks[hash];
  if (fork) {
    var repo = fork.repo;
    var dir = './forks/' + repo + '/';

    fs.exists(dir, function (exists) {
      if (exists) {
        // route static router through this directory

        // reset timeout on this path
        fork.accessed = Date.now();

        return fork.router(req, res, next);
      } else {
        fmf.fork(fork.repo, function (path) {
          fork = forks[hash] = {
            repo: repo,
            router: connect.static(path),
            accessed: Date.now(),
            clear: function () {
              delete forks[hash].router;
              delete forks[hash];
              console.log('deleting path: ' + path);
              remove(path);
            },
            timer: setInterval(function () {
              var now = Date.now();
              if (now - fork.accessed > timeout) {
                fork.clear();
              }
            }, 1000 * 10)
          };
          return fork.router(req, res, next);
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
    var sha1 = crypto.createHash('sha1');
    sha1.update(url.join('.'));
    var hash = sha1.digest('hex');
    if (!forks[hash]) {
      forks[hash] = { repo: url };
    }
    res.writeHead(302, { 'location': 'http://' + hash + '.' + req.headers.host });
    res.end('Redirect to ' + 'http://' + hash + '.' + req.headers.host);
  } else {
    res.writeHead(404, { 'content-type': 'text/html' });
    res.end('404');
  }
});

var server = http.createServer(app).listen(process.env.PORT || 8000);
