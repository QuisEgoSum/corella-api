import {_id, createdAt, email, mEmail, role, updatedAt, username} from './properties'
import {UserRole} from '../UserRole'
import {properties} from './index'
import {QueryPageLimit, QueryPageNumber, QuerySortDirection} from 'common/schemas/query'
import type {SortDirection} from 'mongodb'


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

export interface FindUsersQuery {
  fRole?: UserRole,
  mUsername?: string,
  mEmail?: string,
  sCreatedAt: SortDirection,
  page: number,
  limit: number
}

export const FindUsersQuery = {
  title: 'FindUsersQuery',
  type: 'object',
  properties: {
    fRole: properties.role,
    mUsername: properties.mUsername,
    mEmail: properties.mEmail,
    sCreatedAt: new QuerySortDirection().setDefault('desc'),
    page: new QueryPageNumber().setDefault(1),
    limit: new QueryPageLimit().setDefault(10)
  },
  additionalProperties: false
}

export interface UpdateUserById {
  email?: string,
  username?: string,
  password?: string,
  role?: UserRole
}

export const UpdateUserById = {
  title: 'UpdateUserById',
  type: 'object',
  properties: {
    email: properties.email,
    username: properties.username,
    password: properties.password,
    role: properties.role
  },
  additionalProperties: false
}

export interface UpdateUser {
  username?: string
}

export const UpdateUser = {
  title: 'UpdateUser',
  type: 'object',
  properties: {
    username: properties.username
  },
  additionalProperties: false
}

export interface UpdateUserPassword {
  password: string,
  oldPassword: string
}

export const UpdateUserPassword = {
  title: 'UpdateUserPassword',
  type: 'object',
  properties: {
    password: properties.password,
    oldPassword: {
      type: 'string'
    }
  },
  additionalProperties: false,
  required: ['password', 'oldPassword'],
  errorMessage: {
    required: {
      password: 'Enter your password',
      oldPassword: 'Enter your old password'
    }
  }
}