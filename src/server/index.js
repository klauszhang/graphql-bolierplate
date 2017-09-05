import express from 'express';
import bodyParser from 'body-parser';
import { createServer } from 'http';
import graphqlHTTP from 'express-graphql';
import { schema } from '../schema';
import { authenticate } from './auth';
// import UserStore from '../stores/UserStore';
import { getUser } from '../data/database';

const PORT = 3000;

const start = async () => {
  const app = express();

  app.use(express.static('public'));
  app.set('view engine', 'ejs');

  const options = async (req, res) => {
    const user = await authenticate(req, getUser);
    if (!user) {
      res.status(401);
    }
    return {
      context: {
        user
      },
      schema
    };
  };

  app.get('/graphql', (req, res) => {
    res.render('index');
  });

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
