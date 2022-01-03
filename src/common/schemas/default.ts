import {InvalidJsonStructureError, JsonSchemaValidationErrors, NoDataForUpdatingError} from '@error'
import {Schema} from 'openapi-error'
import {UserAuthorizationError, UserRightsError} from 'app/user/user-error'


export class ErrorResponse {
  private description: string
  private type: string
  private additionalProperties: boolean
  private oneOf: any[]

  static ErrorResponseOne = class ErrorResponse {
    private title: string
    private type: string
    private properties: {error: Schema}
    private additionalProperties: boolean
    private required: string[]


    constructor(schema: Schema) {
      this.title = schema.title
      this.type = 'object'
      this.properties = {
        error: schema
      }
      this.additionalProperties = false
      this.required = ['error']
    }
  }

  constructor(description: string, ...oneOfSchemas: Schema[]) {
    this.type = 'object'
    this.description = description
    this.additionalProperties = true
    this.oneOf = []

    oneOfSchemas.map(schema => this.addSchema(schema))
  }

  addSchema(schema: Schema) {
    this.oneOf.push(new ErrorResponse.ErrorResponseOne(schema))
    return this
  }
}

export class BadRequestNoBody extends ErrorResponse {
  constructor(...oneOfSchemas: Schema[]) {
    super(
      'Bad request',
      JsonSchemaValidationErrors.schema(),
      ...oneOfSchemas
    )
  }
}

export class Unauthorized extends ErrorResponse {
  constructor() {
    super('Unauthorized', UserAuthorizationError.schema())
  }
}

export class UserForbidden extends ErrorResponse {
  constructor(...oneOfSchemas: Schema[]) {
    super('Forbidden', UserRightsError.schema(), ...oneOfSchemas)
  }
}

export class BadRequest extends ErrorResponse {
  constructor(...oneOfSchemas: Schema[]) {
    super('Bad request', ...oneOfSchemas)
  }

  bodyErrors() {
    this.addSchema(JsonSchemaValidationErrors.schema())
    this.addSchema(InvalidJsonStructureError.schema())
    return this
  }

  updateError() {
    this.addSchema(NoDataForUpdatingError.schema())
    return this
  }
}

export class NotFound extends ErrorResponse {
  constructor(...oneOfSchemas: Schema[]) {
    super('Not Found', ...oneOfSchemas)
  }
}