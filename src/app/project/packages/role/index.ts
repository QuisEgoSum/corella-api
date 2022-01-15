import {RoleService} from './RoleService'
import {RoleRepository} from './RoleRepository'
import {RoleModel} from './RoleModel'
import * as schemas from './schemas'
import {FastifyInstance} from 'fastify'
import {routes} from './routes'
import * as error from './role-error'
import {RolePermission} from './RolePermission'


export class Role {
  public readonly service: RoleService
  public readonly schemas: typeof import('./schemas')
  public readonly RolePermission: typeof RolePermission
  public readonly Error: typeof import('./role-error')

  constructor(
    roleService: RoleService,
    schemas: typeof import('./schemas')
  ) {
    this.service = roleService
    this.schemas = schemas
    this.RolePermission = RolePermission
    this.Error = error

    this.router = this.router.bind(this)
  }

  async router(fastify: FastifyInstance) {
    return routes(fastify, {roleService: this.service, roleSchemas: this.schemas})
  }
}

export async function initRole() {
  return new Role(new RoleService(new RoleRepository(RoleModel)), schemas)
}