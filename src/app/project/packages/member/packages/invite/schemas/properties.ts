import {ObjectId, Timestamp} from '@common/schemas/helpers'
import {InviteStatus} from '../InviteStatus'


export const _id = new ObjectId({entity: 'project invite'})
export const status = {
  type: 'string',
  enum: Object.values(InviteStatus)
}
export const createdAt = new Timestamp({description: ''})