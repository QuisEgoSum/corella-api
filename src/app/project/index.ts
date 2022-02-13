import {ProjectModel} from './ProjectModel'
import {ProjectRepository} from './ProjectRepository'
import {ProjectService} from './ProjectService'
import type {User} from '@app/user'
import {initRole, Role} from './packages/role'
import {initTask, Task} from './packages/task'
import {initMember, Member} from './packages/member'
import {initInvite, Invite} from '@app/project/packages/invite'
import {routes} from './routes'
import * as schemas from './schemas'
import * as error from './project-error'
import {addEventsListeners} from './project-events-listeners'
import type {FastifyInstance} from 'fastify'


class Project {
  private readonly service: ProjectService
  private readonly task: Task
  private readonly role: Role
  private readonly member: Member
  private readonly invite: Invite
  public readonly error: typeof error
  
  constructor(
    projectService: ProjectService,
    task: Task,
    role: Role,
    member: Member,
    invite: Invite
  ) {
    this.service = projectService
    this.task = task
    this.role = role
    this.member = member
    this.invite = invite
    this.error = error

    this.router = this.router.bind(this)
  }

  async router(fastify: FastifyInstance) {
    await routes(fastify, {projectService: this.service, projectSchemas: schemas})
    await this.role.router(fastify)
    await this.member.router(fastify)
    await this.invite.router(fastify)
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
    member.service
  )

  await addEventsListeners(service, member.service, member.events, role.events)

  return new Project(
    service,
    task,
    role,
    member,
    invite
  )
}

export type {
  Project
}

export {
  schemas,
  error
}