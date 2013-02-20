var spawn = require('child_process').spawn,
    fs = require('fs'),
    resolve = require('path').resolve,
    cwd = process.cwd(),
    fmf = module.exports = {};

try {
  fs.mkdirSync(resolve(cwd, 'forks'));
} catch (e) {}

fmf.geturl = function (path) {
  return 'git://github.com/' + path.join('/') + '.git';
};

function createForkPath(path, callback) {
  // cd forks
  var dirpath = resolve(cwd, 'forks', path[0]);

  // console.log('creating ' + dirpath);
  fs.mkdir(dirpath, function (err) {
    if (err && err.code !== 'EEXIST') {
      console.error(err);
      return callback(err);
    }

    dirpath = resolve(cwd, 'forks', path[0], path[1]);
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

fmf.fork = function (pathparts, callback) {
  var url = fmf.geturl(pathparts);
  // console.log('forking ' + url);

  createForkPath(pathparts, function (err, path) {
    // console.log('err: ' + err);
    console.log('spawn ' + 'git ' +  ['clone', url, path].join(' '));
    var clone = spawn('git', ['clone', url, path]);

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

      // TODO send new router
      callback(path);
    });

  });
};