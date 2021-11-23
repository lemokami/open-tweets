import { FastifyPluginAsync } from 'fastify';
import { Tweet } from '../../models/tweet.model';

const example: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.route({
    method: 'GET',
    url: '/',
    handler: async (req, rep) => {
      try {
        const tweets = await Tweet.find();
        rep.code(200).send(tweets);
      } catch (err) {
        rep.code(401).send('error finding tweets');
      }
    },
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
    handler: async (req, rep) => {
      const { id } = req.params as { id: string };
      try {
        const tweets = await Tweet.find({ _id: id });
        rep.code(200).send(tweets);
      } catch (err) {
        rep.send('File not found');
      }
    },
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
    handler: async (req, rep) => {
      const tweetData = req.body;
      try {
        const dbResp = await Tweet.create(tweetData);
        rep.code(200).send(dbResp);
      } catch (err) {
        rep.code(503).send('Unexpected error: ' + err);
      }
    },
  });
};

export default example;
