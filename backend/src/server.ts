import Fastify from 'fastify'
import cors from '@fastify/cors'
import { getDay } from './routes/getDay'
import { toggleHabit } from './routes/toggleHabit'
import { createHabit } from './routes/createHabit'
import { summaryCompletedHabits } from './routes/summary'

async function start() {
  const fastify = Fastify({
    logger: true
  })

  await fastify.register(cors)

  await fastify.register(getDay)
  await fastify.register(toggleHabit)
  await fastify.register(createHabit)
  await fastify.register(summaryCompletedHabits)

  await fastify.listen({
    port: 3333
  })
}

start()
