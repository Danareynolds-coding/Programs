const express = require('express')
const router = express.Router()
const PORT = process.env.PORT || 3000

// error handling
router.use((req, res, next)=> {
  res.status(404)
  .render('pages/error', {
    title:'error page',
    name: '404 - Page Not Found'
  })
})

module.exports = router