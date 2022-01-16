import {ObjectId, Timestamp} from 'common/schemas/helpers'


export const _id = new ObjectId({entity: 'project'})
export const name = {
  type: 'string',
  minLength: 1,
  maxLength: 128,
  errorMessage: {
    minLength: 'Project name cannot be shorter than 1 character',
    maxLength: 'Project name cannot be longer than 1 character'
  }
}
export const description = {
  type: 'string',
  minLength: 1,
  maxLength: 8192
}
export const createdAt = new Timestamp({description: 'Timestamp of project creation'})
export const updatedAt = new Timestamp({description: 'Timestamp of project updating'})