import {Types} from 'mongoose'
import {ExpandProjectPreview} from '@app/project/schemas/entities'
import {InviteStatus} from '../InviteStatus'
import {_id, createdAt, status} from './properties'
import {roleId, userId} from '@app/project/packages/member/schemas/properties'


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

export interface InviteMember {
  userId: string,
  roleId: string
}

export const InviteMember = {
  title: 'InviteMember',
  type: 'object',
  properties: {
    userId,
    roleId
  },
  additionalProperties: false,
  required: [
    'userId',
    'roleId'
  ]
}