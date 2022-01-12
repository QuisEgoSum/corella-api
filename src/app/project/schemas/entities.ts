import {_id, createdAt, name, updatedAt} from './properties'


export interface CreateProject {
  name: string
}

export const CreateProject = {
  title: 'CreateProject',
  type: 'object',
  properties: {
    name: name
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
    _id: _id,
    name: name,
    createdAt: createdAt,
    updatedAt: updatedAt
  },
  additionalProperties: false,
  required: ['_id', 'name', 'createdAt', 'updatedAt']
}