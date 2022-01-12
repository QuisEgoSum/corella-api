import type {BaseRepository} from '../repository'
import {FilterQuery} from 'mongoose'


export interface IBaseService<T, R extends BaseRepository<T>> {
  repository: R

  /**
   * @throws {EntityExistsError}
   */
  create(entity: Partial<T>): Promise<T>

  /**
   * @throws {EntityNotExistsError}
   */
  findById(id: string): Promise<T>

  /**
   * @throws {EntityExistsError | EntityNotExistsError}
   */
  findByIdAndUpdate(id: string, update: Partial<T>): Promise<T>

  /**
   * @throws {EntityNotExistsError}
   */
  findByIdAndDelete(id: string): Promise<T>

  /**
   * @throws {EntityNotExistsError}
   */
  deleteById(id: string): Promise<void>

  deleteOne(query: FilterQuery<T>): Promise<void>
}