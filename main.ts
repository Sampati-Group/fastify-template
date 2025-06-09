import 'dotenv/config';
import 'reflect-metadata';
import { createServer } from './server';
import sequelize from './database';

(async () => {
  try {
    await sequelize.sync();
    const app = createServer();
    const port = Number(process.env.PORT) || 3000;
    
    await app.listen({ port });
    app.log.info(`Server running at ${app.server.address()}`);
  } catch (error) {
    console.error('Server startup error:', error);
    process.exit(1);
  }
})();