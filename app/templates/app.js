import express from 'express'
import compression from 'compression'
import favicon from 'serve-favicon'
import morgan from 'morgan'
import http from 'http'
import config from './config'
import routes from './routes/index'
import middleware from './middleware/index'
import livereload from 'connect-livereload'

let app = express()
let server = http.createServer(app)

app.locals.pretty = config.views.pretty

app.enable('trust proxy')

app.disable('x-powered-by')

app.set('views', __dirname + '/views')
app.set('view engine', 'jade')

app.use(compression())
app.use(favicon(__dirname + '/static/favicons/favicon.ico'))
app.use(express.static(__dirname + '/static'))
app.use(morgan(config.logger.mode, config.logger.options))
if (config.livereload) {
  app.use(livereload())
}

routes(app)

app.use(middleware.error.notFound)
app.use(middleware.error.internalServerError)

export default server
