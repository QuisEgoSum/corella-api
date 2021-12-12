import {Document} from 'mongodb/src/bson'
import {ErrorDescription, MongoError} from 'mongodb/src/error'


/**
 * Because mongoose does not export the class
 */
export class MongoServerError extends MongoError {
  codeName?: string
  writeConcernError?: Document
  errInfo?: Document
  ok?: number

  [key: string]: never;

  constructor(message: ErrorDescription) {
    super(message.message || message.errmsg || message.$err || 'n/a')
    if (message.errorLabels) {
      this[kErrorLabels] = new Set(message.errorLabels)
    }

    for (const name in message) {
      if (name !== 'errorLabels' && name !== 'errmsg' && name !== 'message')
        this[name] = message[name]
    }
  }

  get name(): string {
    return 'MongoServerError'
  }
}