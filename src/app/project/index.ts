import {ProjectModel} from './ProjectModel'
import {ProjectRepository} from './ProjectRepository'
import {ProjectService} from './ProjectService'
import {initRole, Role as RolePkg} from './packages/role'
import {initTask, Task as TaskPkg} from './packages/task'
import {initMember, Member as MemberPkg} from './packages/member'
import {FastifyInstance} from 'fastify'
import {routes} from './routes'
import * as schemas from './schemas'
import * as errors from './project-error'
import type {User as UserPkg} from '@app/user'
import {addEventsListeners} from './project-events-listeners'


export class Project {
  private readonly service: ProjectService
  private readonly Task: TaskPkg
  private Role: RolePkg
  private Member: MemberPkg
  
  constructor(
    projectService: ProjectService,
    Task: TaskPkg,
    Role: RolePkg,
    Member: MemberPkg
  ) {
    this.service = projectService
    this.Task = Task
    this.Role = Role
    this.Member = Member

    this.router = this.router.bind(this)
  }

  getErrors(): typeof import('./project-error') {
    return errors
  }

  async router(fastify: FastifyInstance) {
    await routes(fastify, {projectService: this.service, projectSchemas: schemas})
    await this.Role.router(fastify)
    await this.Member.router(fastify)
  }
}


export async function initProject(User: UserPkg) {
  const Role = await initRole()
  const Task = await initTask()
  const Member = await initMember(User, Role)

  const service = new ProjectService(
    new ProjectRepository(ProjectModel),
    Role.service,
    Task.Counter.service,
    Member.service
  )

  await addEventsListeners(service, Member.service, Member.events, Role.events)

  return new Project(
    service,
    Task,
    Role,
    Member
  )
}