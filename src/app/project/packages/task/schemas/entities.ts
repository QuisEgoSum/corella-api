import {
  _id, title, description,
  status, projectId, number,
  version, creatorId, editorId,
  editors, createdAt, updatedAt
} from '@app/project/packages/task/schemas/properties'
import {Types} from 'mongoose'


export interface CreateTask {
  title: string,
  description: string
}

export const CreateTask = {
  title: 'CreateTask',
  type: 'object',
  properties: {
    title,
    description
  },
  additionalProperties: false,
  required: ['title', 'description'],
  errorMessage: {
    title: 'Specify the task title',
    description: 'Specify the task description'
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

export interface FindTasksQuery {
  status?: string,
  page: number,
  limit: number
}

export interface TaskPreview {
  _id: string | Types.ObjectId,
  number: number,
  title: string,
  status: string | Types.ObjectId,
  createdAt: number
}

export const TaskPreview = {
  title: 'TaskPreview',
  type: 'object',
  properties: {
    _id,
    number,
    title,
    status,
    createdAt
  },
  additionalProperties: false,
  required: [
    '_id',
    'number',
    'title',
    'status',
    'createdAt'
  ]
}