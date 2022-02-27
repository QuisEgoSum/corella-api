import {EntityNotExistsError, InternalError} from '@error'


export const ProjectModifierOptionsNotExistsError = InternalError.extends(
  {},
  {
    code: 10800,
    message: 'Project task status modifier options does not exists'
  }
)

export const DefaultStatusNotExistError = EntityNotExistsError.extends(
  {
    properties: {
      message: {
        type: 'string',
        default: 'Default task status not found'
      }
    }
  },
  {
    error: 'DefaultStatusNotExistError',
    code: 10801
  }
)