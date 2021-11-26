import { FastifyReply, FastifyRequest } from 'fastify';
import { Tweet } from '../models/tweet.model';

type fastifyHandler = (req: FastifyRequest, rep: FastifyReply) => Promise<void>;

const tweetController: Record<string, fastifyHandler> = {
  getAll: async (req: FastifyRequest, rep: FastifyReply) => {
    try {
      const tweets = await Tweet.find();
      rep.code(200).send(tweets);
    } catch (err) {
      rep.code(401).send('error finding tweets');
    }
  },
  getOne: async (req, rep) => {
    const { id } = req.params as { id: string };
    try {
      const tweets = await Tweet.find({ _id: id });
      rep.code(200).send(tweets);
    } catch (err) {
      rep.send('File not found');
    }
  },
  create: async (req, rep) => {
    const tweetData = req.body;
    try {
      const dbResp = await Tweet.create(tweetData);
      rep.code(200).send(dbResp);
    } catch (err) {
      rep.code(503).send('Unexpected error: ' + err);
    }
  },
};

export default tweetController;
