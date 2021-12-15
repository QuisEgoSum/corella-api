import {AccessError, AuthorizationError} from 'core/error'


export const UserAuthorizationError = AuthorizationError.extends(
  {},
  {
    code: 2000,
    error: 'UserAuthorizationError'
  }
)

export const UserRightsError = AccessError.extends(
  {},
  {
    error: 'UserRightsError',
    code: 2001,
    message: 'You don\'t have enough permissions to perform this action'
  }
)