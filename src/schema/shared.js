const {
  Product,
  User,
  getProducts,
  getProductById,
  getUserById
} = require('../data/database');

const {
  nodeDefinitions,
  fromGlobalId,
  globalIdField,
  connectionDefinitions,
  connectionArgs,
  connectionFromArray
} = require('graphql-relay');

const { GraphQLProduct } = require('./Product');

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

exports.nodeInterface = nodeInterface;
exports.nodeField = nodeField;
