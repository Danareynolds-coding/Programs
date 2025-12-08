
const router = require('express').Router()
const{genreDao: dao} = require('../../daos/dao')

// 1 ProgramsByGenres  http://localhost:3000/api/genre/get_programsForGenre/?
router.get('/get_programsByGenre/:id', (req, res)=> {
  dao.findProgramsByGenre(res, dao.table, req.params.id)
})

//5.unique 1 http://localhost:3000/api/genre/get_descriptionByGenre/?
router.get('/get_DescriptionByGenre/:id', (req, res)=> {
  dao.findDescriptionByGenre(res, dao.table, req.params.id)
  
})
//*******************DO I Keep these here */
// 1. findall http://localhost:3000/api/genre
router.get('/',(req, res)=> {
  dao.findAll(res, dao.table)
})

// 2. sort htpp://localhost:3000/api/genre/sort/:sort
router.get('/sort/:sorter', (req, res)=> {
  dao.sort(res, dao.table, req.params.sorter)
})
//4. id
router.get('/:id', (req, res)=> {
  dao.findById(res, dao.table, req.params.id)
})

//7 post
router.post('/create', (req, res)=> {
  dao.create(req, res, dao.table)
})
//8 patch
router.patch('/update/:id', (req, res)=> {
  dao.update(req, res, dao.table)
})
  
module.exports = router