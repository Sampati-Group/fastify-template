import { FastifyMultipartOptions } from '@fastify/multipart';
import fs from 'fs';
import path from 'path';

export const multipartConfig: FastifyMultipartOptions = {
  limits: {
    fileSize: Number(process.env.FILE_UPLOAD_MAX_SIZE) || 10 * 1024 * 1024,
    files: Number(process.env.MAX_FILES) || 1,
  },
  onFile: (part) => {
    const uploadDir = process.env.FILE_UPLOAD_PATH || path.join(__dirname, '../../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
  }
};