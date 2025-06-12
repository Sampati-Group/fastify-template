import 'dotenv/config';
import 'reflect-metadata';
import { createServer } from './server';
import sequelize from './database';
import pdfPlugin from './plugin/pdf.plugin';
import pdfRoutes from './routes/pdf.routes';
import emailPlugin from './plugin/email.plugin';
import mailRoutes from './routes/mail.routes';

(async () => {
  try {
    await sequelize.sync();
    const app = createServer();

    app.register(pdfPlugin);
    app.register(emailPlugin);
    
    // Register routes
    app.register(pdfRoutes, { prefix: '/api/pdf' });
    app.register(mailRoutes, { prefix: '/api/mail' });
    const port = Number(process.env.PORT) || 3000;
    
    await app.listen({ port });
    app.log.info(`Server running at ${app.server.address()}`);
  } catch (error) {
    console.error('Server startup error:', error);
    process.exit(1);
  }
})();