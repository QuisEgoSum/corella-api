import {_id, projectId, roleId, userId, status, createdAt, updatedAt} from './properties'


export const BaseMember = {
  title: 'BaseMember',
  type: 'object',
  properties: {
    _id,
    projectId,
    userId,
    roleId,
    status,
    createdAt,
    updatedAt
  },
  additionalProperties: false,
  required: [
    '_id',
    'projectId',
    'userId',
    'roleId',
    'status',
    'createdAt',
    'updatedAt'
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