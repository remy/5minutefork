# 5 minute fork

Heard of 10 minute email? Well this is the same thing, except for github repos.

The number of times I've come across a cool demo, only to be faced with a github repo and no live link - it just bums me out.

So I made this (quickly - literally about 90 minutes), which reads the url, and forks the project. If the url is idle for 5 minutes, then it's automatically swept under the carpet.

The code is pretty gnarly, but don't judge me - I wanted quick and dirty.

## Development & debug mode

Since 5minfork uses the format `http://<hash>.host.com/` as the cloned repo, testing locally can be challenging (unless you have a CNAME star rule - whic most people don't). So there is a debug mode that points all repos to **abc123** as the hash, and unpon restart the `forks` and `forks-loading` directories are completely reset.

To enter debug mode:

    NODE_DEBUG=true node index.js

## How to fork for 5 minutes

Simply take a public github url and swap out the https://github.com for [http://5minfork.com](http://5minfork.com), wait a moment for the project to be cloned, and then you'll be redirected to a unique url which will serve up static content from the project.

## License

MIT [http://rem.mit-license.org](http://rem.mit-license.org)
