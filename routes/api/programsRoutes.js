
const express = require('express')              
const router = express.Router()                 

const {programsDao: dao} = require('../../daos/dao') 
const { table } = require('../../daos/api/programsDao')

//1. findall   http://localhost:3000/api/programs
router.get('/', (req, res)=> {                  
    dao.findAll(res, dao.table)            
}) 

//2. sort http://localhost:3000/programs/sort/:sorter                                     
router.get('/sort/:sorter', (req, res)=> {    
    dao.sort(res, dao.table, req.params.sorter)
})      
router.get('/DrWhoPrograms', (req, res)=> {
    dao.findDrWho(res, dao.table)
    })
//1 
router.get('/get_programsInfo', (req, res)=> {
    dao.findProgramsInfo(res, dao.table)
})
router.get('/get_streamingWithTimeOverHour', (req, res)=> {
  dao.findStreamingWithTimeOverHour(res, dao.table)
})
// 2A actors http://localhost:3000/api/programs/with_actors/:id
router.get('/with_actors/:id', (req, res)=> {
    dao.findProgramsWithActors(res, dao.table, req.params.id)
})

// 2B directors http://localhost:3000/api/programs/with_directors/:id
router.get('/with_directors/:id',(req, res)=> {
    dao.findProgramsWithDirectors(res, dao.table, req.params.id)
})

// 2C genre http://localhost:3000/api/programs/with_genre/:id
router.get('/with_genre/:id', (req, res)=> {
    dao.findProgramsWithGenre(res, dao.table, req.params.id)
})

// 2D productionCo http://localhost:3000/api/programs/with_productionCo/:id
router.get('/with_productionCo/:id',(req, res)=> {
    dao.findProgramsWithProductionCo(res, dao.table, req.params.id)
}) 
// 2E streaming http://localhost:3000/api/programs/with_streaming/:id
router.get('/with_streaming/:id', (req, res)=> {
    dao.findProgramsWithStreaming(res, dao.table, req.params.id)
})
// 3. unique1
 router.get('/sort/showing/:sorter', (req, res) => {
    dao.findTheatrePrograms(res, dao.table, req.params.sorter)
 })

//*********** **** */

// 4.id  http://localhost:3000/api/programs/:id
router.get('/:id', (req, res)=> {               
    dao.findById(res, dao.table, req.params.id)          
}) 

// 7 POST
router.post('/create',(req, res)=> {
  dao.create(req, res, dao.table)
})

// 8 PATCH
router.patch('/update/:id', (req, res)=> {
  dao.update(req, res,dao.table)
})
                                                
module.exports = router                         

