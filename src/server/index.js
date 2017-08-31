import express from 'express';
import bodyParser from 'body-parser';
import { createServer } from 'http';
import graphqlHTTP from 'express-graphql';

import { schema } from '../schema';

const PORT = 3000;

const start = async () => {
  const app = express();

  app.use(express.static('public'));
  app.set('view engine', 'ejs');

  app.use(
    '/graphql',
    bodyParser.json(),
    graphqlHTTP({
      schema,
      context: { user: { id: 1 } },
      graphiql: true
    })
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
