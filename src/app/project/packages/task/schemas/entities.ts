import {
  _id, title, description,
  status, projectId, number,
  version, creatorId, editorId,
  editors, createdAt, updatedAt
} from '@app/project/packages/task/schemas/properties'


export interface CreateTask {
  title: string,
  description: string,
  status: string
}

export const CreateTask = {
  title: 'CreateTask',
  type: 'object',
  properties: {
    title,
    description,
    status
  },
  additionalProperties: false,
  required: ['title', 'description', 'status'],
  errorMessage: {
    title: 'Specify the task title',
    description: 'Specify the task description',
    status: 'Specify the task status'
  }
}

export const BaseTask = {
  title: 'BaseTask',
  type: 'object',
  properties: {
    _id,
    number,
    title,
    description,
    status,
    projectId,
    version,
    creatorId,
    editorId,
    editors,
    createdAt,
    updatedAt
  },
  additionalProperties: false,
  required: [
    '_id',
    'number',
    'title',
    'description',
    'status',
    'projectId',
    'version',
    'creatorId',
    'editorId',
    'editors',
    'createdAt',
    'updatedAt'
  ]
}