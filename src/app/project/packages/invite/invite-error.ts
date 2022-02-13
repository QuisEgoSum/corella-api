import {AccessError, EntityNotExistsError, InternalError, InvalidDataError} from '@error'


export const InviteNotExistsError = EntityNotExistsError.extends(
  {},
  {
    message: 'Invite not exists',
    error: 'InviteNotExistsError',
    code: 3300
  }
)

export const InviteAcceptedError = InvalidDataError.extends(
  {},
  {
    error: 'InviteAcceptedError',
    message: 'This invitation has already been accepted',
    code: 3301
  }
)

export const InviteRejectedError = InvalidDataError.extends(
  {},
  {
    error: 'InviteRejectedError',
    message: 'This invitation has already been rejected',
    code: 3302
  }
)

export const InviteCancelledError = InvalidDataError.extends(
  {},
  {
    error: 'InviteCancelledError',
    message: 'This invitation has been cancelled',
    code: 3303
  }
)

export const UnknownFailedAcceptInviteError = InternalError.extends(
  {},
  {
    code: 3304
  }
)

export const SomeoneElseInvitationError = AccessError.extends(
  {
    properties: {
      message: {
        type: 'string',
        default: 'You can\'t accept someone else\'s invitation',
        enum: [
          'You can\'t accept someone else\'s invitation',
          'You can\'t reject someone else\'s invitation'
        ]
      }
    }
  },
  {
    error: 'SomeoneElseInvitationError',
    code: 3305
  }
)

export const UnknownFailedCancelInviteError = InternalError.extends(
  {},
  {
    code: 3306
  }
)

export const SomeoneElseProjectInvitationError = InvalidDataError.extends(
  {},
  {
    error: 'SomeoneElseProjectInvitationError',
    message: 'The invitation belongs to another project',
    code: 3307
  }
)

export const UnknownFailedRejectInviteError = InternalError.extends(
  {},
  {
    code: 3308
  }
)
