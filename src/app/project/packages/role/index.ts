import {RoleService} from './RoleService'
import {RoleRepository} from './RoleRepository'
import {RoleModel} from './RoleModel'
import * as schemas from './schemas'
import {FastifyInstance} from 'fastify'
import {routes} from './routes'


export async function initRole() {
  const service = new RoleService(new RoleRepository(RoleModel))

  return {
    service,
    schemas,
    router: async function(fastify: FastifyInstance) {
      return routes(fastify, service, schemas)
    }
  }
}