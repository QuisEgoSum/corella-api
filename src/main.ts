import 'module-alias/register'
import {createHttpServer} from './servers/http'
import {createConnection} from '@core/database'
import {initDocs} from '@app/docs'
import {initUser} from '@app/user'
import {initProject} from '@app/project'
import {promisify} from 'util'
import {config} from '@config'
import {logger} from '@logger'


(async function main() {
  await createConnection()

  const docs = await initDocs()
  const user = await initUser()
  const project = await initProject(user)

  const httpServer = await createHttpServer(
    {
      routers: [
        docs.router,
        user.router,
        project.router
      ],
      swagger: docs.swagger,
      securityOptions: {
        user: user,
        project: project
      },
      docsOptions: {
        project: project
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