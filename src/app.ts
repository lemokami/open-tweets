import { join } from 'path';
import AutoLoad, { AutoloadPluginOptions } from 'fastify-autoload';
import { FastifyPluginAsync } from 'fastify';
import { connect } from 'mongoose';
import * as ejs from 'ejs';
import pointOfView from 'point-of-view';
import formBodyPlugin from 'fastify-formbody';
import fastifyEnv from 'fastify-env';
export type AppOptions = {
  // Place your custom options for app below here.
} & Partial<AutoloadPluginOptions>;

const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  opts
): Promise<void> => {
  // Place here your custom code!
  fastify.register(formBodyPlugin);
  fastify.register(fastifyEnv, { dotenv: true, schema: { type: 'object' } });
  try {
    await connect(process.env.MONGO_CONNECTION_STRING!);
    console.log('db connected');
  } catch (err) {
    console.error(err);
  }

  fastify.register(pointOfView, {
    engine: {
      ejs: ejs,
    },
  });
  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'plugins'),
    options: opts,
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
    options: opts,
  });
};

export default app;
export { app };
