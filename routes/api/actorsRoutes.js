
const router = require('express').Router()
const{actorsDao: dao} = require('../../daos/dao')

//1    http://localhost:3000/api/actors
router.get('/',(req, res)=> {
  dao.findAll(res, dao.table)
})

// 2  htpp://localhost:3000/api/actors/sort/:sort
router.get('/sort/:sorter', (req, res)=> {
  dao.sort(res, dao.table, req.params.sorter)
})

// 3  http://localhost:3000/api/actors/get_ProgramsForActors/?By
router.get('/get_programsForActors/:id', (req, res)=> {
  dao.findProgramsByActors(res, dao.table, req.params.id)
})

// 4 http://api/actor/?
router.get('actors/:id', (req, res)=> {
  dao.findById(res, dao.table, req.params.id)
})

//5 unique
//6

// 7. POST  http://localhost:3000/api/actor/create
router.post('/create',(req, res)=> {
  dao.create(req, res, dao.table)
})

// 8 PATCH
http://localhost:3000/
router.patch('/update/:id', (req, res)=> {
  dao.update(req, res,dao.table)
})
  


module.exports = router
