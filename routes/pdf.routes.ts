import { FastifyPluginAsync } from 'fastify';

const pdfRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get('/simple-pdf', async (request, reply) => {
    const pdf = await fastify.pdfService.generateSimplePdf();
    
    reply
      .header('Content-Type', 'application/pdf')
      .header('Content-Disposition', 'attachment; filename=simple.pdf')
      .send(pdf);
  });

  fastify.get('/custom-pdf', async (request, reply) => {
    const { content = 'Default PDF content' } = request.query as { content?: string };
    const pdf = await fastify.pdfService.generatePdfWithContent(content);
    
    reply
      .header('Content-Type', 'application/pdf')
      .header('Content-Disposition', 'inline; filename=custom.pdf')
      .send(pdf);
  });
};

export default pdfRoutes;