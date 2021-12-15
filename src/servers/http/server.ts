import {fastify} from 'fastify'
import fastifySwagger from 'fastify-swagger'
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
import {addSecurityHook} from './modules/security'


export function createHttpServer() {
  const server = fastify({
    trustProxy: true,
    logger: httpLogger,
    bodyLimit: 10737418240
  })

  server
    .addHook('onRoute', addSecurityHook)
    .setErrorHandler(errorHandler)
    .setNotFoundHandler(notFoundHandler)
    // @ts-ignore
    .setValidatorCompiler(({schema}) => ajv.compile(schema))
    .setSchemaErrorFormatter(schemaErrorFormatter)
    .register(fastifyCookie)
    .register(fastifySwagger, swagger)
    .register(fastifyStatic, {root: config.paths.shareStatic})
    .register(userRouter)
    .register(docsRouter)

  return server
}