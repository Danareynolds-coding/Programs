

const router = require('express').Router()
const{streamingDao: dao} = require('../../daos/dao')

//http://localhost:3000/api/streaming
router.get('/',(req, res)=> {
  dao.findAll(res, dao.table)
})
//   http://localhost:3000/api/streaming/get_programsForStreaming/?
router.get('/get_programsForStreaming/:id', (req, res)=> {
  dao.findStreaming(res, dao.table, req.params.id)
})
//http://localhost:3000/api/streaming/sort/:sort
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
  dao.update(req, res,dao.table)
})
  

module.exports = router
