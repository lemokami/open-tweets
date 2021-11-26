import { FastifyPluginAsync } from 'fastify';
import tweetHandler from '../../handlers/tweet.handler';

const example: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.route({
    method: 'GET',
    url: '/',
    handler: tweetHandler.getAll,
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
    handler: tweetHandler.getOne,
  });

  fastify.route({
    method: 'POST',
    url: '/',
    schema: {
      body: {
        type: 'object',
        required: ['tweet', 'username'],
        properties: {
          tweet: { type: 'string' },
          username: { type: 'string' },
        },
      },
    },
    handler: tweetHandler.create,
  });
};

export default example;
