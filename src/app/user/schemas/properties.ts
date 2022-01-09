import {ObjectId, Timestamp} from 'common/schemas/helpers'
import {UserRole} from '../UserRole'
import {v4} from 'uuid'


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
export const mUsername = {
  type: 'string',
  minLength: 1,
  maxLength: 24,
  example: 'Joe',
  errorMessage: {
    minLength: 'Specify at least 1 character to search by username',
    maxLength: 'Username cannot be longer than 24 characters'
  }
}
export const email = {
  type: 'string',
  example: 'user@nowhere.com',
  emailValidator: true,
  maxLength: 1024,
  errorMessage: {
    emailValidator: 'Invalid email address',
    maxLength: 'Email address cannot be longer than 1024 characters'
  }
}
export const avatar = {
  type: 'string',
  example: `#=${v4()}`
}
export const mEmail = {
  type: 'string',
  minLength: 1,
  maxLength: 1024,
  errorMessage: {
    minLength: 'Specify at least 1 character to search by email',
    maxLength: 'Email address cannot be longer than 1024 characters'
  }
}
export const role = {
  type: 'string',
  enum: Object.values(UserRole),
  errorMessage: {
    enum: `Acceptable user role values: ${Object.values(UserRole).join(', ')}`
  }
}
export const password = {
  type: 'string',
  minLength: 6,
  maxLength: 1024,
  errorMessage: {
    minLength: 'Password must not be less than 6 characters',
    maxLength: 'Password must not be more than 1024 characters'
  }
}
export const createdAt = new Timestamp({description: 'Timestamp of user creation'})
export const updatedAt = new Timestamp({description: 'User update timestamp'})