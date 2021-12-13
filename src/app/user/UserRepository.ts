import {BaseRepository} from 'core/repository/BaseRepository'
import type {UserModel} from './UserModel'
import type {IUser} from './UserModel'


export class UserRepository extends BaseRepository<IUser> {
  constructor(Model: typeof UserModel) {
    super(Model)
  }
}