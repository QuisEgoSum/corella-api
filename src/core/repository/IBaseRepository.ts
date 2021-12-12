import {FilterQuery, Types} from 'mongoose'


export default interface IBaseRepository<T> {

  /**
   * @throws
   */
  create(entity: T): Promise<T>

  findOne(query: FilterQuery<T>): Promise<T | null>

  find(): Promise<T[] | []>

  deleteOne(query: FilterQuery<T>): Promise<boolean>

  deleteById(id: string | Types.ObjectId): Promise<boolean>
}