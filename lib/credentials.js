'use strict';
var fs = require('fs');

if (fs.existsSync(__dirname + '/../credentials.json')) {
  module.exports = require(__dirname + '/../credentials.json');
} else if (process.env.NODE_USER && process.env.NODE_PASS) {
  module.exports = {
    user: process.env.NODE_USER,
    pass: process.env.NODE_PASS
  };
} else {
  console.error('Credentials required to run 5minfork.\nDetails >> https://github.com/remy/5minutefork#running\n');
  process.exit(1);
}