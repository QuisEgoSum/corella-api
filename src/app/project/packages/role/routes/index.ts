import {loadRoutes} from 'utils/loader'
import type {FastifyInstance} from 'fastify'
import type {RoleService} from '../RoleService'


export interface RoleRouteOptions {
  roleService: RoleService,
  schemas: typeof import('app/project/packages/role/schemas')
}


export async function routes(
  fastify: FastifyInstance,
  roleService: RoleService,
  schemas: typeof import('app/project/packages/role/schemas')
) {
  const routes = await loadRoutes<
    {[key: string]: (fastify: FastifyInstance, options: RoleRouteOptions) => Promise<FastifyInstance>}
    >(__dirname)

  await Promise.all(routes.map(route => route(fastify, {roleService, schemas})))
}