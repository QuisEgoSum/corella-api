import {AccessError, EntityNotExistsError} from '@error'


export const RoleNotExistsError = EntityNotExistsError.extends(
  {},
  {
    error: 'RoleNotExistsError',
    code: 3200,
    message: 'Role not exists'
  }
)

export const UnableUpdateRoleError = AccessError.extends(
  {},
  {
    error: 'UnableUpdateRoleError',
    message: 'Unable to update this role',
    code: 3201
  }
)

export const UnableDeleteRoleError = AccessError.extends(
  {},
  {
    error: 'UnableDeleteRoleError',
    message: 'Unable to delete this role',
    code: 3201
  }
)