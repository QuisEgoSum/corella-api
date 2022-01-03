import {_id, createdAt, email, role, updatedAt, username} from './properties'
import {UserRole} from '../UserRole'
import {properties} from './index'


export interface UserCredentials {
  login: string,
  password: string
}

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

export interface CreateUser {
  username: string,
  email: string,
  role: UserRole,
  password: string
}

export const CreateUser = {
  title: 'CreateUser',
  type: 'object',
  properties: {
    username: properties.username,
    email: properties.email,
    role: properties.role,
    password: properties.password
  },
  additionalProperties: false,
  required: ['username', 'email', 'role', 'password'],
  errorMessage: {
    type: 'User data must be object',
    required: {
      username: 'Enter username',
      email: 'Enter email',
      role: 'Select role',
      password: 'Enter password'
    }
  }
}