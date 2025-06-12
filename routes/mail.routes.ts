import { FastifyPluginAsync } from 'fastify';
import { Type } from '@fastify/type-provider-typebox';

const mailRoutes: FastifyPluginAsync = async (fastify) => {
    fastify.get('/', {
        schema: {
            response: {
                200: Type.Object({
                    message: Type.String(),
                    success: Type.Boolean()
                })
            }
        }
    }, async (request, reply) => {
        try {
            await fastify.emailService.sendMail({
                to: 'nagardharmik512@gmail.com',
                subject: 'Test Email',
                templateName: 'mailTemplate.html',
                data: { name: 'User' }
            });

            return {
                message: 'Email sent successfully',
                success: true
            };
        } catch (error) {
            console.log('Email sending failed:', error);
            fastify.log.error('Email sending failed:', error);
            reply.status(500);
            return {
                message: 'Failed to send email',
                success: false
            };
        }
    });
};

export default mailRoutes;