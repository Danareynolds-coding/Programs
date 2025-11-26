
const router = require('express').Router()

const {productionCoDao: dao} = require('../../daos/dao')
//http://localhost:3000/api/productionCo
router.get('/', (req, res)=> {
  dao.findAll(res, dao.table)
  })
//   npm run dev

router.get('/get_programsForProductionCo/:id', (req, res)=> {
  dao.findProgramsByProductionCo(res, dao.table, req.params.id)
})

//htpp://localhost:3000/api/production/sort/:sort
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
