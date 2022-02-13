import {RoleEvents} from './RoleEvents'
import {RoleModel} from './RoleModel'
import {RoleRepository} from './RoleRepository'
import {RoleService} from './RoleService'
import {RolePermission} from './RolePermission'
import * as schemas from './schemas'
import * as error from './role-error'
import {routes} from './routes'
import type {FastifyInstance} from 'fastify'


export class Role {
  public readonly service: RoleService
  public readonly schemas: typeof import('./schemas')
  public readonly RolePermission: typeof RolePermission
  public readonly error: typeof error
  public readonly events: RoleEvents

  constructor(
    roleService: RoleService,
    roleEvents: RoleEvents,
    schemas: typeof import('./schemas')
  ) {
    this.service = roleService
    this.events = roleEvents
    this.schemas = schemas
    this.RolePermission = RolePermission
    this.error = error

    this.router = this.router.bind(this)
  }

  async router(fastify: FastifyInstance) {
    return routes(fastify, {roleService: this.service, roleSchemas: this.schemas})
  }
}

const events = new RoleEvents()

export async function initRole() {
  return new Role(new RoleService(new RoleRepository(RoleModel), events), events, schemas)
}

export {
  schemas,
  error,
  RolePermission
}