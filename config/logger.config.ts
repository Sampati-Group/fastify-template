import path from 'path';
import fs from 'fs';
import { FastifyReply, FastifyRequest } from 'fastify';

const createLogDir = () => {
  const logDir = path.join(__dirname, '../logs');
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }
  return logDir;
};

export const loggerConfig = {
  level: 'info',
  serializers: {
    req: (request : FastifyRequest) => ({
      method: request.method,
      url: request.url,
      headers: request.headers,
      query: request.query,
      body: request.body
    }),
    res: (reply : FastifyReply) => ({
      statusCode: reply.statusCode,
      headers: reply.getHeaders(),
    })
  },
  transport: {
    targets: [
      {
        target: 'pino/file',
        options: { 
          destination: path.join(createLogDir(), `app-${new Date().toISOString().split('T')[0]}.log`),
          mkdir: true 
        },
        level: 'info'
      }
    ]
  }
};