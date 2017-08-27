const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers');
const fs = require('fs');
const path = require('path');

console.info('loading schemas...');
const typeDefs = fs.readFileSync(
  path.resolve(__dirname, 'typeDefs.graphql'),
  'utf8'
);
console.info('schemas load completed!');

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers
});
