import {AccessError, InternalError} from '@error'


export const NotMemberOfProjectError = AccessError.extends(
  {},
  {
    error: 'NotMemberOfProjectError',
    code: 3400,
    message: 'You are not a member of the project'
  }
)

export const RoleNotFoundError = InternalError.extends(
  {},
  {
    code: 3401
  }
)

export const InsufficientPermissionsInProjectError = AccessError.extends(
  {},
  {
    error: 'InsufficientPermissionsInProjectError',
    code: 3402,
    message: 'You don\'t have enough rights to perform this action'
  }
)