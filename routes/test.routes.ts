import { FastifyInstance } from 'fastify';
import { UserController } from '../controllers/UserController';

const userController = new UserController();

export default async function testRoutes(fastify: FastifyInstance) {
    fastify.get('/', userController.getUsers.bind(userController));
}