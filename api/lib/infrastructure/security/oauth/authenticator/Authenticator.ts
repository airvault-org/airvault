import { FastifyReply, FastifyRequest } from 'fastify';

interface Authenticator {

  token(request: FastifyRequest, reply: FastifyReply): any;

  authenticate(request: FastifyRequest, reply: FastifyReply): any;
}

export { Authenticator };
