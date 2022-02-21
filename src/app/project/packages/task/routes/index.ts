import {loadRoutes} from '@utils/loader'
import type {FastifyInstance} from 'fastify'


export interface TaskRouteOptions {}


export async function routes(
  fastify: FastifyInstance,
  options: TaskRouteOptions
) {
  const routes = await loadRoutes<(fastify: FastifyInstance, options: TaskRouteOptions) => Promise<FastifyInstance>>(__dirname)

  await Promise.all(routes.map(route => route(fastify, options)))
}