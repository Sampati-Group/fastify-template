import fp from 'fastify-plugin';
import { PdfService } from '../service/pdf.service';

declare module 'fastify' {
  interface FastifyInstance {
    pdfService: PdfService;
  }
}

export default fp(async (fastify) => {
  fastify.decorate('pdfService', new PdfService());
}, {
  name: 'pdf-plugin'
});