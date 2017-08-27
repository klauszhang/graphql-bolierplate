const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers');
const fs = require('fs');
const path = require('path');

const typeDefs = fs.readFileSync(
  path.resolve(__dirname, 'typeDefs.graphql'),
  'utf8'
);

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers
});
