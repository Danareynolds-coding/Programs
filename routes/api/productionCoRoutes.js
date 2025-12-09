
const router = require('express').Router()

const {productionCoDao: dao} = require('../../daos/dao')

//1. ByPrograms http://localhost:3000/api/productionCo/get_programsForProductionCo/?
router.get('/get_programsByProductionCo/:id', (req, res)=> {
  dao.findProgramsByProductionCo(res, dao.table, req.params.id)
})
router.get('get_profitByProductionCo:id', (req, res)=> {
  dao.findProfitByProductionCo(res, dao.table, req.params.id)
})
//3. fivePointRatingByPCo 
// http://localhost:3000/api/productionCo/get_fivePointRatingByPCo
router.get('/get_fivePointRatingByPCo/:id', (req, res)=> {
  dao.findfivePointRatingByProductionCo(res, dao.table, req.params.id)
})

module.exports = router
