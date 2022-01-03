import {FastifyRequest, RouteOptions} from 'fastify'
import {service, UserRole, error as userError} from 'app/user'
import type {AuthorizedUser} from 'app/user'


declare module 'fastify' {
  interface FastifyRequest {
    session?: AuthorizedUser
  }
  interface RouteOptions {
    security?: {
      auth?: boolean,
      admin?: boolean
    }
  }
}


async function auth(request: FastifyRequest) {
  request.session = await service.authorization(request.cookies.sessionId)
}

async function isAdmin(request: FastifyRequest) {
  if (request.session?.userRole !== UserRole.ADMIN) {
    throw new userError.UserRightsError()
  }
}

export function securityHook(routeOptions: RouteOptions) {
  if (!routeOptions.onRequest) {
    routeOptions.onRequest = []
  } else if (typeof routeOptions.onRequest === 'function') {
    routeOptions.onRequest = [routeOptions.onRequest]
  }
  if (routeOptions.security?.admin) {
    routeOptions.onRequest.unshift(isAdmin)
  }
  if (routeOptions.security?.auth) {
    routeOptions.onRequest.unshift(auth)
  }
}