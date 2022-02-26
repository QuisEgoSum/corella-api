import {ObjectId, Timestamp} from '@common/schemas/helpers'


export const _id = new ObjectId({entity: 'task'})
export const title = {
  type: 'string',
  minLength: 1,
  maxLength: 128,
  errorMessage: {
    minLength: 'The task title must contain at least 1 character',
    maxLength: 'The task title must not contain more than 128 characters'
  }
}
export const description = {
  type: 'string',
  minLength: 1,
  maxLength: 16384,
  errorMessage: {
    minLength: 'The task description must contain at least 1 character',
    maxLength: 'The task description must not contain more than 16384 characters'
  }
}
export const status = new ObjectId({entity: 'status'})
export const projectId = new ObjectId({entity: 'project'})
export const number = {
  description: 'Task number in the project',
  type: 'integer',
  minimum: 1
}
export const version = {
  type: 'integer',
  minimum: 1
}
export const creatorId = new ObjectId({entity: 'user'})
export const editorId = creatorId
export const editors = {
  type: 'array',
  items: creatorId
}
export const createdAt = new Timestamp()
export const updatedAt = new Timestamp()