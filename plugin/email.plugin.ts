import fp from 'fastify-plugin';
import { EmailService } from '../service/mail.service';

declare module 'fastify' {
  interface FastifyInstance {
    emailService: EmailService;
  }
}

export default fp(async (fastify) => {
  fastify.decorate('emailService', new EmailService());
}, {
  name: 'mail-plugin'
});
