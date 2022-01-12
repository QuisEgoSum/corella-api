import {_id, name, permissions, projectId, allowedEdit, createdAt, updatedAt} from './properties'
import {RolePermission} from '../RolePermission'


export const BaseRole = {
  title: 'BaseRole',
  type: 'object',
  properties: {
    _id: _id,
    name: name,
    permissions,
    projectId,
    allowedEdit,
    createdAt,
    updatedAt
  },
  additionalProperties: false,
  required: ['_id', 'name', 'permissions', 'projectId', 'allowedEdit', 'createdAt', 'updatedAt']
}

export interface CreateRole {
  name: string,
  permissions: RolePermission[]
}

export const CreateRole = {
  title: 'CreateRole',
  type: 'object',
  properties: {
    name,
    permissions
  },
  additionalProperties: false,
  required: ['name', 'permissions'],
  errorMessage: {
    required: {
      name: 'Enter role name',
      permissions: 'Select role permissions'
    }
  }
}