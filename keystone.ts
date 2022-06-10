import 'dotenv/config';
import { createSchema, config } from '@keystone-next/keystone/schema';

const databaseURL =
  process.env.DATABASE_URL || 'mongodb://localhost/keystone-sick-fits';

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // how long they stay signed in?
  secret: process.env.COOKIE_SECRET,
};

export default config({
  server: {
    cors: {
      origin: process.env.FRONTEND_URL,
      credentials: true,
    },
  },
  db: {
    adapter: 'mongoose',
    url: databaseURL,
    // todo: add data seeding here
  },
  lists: createSchema({
    // schema items go in here
  }),
  ui: {
    // todo: change this for roles
    isAccessAllowed: () => true,
  },
  // todo: add session values here
});
