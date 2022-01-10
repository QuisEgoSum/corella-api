import 'module-alias/register'
import {createHttpServer} from './servers/http'
import {createConnection} from './core/database'
import {initDocs} from 'app/docs'
import {initUser} from 'app/user'
import {promisify} from 'util'
import {config} from '@config'
import {logger} from '@logger'


(async function main() {
  await createConnection()

  const Docs = await initDocs()
  const User = await initUser()

  const httpServer = await createHttpServer(
    {
      routers: [
        Docs.router,
        User.router
      ],
      swagger: Docs.swagger,
      securityOptions: {
        UserRole: User.UserRole,
        userError: User.error,
        userService: User.service
      }
    }
  )

  await promisify(httpServer.ready)()

  await httpServer.listen(config.server.http.port, config.server.http.address)
})()
  .catch(error => {
    logger.fatal(error)
    process.exit(1)
  })