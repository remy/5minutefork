# 5 minute fork

[![Flattr this](http://api.flattr.com/button/flattr-badge-large.png)](http://flattr.com/thing/1463468/remy5minutefork-on-GitHub)

Heard of 10 minute email? Well this is the same thing, except for github repos.

The number of times I've come across a cool demo, only to be faced with a github repo and no live link - it just bums me out.

So I made this (quickly - literally about 90 minutes), which reads the url, and forks the project. If the url is idle for 5 minutes, then it's automatically swept under the carpet.

The code is pretty gnarly, but don't judge me - I wanted quick and dirty.

## Running

The project requires a github OAuth token to place API requests. If you are not sure how to generate an OAuth token [Github have an article to help](https://help.github.com/articles/creating-an-access-token-for-command-line-use/)

To run:

    GITHUB_TOKEN=token node index.js

Alternatively, you can put the token in a file in the root of this project called `.env`:

```BASH
GITHUB_TOKEN=token
NODE_DEBUG=true #Set to false for production
```

`.gitignore` should ensure the file isn't sent up to github.

## Development & debug mode

Since 5minfork uses the format `http://<hash>.host.com/` as the cloned repo, testing locally can be challenging (unless you have a CNAME star rule - whic most people don't). So there is a debug mode that points all repos to **abc123** as the hash, and unpon restart the `forks` and `forks-loading` directories are completely reset.

To enter debug mode:

    NODE_DEBUG=true node index.js

## How to fork for 5 minutes

Simply take a public github url and swap out the https://github.com for [http://5minfork.com](http://5minfork.com), wait a moment for the project to be cloned, and then you'll be redirected to a unique url which will serve up static content from the project.

## License

MIT [http://rem.mit-license.org](http://rem.mit-license.org)
