

const router = require('express').Router()
const{streamingDao: dao} = require('../../daos/dao')
//1. findall http://localhost:3000/api/streaming
router.get('/',(req, res)=> {
  dao.findAll(res, dao.table)
})

// 2. sort http://localhost:3000/api/streaming/sort/:sort
router.get('/sort/:sorter', (req, res)=> {
  dao.sort(res, dao.table, req.params.sorter)
})

router.get('/get_averageRatingByStreaming', (req, res)=> {
  dao.findAverageRatingByStreaming(res, dao.table)
})

// 3. ByPrograms  http://localhost:3000/api/streaming/get_programsForStreaming/?
router.get('/get_programsByStreaming/:id', (req, res)=> {
  dao.findProgramsByStreaming(res, dao.table, req.params.id)
})
//5 unique 1 http://localhost:3000/api/streaming/get_RatingForStreaming
router.get('/get_RatingByStreaming/:id', (req, res)=> {
  dao.findRatingByStreaming(res, dao.table, req.params.id)
})

//******************* */


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
