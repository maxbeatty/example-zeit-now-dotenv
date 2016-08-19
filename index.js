require('dotenv').config()

const pkg = require('./package.json')

require('http').createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' })

  res.write(JSON.stringify({
    docs: pkg.homepage,
    src: process.env.NOW_URL + '/_src?f=.env',
    dns_host: process.env.DNS_HOST
  }, null, 2))

  res.end()
}).listen(8000)
