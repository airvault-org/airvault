import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import findItems from '../../../application/queries/find-items';
import updateItem from '../../../application/commands/update-item';
import deleteItem from '../../../application/commands/delete-item';
import itemSerializer from '../../serializers/item-serializer';

export default async (fastify: FastifyInstance) => {

  fastify.route({
    method: 'GET',
    url: '/items',
    handler: async function (request: FastifyRequest<any>) {
      const accountId = request.user.id;
      const itemList = await findItems({accountId }, this.container);
      return itemSerializer.serialize(itemList.entities);
    },
  });

  fastify.route({
    method: 'GET',
    url: '/items/:uuid',
    handler: async function (request: FastifyRequest<any>, reply: FastifyReply) {
      // TODO
      this.log.info('Retrieves the details of an existing item.');
      reply.statusCode = 501;
      return 'Not yet implemented';
    },
  });

  fastify.route({
    method: 'PATCH',
    url: '/items/:uuid',
    handler: async function (request: FastifyRequest<any>) {
      const params = request.body;
      params.uuid = request.params.uuid;
      const item = await updateItem(params, this.container);
      return itemSerializer.serialize(item);
    },
  });

  fastify.route({
    method: 'DELETE',
    url: '/items/:uuid',
    handler: async function (request: FastifyRequest<any>, reply: FastifyReply) {
      await deleteItem({uuid: request.params.uuid}, this.container);
      reply.statusCode = 204;
    },
  });
};

