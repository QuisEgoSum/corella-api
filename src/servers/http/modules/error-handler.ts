import {BaseError} from 'openapi-error'
import {InternalError} from 'core/error'
import type {FastifyError, FastifyReply, FastifyRequest} from 'fastify'


const defaultResponse = new InternalError().toJSON()


export async function errorHandler(error: Error | FastifyError | BaseError, request: FastifyRequest, reply: FastifyReply) {
  let code = 500
  let payload: Record<string, any> | null = null

  if (error instanceof BaseError) {
    code = error.httpCode()
    payload = error.toJSON()
  }

  if (!reply.sent) {
    reply
      .code(code)
      .type('application/json')
      .send(payload || defaultResponse)
  }

  if (code >= 500) {
    request.log.error(error)
  }
}