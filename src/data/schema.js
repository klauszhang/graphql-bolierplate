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

const {
  Product,
  User,
  getProducts,
  getProductById,
  getUserById,
  getUsers
} = require('./database');

const {
  nodeInterface,
  nodeField
} = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId);
    if (type === 'Product') {
      return getProductById(id);
    } else if (type === 'User') {
      return getUserById(id);
    }
    return null;
  },
  (obj) => {
    if (obj instanceof Product) {
      return GraphQLProduct;
    } else if (obj instanceof User) {
      return;
    }
    return null;
  }
);

const GraphQLProduct = new GraphQLObjectType({
  name: 'Product',
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

const {
  connectionType: ProductConnection
  // edgeType: GraphQLProductEdge
} = connectionDefinitions({
  name: 'Product',
  nodeType: GraphQLProduct
});

const GraphQLUser = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: globalIdField('User'),
    name: {
      type: GraphQLString,
      resolve: (obj) => {
        console.log(obj);
        return obj.name;
      }
    },
    products: {
      type: ProductConnection,
      args: {
        isActive: {
          type: GraphQLBoolean,
          defaultValue: true
        },
        ...connectionArgs
      },
      resolve: (obj, { isActive, ...args }) =>
        connectionFromArray(
          getProducts(isActive),
          args
        )
    }
  },
  interfaces: [nodeInterface]
});

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    viewer: {
      type: GraphQLUser,
      resolve: (root, args, context) => {
        return getUserById(context.user.id);
      }
    },

    node: nodeField
  }
});

exports.schema = new GraphQLSchema({
  query: Query
});
