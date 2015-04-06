import cluster from 'cluster'
import config from './config'
import admin from './admin'

if (cluster.isMaster) {
  for (let i = 0; i < config.workers; i += 1) {
    cluster.fork()
  }
} else {
  admin.listen(config.port)
}
