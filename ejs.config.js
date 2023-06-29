const packageJSON = require('./package.json')
require('custom-env').env(process.env.NODE_ENV)
const { name, description, version } = packageJSON

const envConfig = {
  ...process.env,
  NODE_ENV: process.env.NODE_ENV || 'development',
  BABEL_ENV: process.env.BABEL_ENV || 'development',

  // For version.json file
  name,
  description,
  version,
  buildAt: new Date(),
  buildEnv: process.env.NODE_ENV || 'development'
}

const config = { locals: envConfig }

module.exports = config
