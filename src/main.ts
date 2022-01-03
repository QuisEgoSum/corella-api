import 'module-alias/register'
import {createHttpServer} from './servers/http'
import {createConnection} from './core/database'
import {service as userService} from 'app/user'
import {promisify} from 'util'
import {config} from '@config'
import {logger} from '@logger'


(async function main() {
  await createConnection()
  await userService.upsertSuperadmin()

  const httpServer = createHttpServer()

  await promisify(httpServer.ready)()

  logger.info('Fastify ready')

  await httpServer.listen(config.server.http.port, config.server.http.address)
})()
  .catch(error => {
    logger.fatal(error)
    process.exit(1)
  })