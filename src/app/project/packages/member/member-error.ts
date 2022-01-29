import {EntityExistsError, EntityNotExistsError, InternalError} from '@error'


export const MemberExistsError = EntityExistsError.extends(
  {
    properties: {
      message: {
        type: 'string',
        default: 'This user is already a member of the project',
        enum: [
          'This user is already a member of the project',
          'This user has already been invited to the project'
        ]
      }
    },
  },
  {
    error: 'MemberExistsError',
    code: 3100
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

export const FailedAcceptInvite = InternalError.extends(
  {},
  {
    code: 3102
  }
)