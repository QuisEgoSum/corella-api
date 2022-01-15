import {loadRoutes} from 'utils/loader'
import type {FastifyInstance} from 'fastify'
import type {RoleService} from '../RoleService'


export interface RoleRouteOptions {
  roleService: RoleService,
  roleSchemas: typeof import('app/project/packages/role/schemas')
}


export async function routes(
  fastify: FastifyInstance,
  options: RoleRouteOptions
) {
  const routes = await loadRoutes<(fastify: FastifyInstance, options: RoleRouteOptions) => Promise<FastifyInstance>>(__dirname)

  await Promise.all(routes.map(route => route(fastify, options)))
}