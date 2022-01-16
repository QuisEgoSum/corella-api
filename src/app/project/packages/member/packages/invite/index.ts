import {InviteService} from './InviteService'
import {InviteRepository} from './InviteRepository'
import {InviteModel} from './InviteModel'
import type {Role as RolePkg} from 'app/project/packages/role'


export class Invite {
  public readonly service: InviteService
  constructor(inviteService: InviteService) {
    this.service = inviteService
  }
}


export async function initInvite(Role: RolePkg) {
  return new Invite(new InviteService(new InviteRepository(InviteModel), Role.service))
}