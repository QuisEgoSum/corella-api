import mongoose from 'mongoose'
import type {
  FilterQuery,
  QueryOptions,
  UpdateQuery,
  UpdateWithAggregationPipeline,
  UpdateWriteOpResult
} from 'mongoose'
import BaseRepositoryError from './BaseRepositoryError'
import IBaseRepository from './IBaseRepository'
import type {MongoServerError} from './MongooseError'
import type {Optional} from './IBaseRepository'


export default class BaseRepository<T> implements IBaseRepository<T> {
  private Model: mongoose.Model<T>

  constructor(Model: mongoose.Model<T>) {
    this.Model = Model
  }

  static errorHandler(error: Error | MongoServerError) {
    // @ts-ignore - Because mongoose does not export the class MongoServerError
    if (error.name === 'MongoServerError' && error.code === 11000) {
      // @ts-ignore - Because mongoose does not export the class MongoServerError
      throw BaseRepositoryError.UniqueKeyError.fromMongooseError(error)
    } else {
      throw error
    }
  }

  async create(entity?: Optional<T>): Promise<T> {
    // @ts-ignore
    return new this.Model(entity)
      .save()
      .then(entity => entity.toJSON())
      .catch(error => BaseRepository.errorHandler(error))
  }

  updateOne(filter?: FilterQuery<T>, update?: UpdateQuery<T> | UpdateWithAggregationPipeline, options?: QueryOptions | null): Promise<UpdateWriteOpResult> {
    return this.Model
      .updateOne(filter, update, options)
      .exec()
      .catch(error => BaseRepository.errorHandler(error)) as unknown as Promise<UpdateWriteOpResult>
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
    return this.Model
      .find()
      .lean()
      .exec() as unknown as Promise<T[] | []>
  }

  findOne(query: mongoose.FilterQuery<T>, projection?: unknown | null, options?: QueryOptions | null,) {
    return this.Model
      .findOne(query, projection, options)
      .lean()
      .exec() as unknown as Promise<T | null>
  }
}