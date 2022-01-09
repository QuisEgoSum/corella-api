import {SessionModel} from './SessionModel'
import {SessionRepository} from './SessionRepository'
import {SessionService} from './SessionService'


export const service = new SessionService(new SessionRepository(SessionModel))