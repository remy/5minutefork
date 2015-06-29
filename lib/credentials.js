'use strict';
require('dotenv').load();

if (process.env.GITHUB_TOKEN) {
  module.exports = {
    githubToken: process.env.GITHUB_TOKEN
  };
} else {
  console.error('A token is required to run 5minfork.\nDetails >> https://github.com/remy/5minutefork#running\n');
  process.exit(1);
}
