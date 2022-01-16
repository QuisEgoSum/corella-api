import {_id, projectId, roleId, userId, status, createdAt, updatedAt} from './properties'
import * as user from 'app/user/schemas/properties'
import * as role from 'app/project/packages/role/schemas/properties'
import {Types} from 'mongoose'
import {MemberStatus} from '../MemberStatus'


export interface BaseMember {
  _id: Types.ObjectId,
  status: MemberStatus,
  user: {
    _id: Types.ObjectId,
    username: string,
    email: string | null,
    avatar: string
  },
  role: {
    _id: Types.ObjectId,
    name: string
  },
  createdAt: number
}

export const BaseMember = {
  title: 'BaseMember',
  type: 'object',
  properties: {
    _id,
    user: {
      type: 'object',
      properties: {
        _id: user._id,
        username: user.username,
        email: {
          ...user.email,
          type: ['string', 'null']
        },
        avatar: user.avatar
      },
      additionalProperties: false,
      required: [
        '_id',
        'username',
        'email',
        'avatar'
      ]
    },
    role: {
      type: 'object',
      properties: {
        _id: role._id,
        name: role.name
      },
      additionalProperties: false,
      required: [
        '_id',
        'name'
      ]
    },
    status,
    createdAt
  },
  additionalProperties: false,
  required: [
    '_id',
    'user',
    'role',
    'status',
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