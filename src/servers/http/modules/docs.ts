import type {RouteOptions} from 'fastify'
import {ErrorResponse, UserForbidden, Unauthorized} from 'common/schemas/response'
import {RequestHandlingError} from '@error'


declare module 'fastify' {
  interface RouteOptions {
    schema?: {
      response?: Record<number, any>,
      security?: Array<{[key: string]: []}>,
      [key: string]: any
    }
  }
}


export function docsHook(routeOptions: RouteOptions) {
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
    routeOptions.schema.response[400] = {
      description: 'Bad request',
      type: 'object',
      additionalProperties: true,
      oneOf: []
    }
  } else if (!routeOptions.schema.response[400].oneOf) {
    routeOptions.schema.response[400].oneOf = []
  }

  routeOptions.schema.response[400].oneOf.push(new ErrorResponse.ErrorResponseOne(new RequestHandlingError().schema()))

  if (routeOptions.security?.auth) {
    routeOptions.schema.security.push({UserSession: []})
    routeOptions.schema.response[401] = new Unauthorized()
  }
  if (routeOptions.security?.admin) {
    routeOptions.schema.response[403] = new UserForbidden()
  }
}