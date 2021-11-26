import { FastifyPluginAsync } from 'fastify';
import tweetController from '../../controllers/tweet.controller';

const example: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.route({
    method: 'GET',
    url: '/',
    handler: tweetController.getAll,
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
    handler: tweetController.getOne,
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
    handler: tweetController.create,
  });
};

export default example;
