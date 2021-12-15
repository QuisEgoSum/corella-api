import {JsonSchemaValidationErrors} from '@error'
import {Schema} from 'openapi-error'
import {UserAuthorizationError} from '../../app/user/user-error'


export class BadRequestNoBody {
  private description: string
  private type: string
  private additionalProperties: boolean
  private oneOf: Partial<Schema>[]

  constructor(...oneOfSchemas: Partial<Schema>[]) {
    this.description = 'Bad request'
    this.type = 'object'
    this.additionalProperties = false
    this.oneOf = [
      ...oneOfSchemas,
      JsonSchemaValidationErrors.schema()
    ]
  }
}

export class UserUnauthorized {
  private description: string
  private type: string
  private additionalProperties: boolean
  private properties: Record<string, any>
  private required: string[]

  constructor() {
    const schema = UserAuthorizationError.schema()

    this.description = 'Unauthorized'
    this.type = 'object'
    this.properties = schema.properties
    this.required = schema.required
    this.additionalProperties = false
  }
}