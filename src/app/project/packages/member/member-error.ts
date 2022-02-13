import {EntityExistsError, EntityNotExistsError, InternalError, InvalidDataError} from '@error'


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
  {
    properties: {
      message: {
        type: 'string',
        enum: [
          'This user is not a member of the project',
          'There was no such participant in the project'
        ]
      }
    }
  },
  {
    error: 'MemberNotExistsError',
    code: 3101
  }
)

export const FailedAcceptInviteError = InternalError.extends(
  {},
  {
    code: 3102
  }
)

export const BlockingNonParticipantError = InvalidDataError.extends(
  {},
  {
    error: 'BlockingNonParticipantError',
    code: 3103,
    message: 'You can only block an active participant of the project'
  }
)