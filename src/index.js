const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { createServer } = require('http');

const schema = require('./schema');
const CategoryStore = require('./stores/CategoryStore');

const PORT = 3000;
const categoryStore = new CategoryStore();

const start = async () => {
  const app = express();

  const options = {
    context: {
      categoryStore
    },
    schema
  };

  app.use('/graphql', bodyParser.json(), graphqlExpress(options));
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
