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

// move the fork to the live fork directory
function finishFork(code, fork, path, callback) {
  var finalPath = fmf.getPath(fork.url); //resolve(cwd, dir.forks, fork.url[0], fork.url[1]);

  fs.rename(path, finalPath, function () {
    fork.forking = false;
    callback(code === 0 ? null : true, finalPath);
  });
}

fmf.getPath = function (urlParts) {
  // note that resolve requires strings to be passed in, so if there's no
  // branch, then passing in `undefined` will bork, so we `|| ''` - bosh.
  return resolve(cwd, dir.forks, urlParts[0], urlParts[1] + ':' + (urlParts[3] || 'master'));
};

fmf.fork = function (fork, callback) {
  fork.forking = true;
  process.nextTick(function () {
    createForkPath(fork, function (err, path) {
      var clone = spawn('git', ['clone', '--depth', '1', '--recursive', fork.repo, path]);

      clone.stdout.on('data', function (data) {
        console.log(data + '');
      });
      clone.stderr.on('data', function (data) {
        console.error(data + '');
      });
      clone.on('exit', function (code) {
        var checkout;

        if (code !== 0) {
          console.log('clone exit with code ' + code);
        }

        // most likely path
        if (fork.url.length < 3) {
          finishFork(code, fork, path, callback);
        } else if (fork.url.indexOf('tree') === 2) {
          // then checkout the specified branch
          checkout = spawn('git', ['checkout', fork.url[3]], {cwd: path});

          checkout.stdout.on('data', function (data) {
            console.log(data + '');
          });

          checkout.stderr.on('data', function (data) {
            console.error(data + '');
          });

          checkout.on('exit', function (code) {
            finishFork(code, fork, path, callback);
          });
        } else {
          // god knows...this really shouldn't happen.
          callback(true, path);
        }
      });
    });
  });
};