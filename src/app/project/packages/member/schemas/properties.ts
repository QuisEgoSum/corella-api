import {ObjectId, Timestamp} from 'common/schemas/helpers'
import {MemberStatus} from '../MemberStatus'


export const _id = new ObjectId({entity: 'project member'})
export const projectId = new ObjectId({entity: 'project'})
export const userId = new ObjectId({entity: 'user'})
export const roleId = new ObjectId({entity: 'project role'})
export const status = {
  type: 'string',
  enum: Object.values(MemberStatus)
}
export const createdAt = new Timestamp({description: ''})
export const updatedAt = new Timestamp({description: ''})