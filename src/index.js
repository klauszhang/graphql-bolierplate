const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { createServer } = require('http');

const schema = require('./schema');

const PORT = 3000;

const start = async () => {
  const app = express();

  app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
  app.use(
    '/graphiql',
    graphiqlExpress({
      endpointURL: '/graphql'
    })
  );

  const server = createServer(app);
  server.listen(PORT, () => {
    console.log(`Graphql server up and running on port ${PORT}`);
  });
};

start();
