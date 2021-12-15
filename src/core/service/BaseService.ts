import {BaseRepository, BaseRepositoryError} from 'core/repository'
import {EntityExistsError, EntityNotExistsError} from 'core/error'
import {DataList} from 'core/data'
import type {Optional, PageOptions} from 'core/repository/IBaseRepository'
import type {IBaseService} from './IBaseService'


export class BaseService<T, R extends BaseRepository<T>> implements IBaseService<T, R> {

  public Error: {
    EntityExistsError: typeof EntityExistsError,
    EntityNotExistsError: typeof EntityNotExistsError
  }

  public repository: R

  constructor(repository: R) {
    this.repository = repository
    this.Error = {
      EntityExistsError: EntityExistsError,
      EntityNotExistsError: EntityNotExistsError
    }
  }

  private errorHandler(error: Error | BaseRepositoryError): T {
    if (error instanceof BaseRepositoryError.UniqueKeyError) {
      throw new this.Error.EntityExistsError(error)
    } else {
      throw error
    }
  }

  async create(entity: Optional<T>): Promise<T> {
    return this.repository.create(entity)
      .catch(error => this.errorHandler(error))
  }

  async deleteById(id: string): Promise<void> {
    const isDeleted = await this.repository.deleteById(id)

    if (!isDeleted) {
      throw new this.Error.EntityNotExistsError()
    }
  }

  async findById(id: string): Promise<T> {
    const document = await this.repository.findById(id)

    if (document === null) {
      throw new this.Error.EntityNotExistsError()
    }

    return document
  }

  async findByIdAndDelete(id: string): Promise<T> {
    const document = await this.repository.findByIdAndDelete(id)

    if (document === null) {
      throw new this.Error.EntityNotExistsError()
    }

    return document
  }

  async findByIdAndUpdate(id: string, update: Optional<T>): Promise<T> {
    const document = await this.repository.findByIdAndUpdate(id, update)

    if (document === null) {
      throw new this.Error.EntityNotExistsError()
    }

    return document
  }

  findPage(page: PageOptions): Promise<DataList<T>> {
    return this.repository.findPage(page)
  }
}