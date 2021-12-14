import {loadRoutes} from 'utils/loader'
import type {FastifyInstance} from 'fastify'


export async function routes(
  fastify: FastifyInstance
) {
  const routes = await loadRoutes<
    {[key: string]: (fastify: FastifyInstance) => Promise<FastifyInstance>}
    >(__dirname)

  return Promise.all(routes.map(route => route(fastify)))
}