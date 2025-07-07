import { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from 'fastify'
import { z, ZodError } from 'zod'

export const zodValidate = (schema: z.ZodSchema) => {
  return (
    request: FastifyRequest,
    reply: FastifyReply,
    done: HookHandlerDoneFunction
  ) => {
    try {
      // Parse và validate dữ liệu
      const parsedData = schema.parse(request.body)
      // Gán dữ liệu đã parse vào request.body
      request.body = parsedData
      done()
    } catch (error) {
      if (error instanceof ZodError) {
        throw error
      }
      throw new Error('Unexpected validation error')
    }
  }
}
