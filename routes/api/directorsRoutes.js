
const router = require('express').Router()
const{directorsDao: dao} = require('../../daos/dao')
// 1. http://localhost:3000/api/directors
router.get('/',(req, res)=> {
  dao.findAll(res, dao.table)
})

//  2. Sort htpp://localhost:3000/api/director/sort/:sort  1
router.get('/sort/:sorter', (req, res)=> {
  dao.sort(res, dao.table, req.params.sorter)
})

// 3. ByPrograms  http://localhost:3000/api/directors/get_programsForDirector/?
router.get('/get_programsForDirectors/:id', (req, res)=> {
  dao.findProgramsByDirectors(res, dao.table, req.params.id)
})
//4 id
router.get('directors/:id', (req, res)=> {
  dao.findById(res, dao.table, req.params.id)
})

//7.POST
router.post('/create', (req, res)=> {
  dao.create(req, res, dao.table)
})
//8 patch
router.patch('/update/:id', (req, res)=> {
  dao.update(req, res, dao.table)
})
  

module.exports = router