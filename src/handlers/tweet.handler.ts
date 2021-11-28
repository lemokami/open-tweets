import { FastifyReply, FastifyRequest } from 'fastify';
import { Tweet } from '../models/tweet.model';

type fastifyHandler = (req: FastifyRequest, rep: FastifyReply) => Promise<void>;

const tweetHandler: Record<string, fastifyHandler> = {
  getAllView: async (req, rep) => {
    try {
      const tweets = await Tweet.find().sort({ updatedAt: -1 });
      await rep.view('/src/view/tweets.ejs', { tweets: tweets, name: 'Home' });
    } catch (err) {
      rep.code(401).send('error finding tweets');
    }
  },

  getOneView: async (req, rep) => {
    const { id } = req.params as { id: string };
    try {
      const tweets = await Tweet.find({ _id: id });
      rep.code(200).send(tweets);
    } catch (err) {
      rep.send('File not found');
    }
  },

  createView: async (req, rep) => {
    await rep.view('/src/view/create.ejs', { name: 'Create Tweet' });
  },

  create: async (req, rep) => {
    const tweetData = req.body;
    try {
      await Tweet.create(tweetData);
      await rep.redirect('/');
    } catch (err) {
      rep.code(503).send('Unexpected error: ' + err);
    }
  },
};

export default tweetHandler;
