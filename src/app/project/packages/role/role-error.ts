import {AccessError, EntityNotExistsError, InternalError} from '@error'


export const RoleNotExistsError = EntityNotExistsError.extends(
  {},
  {
    error: 'RoleNotExistsError',
    code: 10200,
    message: 'Role not exists'
  }
)

export const UnableUpdateRoleError = AccessError.extends(
  {},
  {
    error: 'UnableUpdateRoleError',
    message: 'Unable to update this role',
    code: 10201
  }
)

export const UnableDeleteRoleError = AccessError.extends(
  {},
  {
    error: 'UnableDeleteRoleError',
    message: 'Unable to delete this role',
    code: 10202
  }
)

export const DefaultProjectRoleNotExists = InternalError.extends(
  {},
  {
    code: 10203
  }
)