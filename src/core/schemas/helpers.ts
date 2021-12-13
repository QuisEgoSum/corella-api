/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose'


interface SchemaHelperParams {
  null?: boolean,
  description?: string,
  example?: any,
  default?: any
}


class SchemaHelper {
  static type: string
  static description: string

  type: string | string[]
  description: string
  example: any
  default: any
  errorMessage: {[key in string]: any}

  constructor(params: SchemaHelperParams, constructor: typeof SchemaHelper) {
    this.type = params.null ? [constructor.type, 'null']: constructor.type
    this.description = params.description || constructor.description

    if ('example' in params) {
      this.example = params.example
    }
    if ('default' in params) {
      this.default = params.default
    }

    this.errorMessage = {}
  }
}

interface ObjectIdParams extends SchemaHelper {
  entity: string
}

export class ObjectId extends SchemaHelper {
  static type = 'string'
  static description = 'Unique id'
  static errorPattern = 'Invalid unique {{stub}} ID'

  pattern: string

  constructor(params: ObjectIdParams) {
    params.example = params.example || new mongoose.Types.ObjectId().toHexString()
    super(params, ObjectId)
    this.pattern = '^[0-9a-fA-F]{24}$'
    this.errorMessage.pattern = params.entity
      ? ObjectId.errorPattern.replace('{{stub}}', params.entity)
      : 'Invalid unique ID'
  }
}