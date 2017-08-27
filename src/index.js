const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { createServer } = require('http');
const { authenticate } = require('./auth');
const Users = require('./store/users');
const schema = require('./schema');

const PORT = 3000;

const users = new Users({ hao: { username: 'hao', password: 'secret' } });
const token = 'token-hao|secret';

const start = async () => {
  const app = express();

  const options = async (req, res) => {
    const user = await authenticate(req, users);
    if (!user) {
      res.status(401).send('authentication failed!');
    }
    return {
      context: {
        user
      },
      schema
    };
  };

  app.use('/graphql', bodyParser.json(), graphqlExpress(options));

  app.use(
    '/graphiql',
    graphiqlExpress({
      endpointURL: '/graphql',
      passHeader: `'Authorization':'bearer ${token}'`
    })
  );

  const server = createServer(app);
  server.listen(PORT, () => {
    console.log(`Graphql server up and running on port ${PORT}`);
  });
};

start();
