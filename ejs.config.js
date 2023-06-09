require('custom-env').env(process.env.NODE_ENV)

const envConfig = {
  ...process.env,
  NODE_ENV: process.env.NODE_ENV || 'development',
  BABEL_ENV: process.env.BABEL_ENV || 'development'
}

const config = { locals: envConfig }

module.exports = config
