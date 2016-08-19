# Using [dotenv](https://github.com/motdotla/dotenv) with [Zeit's Now](https://zeit.co/now)

You have an app with secrets like database passwords and API keys. You're being responsible by storing that config in the environment (`process.env`).

**index.js**

```js
require('dotenv').config()

require('http').createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' })

  res.write(JSON.stringify({
    docs: require('./package.json').homepage,
    src: process.env.NOW_URL + '/_src',
    dns_host: process.env.DNS_HOST
  }, null, 2))

  res.end()
}).listen(8000)
```

*`NOW_URL` is [provided by `now` to detect `now` environment](https://zeit.co/now#how-does-my-app-detect-now)*

**.env**

```
DNS_HOST=california.zeit.world
```

**.gitignore**

```
# Dependency directories
node_modules

# SECRETS
.env
```

Because `now` follows the same rules as [`npm publish`](https://docs.npmjs.com/cli/publish) for deploys, your `.env` file will not be included in the deploy. To fix this, create a `.npmignore` file that explicitly states to include your `.env` file.

**.npmignore**

```
# include secrets when deploying to now
!.env
```

*Alternatively by defining anything else in `.npmignore` like `test/` or `.travis.yml`, your `.env` file should be included since `.npmignore` supersedes `.gitignore`*

### [See it live!](https://example-zeit-now-dotenv-wlrzwttedq.now.sh/)
