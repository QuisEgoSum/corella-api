import {EntityNotExistsError} from '@error'


export const ProjectNotExists = EntityNotExistsError.extends(
  {},
  {
    error: 'ProjectNotExists',
    message: 'Project not exists',
    code: 10000
  }
)