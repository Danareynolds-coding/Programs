
const router = require('express').Router()

const {productionCoDao: dao} = require('../../daos/dao')
//1. findall http://localhost:3000/api/streaming
router.get('/',(req, res)=> {
  dao.findAll(res, dao.table)
})

// 2. sort http://localhost:3000/api/streaming/sort/:sort
router.get('/sort/:sorter', (req, res)=> {
  dao.sort(res, dao.table, req.params.sorter)
})

router.get('get_profitByProductionCo', (req, res)=> {
  dao.findProfitByProductionCo(res, dao.table)
})
router.get('get_productionCoBefore1960',(req, res)=> {
  dao.findProductionCoByProgramsBefore1960(res, dao.table)
})
// http://localhost:3000/api/productionCo/get_fivePointRatingByPCo
router.get('/get_fivePointRatingByPCo/:id', (req, res)=> {
  dao.findfivePointRatingByProductionCo(res, dao.table, req.params.id)
})
//1. ByPrograms http://localhost:3000/api/productionCo/get_programsForProductionCo/?
router.get('/get_programsByProductionCo/:id', (req, res)=> {
  dao.findProgramsByProductionCo(res, dao.table, req.params.id)
})
//4. id
router.get('/:id', (req, res)=> {
  dao.findById(res, dao.table, req.params.id)
})

// 7. post
router.post('/create', (req, res)=> {
  dao.create(req, res, dao.table)
})

//8. patch
router.patch('/update/:id', (req, res)=> {
  dao.update(req, res,dao.table)
})
  


module.exports = router
