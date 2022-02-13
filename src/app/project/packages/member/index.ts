import {MemberEvents} from './MemberEvents'
import {MemberModel} from './MemberModel'
import {MemberRepository} from './MemberRepository'
import {MemberService} from './MemberService'
import {routes} from './routes'
import * as schemas from './schemas'
import * as error from './member-error'
import type {FastifyInstance} from 'fastify'
import type {Role} from '@app/project/packages/role'


const events = new MemberEvents()


class Member {
  public readonly service: MemberService
  public readonly events: MemberEvents
  public readonly schemas: typeof schemas
  public readonly error: typeof error

  constructor(
    memberService: MemberService,
    memberEvents: MemberEvents,
  ) {
    this.service = memberService
    this.events = memberEvents
    this.schemas = schemas
    this.error = error
  }

  async router(fastify: FastifyInstance) {
    await routes(fastify, this.service)
  }
}

export async function initMember(role: Role) {
  const service = new MemberService(new MemberRepository(MemberModel), events, role.service)
  return new Member(service, events)
}

export type {
  Member
}

export {
  schemas,
  error,
  events
}