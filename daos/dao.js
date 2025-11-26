// where all the daos meet 
const daoCommon = require('./common/daoCommon')
//spread operator allows-remove curly to package the dao common and programs together
const programsDao = {
  ...daoCommon,
  ...require('./api/programsDao')
}

const actorsDao = {
  ...daoCommon,
  ...require('./api/actorsDao')
}

const directorsDao = {
  ...daoCommon,
  ...require('./api/directorsDao')
}

const genreDao = {
  ...daoCommon,
  ...require('./api/genreDao')
}

const productionCoDao = {
  ...daoCommon,
  ...require('./api/productionCoDao')
}

const streamingDao = {
  ...daoCommon,
  ...require('./api/streamingDao')
}

module.exports = {
  programsDao,
  actorsDao,
  directorsDao,
  genreDao,
  productionCoDao,
  streamingDao
}


// module.exports = {
  // programsDao
// }