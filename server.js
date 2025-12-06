const express = require('express');
const server = express();
const router = require('./routes/router')
const PORT = process.env.PORT || 3000;
const axios = require('axios')
const cors = require('cors')
const helmet = require('helmet')
server.use(cors())
server.use(helmet.contentSecurityPolicy({
  useDefaults: true,
  crossOriginResourcePolicy:false,
  crossOriginEmbedderPolicy:false,
  directives: {
  "img-src": ["'self'", "https:", "data:"],
  "script-src": ["'self'", "cdn.jsdelivr.net"]
  }
}))
server.use(express.static('public'))
server.use(express.json())
server.use(express.urlencoded({extended: true}))
server.set('view engine', 'ejs')
server.use('/', router) //localhost:3000

server.listen(PORT, ()=> console.log(`Merry Christmas!!! at port ${PORT}`));
