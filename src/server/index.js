import express from 'express';
import bodyParser from 'body-parser';
import { createServer } from 'http';
import graphqlHTTP from 'express-graphql';

import { schema } from '../schema';
import { authenticate } from './auth';
import UserStore from '../stores/UserStore';

const userStore = new UserStore({
  hao: { id: 1, username: 'hao', password: 'secret' }
});

const PORT = 3000;

const start = async () => {
  const app = express();

  app.use(express.static('public'));
  app.set('view engine', 'ejs');

  const options = async (req, res) => {
    const user = await authenticate(req, userStore);
    if (!user) {
      res.status(401);
    }
    return {
      context: {
        user
      },
      schema,
      graphiql: true
    };
  };

  app.use(
    '/graphql',
    bodyParser.json(),
    graphqlHTTP(options)
  );

  app.get('*', (req, res) => {
    res.render('index');
  });

  const server = createServer(app);
  server.listen(PORT, () => {
    console.info('\n> server up and running.');
    console.info(
      `> Client url: \t\t http://localhost:${PORT}`
    );
    console.info(
      `> GraphQL endpoint:\t http://localhost:${PORT}/graphql \n`
    );

    // console.info(`GraphiQL endpoint:\t http://localhost:${PORT}/graphiql`);
  });
};

start();
