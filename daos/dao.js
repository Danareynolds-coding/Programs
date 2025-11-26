// where all the daos meet 
const daoCommon = require('./common/daoCommon')
//spread operator allows-remove curly to package the dao common and programs together
const programsDao = {
  ...daoCommon,
  ...require('./api/programsDao')
}

module.exports = {
  programsDao
}