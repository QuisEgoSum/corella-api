import type {RouteOptions} from 'fastify'
import type {Project} from '@app/project'
import {ErrorResponse, UserForbidden, Unauthorized, BadRequest, NotFound} from '@common/schemas/response'
import {RequestHandlingError} from '@error'


declare module 'fastify' {
  interface RouteOptions {
    schema?: {
      response?: {
        [200]?: any,
        [201]?: any,
        [400]?: ErrorResponse,
        [401]?: ErrorResponse,
        [403]?: ErrorResponse,
        [404]?: ErrorResponse,
        [key: string]: any
      },
      security?: Array<{[key: string]: []}>,
      params?: Record<string, any>,
      [key: string]: any
    }
  }
}


export interface CreateDocsHookOptions {
  project: Project
}


export function createDocsHook({project}: CreateDocsHookOptions) {
  return function docsHook(routeOptions: RouteOptions) {
    if (!routeOptions.schema) {
      routeOptions.schema = {}
    }
    if (!routeOptions.schema.security) {
      routeOptions.schema.security = []
    }
    if (!routeOptions.schema.response) {
      routeOptions.schema.response = {}
    }
    if (!routeOptions.schema.response[400]) {
      routeOptions.schema.response[400] = new BadRequest()
    }

    routeOptions.schema.response[400].addSchema(new RequestHandlingError().schema())

    if (routeOptions.security?.auth) {
      routeOptions.schema.security.push({UserSession: []})
      routeOptions.schema.response[401] = new Unauthorized()
    }
    if (routeOptions.security?.admin) {
      routeOptions.schema.response[403] = new UserForbidden()
    }
    if (routeOptions.schema.params && 'projectId' in routeOptions.schema.params) {
      if (!routeOptions.schema.response[404]) {
        routeOptions.schema.response[404] = new NotFound()
      }
      routeOptions.schema.response[404].addSchema(project.error.ProjectNotExists.schema())
    }
  }
}