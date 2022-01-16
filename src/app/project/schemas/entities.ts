import {_id, createdAt, description, name, updatedAt} from './properties'


export interface CreateProject {
  name: string
}

export const CreateProject = {
  title: 'CreateProject',
  type: 'object',
  properties: {
    name,
    description
  },
  required: ['name'],
  additionalProperties: false,
  errorMessage: {
    required: {
      name: 'Specify the project name'
    }
  }
}

export const BaseProject = {
  title: 'BaseProject',
  type: 'object',
  properties: {
    _id,
    name,
    description,
    createdAt,
    updatedAt
  },
  additionalProperties: false,
  required: ['_id', 'name', 'createdAt', 'updatedAt']
}