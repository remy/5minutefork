"use strict";
var spawn = require('child_process').spawn,
    fs = require('fs'),
    resolve = require('path').resolve,
    cwd = process.cwd(),
    fmf = module.exports = {},
    dir = {
      forks: 'forks',
      loading: 'forks-loading'
    };

try {
  fs.mkdirSync(resolve(cwd, dir.forks));
} catch (e) {}

try {
  fs.mkdirSync(resolve(cwd, dir.loading));
} catch (e) {}

function createForkPath(fork, callback) {
  // cd forks
  var dirpath = resolve(cwd, dir.loading, fork.url[0]);

  // console.log('creating ' + dirpath);
  fs.mkdir(dirpath, function (err) {
    if (err && err.code !== 'EEXIST') {
      console.error(err);
      return callback(err);
    }

    fs.mkdir(resolve(cwd, dir.forks, fork.url[0]), function () {});

    dirpath = resolve(cwd, dir.loading, fork.url[0], fork.url[1]);
    // console.log('creating ' + dirpath);

    fs.mkdir(dirpath, function (err) {
      if (err && err.code !== 'EEXIST') {
        // console.error(err);
        return callback(err);
      }

      callback(null, dirpath);
    });
  });

}

function finishFork() {
  // move the fork to the live fork directory
  if (fork.url.length === 3) {
    var finalPath = resolve(cwd, dir.forks, fork.url[0], fork.url[1], fork.url[2]);
  }
  else {
    var finalPath = resolve(cwd, dir.forks, fork.url[0], fork.url[1]);
  }
  fs.rename(path, finalPath, function () {
    fork.forking = false;
    callback(code === 0 ? null : true, finalPath);
  });
}

fmf.fork = function (fork, callback) {
  fork.forking = true;
  process.nextTick(function () {
    createForkPath(fork, function (err, path) {
      // console.log('err: ' + err);
      //console.log('spawn ' + 'git ' +  ['clone', '--depth', '1', fork.repo, path].join(' '));
      var clone = spawn('git', ['clone', '--depth', '1', '--recursive', fork.repo, path]);

      clone.stdout.on('data', function (data) {
        console.log(data + '');
      });
      clone.stderr.on('data', function (data) {
        console.error(data + '');
      });
      clone.on('exit', function (code) {
        if (code !== 0) {
          console.log('clone exit with code ' + code);
        }

        if (fork.url.length === 3) {
          var checkout = spawn('git', ['checkout', fork.url[2]], {cwd: path});

          checkout.stdout.on('data', function (data) {
            console.log(data + '');
          });

          checkout.stderr.on('data', function (data) {
            console.error(data + '');
          });

          checkout.on('exit', function (code) {
            finishFork(fork, path, callback);
          });
        }
        else {
          finishFork(fork, path, callback);
        }
      });
    });
  });
};