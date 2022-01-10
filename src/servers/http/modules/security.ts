import {FastifyRequest, RouteOptions} from 'fastify'
import type {UserSession} from 'app/user/packages/session/SessionModel'
import type {UserRole} from 'app/user/UserRole'
import type {UserService} from 'app/user/UserService'


declare module 'fastify' {
  interface FastifyRequest {
    session: UserSession
  }
  interface RouteOptions {
    security?: {
      auth?: boolean,
      admin?: boolean
    }
  }
}

export interface CreateSecurityHookOptions {
  userService: UserService,
  UserRole: typeof UserRole,
  userError: typeof import('app/user/user-error')
}


export async function createSecurityHook({userService, UserRole, userError}: CreateSecurityHookOptions) {
  async function auth(request: FastifyRequest) {
    request.session = await userService.authorization(request.cookies.sessionId)
  }

  async function isAdmin(request: FastifyRequest) {
    if (request.session?.userRole !== UserRole.ADMIN) {
      throw new userError.UserRightsError()
    }
  }

  return function securityHook(routeOptions: RouteOptions) {
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
}