import {Schema, model, Types} from 'mongoose'


export interface ICounter {
  _id: Types.ObjectId,
  count: number,
  projectId: Types.ObjectId
}


const CounterSchema = new Schema(
  {
    count: {
      type: Number,
      default: 0
    },
    projectId: {
      type: Types.ObjectId
    }
  },
  {
    timestamps: false,
    versionKey: false
  }
)
  .index({projectId: 1}, {unique: true})


export const CounterModel = model<ICounter>('ProjectTaskCounter', CounterSchema, 'project_task_counter')