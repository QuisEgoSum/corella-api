import {fastify} from 'fastify'
import fastifySwagger from 'fastify-swagger'
import fastifyCors from 'fastify-cors'
import fastifyHelmet from 'fastify-helmet'
import fastifyStatic from 'fastify-static'
import fastifyCookie from 'fastify-cookie'
import {swagger} from 'app/docs'
import {router as userRouter} from 'app/user'
import {router as docsRouter} from 'app/docs'
import {config} from '@config'
import {httpLogger} from './modules/logger'
import {errorHandler} from './modules/error-handler'
import {notFoundHandler} from './modules/not-found-handler'
import {schemaErrorFormatter, ajv} from 'core/validation'
import {securityHook} from './modules/security'
import {docsHook} from './modules/docs'
import type {FastifyInstance} from 'fastify'


export function createHttpServer(server?: FastifyInstance) {
  server = server || fastify({
    trustProxy: true,
    logger: httpLogger,
    bodyLimit: 10737418240
  })
  return server
    .addHook('onRoute', securityHook)
    .addHook('onRoute', docsHook)
    .setErrorHandler(errorHandler)
    .setNotFoundHandler(notFoundHandler)
    // @ts-ignore
    .setValidatorCompiler(({schema}) => ajv.compile(schema))
    .setSchemaErrorFormatter(schemaErrorFormatter)
    .register(fastifyCors, {
      allowedHeaders: config.server.cors.allowedHeaders,
      origin: config.server.cors.allowedOrigins,
      methods: ['GET', 'PUT', 'POST', 'DELETE']
    })
    .register(fastifyHelmet)
    .register(fastifyCookie)
    .register(fastifySwagger, swagger)
    .register(fastifyStatic, {root: config.paths.shareStatic})
    .register(userRouter)
    .register(docsRouter)
}