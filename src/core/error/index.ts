import OpenapiError from 'openapi-error'


export const EntityNotExistsError = OpenapiError.compile(
  {
    httpCode: 404
  },
    {
      error: 'EntityNotExists',
      message: 'Entity not exists',
      code: 1000
    }
)

export const JsonSchemaValidationErrors = OpenapiError.compile(
  {
    httpCode: 400,
    properties: {
      errors: {
        type: 'array',
        items: {
          title: 'JsonSchemaValidationError',
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'Invalid JSON property'
            },
            code: {
              type: 'integer',
              default: 1002
            },
            error: {
              type: 'string',
              default: 'Json'
            },
            in: {
              type: 'string',
              example: 'body',
              enum: ['body', 'params', 'querystring']
            },
            keyword: {
              type: 'string',
              example: 'type',
              enum: ["type", "minLength", "maxLength", "minimum", "maximum", "regex", "pattern"]
            },
            schemaPath: {
              type: 'string',
              example: '#/properties/name/minLength'
            },
            dataPath: {
              type: 'string',
              example: '/name'
            },
            details: {
              type: 'object',
              oneOf: [
                {
                  title: 'Minimum example',
                  type: 'object',
                  properties: {
                    limit: {
                      type: 'integer',
                      example: 1
                    }
                  },
                  additionalProperties: false
                },
                {
                  title: 'Required property example',
                  type: 'object',
                  properties: {
                    missingProperty: {
                      type: 'string',
                      example: 'name'
                    }
                  },
                  additionalProperties: false
                }
              ]
            }
          },
          additionalProperties: false,
          required: ['message', 'code', 'error', 'in']
        }
      }
    }
  },
    {
      error: 'JsonSchemaValidationErrors',
      message: 'Not valid data',
      code: 1001
    }
)

export const InvalidDataError = OpenapiError.compile(
  {
    httpCode: 400
  },
    {
      error: 'InvalidDataError',
      message: 'Invalid data',
      code: 1003
    }
)

export const AccessError = OpenapiError.compile(
  {
    httpCode: 403
  },
    {
      error: 'AccessError',
      message: 'Not enough rights to perform this action',
      code: 1004
    }
)

export const AuthorizationError = OpenapiError.compile(
  {
    httpCode: 401
  },
    {
      error: 'AuthorizationError',
      message: 'You are not logged in',
      code: 1005
    }
)

export const UnprocessableEntityError = OpenapiError.compile(
  {
    httpCode: 422
  },
    {
      error: 'UnprocessableEntityError',
      message: 'Unprocessable Entity',
      code: 1006
    }
)

export const UniqueKeyError = OpenapiError.compile(
  {
    httpCode: 400,
    properties: {
      key: {
        type: 'string',
        example: 'username'
      },
      value: {
        type: 'string',
        example: 'admin'
      }
    },
    required: ['key', 'value']
  },
    {
      error: 'UniqueKeyError',
      message: 'Unique key error',
      code: 1007
    }
)

export const EntityExistsError = UniqueKeyError.extends(
  {},
  {
    error: 'EntityExistsError',
    message: 'Entity exists',
    code: 1008
  }
)

export const NoDataForUpdatingError = InvalidDataError.extends(
  {},
  {
    error: 'NoDataForUpdatingError',
    message: 'There is no data for updating',
    code: 1009
  }
)

export const InternalError = OpenapiError.compile(
  {
    httpCode: 500
  },
  {
    error: 'InternalError',
    message: 'Internal Server Error',
    code: 1010
  }
)

export const TooEarlyError = OpenapiError.compile(
  {
    httpCode: 425
  },
  {
    error: 'TooEarlyError',
    message: 'Too early',
    code: 1011
  }
)

export const InvalidJSONStructureError = InvalidDataError.extends(
  {
    properties: {
      position: {
        type: 'integer'
      }
    }
  },
  {
    error: 'InvalidJSONStructureError',
    message: 'Invalid JSON structure',
    code: 1012
  }
)

export const WaitingTimeExceededError = InternalError.extends(
  {},
  {
    error: 'WaitingTimeExceededError',
    message: 'Waiting time exceeded',
    code: 1013
  }
)