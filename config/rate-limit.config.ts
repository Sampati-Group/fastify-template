import { FastifyRateLimitOptions } from '@fastify/rate-limit';

export const rateLimitConfig: FastifyRateLimitOptions = {
  max: Number(process.env.RATE_LIMIT_MAX),
  timeWindow: process.env.RATE_LIMIT_WINDOW
};