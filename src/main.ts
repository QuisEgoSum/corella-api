import 'module-alias/register'
import {createHttpServer} from './servers/http/server'
import {logger} from '@logger'


(async function main() {
  const httpServer = createHttpServer()

  httpServer.ready(error => error && console.error(error))

  await httpServer.listen(8080)

  logger.warn('Test log')
  logger.warn({level: 'test', msg: 'test', time: 1})
})()
  .catch(error => {
    console.error(error)
    process.exit(1)
  })