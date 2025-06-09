import { FastifyCorsOptions } from '@fastify/cors';

export const corsConfig: FastifyCorsOptions = {
  origin: process.env.CORS_ORIGIN || '*',
  methods: process.env.CORS_METHODS || 'GET,POST,PUT,DELETE',
  credentials: true
};