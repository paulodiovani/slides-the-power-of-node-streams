<!-- .slide: class="stamp" data-background-video="img/giphy-stream.mp4" data-background-video-loop="true" data-background-video-mute="true" -->

# The Power of Node.js Streams

<small>Version 0.1.0</small>

<small>by Paulo Diovani</small>

----

## Working with...

- Copy files from http and backup on Amazon S3
- Decompress / Compress large files with zip / gzip
- Convert among TSV / CSV / JSON formats
- Publish videos on youtube

====

- Files with 100MB or more
- Upload can take several minutes on slow networks
- Low storage servers cannot host the files during transfer

====

Files are not transferred once,<br>
but byte by byte.

![file copy](img/file-copy.gif)

Note:
We use so see file transfer as if they
are instantly copied...

====

Common file operations buffers the entire content in memory.

```javascript
const data = fs.readFileSync('/old/path/1gbFile.dat')

// data stores 1gb in memory until freed

fs.writeFileSync('/new/path/1gbFile.dat', data)
```

====

Streaming file contents.

```javascript
const readStream = fs.createReadStream('/old/path/1gbFile.dat')
const writeStream = fs.createWriteStream('/new/path/1gbFile.dat')

// minimal memory usage
readStream.pipe(writeStream)
```

----

## Streams

- Reads/Writes data sequentially
- Do not allow random access
- Allow transformations
- Allow monitoring
- Use just small amounts of memory

====

Streams exists in many different languages

```cpp
//c
#include <iotream>
#include <fstream>
```

```java
//java
import java.io.FileInputStream;
import java.io.FileOutputStream;
```

```bash
#bash
< /old/path/1gbFile.dat > /new/path/1gbFile.dat
```

====

## Node.js Streams

...are widely used by other classes or libraries

- `fs`
- `net`
- `http`
- `request`

====

Example: Send file through https

```javascript
const fs = require('fs')
const http = require('http')

const server = http.createServer((req, res) => {
  fs.createReadStream('./filename.txt')
    .pipe(res)
})

server.listen(8080)
```

----

### Events in Streams

(mostly used)

- `readable`
- `data`
- `error`
- `end`

====

```javascript
const readable = getReadableStreamSomehow()

readable.on('data', (chunk) => {
  console.log(`Received ${chunk.length} bytes of data.`)
})

readable.on('end', () => {
  console.log('There will be no more data.')
})

readable.on('error', (err) => {
  console.error('An error ocurred.', err)
})
```

====

### The pipe() ~~operator~~ method

The readable.pipe() method attaches a Writable stream to the readable.

```javascript
readable.pipe(writable)
```

====

It is possible to attach multiple Writable streams to a single Readable stream.

```javascript
const r = fs.createReadStream('file.txt')
const z = zlib.createGzip()
const w = fs.createWriteStream('file.txt.gz')

r.pipe(z).pipe(w)
```

====

Same as (in bash)...

```bash
< file.txt | gzip -c > file.txt.gz
```
