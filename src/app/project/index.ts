import {ProjectModel} from './ProjectModel'
import {ProjectRepository} from './ProjectRepository'
import {ProjectService} from './ProjectService'
import type {User} from '@app/user'
import {initRole, Role} from './packages/role'
import {initTask, Task} from './packages/task'
import {initMember, Member} from './packages/member'
import {initInvite, Invite} from '@app/project/packages/invite'
import {initSecurity, Security, SecurityPermission} from '@app/project/packages/security'
import {routes} from './routes'
import * as schemas from './schemas'
import * as error from './project-error'
import {addEventsListeners} from './project-events-listeners'
import type {FastifyInstance} from 'fastify'
import {Types} from 'mongoose'


class Project {
  private readonly service: ProjectService
  private readonly task: Task
  private readonly role: Role
  private readonly member: Member
  private readonly invite: Invite
  private readonly security: Security
  public readonly error: typeof error
  public readonly schemas: typeof schemas

  constructor(
    projectService: ProjectService,
    task: Task,
    role: Role,
    member: Member,
    invite: Invite,
    security: Security
  ) {
    this.service = projectService
    this.task = task
    this.role = role
    this.member = member
    this.invite = invite
    this.security = security
    this.error = error
    this.schemas = schemas

    this.router = this.router.bind(this)
  }

  async router(fastify: FastifyInstance) {
    await Promise.all([
      routes(fastify, {projectService: this.service, projectSchemas: schemas}),
      this.role.router(fastify),
      this.member.router(fastify),
      this.invite.router(fastify),
      this.task.router(fastify)
    ])
  }

  async verifyAccess(projectId: string | Types.ObjectId, userId: string | Types.ObjectId, permission: SecurityPermission) {
    return await this.security.service.verifyAccess(projectId, userId, permission)
  }
}


export async function initProject(userApp: User) {
  const role = await initRole()
  const task = await initTask()
  const member = await initMember(role)
  const invite = await initInvite(userApp, member.service, role.service)

  const service = new ProjectService(
    new ProjectRepository(ProjectModel),
    role.service,
    task.counter.service,
    task.status.service,
    member.service
  )

  const security = await initSecurity(service)

  await addEventsListeners(service, member.service, member.events, role.events)

  return new Project(
    service,
    task,
    role,
    member,
    invite,
    security
  )
}

export type {
  Project
}

export {
  schemas,
  error
}