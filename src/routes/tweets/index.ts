import { FastifyPluginAsync } from 'fastify';
import tweetHandler from '../../handlers/tweet.handler';

const tweets: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.route({
    method: 'GET',
    url: '/',
    handler: tweetHandler.getAllView,
  });

  fastify.route({
    method: 'GET',
    url: '/:id',
    schema: {
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' },
        },
      },
    },
    handler: tweetHandler.getOneView,
  });

  fastify.route({
    method: 'POST',
    url: '/',
    handler: tweetHandler.create,
  });

  fastify.route({
    method: 'GET',
    url: '/create',
    handler: tweetHandler.createView,
  });
};

export default tweets;
