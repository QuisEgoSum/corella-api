import BaseRepository from 'core/repository/BaseRepository'
import UserModel, {IUser} from './UserModel'
import mongoose from 'mongoose'


class UserRepository extends BaseRepository<IUser> {
  constructor() {
    super(UserModel)
  }

  async test() {
    // await this.deleteOne({username: {$exists: true}})

    await this.deleteById(new mongoose.Types.ObjectId())
  }
}

export default UserRepository