import * as properties from './properties'
import * as entities from './entities'

export {
  properties,
  entities
}

export interface UserCredentials {
  login: string,
  password: string
}