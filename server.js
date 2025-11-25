const express = require('express')
const server = express()
const router = require('./routes/router')
const PORT = process.env.PORT || 3000

const cors = require('cors')
const helmet = require('helmet')
server.use(cors())
server.use(helmet.contentSecurityPolicy({
  useDefaults: true,
  crossOriginResourcePolicy:false,
  crossOriginEmbedderPolicy:false,
  directives: {
    "img-src":["'self'", "https: data"],
    "scriptSrc":["'self'", "cdn.jsdelivr.net"]
  }
}))
server.use(express.json())
server.use(express.urlencoded({extended: true}))
// server.use('/public', express.static('public'))
// server.set('view engine', ejs)
// localhost:3000
server.use('/', router)

server.listen(PORT, ()=> console.log(`Merry Christmas!!! at port ${PORT}`))
