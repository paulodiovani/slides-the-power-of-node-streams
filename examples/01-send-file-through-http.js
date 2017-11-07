const fs = require('fs')
const http = require('http')

const server = http.createServer((req, res) => {
  fs.createReadStream('./filename.txt')
    .pipe(res)
})

server.listen(8080)
