import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import listVaults from '../../../application/queries/list-vaults';
import getVaultItems from '../../../application/queries/get-vault-items';
import getVault from '../../../application/queries/get-vault';
import createItem from '../../../application/commands/create-item';
import createVault from '../../../application/commands/create-vault';
import deleteVault from '../../../application/commands/delete-vault';
import updateVault from '../../../application/commands/update-vault';

const vaultSerializer = require('../../serializers/vault-serializer');
const itemSerializer = require('../../serializers/item-serializer');

export default async (fastify: FastifyInstance) => {

  fastify.route({
    method: 'GET',
    url: '/vaults',
    handler: async function (request: FastifyRequest<any>) {
      const ownerId = request.user.id;
      const vaultSummaryList = await listVaults({ownerId}, this.container);
      return vaultSerializer.serialize(vaultSummaryList.entities);
    },
  });

  fastify.route({
    method: 'POST',
    url: '/vaults',
    handler: async function (request: FastifyRequest<any>, reply: FastifyReply) {
      const ownerId = request.user.id;
      const params = {accountId: ownerId, name: request.body.name};
      const vault = await createVault(params, this.container);
      const serialized = vaultSerializer.serialize(vault);
      reply.statusCode = 201;
      return serialized;
    },
  });

  fastify.register(async (instance: FastifyInstance) => {

    instance.addHook('preValidation', async (request: FastifyRequest<any>, reply: FastifyReply) => {
      const vaultUuid = request.params.uuid;
      const ownerId = request.user.id;
      const vaultRepository = fastify.container.get('vaultRepository');
      const isExisting = await vaultRepository.existsByUuidAndAccountId(vaultUuid, ownerId);
      if (!isExisting) {
        reply.code(404).send({
          'statusCode': 404,
          'code': '404',
          'error': 'Resource not found',
        });
      }
    });

    instance.route({
      method: 'GET',
      url: '/',
      handler: async function (request: FastifyRequest<any>) {
        const ownerId = request.user.id;
        const params = {vaultUuid: request.params.uuid, accountId: ownerId};
        const vault = await getVault(params, this.container);
        return vaultSerializer.serialize(vault);
      },
    });

    instance.route({
      method: 'PATCH',
      url: '/',
      handler: async function (request: FastifyRequest<any>) {
        const params = Object.assign({}, request.body, {uuid: request.params.uuid});
        const vault = await updateVault(params, this.container);
        return vaultSerializer.serialize(vault);
      },
    });

    instance.route({
      method: 'DELETE',
      url: '/',
      handler: async function (request: FastifyRequest<any>, reply: FastifyReply) {
        const params = {uuid: request.params.uuid};
        await deleteVault(params, this.container);
        reply.statusCode = 204;
      },
    });

    instance.route({
      method: 'GET',
      url: '/items',
      handler: async function (request: FastifyRequest<any>) {
        const params = {vaultUuid: request.params.uuid};
        const itemList = await getVaultItems(params, this.container);
        return itemSerializer.serialize(itemList.entities);
      },
    });

    instance.route({
      method: 'POST',
      url: '/items',
      handler: async function (request: FastifyRequest<any>, reply: FastifyReply) {
        const params = Object.assign({}, request.body, {vaultUuid: request.params.uuid});
        const item = await createItem(params, this.container);
        const serialized = itemSerializer.serialize(item);
        reply.statusCode = 201;
        return serialized;
      },
    });
  }, {prefix: '/vaults/:uuid'});
};
