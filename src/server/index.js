const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { createServer } = require('http');

const schema = require('./schema');

const PORT = 3000;

const start = async () => {
  const app = express();

  app.use(express.static('public'));
  app.set('view engine', 'ejs');

  app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
  app.use(
    '/graphiql',
    graphiqlExpress({
      endpointURL: '/graphql'
    })
  );

  app.get('*', (req, res) => {
    res.render('index');
  });

  const server = createServer(app);
  server.listen(PORT, () => {
    console.info('server up and running.');
    console.info(`Client url: \t\t http://localhost:${PORT}`);
    console.info(`GraphQL endpoint:\t http://localhost:${PORT}/graphql`);
    console.info(`GraphiQL endpoint:\t http://localhost:${PORT}/graphiql`);
  });
};

start();
