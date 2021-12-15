import {_id, createdAt, email, role, updatedAt, username} from './properties'


export const UserBase = {
  title: 'UserBase',
  type: 'object',
  properties: {
    _id: _id,
    username: username,
    email: email,
    role: role,
    createdAt: createdAt,
    updatedAt: updatedAt
  },
  additionalProperties: false,
  required: [
    '_id',
    'username',
    'email',
    'role',
    'createdAt',
    'updatedAt'
  ]
}