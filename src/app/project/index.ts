import {ProjectModel} from './ProjectModel'
import {ProjectRepository} from './ProjectRepository'
import {ProjectService} from './ProjectService'
import {RolePermission} from './packages/role/RolePermission'
import {initRole, Role as RolePkg} from './packages/role'
import {initTask, Task as TaskPkg} from './packages/task'
import {initMember, Member as MemberPkg} from './packages/member'
import {FastifyInstance} from 'fastify'
import {routes} from './routes'
import * as schemas from './schemas'
import type {User as UserPkg} from 'app/user'


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

  return new Project(
    service,
    Task,
    Role,
    Member
  )
}


export {
  RolePermission
}