import {loadRoutes} from '@utils/loader'
import type {FastifyInstance} from 'fastify'
import {InviteService} from '@app/project/packages/invite/InviteService'


export interface InviteRouteOptions extends InviteService {}


export async function routes(
  fastify: FastifyInstance,
  options: InviteRouteOptions
) {
  const routes = await loadRoutes<(fastify: FastifyInstance, options: InviteRouteOptions) => Promise<FastifyInstance>>(__dirname)

  await Promise.all(routes.map(route => route(fastify, options)))
}