import {ObjectId, Timestamp} from 'core/schemas/helpers'
import {UserRole} from '../UserRole'


export const _id = new ObjectId({entity: 'user'})
export const username = {
  type: 'string',
  minLength: 1,
  maxLength: 24,
  example: 'user',
  errorMessage: {
    minLength: 'Username cannot be shorter than 1 character',
    maxLength: 'Username cannot be longer than 24 characters'
  }
}
export const email = {
  type: 'string',
  example: 'user@nowhere.com',
  errorMessage: {
    //TODO: email validation
  }
}
export const role = {
  type: 'string',
  enum: Object.values(UserRole),
  errorMessage: {
    enum: `Acceptable user role values: ${Object.values(UserRole).join(', ')}`
  }
}
export const createdAt = new Timestamp({description: 'Timestamp of user creation'})
export const updatedAt = new Timestamp({description: 'User update timestamp'})