const express = require('express')
const router = express.Router()
const PORT = process.env.PORT || 3000

// rootroute http://localhost:3000/api
// router.get('/api', (req, res)=> {
//   res.send('TEST')
// })  

router.get('/api', (req, res)=> {
  res.json({
  'Programs':`http://localhost:${PORT}/api/programs`
  //,
  // 'Actors': `http://localhost:${PORT}/api/actors`,
  // 'Directors':`http://localhost:${PORT}/api/directors`,
  // 'ProductionCo':`http://localhost:${PORT}/api/productionCo`,
  // 'Genre': `http://localhost:${PORT}/api/genre`,
  // 'Streaming': `http://localhost:${PORT}/api/streaming` 
   })
})

// router.use('/api/programs', require('./api/programsRoutes'))

// const endpoints = [
  // 'programs',
  //  'actor',
  //  'director',
  //  'genre',
  //  'production',
  //  'streaming'
// ]
// endpoints.forEach(endpoint => {
//   router.use(`/api/${endpoint}`, require(`./api/${endpoint}Routes`))
// })

// error handling
router.use((req, res, next)=> {
   res.status(404)
   .render('pages/404', {
    title:'error page',
    name: '404 - Page Not Found'
  })
})

module.exports = router