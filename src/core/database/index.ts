import mongoose from 'mongoose'
import {config} from '@config'
import {logger} from '@logger'


export async function createConnection() {
  await mongoose.connect(config.database.credentials.connectionString, config.database.options)

  logger.info(`Open connection to database ${mongoose.connection.name}. Host: ${mongoose.connection.host}`)
}