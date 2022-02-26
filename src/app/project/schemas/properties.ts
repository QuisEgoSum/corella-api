import {ObjectId, Timestamp} from '@common/schemas/helpers'


export const _id = new ObjectId({entity: 'project'})
export const title = {
  type: 'string',
  minLength: 1,
  maxLength: 128,
  errorMessage: {
    minLength: 'Project title cannot be shorter than 1 character',
    maxLength: 'Project title cannot be longer than 128 character'
  }
}
export const name = {
  type: 'string',
  minLength: 1,
  maxLength: 24,
  pattern: "^[a-z0-9_-]+$",
  errorMessage: {
    minLength: 'Project name cannot be shorter than 1 character',
    maxLength: 'Project name cannot be longer than 24 character',
    pattern: 'Project name consists of alphanumeric characters (a-zA-Z0-9), lowercase, or uppercase\n'
      + 'Project name allowed of the underscore (_), and hyphen (-)'
  }
}
export const description = {
  type: 'string',
  minLength: 1,
  maxLength: 8192
}
export const createdAt = new Timestamp({description: 'Timestamp of project creation'})
export const updatedAt = new Timestamp({description: 'Timestamp of project updating'})