
const router = require('express').Router()
const{directorsDao: dao} = require('../../daos/dao')

router.get('/get_productionCoByDirectors', (req, res) => {
  dao.findProductionCoByDirectors(req, res, dao.table)
})
router.get('/get_animationByDirectors', (req, res) => {
  dao.findAnimationByDirectors(req, res, dao.table)
})

//3. ByPrograms  http://localhost:3000/api/directors/get_programsForDirector/?
router.get('/get_programsByDirectors/:id', (req, res)=> {
  dao.findProgramsByDirectors(res, dao.table, req.params.id)
})

router.get('/get_actorsByDirectors/:id', (req, res)=> {
  dao.findActorsByDirectors(res, dao.table, req.params.id)
})
//**********************do i keep these */
// 1. http://localhost:3000/api/directors
router.get('/',(req, res)=> {
  dao.findAll(res, dao.table)
})

//  2. Sort htpp://localhost:3000/api/director/sort/:sort  1
router.get('/sort/:sorter', (req, res)=> {
  dao.sort(res, dao.table, req.params.sorter)
})

/
//4 id
router.get('/:id', (req, res)=> {
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