import {loadRoutes} from 'utils/loader'
import type {UserService} from 'app/user/UserService'
import type {FastifyInstance} from 'fastify'


export interface UserRoutesOptions {
  userService: UserService,
  userSchemas: typeof import('app/user/schemas')
}

export async function routes(
  fastify: FastifyInstance,
  options: UserRoutesOptions
) {
  const routes = await loadRoutes<(fastify: FastifyInstance, options: UserRoutesOptions) => Promise<FastifyInstance>>(__dirname)

  await Promise.all(routes.map(route => route(fastify, options)))
}