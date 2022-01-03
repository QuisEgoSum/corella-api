import {_id, createdAt, email, role, updatedAt, username} from './properties'


export const UserCredentials = {
  title: 'UserCredentials',
  type: 'object',
  properties: {
    login: {
      type: 'string'
    },
    password: {
      type: 'string'
    }
  },
  additionalProperties: false,
  required: ['login', 'password'],
  errorMessage: {
    type: 'Enter your the password and username or email address',
    required: {
      login: 'Enter your username or email address',
      password: 'Enter your password'
    }
  }
}

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