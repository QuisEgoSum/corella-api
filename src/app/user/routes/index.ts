import {loadRoutes} from 'utils/loader'
import type {UserService} from 'app/user/UserService'
import type {FastifyInstance} from 'fastify'


export async function routes(
  fastify: FastifyInstance,
  userService: UserService,
  schemas: typeof import('app/user/schemas')
) {
  const routes = await loadRoutes<
    {[key: string]: (fastify: FastifyInstance, service: UserService, schemas: typeof import('app/user/schemas')) => Promise<FastifyInstance>}
    >(__dirname)

  await Promise.all(routes.map(route => route(fastify, userService, schemas)))
}