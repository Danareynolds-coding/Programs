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
//*********Home */
//http://localhost:3000
router.get('/', (req, res)=> {
    res.render('pages/home', {
      title: 'Christmas Movies and TV Programs',
      name:"Christmas Programs"
    })
});

//http://localhost:3000
router.get('/genrecategories', (req, res)=> {
    res.render('pages/genrecategories', {
      title: 'Genre Categories',
      name:"Genre Categories"
    })
});
//******************PAGES 
htps://localhost:3000/Programs
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
});
//http:localhost:3000/genre
router.get('/Genre',(req, res)=> {
  const url = "http://localhost:3000/api/genre"
  axios.get(url)
    .then(resp => {
      res.render('pages/Genre', {
          title:'Genres',
          name:'GENRE LIST',
          data:resp.data
    })
  })
  // res.send('genre')
})

//http:localhost:3000/Actors
router.get('/ProductionCo',(req, res)=> {
  const url = "http://localhost:3000/api/productionCo"
  axios.get(url)
    .then(resp => {
      res.render('pages/ProductionCo', {
          title:'Producion Companies',
          name:'PRODUCTION COMPANIES LIST',
          data:resp.data
    })
  })
})

//http:localhost:3000/Actors
router.get('/Streaming',(req, res)=> {
  const url = "http://localhost:3000/api/streaming"
  axios.get(url)
    .then(resp => {
      res.render('pages/Streaming', {
          title:'Streaming Platforms',
          name:'STREAMING PLATFORMS LIST',
          data:resp.data
    })
  })
})


//***************Info page for Actor */

//2
router.get('/actorsWhoDirect', (req, res)=> {
  const id = req.params.id;
  const url = `http://localhost:3000/api/actors/get_actorsWhoDirect`
  axios.get(url)
  .then(resp =>{
    res.render('pages/actorsWhoDirect',{
      title:'Actors Who Direct',
      name:'Actors Who Directed Their Own Program',
      data:resp.data
    })
  })
});
//3
router.get('/actorsWithFiveStars', (req, res)=> {
  const id = req.params.id;
  const url = `http://localhost:3000/api/actors/get_actorsWithfiveStars`
  axios.get(url)
  .then(resp =>{
    res.render('pages/actorsWithFiveStars',{
      title:'Actors With Five Star Programs',
      name:'Actors With Five Star Programs',
      data:resp.data
    })
  })
});

//1 get_programsByActors
router.get('/actors_program/:id', (req, res) => {
  const id = req.params.id;
  const url = `http://localhost:3000/api/actors/get_programsByActors/${id}`;
  axios.get(url)
    .then(resp => {
      res.render('pages/Actor-Prog', {
        title: 'Program By Actor',
        name: 'Program By Actor',
        data:resp.data
      })
    })
});
router.get('/actor_generalInfo/:id', (req, res) => {
  const id = req.params.id;
  const url = `http://localhost:3000/api/actors/get_generalInfoByActor/${id}`;
  axios.get(url)
    .then(resp => {
      res.render('pages/actor_generalInfo', {
        title: 'Information about Program by This Actor',
        name: 'Information about Program by This Actor',
        data:resp.data
      })
    })
});

//****************Info page for director */


router.get('/directorsWithProductionCo', (req, res)=>{
  const id = req.params.id;
  const url = `http://localhost:3000/api/directors/get_productionCoByDirectors`
  axios.get(url)
    .then(resp=> {
      // console.log(resp.data);
      res.render('pages/directorsWithProductionCo', {
        title:'Production Companies By Directors',
        name:'Production Companies By Directors',
        data:resp.data
      })
    })
})

router.get('/directors_animation', (req, res)=> {
  const id = req.params.id;
  const url = `http://localhost:3000/api/directors/get_animationByDirectors`
   axios.get(url)
    .then(resp=> {
      
   res.render('pages/directors_animation', {
   title:'Animation By Director',
   name:'Animation By Director',
  data:resp.data
   })
  })
});

router.get('/directors_program/:id', (req, res)=>{
  const id = req.params.id;
  const url = `http://localhost:3000/api/directors/get_ProgramsByDirectors/${id}`
  axios.get(url)
    .then(resp=> {
      //  console.log(resp.data);
      res.render('pages/Director-Prog', {
        title:'Program By Director',
        name:'Program By Director',
        data:resp.data
      })
    })
});

router.get('/directors_actors/:id', (req, res)=>{
  const id = req.params.id;
  const url = `http://localhost:3000/api/directors/get_actorsByDirectors/${id}`
  axios.get(url)
    .then(resp=> {
      //  console.log(resp.data);
      res.render('pages/directors_actors', {
        title:'Actors By Directors',
        name:'Actors By Directors',
        data:resp.data
      })
    })
});
//***************Info for Genre */

router.get('/genre_animation', (req, res)=>{
  const id = req.params.id;
  const url = `http://localhost:3000/api/genre/get_animationByGenre`
  axios.get(url)
    .then(resp=> {
      console.log(resp.data)
        res.render('pages/genre_animation', {
        title:'Animation Type By Genre',
        name:'Animation Type By Genre',
        data:resp.data
      })
    })
})
 
router.get('/genre_director', (req, res)=>{
  const id = req.params.id;
  const url = `http://localhost:3000/api/genre/get_directorByGenre`
  axios.get(url)
    .then(resp=> {
        res.render('pages/genre_director', {
        title:'Directors By Genre',
        name:'Directors By Genre',
        data:resp.data
      })
    })
})

router.get('/genre_programs/:id', (req, res)=>{
  const id = req.params.id;
  const url = `http://localhost:3000/api/genre/get_programsByGenre/${id}`
  axios.get(url)
    .then(resp=> {
      //  console.log(resp.data);
      res.render('pages/genre_programs', {
        title:'Programs By Genres',
        name:'Programs By Genres',
        data:resp.data
      })
    })
})

router.get('/genre_description/:id', (req, res)=>{
  const id = req.params.id;
  const url = `http://localhost:3000/api/genre/get_descriptionByGenre/${id}`
  axios.get(url)
    .then(resp=> {
      // console.log(resp.data);
      res.render('pages/genre_description', {
        title:'Program Descriptions By Genres',
        name:'Program Descriptions By Genres',
        data:resp.data
      })
    })
})
//**************info page for Production co 

router.get('/production_profit', (req, res)=>{
  const id = req.params.id;
  const url = `http://localhost:3000/api/productionCo/get_profitByProductionCo`
  axios.get(url)
    .then(resp=> {
      // console.log(resp.data);
      res.render('pages/production_profit', {
        title:'Production Company Profits',
        name:'Production Company Profits',
       data:resp.data
      }) 
    })
})
router.get('/production_oldies', (req, res)=>{
  const id = req.params.id;
  const url = `http://localhost:3000/api/productionCo/get_productionCoBefore1960`
  axios.get(url)
    .then(resp=> {
      //  console.log(resp.data);
      res.render('pages/production_oldies', {
        title:'Oldies By Production Companies',
        name:'Oldies By Production Companies',
        data:resp.data
      })
    })
})

router.get('/production_five/:id', (req, res)=> {
  const id = req.params.id;
  const url = `http://localhost:3000/api/productionCo/get_fivePointRatingByPCo/${id}`;
  axios.get(url)
    .then(resp=> {
      res.render('pages/production_five', {
        title:'Program Rating by Production Company',
        name:'Program Rating by Production Company',
        data:resp.data
      })
    })
});

router.get('/production_programs/:id', (req, res)=>{
  const id = req.params.id;
  const url = `http://localhost:3000/api/productionCo/get_programsByProductionCo/${id}`
  axios.get(url)
    .then(resp=> {
       console.log(resp.data);
      res.render('pages/production_programs', {
        title:'Production Companies',
        name:'Production Companies',
        data:resp.data
      })
    })
})

//***************Info for Streaming */

router.get('/streaming_time', (req, res)=>{
  const id = req.params.id;
  const url = `http://localhost:3000/api/streaming/OneHour`
    axios.get(url)
    .then(resp=> {
      
      res.render('pages/streaming_time', {
      title:'Programs With Runtime Over an Hour By Streaming Platform',
      name:'Programs With Runtime Over an Hour By Streaming Platform',
      data:resp.data
      })
      
    })
})

router.get('/streaming_average', (req, res)=>{
  const id = req.params.id;
  const url = `http://localhost:3000/api/streaming/get_averageRatingByStreaming`
    axios.get(url)
    .then(resp=> {
      res.render('pages/streaming_average', {
      title:'Average Rating By Streaming Platform',
      name:'Average Rating By Streaming Platform',
      data:resp.data
      })
      
    })
})
router.get('/streaming_rating', (req, res)=> {
  const id = req.params.id;
  const url =`http://localhost:3000/api/streaming/get_descriptionAndRatingByStreaming/${id}`
    axios.get(url)
    .then(resp=> {
      //console.log(resp.data)
        res.render('pages/streaming_rating', {
        title:'Streaming with Rating',
        name:'Streaming With Rating',
        data:resp.data
        })
       //  resp.send(hello)
    })   
});

router.get('/streaming_programs/:id', (req, res)=>{
  const id = req.params.id;
  const url = `http://localhost:3000/api/streaming/get_programsByStreaming/${id}`
  axios.get(url)
    .then(resp=> {
      // console.log(resp.data);
      res.render('pages/streaming_programs', {
        title:'Programs By Streaming',
        name:'Programs By Streaming ',
        data:resp.data
      })
    })
})


//**************Info page  for Programs*/

router.get('/programs_average', (req, res)=>{
  const id = req.params.id;
  const url = `http://localhost:3000/api/programs/get_averageRating`
  axios.get(url)
    .then(resp=> {
       console.log(resp.data);
      res.render('pages/programs_average', {
        title:'Average Rating for All Programs',
        name:'Average Rating for All Programs',
        data:resp.data
      })
      // resp.send('hello')
    })
})

router.get('/programs_drWho', (req, res)=>{
  const id = req.params.id;
  const url = `http://localhost:3000/api/programs/get_drWho`
  axios.get(url)
    .then(resp=> {
      // console.log(resp.data);
      res.render('pages/programs_drWho', {
        title:'Dr Who Programs',
        name:'Dr Who Programs',
        data:resp.data
      })
      // resp.send('hello')
    })
})


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

 router.get('/Prog-Streaming/:id', (req, res) => {
  const id = req.params.id;
  const url = `http://localhost:3000/api/programs/with_streaming/${id}`
  axios.get(url)
    .then(resp=> {
      res.render('pages/Prog-Streaming', {
        title:'Program with Streaming Platforms',
        name:'Program With  Streaming Platforms',
        programs:resp.data
      })
    })
  })

  router.get('/Prog-genre/:id', (req, res) => {
  const id = req.params.id;
  const url = `http://localhost:3000/api/programs/with_genre/${id}`
  axios.get(url)
    .then(resp=> {
      res.render('pages/Prog-genre', {
        title:'Program with Genres',
        name:'Program With Genres',
        programs:resp.data
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

//http://localhost:3000/singleActor/:id
router.get('/actors/:id', (req, res)=> {
  const id = req.params.id;
  const url = `http://localhost:3000/api/actors/${id}`;
  axios.get(url)
    .then(resp=> {
      res.render('pages/singleActor',{
        title:'Single Actor',
        name: 'Actor',
        actors:resp.data
      });
    });
});

//http://localhost:3000/singleDirector
router.get('/directors/:id', (req, res)=> {
  const id =req.params.id;
  const url = `http://localhost:3000/api/directors/${id}`
  axios.get(url) 
    .then(resp=> {
      res.render('pages/singleDirector',{
      title:'Single Director',
      name: 'Director',
      directors:resp.data
    })
  })
})

router.get('/singleGenre/:id', (req, res)=> {
  const id =req.params.id;
  const url = `http://localhost:3000/api/genre/${id}`
  axios.get(url)
  .then(resp => {
    res.render('pages/singleGenre', {
      title: 'Genre',
      name:'Genre',
      data:resp.data
  })
  })
});

router.get('/singleProductionCo/:id', (req, res)=> {
   const id =req.params.id;
  const url = `http://localhost:3000/api/ProductionCo/${id};`
  axios.get(url)
  .then(resp => {
    res.render('pages/singleProductionCo', {
      title: 'Production Company',
      name:'Production Company',
      data:resp.data
  })
  })
});
router.get('/singleStreaming/:id', (req, res)=> {
  const id =req.params.id;
  const url = `http://localhost:3000/api/streaming/${id};`
  axios.get(url)
  .then(resp => {
    res.render('pages/singleStreaming', {
      title: 'Streaming Platform',
      name:'Streaming Platform',
      data:resp.data
  })
  })
});

//********************FORMS
// 1. form http://localhost:3000/programs-form 
router.get('/programs-form', (req, res)=> {
    res.render('pages/programs-form', {
      title: 'Programs Form',
      name: 'Add an Program'
    })
})

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