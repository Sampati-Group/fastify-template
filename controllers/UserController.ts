import { FastifyRequest, FastifyReply } from 'fastify';
import { User } from '../models/User';

export class UserController {
  async getUsers(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const users = await User.findAll();
      reply.send(users);
    } catch (error) {
      reply.status(500).send({ error: 'Failed to fetch users' });
    }
  }
}