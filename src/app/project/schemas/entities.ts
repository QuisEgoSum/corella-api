import {_id, createdAt, description, name, updatedAt} from './properties'
import * as member from 'app/project/packages/member/schemas/properties'
import * as invite from 'app/project/packages/member/packages/invite/schemas/properties'
import * as role from 'app/project/packages/role/schemas/properties'
import {Types} from 'mongoose'
import {MemberStatus} from '../packages/member/MemberStatus'
import {InviteStatus} from '../packages/member/packages/invite/InviteStatus'


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

export interface ExpandProjectPreview {
  _id: Types.ObjectId,
  name: string,
  description?: string,
  member: {
    _id: Types.ObjectId,
    status: MemberStatus,
    invite?: {
      _id: Types.ObjectId,
      status: InviteStatus,
      createdAt: number
    },
    role: {
      _id: Types.ObjectId,
      name: string
    }
  },
  createdAt: number
}

export const ExpandProjectPreview = {
  title: 'ExpandProjectPreview',
  type: 'object',
  properties: {
    _id,
    name,
    description,
    member: {
      type: 'object',
      properties: {
        _id: member._id,
        status: member.status,
        invite: {
          type: 'object',
          properties: {
            _id: invite._id,
            status: invite.status,
            createdAt: invite.createdAt
          },
          additionalProperties: false,
          required: [
            '_id',
            'status',
            'createdAt'
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
    'name',
    'member',
    'createdAt'
  ],
  examples: [
    {
      "_id": "61e446bf93fbc9a737fb6ec0",
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
    },
    {
      "_id": "61e446bf93fbc9a737fb6ec0",
      "name": "Corella",
      "member": {
        "_id": "61e446e21e69d6811d3063ad",
        "status": "INVITED",
        "invite": {
          "_id": "61e446e293fbc9a737fb6ed4",
          "status": "NEW",
          "createdAt": 1642350306176
        },
        "role": {
          "_id": "61e446bf93fbc9a737fb6ec3",
          "name": "Guest"
        },
        "createdAt": 1642350306179
      },
      "createdAt": 1642350271451
    }
  ]
}