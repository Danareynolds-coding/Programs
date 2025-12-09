
const router = require('express').Router()
const { actorsDao: dao } = require('../../daos/dao')

// 1  http://localhost:3000/api/actors/get_ProgramsForActors/?By
router.get('/get_programsByActors/:id', (req, res)=> {
  dao.findProgramsByActors(res, dao.table, req.params.id)
})
//2 http://localhost:3000/api/actors/get_actorsWhoDirect
router.get('/get_actorsWhoDirect', (req, res)=>{
  dao.findActorWhoDirect(res, dao.table)
})
//3 http://localhost:3000/api/actors/get_actorWithfiveStarRating
router.get('/get_actorsWithFiveStars', (req, res)=> {
  dao.findActorsWithFiveStarProgram(res, dao.table)
})

//********************DELETE ? */
//1    http://localhost:3000/api/actors
router.get('/',(req, res)=> {
  dao.findAll(res, dao.table)
})

// 2  htpp://localhost:3000/api/actors/sort/:sort
router.get('/sort/:sorter', (req, res)=> {
  dao.sort(res, dao.table, req.params.sorter)
})

// 4 http://api/actors/?
router.get('/:id', (req, res)=> {
  dao.findById(res, dao.table, req.params.id)
})


// 7. POST  http://localhost:3000/api/actor/create
// Handle actor creation with text fields only
router.post('/create', (req, res) => {
  console.log('ACTOR FORM SUBMIT req.body:', req.body);
  dao.create(req, res, dao.table)
})

// 8 PATCH
http://localhost:3000/
router.patch('/update/:id', (req, res)=> {
  dao.update(req, res,dao.table)
})
  


module.exports = router
