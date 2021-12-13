import 'module-alias/register'
import {createHttpServer} from './servers/http/server'


(async function main() {
  const httpServer = createHttpServer()

  httpServer.ready(error => error && console.error(error))

  await httpServer.listen(8080)

  console.log('Http server started')
})()
  .catch(error => {
    console.error(error)
    process.exit(1)
  })