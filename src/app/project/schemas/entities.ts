import {_id, createdAt, description, name, title, updatedAt} from './properties'
import * as member from '@app/project/packages/member/schemas/properties'
import * as role from '@app/project/packages/role/schemas/properties'
import {Types} from 'mongoose'
import {MemberStatus} from '../packages/member/MemberStatus'


export interface CreateProject {
  name: string
  title: string
}

export const CreateProject = {
  title: 'CreateProject',
  type: 'object',
  properties: {
    title,
    name,
    description
  },
  required: ['title', 'name'],
  additionalProperties: false,
  errorMessage: {
    required: {
      title: 'Specify the project title',
      name: 'Specify the project name'
    }
  }
}

export const BaseProject = {
  title: 'BaseProject',
  type: 'object',
  properties: {
    _id,
    title,
    name,
    description,
    createdAt,
    updatedAt
  },
  additionalProperties: false,
  required: ['_id', 'title', 'name', 'createdAt', 'updatedAt']
}

export interface ExpandProjectPreview {
  _id: Types.ObjectId,
  title: string,
  name: string,
  description?: string,
  member: {
    _id: Types.ObjectId,
    status: MemberStatus,
    role: {
      _id: Types.ObjectId,
      name: string,
      createdAt: number
    },
    createdAt: number
  },
  createdAt: number
}

export const ExpandProjectPreview = {
  title: 'ExpandProjectPreview',
  type: 'object',
  properties: {
    _id,
    title,
    name,
    description,
    member: {
      type: 'object',
      properties: {
        _id: member._id,
        status: member.status,
        role: {
          type: 'object',
          properties: {
            _id: role._id,
            name: role.name,
            createdAt: role.createdAt
          },
          additionalProperties: false,
          required: [
            '_id',
            'name',
            'createdAt'
          ]
        },
        createdAt: member.createdAt
      },
      additionalProperties: false,
      required: [
        '_id',
        'status',
        'role',
        'createdAt'
      ]
    },
    createdAt
  },
  additionalProperties: false,
  required: [
    '_id',
    'title',
    'name',
    'member',
    'createdAt'
  ],
  examples: [
    {
      "_id": "61e446bf93fbc9a737fb6ec0",
      "title": "test",
      "name": "test",
      "member": {
        "_id": "61e446bf93fbc9a737fb6ec8",
        "status": "PARTICIPANT",
        "role": {
          "_id": "61e446bf93fbc9a737fb6ec2",
          "name": "Maintainer"
        },
        "createdAt": 1642350271464
      },
      "createdAt": 1642350271451
    }
  ]
}