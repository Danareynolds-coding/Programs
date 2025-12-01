const express = require('express')
const router = express.Router()
const PORT = process.env.PORT || 3000
const axios = require('axios');


// rootroute http://localhost:3000/api
router.get('/api', (req, res)=> {
  res.json({
  'Programs':`http://localhost:${PORT}/api/programs`,
  'Actors': `http://localhost:${PORT}/api/actors`,
  'Directors':`http://localhost:${PORT}/api/directors`,
  'ProductionCo':`http://localhost:${PORT}/api/productionCo`,
  'Genre': `http://localhost:${PORT}/api/genre`,
  'Streaming': `http://localhost:${PORT}/api/streaming` 
  })
})

//used to test- router.use('/api/programs', require('./api/programsRoutes'))

const endpoints = [
  'programs',
   'actors',
   'directors',
   'genre',
   'productionCo',
   'streaming'
]
endpoints.forEach(endpoint => {
  router.use(`/api/${endpoint}`, require(`./api/${endpoint}Routes`))
})

//http://localhost:3000
router.get('/', (req, res)=> {
    res.render('pages/home', {
      title: 'Christmas Movies and TV Programs',
      name:"Christmas Programs"
    })
});
//******************PAGES 
//htps://localhost:3000/Programs
router.get('/Programs', (req, res)=> {
  const url = "http://localhost:3000/api/programs"
  axios.get(url)
  .then(resp => {
    res.render('pages/Programs', {
      title: 'Merry Christmas',
      name:'Movies and TV Programs.',
      data:resp.data
  })
  })
});
//http:localhost:3000/Actors
router.get('/Actors',(req, res)=> {
  const url = "http://localhost:3000/api/actors"
  axios.get(url)
    .then(resp => {
      res.render('pages/Actors', {
          title:'Actors',
          name:'ACTORS',
          data:resp.data
    })
  })
})
//http://localhost:3000/Directors
router.get('/Directors',(req, res)=> {
  const url = "http://localhost:3000/api/directors"
  axios.get(url)
    .then(resp => {
      res.render('pages/Directors', {
      title:'Directors',
      name:'DIRECTORS',
      data:resp.data
    })
  })
})
//********************SINGLEPages
//http://localhost:3000/singleProgram
router.get('/singleProgram', (req, res)=> {
  const url = `http://localhost:3000/api/programs/${id}`
  axios.get(url)
    .then(resp.render('pages/singleProgram',{
      title:'Single Program',
      name: 'Program'
    }))
})

//http://localhost:3000/singleActor
router.get('/singleActor', (req, res)=> {
  const url = `http://localhost:3000/api/programs/${id}`
  axios.get(url)
    .then(resp.render('pages/singleProgram',{
      title:'Single Program',
      name: 'Program'
    }))
})

//http://localhost:3000/singleDirector


//********************FORMS
// http://localhost:3000/actors-form
router.get('/actors-form', (req, res)=> {
    res.render('pages/actors-form', {
      title: 'Actors Form',
      name: 'Add an Actor'
    })
})

// http://localhost:3000/directors-form
router.get('/directors-form', (req, res)=> {
    res.render('pages/directors-form', {
      title: 'Directors Form',
      name: 'Add a Director'
    })
})

// http://localhost:3000/genre-form
router.get('/genre-form', (req, res)=> {
    res.render('pages/genre-form', {
      title: 'Genre Form',
      name: 'Add a Genre'
    })
})
// http://localhost:3000/productionCo-form
router.get('/productionCo-form', (req, res)=> {
    res.render('pages/productionCo-form', {
      title: 'PRODUCTION COMPANY FORM',
      name: 'Add a Production Company'
    })
})
// http://localhost:3000/streaming-form
router.get('/streaming-form', (req, res)=> {
    res.render('pages/streaming-form', {
      title: 'Streaming Form',
      name: 'Add a Streaming Platform'
    })
})

// error handling
router.use((req, res, next)=> {
   res.status(404)
   .render('pages/404', {
    title:'error page',
    name: '404 - Page Not Found'
  })
})

module.exports = router