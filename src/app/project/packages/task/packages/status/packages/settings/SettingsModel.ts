import {model, Schema, Types} from 'mongoose'


export enum StatusModifier {
  DEFAULT = 'DEFAULT',
  CLOSE = 'CLOSE',
  DONE = 'DONE'
}


export interface ISettings {
  _id: Types.ObjectId,
  columns: Types.ObjectId[],
  statuses: {
    statusId: Types.ObjectId,
    modifier: StatusModifier
  }[]
}

const SettingsSchema = new Schema(
  {
    columns: [
      {
        type: Schema.Types.ObjectId,
        ref: 'ProjectTaskStatus'
      }
    ],
    statuses: [
      {
        statusId: {
          type: Schema.Types.ObjectId,
          ref: 'ProjectTaskStatus'
        },
        modifier: {
          type: String,
          enum: Object.values(StatusModifier)
        }
      }
    ]
  },
  {
    versionKey: false,
    timestamps: false
  }
)


export const SettingsModel = model<ISettings>('ProjectTaskStatusSettings', SettingsSchema, 'project_task_status_settings')