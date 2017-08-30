const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLList
} = require('graphql');

const {
  nodeDefinitions,
  fromGlobalId,
  globalIdField,
  connectionDefinitions,
  connectionArgs,
  connectionFromArray
} = require('graphql-relay');

const { nodeInterface } = require('./shared');

const GraphQLProduct = new GraphQLObjectType({
  name: 'Product',
  description: 'a product',
  fields: {
    id: globalIdField('Product'),
    name: {
      type: GraphQLString,
      resolve: (obj) => obj.name
    },
    isActive: {
      type: GraphQLBoolean,
      resolve: (obj) => obj.isActive
    }
  },
  interfaces: [nodeInterface]
});

exports.GraphQLProduct = GraphQLProduct;
