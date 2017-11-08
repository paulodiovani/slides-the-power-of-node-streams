const request = require('request')
const strip = require('strip-html')
const xpath = require('xpath-stream')
const stream = require('stream')

const toString = new stream.Transform({
  objectMode: true,
  transform (chunk, encoding, callback) {
    const html = chunk.toString()
    this.push(html)
    callback()
  }
})

request('http://example.com')
  .pipe(xpath('//html/body'))
  .pipe(toString)
  .pipe(strip())
  .pipe(process.stdout)
