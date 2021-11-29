import { join } from 'path';
import AutoLoad, { AutoloadPluginOptions } from 'fastify-autoload';
import { FastifyPluginAsync } from 'fastify';
import { connect } from 'mongoose';
import * as ejs from 'ejs';
import pointOfView from 'point-of-view';
import formBodyPlugin from 'fastify-formbody';
import fastifyEnv from 'fastify-env';
import fastifyHelmet from 'fastify-helmet';

export type AppOptions = {} & Partial<AutoloadPluginOptions>;

const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  opts
): Promise<void> => {
  fastify.register(formBodyPlugin);
  fastify.register(fastifyHelmet);
  fastify.register(fastifyEnv, { dotenv: true, schema: { type: 'object' } });
  fastify.register(pointOfView, {
    engine: {
      ejs: ejs,
    },
  });

  try {
    await connect(process.env.MONGO_CONNECTION_STRING!);
    console.log('db connected');
  } catch (err) {
    console.error(err);
  }

  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'plugins'),
    options: opts,
  });

  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
    options: opts,
  });
};

export default app;
export { app };
