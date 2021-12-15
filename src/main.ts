import 'module-alias/register'
import {createHttpServer} from './servers/http'
import {createConnection} from './core/database'
import {service as userService} from 'app/user'
import {logger} from '@logger'


(async function main() {
  await createConnection()
  await userService.upsertSuperadmin()

  const httpServer = createHttpServer()

  httpServer.ready(error => error ? logger.error(error) : logger.info('Fastify ready'))

  await httpServer.listen(8080)
})()
  .catch(error => {
    console.error(error)
    process.exit(1)
  })