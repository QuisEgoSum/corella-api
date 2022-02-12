import {InvalidJsonStructureError, JsonSchemaValidationErrors, NoDataForUpdatingError} from '@error'
import {Schema} from 'openapi-error'
import {UserAuthorizationError, UserRightsError} from 'app/user/user-error'


export class MessageResponse {
  private type: string
  private properties: Record<any, any>
  private additionalProperties: boolean
  private required: string[]
  private description: string
  constructor(...messages: string[]) {
    this.description = 'Response message'
    this.type = 'object'
    this.properties = {
      message: {
        type: 'string'
      }
    }
    this.additionalProperties = false
    this.required = ['message']
    if (messages.length > 1) {
      this.properties.message.enum = messages
      this.properties.message.example = messages[0]
    } else {
      this.properties.message.default = messages[0]
      this.properties.message.example = messages[0]
    }
  }
}

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

/**
 * @deprecated
 */
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

export class Forbidden extends ErrorResponse {
  constructor(...oneOfSchemas: Schema[]) {
    super('Forbidden', ...oneOfSchemas)
  }
}

export class UserForbidden extends Forbidden {
  constructor(...oneOfSchemas: Schema[]) {
    super(UserRightsError.schema(), ...oneOfSchemas)
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

  paramsErrors() {
    this.addSchema(JsonSchemaValidationErrors.schema())
    return this
  }
}

export class NotFound extends ErrorResponse {
  constructor(...oneOfSchemas: Schema[]) {
    super('Not Found', ...oneOfSchemas)
  }
}

export class DataList {
  private title: string
  private description: string
  private properties: Record<string, any>
  private required: string[]
  private additionalProperties: boolean
  private example?: unknown
  constructor(schema: Record<any, any>) {
    this.title = 'DataList'
    this.description = 'Data list'
    this.properties = {
      total: {
        description: 'Total data for queries',
        type: 'integer'
      },
      pages: {
        description: 'Total pages for queries',
        type: 'integer'
      },
      data: {
        type: 'array',
        items: schema
      }
    }
    this.required = ['total', 'pages', 'data']
    this.additionalProperties = false
    if (schema.examples) {
      this.properties.data.example = schema.examples
    }
  }
}