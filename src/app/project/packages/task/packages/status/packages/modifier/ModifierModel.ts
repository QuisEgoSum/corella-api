import {model, Schema, Types} from 'mongoose'


export enum StatusModifier {
  DEFAULT = 'DEFAULT',
  CLOSE = 'CLOSE',
  DONE = 'DONE'
}


export interface IModifier {
  _id: Types.ObjectId,
  statuses: {
    _id: Types.ObjectId,
    modifier: StatusModifier
  }[],
  updatedAt: number
}


const ModifierSchema = new Schema<IModifier>(
  {
    _id: {
      type: Schema.Types.ObjectId,
      ref: 'Project'
    },
    statuses: [
      {
        _id: {
          type: Schema.Types.ObjectId,
          ref: 'ProjectTaskStatus'
        },
        modifier: {
          type: String,
          enum: Object.values(StatusModifier)
        }
      }
    ],
    updatedAt: Number
  },
  {
    versionKey: false,
    timestamps: {
      createdAt: false,
      updatedAt: true
    }
  }
)


export const ModifierModel = model<IModifier>('ProjectTaskStatusModifier', ModifierSchema, 'project_task_status_modifier')