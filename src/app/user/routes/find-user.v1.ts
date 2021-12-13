import type {FastifyInstance} from 'fastify'
import type {UserService} from 'app/user/UserService'


interface FindUserV1Request {
  Params: {
    userId: string
  }
}

export async function findUserV1(fastify: FastifyInstance, service: UserService) {
  return fastify
    .route<FindUserV1Request>(
      {
        version: 'v1',
        url: '/user/:userId',
        method: 'GET',
        schema: {
          summary: 'Get user by id',
          tags: ['User']
        },
        config: {
          // TODO: Added route hook for adding security
          security: {
            auth: true,
            admin: true
          }
        },
        handler: async function(request, reply) {
          const user = await service.findById(request.params.userId)

          reply
            .code(200)
            .type('application/json')
            .send(user)
        }
      }
    )
}