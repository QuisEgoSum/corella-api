import {FastifyInstance} from 'fastify'


class Settings {
  constructor() {
  }

  async router(fastify: FastifyInstance) {

  }
}


export async function initSettings(): Promise<Settings> {
  return new Settings()
}