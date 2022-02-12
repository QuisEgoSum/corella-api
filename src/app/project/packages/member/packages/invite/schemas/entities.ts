import {Types} from 'mongoose'
import {ExpandProjectPreview} from 'app/project/schemas/entities'
import {InviteStatus} from '../InviteStatus'
import {_id, createdAt, status} from './properties'


export interface InviteExpandProject {
  _id: Types.ObjectId,
  status: InviteStatus,
  project: ExpandProjectPreview,
  createdAt: number
}

export const InviteExpandProject = {
  title: 'InviteExpandProject',
  type: 'object',
  properties: {
    _id,
    status,
    project: ExpandProjectPreview,
    createdAt
  },
  additionalProperties: false,
  required: [
    '_id',
    'status',
    'project',
    'createdAt'
  ]
}