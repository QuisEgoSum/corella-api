import {BaseRepository} from 'core/repository'
import {IMember, MemberModel} from './MemberModel'


export class MemberRepository extends BaseRepository<IMember> {
  constructor(Model: typeof MemberModel) {
    super(Model)
  }
}
