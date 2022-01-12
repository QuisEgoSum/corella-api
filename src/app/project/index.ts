import {ProjectModel} from './ProjectModel'
import {ProjectRepository} from './ProjectRepository'
import {ProjectService} from './ProjectService'
import {RolePermission} from './packages/role/RolePermission'
import {initRole} from './packages/role'
import {initTask} from './packages/task'
import {FastifyInstance} from 'fastify'
import {routes} from './routes'
import * as schemas from './schemas'


export async function initProject() {
  const Role = await initRole()
  const Task = await initTask()

  const service = new ProjectService(
    new ProjectRepository(ProjectModel),
    Role.service,
    Task.Counter.service
  )

  return {
    service,
    RolePermission,
    router: async function router(fastify: FastifyInstance) {
      await routes(fastify, service, schemas)
      await Role.router(fastify)
    }
  }
}


export {
  RolePermission
}