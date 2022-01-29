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
    message: 'Have you already accepted this invitation',
    code: 3301
  }
)

export const InviteDeclinedError = InvalidDataError.extends(
  {},
  {
    error: 'InviteDeclinedError',
    message: 'You have already declined this invitation',
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

export const UnknownInviteStatusError = InternalError.extends(
  {},
  {
    code: 3304
  }
)

export const SomeoneElseInvitationError = AccessError.extends(
  {},
  {
    error: 'SomeoneElseInvitationError',
    message: 'You can\'t accept someone else\'s invitation',
    code: 3305
  }
)