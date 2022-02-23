import {loadRoutes} from '@utils/loader'
import type {FastifyInstance} from 'fastify'
import {StatusService} from '../StatusService'



export async function routes(
  fastify: FastifyInstance,
  service: StatusService
) {
  const routes = await loadRoutes<(fastify: FastifyInstance, service: StatusService) => Promise<FastifyInstance>>(__dirname)

  await Promise.all(routes.map(route => route(fastify, service)))
}