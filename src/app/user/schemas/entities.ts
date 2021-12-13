import {_id} from './properties'


export const UserBase = {
  title: 'UserBase',
  type: 'object',
  properties: {
    _id: _id
  },
  additionalProperties: false,
  required: ['_id']
}