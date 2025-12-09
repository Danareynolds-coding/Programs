
const router = require('express').Router()
const{genreDao: dao} = require('../../daos/dao')

// 1 ProgramsByGenres  http://localhost:3000/api/genre/get_programsByGenre/?
router.get('/get_programsByGenre/:id', (req, res)=> {
  dao.findProgramsByGenre(res, dao.table, req.params.id)
})

//5.unique 1 http://localhost:3000/api/genre/get_descriptionByGenre/?
router.get('/get_DescriptionByGenre/:id', (req, res)=> {
  dao.findDescriptionByGenre(res, dao.table, req.params.id)
})

  
module.exports = router