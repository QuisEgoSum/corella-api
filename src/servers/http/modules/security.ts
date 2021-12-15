import {FastifyRequest, RouteOptions} from 'fastify'
import {service, UserRole, error as userError} from 'app/user'
import {Types} from 'mongoose'


declare module 'fastify' {
  interface FastifyRequest {
    session?: {
      sessionId: string,
      userId: Types.ObjectId,
      userRole: UserRole
    }
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

export function addSecurityHook(routeOptions: RouteOptions) {
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