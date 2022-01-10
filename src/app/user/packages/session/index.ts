import {SessionModel} from './SessionModel'
import {SessionRepository} from './SessionRepository'
import {SessionService} from './SessionService'


export interface Session {
  service: SessionService
}

export async function initSession(): Promise<Session> {
  return {
    service: new SessionService(new SessionRepository(SessionModel))
  }
}