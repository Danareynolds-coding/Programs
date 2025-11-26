
const router = require('express').Router()
const{directorsDao: dao} = require('../../daos/dao')
//http://localhost:3000/api/directors
router.get('/',(req, res)=> {
  dao.findAll(res, dao.table)
})
//   http://localhost:3000/api/directors/get_programsForDirector/?
router.get('/get_programsForDirector/:id', (req, res)=> {
  dao.findProgramsByDirectors(res, dao.table, req.params.id)
})
//htpp://localhost:3000/api/director/sort/:sort
router.get('/sort/:sorter', (req, res)=> {
  dao.sort(res, dao.table, req.params.sorter)
})
router.get('/:id', (req, res)=> {
  dao.findById(res, dao.table, req.params.id)
})
router.post('/create', (req, res)=> {
  dao.create(req, res, dao.table)
})
router.patch('/update/:id', (req, res)=> {
  dao.update(req, res, dao.table)
})
  

module.exports = router