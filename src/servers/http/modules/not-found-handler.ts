import {RouteNotFound} from 'core/error'
import {FastifyReply, FastifyRequest} from 'fastify'


export async function notFoundHandler(request: FastifyRequest, reply: FastifyReply) {
  reply
    .code(404)
    .type('application/json')
    .send(new RouteNotFound({method: request.method, url: request.url}))
}