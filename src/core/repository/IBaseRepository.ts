import {
  FilterQuery,
  QueryOptions,
  Types,
  UpdateQuery,
  UpdateWithAggregationPipeline,
  UpdateWriteOpResult
} from 'mongoose'


export default interface IBaseRepository<T> {

  /**
   * @throws {UniqueKeyError}
   */
  create(entity: T): Promise<T>

  findOne(query: FilterQuery<T>): Promise<T | null>

  updateOne(filter?: FilterQuery<T>, update?: UpdateQuery<T> | UpdateWithAggregationPipeline, options?: QueryOptions | null): Promise<UpdateWriteOpResult>

  find(): Promise<T[] | []>

  deleteOne(query: FilterQuery<T>): Promise<boolean>

  deleteById(id: string | Types.ObjectId): Promise<boolean>
}