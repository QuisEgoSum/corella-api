import {BaseRepository} from 'core/repository'
import {InviteModel, IInvite} from './InviteModel'


export class InviteRepository extends BaseRepository<IInvite> {
  constructor(Model: typeof InviteModel) {
    super(Model)
  }
}