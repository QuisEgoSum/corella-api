import {MemberService} from './MemberService'
import {MemberRepository} from './MemberRepository'
import {MemberModel} from './MemberModel'
import {initInvite} from './packages/invite'
import {routes} from './routes'
import * as schemas from './schemas'
import type {User as UserPkg} from 'app/user'
import type {Role as RolePkg} from 'app/project/packages/role'
import type {Invite as InvitePkg} from './packages/invite'
import type {FastifyInstance} from 'fastify'


export class Member {
  public readonly service: MemberService
  public readonly Invite: InvitePkg
  public readonly User: UserPkg
  public readonly Role: RolePkg

  constructor(
    memberService: MemberService,
    Invite: InvitePkg,
    User: UserPkg,
    Role: RolePkg
  ) {
    this.service = memberService
    this.Invite = Invite
    this.User = User
    this.Role = Role
  }

  async router(fastify: FastifyInstance) {
    await routes(fastify,
        {
          memberService: this.service,
          memberSchemas: schemas,
          userError: this.User.getUserErrors(),
          roleError: this.Role.Error
        }
      )
  }
}


export async function initMember(User: UserPkg, Role: RolePkg) {
  const Invite = await initInvite(User, Role)
  const service = new MemberService(new MemberRepository(MemberModel), Invite.service, Role.service, User)

  return new Member(service, Invite, User, Role)
}