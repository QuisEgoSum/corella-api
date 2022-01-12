import {EntityExistsError, EntityNotExistsError} from '@error'


export const MemberExistsError = EntityExistsError.extends(
  {},
  {
    error: 'MemberExistsError',
    code: 3100,
    message: 'This user is already a member of the project'
  }
)

export const MemberNotExistsError = EntityNotExistsError.extends(
  {},
  {
    error: 'MemberNotExistsError',
    code: 3101,
    message: 'This user is not a member of the project'
  }
)