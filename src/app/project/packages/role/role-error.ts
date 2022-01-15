import {EntityNotExistsError} from '@error'


export const RoleNotExistsError = EntityNotExistsError.extends(
  {},
  {
    error: 'RoleNotExistsError',
    code: 3200,
    message: 'Role not exists'
  }
)