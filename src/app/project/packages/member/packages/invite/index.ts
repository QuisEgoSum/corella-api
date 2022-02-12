import {InviteService} from './InviteService'
import {InviteRepository} from './InviteRepository'
import {InviteModel} from './InviteModel'
import * as schemas from './schemas'


export class Invite {
  public readonly service: InviteService
  public readonly schemas: typeof import('./schemas')
  constructor(inviteService: InviteService) {
    this.service = inviteService
    this.schemas = schemas
  }
}


export async function initInvite() {
  return new Invite(new InviteService(new InviteRepository(InviteModel)))
}