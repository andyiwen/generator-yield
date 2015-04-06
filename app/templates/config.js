import dotenv from 'dotenv'

dotenv.load()

let e = process.env

export default {
  port: e.PORT || 4000,
  workers: e.WORKERS || 2,
  api: {
    host: e.API_HOST || 'localhost',
    port: e.API_PORT || 3000
  },
  logger: {
    mode: e.LOGGER_MODE || 'dev',
    options: {}
  },
  views: {
    pretty: true
  },
  livereload: e.LIVERELOAD || false
}
