import {InviteService} from './InviteService'
import {InviteRepository} from './InviteRepository'
import {InviteModel} from './InviteModel'


export class Invite {
  public readonly service: InviteService
  constructor(inviteService: InviteService) {
    this.service = inviteService
  }
}


export async function initInvite() {
  return new Invite(new InviteService(new InviteRepository(InviteModel)))
}