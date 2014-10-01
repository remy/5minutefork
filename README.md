# 5-minute fork

[![Flattr this](http://api.flattr.com/button/flattr-badge-large.png)](http://flattr.com/thing/1463468/remy5minutefork-on-GitHub)

Heard of 10-minute email? Well this is the same thing, except for GitHub repos.

The number of times I've come across a cool demo, only to be faced with a GitHub repo and no live link—it just bums me out.

So I made this (quickly—literally about 90 minutes), which reads the URL, and forks the project. If the URL is idle for 5 minutes, then it's automatically swept under the carpet.

The code is pretty gnarly, but don't judge me—I wanted quick and dirty.

## Running

The project requires GitHub auth details to place API requests. Currently this is in the form of simple auth (which is a bit rubbish, and I'll take a PR to fix this!).

To run:

    NODE_USER=githubUsername NODE_PASS=githubPassword node index.js

Alternatively, you can put these credentials in a JSON config file in the root called `credentials.json`:

```json
{
  "user": "githubUsername",
  "pass": "githubPassword"
}
```

`.gitignore` should ensure the file isn't sent up to github.

## Development & debug mode

Since 5minfork uses the format `http://<hash>.host.com/` as the cloned repo, testing locally can be challenging (unless you have a CNAME star rule—whic most people don't). So there is a debug mode that points all repos to **abc123** as the hash, and unpon restart the `forks` and `forks-loading` directories are completely reset.

To enter debug mode:

    NODE_DEBUG=true node index.js

## How to fork for 5 minutes

Simply take a public GitHub URL and swap out the https://github.com for [http://5minfork.com](http://5minfork.com), wait a moment for the project to be cloned, and then you'll be redirected to a unique URL that will serve up static content from the project.

## License

MIT [http://rem.mit-license.org](http://rem.mit-license.org)
