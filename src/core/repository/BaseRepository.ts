import mongoose, {
  FilterQuery,
  QueryOptions,
  UpdateQuery,
  UpdateWithAggregationPipeline,
  UpdateWriteOpResult
} from 'mongoose'
import BaseRepositoryError from './BaseRepositoryError'
import IBaseRepository from './IBaseRepository'
import type {MongoServerError} from './MongooseError'


type Optional<T> = {
  [P in keyof T]?: T[P]
}

type Selected<T extends S, S> = {
  [P in keyof S]: T[P]
}


export default class BaseRepository<T> implements IBaseRepository<T> {
  private Model: mongoose.Model<T>

  constructor(Model: mongoose.Model<T>) {
    this.Model = Model
  }

  private errorHandler(error: Error | MongoServerError) {
    // @ts-ignore - Because mongoose does not export the class MongoServerError
    if (error.name === 'MongoServerError' && error.code === 11000) {
      // @ts-ignore - Because mongoose does not export the class MongoServerError
      throw BaseRepositoryError.UniqueKeyError.fromMongooseError(error)
    } else {
      throw error
    }
  }

  async create(entity: Optional<T>): Promise<T> {
    // @ts-ignore
    return new this.Model(entity)
      .save()
      .then(entity => entity.toJSON())
      .catch(error => this.errorHandler(error))
  }

  updateOne(filter?: FilterQuery<T>, update?: UpdateQuery<T> | UpdateWithAggregationPipeline, options?: QueryOptions | null): Promise<UpdateWriteOpResult> {
    return this.Model
      .updateOne(filter, update, options)
      .exec()
      .catch(error => this.errorHandler(error)) as unknown as Promise<UpdateWriteOpResult>
  }

  deleteOne(query: mongoose.FilterQuery<T>): Promise<boolean> {
    return this.Model.deleteOne(query)
      .exec()
      .then(result => !!result.deletedCount)
  }

  deleteById(id: string | mongoose.Types.ObjectId): Promise<boolean> {
    // @ts-ignore
    return this.Model
      .deleteOne({_id: new mongoose.Types.ObjectId(id)})
      .exec()
      .then(result => !!result.deletedCount)
  }

  find(): Promise<T[] | []> {
    return Promise.resolve([])
  }

  findOne(query: mongoose.FilterQuery<T>) {
    return this.Model
      .findOne(query)
      .lean()
      .exec() as unknown as Promise<T | null>
  }
}