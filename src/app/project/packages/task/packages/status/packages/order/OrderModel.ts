import {model, Schema, Types} from 'mongoose'


export interface IOrder {
  _id: Types.ObjectId,
  statuses: Types.ObjectId[],
  createdAt: number,
  updatedAt: number
}


const OrderSchema = new Schema<IOrder>(
  {
    _id: {
      type: Schema.Types.ObjectId,
      ref: 'Project'
    },
    statuses: [
      {
        type: Schema.Types.ObjectId,
        ref: 'ProjectTaskStatus'
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


export const OrderModel = model<IOrder>('ProjectTaskStatusOrder', OrderSchema, 'project_task_status_order')