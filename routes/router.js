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
      name:'Christmas Movies and TV Programs.',
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
          name:'ACTORS LIST',
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
      name:'DIRECTORS LIST',
      data:resp.data
    })
  })
})
//********************SINGLEPages
//http://localhost:3000/singleProgram
router.get('/singleProgram/:id', (req, res)=> {
  const id = req.params.id;
  const url = `http://localhost:3000/api/programs/${id}`
  axios.get(url)
    .then(resp=> {
      res.render('pages/singleProgram',{
      title:'Single Program',
      name: 'Christmas Program',
      programs:resp.data
      })
    })
})

//http://localhost:3000/singleActor
router.get('/singleActor', (req, res)=> {
  const url = `http://localhost:3000/api/programs/${id}`
  axios.get(url)
    .then(resp=> {
      res.render('pages/singleActor',{
      title:'Single Actor',
      name: 'Actor',
      programs:resp.data
    })
  })
})

//http://localhost:3000/singleDirector
router.get('/singleDirector', (req, res)=> {
  const url = `http://localhost:3000/api/directors/${id}`
  axios.get(url)
    .then(resp=> {
      res.render('pages/singleDirector',{
      title:'Single Director',
      name: 'Director',
      programs:resp.data
    })
  })
})

//http://localhost:3000/
router.get('/singleProgram/:id', (req, res)=> {
  const id = req.params.id;
  const url = `http://localhost:3000/api/programs/${id}`
  axios.get(url)
    .then(resp=> {
      res.render('pages/singleProgram',{
      title:'Single Program',
      name: 'Christmas Program',
      programs:resp.data
      })
    })
})
//**************Info page */
router.get('/Prog-Act/:id', (req, res) => {
  const id = req.params.id;
  const url = `http://localhost:3000/api/programs/with_actors/${id}`
  axios.get(url)
    .then(resp=> {
      res.render('pages/Prog-Act', {
        title:'Program with Actors',
        name:'Program With Actors',
        programs:resp.data
      })
    })
  })

router.get('/Prog-Dir/:id', (req, res) => {
  const id = req.params.id;
  const url = `http://localhost:3000/api/programs/with_directors/${id}`
  axios.get(url)
    .then(resp=> {
      res.render('pages/Prog-Dir', {
        title:'Program with Director',
        name:'Program With Directors',
        programs:resp.data
      })
    })
  })

  router.get('/Prog-PCo/:id', (req, res) => {
  const id = req.params.id;
  const url = `http://localhost:3000/api/programs/with_productionCo/${id}`
  axios.get(url)
    .then(resp=> {
      res.render('pages/Prog-PCo', {
        title:'Program with Production Company',
        name:'Program With Production Company',
        programs:resp.data
      })
    })
  })
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