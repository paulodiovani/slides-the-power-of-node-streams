#!/bin/env node
const stream = require('stream')

const pt = new stream.PassThrough()

pt.on('data', (chunk) => {
  console.error(`Chunk has ${chunk.length} bytes`)
})

process.stdin
  .pipe(pt)
  .pipe(process.stdout)
