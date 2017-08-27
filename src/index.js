const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { createServer } = require('http');

const { authenticate } = require('./auth');
const UserStore = require('./store/UserStore');
const ProductStore = require('./stores/ProductStore');
const schema = require('./schema');
const CategoryStore = require('./stores/CategoryStore');

const PORT = 3000;
const categoryStore = new CategoryStore();
const productStore = new ProductStore();

const userStore = new UserStore({
  hao: { username: 'hao', password: 'secret' }
});
const token = 'token-hao|secret';

const start = async () => {
  const app = express();

  const options = async (req, res) => {
    const user = await authenticate(req, userStore);
    if (!user) {
      res.status(401).send('authentication failed!');
    }
    return {
      context: {
        user,
        categoryStore,
        productStore
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
