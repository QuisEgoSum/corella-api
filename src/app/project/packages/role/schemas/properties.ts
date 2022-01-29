import {ObjectId, Timestamp} from 'common/schemas/helpers'
import {RolePermission} from '../RolePermission'


export const _id = new ObjectId({entity: 'role'})
export const name = {
  type: 'string',
  example: 'Developer'
}
export const permissions = {
  type: 'array',
  items: {
    type: 'string',
    enum: Object.values(RolePermission)
  }
}
export const projectId = new ObjectId({entity: 'project'})
export const allowedEdit = {
  type: 'boolean'
}
export const createdAt = new Timestamp({description: ''})
export const updatedAt = new Timestamp({description: ''})