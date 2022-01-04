import {ajv} from 'core/validation'
import type {ConfigEntity} from './ConfigEntity'


const schemaPkgJson = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    version: {
      type: 'string'
    }
  },
  additionalProperties: false,
  required: ['name', 'version']
}

const schemaServer = {
  type: 'object',
  properties: {
    http: {
      type: 'object',
      properties: {
        protocol: {
          type: 'string',
          enum: ['http', 'https']
        },
        address: {
          type: 'string'
        },
        host: {
          type: 'string'
        },
        port: {
          type: 'integer',
          minimum: 1,
          maximum: 65353
        }
      },
      additionalProperties: false,
      required: ['protocol', 'address', 'host', 'port']
    }
  },
  additionalProperties: false,
  required: ['http']
}

const schemaLogger = {
  type: 'object',
  properties: {
    pretty: {
      type: 'boolean'
    },
    isoTime: {
      type: 'boolean'
    },
    time: {
      type: 'boolean'
    },
    level: {
      type: 'string',
      enum: ['info', 'debug']
    }
  },
  additionalProperties: false,
  required: ['pretty', 'isoTime', 'time', 'level']
}

const schemaUser = {
  type: 'object',
  properties: {
    session: {
      type: 'object',
      properties: {
        maximum: {
          type: 'integer',
          minimum: 1,
          maximum: Number.MAX_SAFE_INTEGER
        },
        cookie: {
          type: 'object',
          properties: {
            path: {
              type: 'string'
            },
            domain: {
              type: 'string'
            },
            sameSite: {
              type: ['string', 'boolean']
            },
            maxAge: {
              type: 'integer'
            }
          },
          additionalProperties: false,
          required: []
        }
      },
      additionalProperties: false,
      required: ['maximum']
    },
    superadmin: {
      type: 'object',
      properties: {
        password: {
          type: 'string',
          minLength: 6,
          maxLength: 1024
        },
        username: {
          type: 'string',
          minLength: 1,
          maxLength: 24
        },
        email: {
          type: 'string',
          emailValidator: true
        }
      },
      additionalProperties: false,
      required: ['password', 'username', 'email']
    }
  },
  additionalProperties: false,
  required: ['session', 'superadmin']
}

const schema = {
  type: 'object',
  properties: {
    production: {
      type: 'boolean'
    },
    pkgJson: schemaPkgJson,
    server: schemaServer,
    logger: schemaLogger
  },
  additionalProperties: false,
  required: []
}


export function validation(config: ConfigEntity) {
  const validate = ajv.compile(schema)

  validate(config)

  if (validate.errors) {
    throw validate.errors
  }
}