import cluster from 'cluster'
import config from './config'
import app from './app'

if (cluster.isMaster) {
  for (let i = 0; i < config.workers; i += 1) {
    cluster.fork()
  }
} else {
  app.listen(config.port)
}
