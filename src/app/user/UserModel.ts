import {Schema, model} from 'mongoose'


export interface IUser {
  _id: Schema.Types.ObjectId,
  username: string,
  email: string,
  passwordHash: string,
  createdAt: number,
  updatedAt: number
}


const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String
    },
    email: {
      type: String
    },
    passwordHash: {
      type: String,
      select: false
    },
    createdAt: {
      type: Number
    },
    updatedAt: {
      type: Number
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)


export default model<IUser>('User', UserSchema, 'users')