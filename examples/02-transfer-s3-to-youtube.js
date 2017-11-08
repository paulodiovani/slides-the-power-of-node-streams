const s3 = require('./initializers/aws_s3_client')
const youtube = require('./initializers/youtube_api_client')

const S3_BUCKET = process.env.S3_BUCKET
const S3_KEY = process.env.S3_KEY
const AUTH_TOKEN = process.env.AUTH_TOKEN
const VIDEO_TITLE = process.env.VIDEO_TITLE
const VIDEO_DESCRIPTION = process.env.VIDEO_DESCRIPTION

// create read stream from s3 object
const s3Stream = s3.getObject({
  Bucket: S3_BUCKET,
  Key: S3_KEY
}).createReadStream()

// show upload progress
const progress = (str, size) => {
  let uploaded = 0
  
  const interval = setInterval(() => {
    debug(`Upload progress at ${Math.floor(uploaded / size * 100)}%`)
  }, 5000)

  str.on('data', (chunk) => (uploaded += chunk.length))
  str.on('end', () => clearInterval(interval))
}

// upload to youtube
youtube.videos.insert({
  auth: AUTH_TOKEN,
  part: 'snippet,status',
  notifySubscribers: false,
  stabilize: false,
  resource: {
    snippet: {
      title: VIDEO_TITLE,
      description: VIDEO_DESCRIPTION
    },
    status: {
      privacyStatus: 'private'
    }
  },
  media: {
    body: s3Stream
  }
}, (err, data) => {
  if (err) return console.error('An error ocurred', err)
  console.log('Finished uploading video', data)
})
