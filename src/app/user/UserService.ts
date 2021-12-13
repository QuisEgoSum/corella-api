import {BaseService} from 'core/service'
import type {IUser} from './UserModel'
import type {UserRepository} from './UserRepository'


export class UserService extends BaseService<IUser> {
  constructor(userRepository: UserRepository) {
    super(userRepository)
  }
}