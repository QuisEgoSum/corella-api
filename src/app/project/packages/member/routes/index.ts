import {loadRoutes} from '@utils/loader'
import type {FastifyInstance} from 'fastify'
import type {MemberService} from '../MemberService'


export interface MemberRouteOptions extends MemberService {}


export async function routes(
  fastify: FastifyInstance,
  options: MemberRouteOptions
) {
  const routes = await loadRoutes<(fastify: FastifyInstance, options: MemberRouteOptions) => Promise<FastifyInstance>>(__dirname)

  await Promise.all(routes.map(route => route(fastify, options)))
}