import {Types} from 'mongoose'


export interface InviteExpand {
  _id: Types.ObjectId | string,
  project: {
    _id: Types.ObjectId | string,
    name: string
  },
  role: null | {
    _id: Types.ObjectId,
    name: string
  }
}