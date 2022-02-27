import {EntityNotExistsError} from '@error'


export const TaskNotExistsError = EntityNotExistsError.extends(
  {},
  {
    error: 'TaskNotExistsError',
    code: 10500,
    message: 'Task does not exist'
  }
)