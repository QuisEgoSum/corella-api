import {InviteService} from './InviteService'
import {InviteRepository} from './InviteRepository'
import {InviteModel} from './InviteModel'
import * as schemas from './schemas'
import * as error from './invite-error'
import {routes} from '@app/project/packages/invite/routes'
import type {User} from '@app/user'
import type {MemberService} from '@app/project/packages/member/MemberService'
import type {RoleService} from '@app/project/packages/role/RoleService'
import type {FastifyInstance} from 'fastify'


export class Invite {
  public readonly service: InviteService
  public readonly schemas: typeof schemas
  public readonly error: typeof error
  constructor(inviteService: InviteService) {
    this.service = inviteService
    this.schemas = schemas
    this.error = error
  }

  router(fastify: FastifyInstance) {
    return routes(fastify, this.service)
  }
}


export async function initInvite(userApp: User, memberService: MemberService, roleService: RoleService) {
  return new Invite(new InviteService(new InviteRepository(InviteModel), userApp, memberService, roleService))
}

export {
  schemas,
  error
}