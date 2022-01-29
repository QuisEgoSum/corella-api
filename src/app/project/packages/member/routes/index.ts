import {loadRoutes} from 'utils/loader'
import type {FastifyInstance} from 'fastify'
import type {MemberService} from '../MemberService'


export interface MemberRouteOptions {
  memberService: MemberService,
  memberSchemas: typeof import('app/project/packages/member/schemas'),
  roleError: typeof import('app/project/packages/role/role-error'),
  userError: typeof import('app/user/user-error'),
  inviteSchemas: typeof import('app/project/packages/member/packages/invite/schemas')
}


export async function routes(
  fastify: FastifyInstance,
  options: MemberRouteOptions
) {
  const routes = await loadRoutes<(fastify: FastifyInstance, options: MemberRouteOptions) => Promise<FastifyInstance>>(__dirname)

  await Promise.all(routes.map(route => route(fastify, options)))
}