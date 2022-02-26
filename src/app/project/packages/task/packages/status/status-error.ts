import {EntityNotExistsError} from '@error'


export const TaskStatusNotExistsError = EntityNotExistsError.extends(
  {},
  {
    error: 'TaskStatusNotExistsError',
    code: 3600,
    message: 'Task status does not exist'
  }
)