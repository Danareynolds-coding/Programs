
const express = require('express')              
const router = express.Router()                 

const {programsDao: dao} = require('../../daos/dao') 
const { table } = require('../../daos/api/programsDao')

//   http://localhost:3000/api/programs
router.get('/', (req, res)=> {                  
    dao.findAll(res, dao.table)            
}) 

//works  http://localhost:3000/programs/sort/:sorter                                     
router.get('/sort/:sorter', (req, res)=> {    
    dao.sort(res, dao.table, req.params.sorter)
})      

//Does not work
http://localhost:3000/api/programs/with_actors
router.get('/with_actors', (req, res)=> {
    dao.findProgramsWithActors(res, dao.table)
})
//does not work
// http://localhost:3000/api/programs/with_genres
router.get('/with_genres', (req, res)=> {
    dao.findProgramsWithGenres(res, dao.table)
})
//does not work
//http://localhost:3000/api/programs/get_programsDirector/?
router.get('/get_programsDirector/:id',(req, res)=> {
    dao.findProgramsByDirectorId(res, dao.table, req.params.id)
})

//http://localhost:3000/
router.get('/get_programsActor/:id', (req, res)=>{
    dao.findProgramsByActorId(res, dao.table, req.params.id)
})
router.get('/get_movieProduction/:id',(req, res)=> {
    dao.FindProgramsProduction(res, dao.table)
}) 

                            
//works  http://localhost:3000/api/programs/:id
router.get('/:id', (req, res)=> {               
    dao.findById(res, dao.table, req.params.id)          
})  
//POST
router.post('/create',(req, res)=> {
  dao.create(req, res, dao.table)
})

//PATCH
router.patch('/update/:id', (req, res)=> {
  dao.update(req, res,dao.table)
})
                                                

module.exports = router                         

