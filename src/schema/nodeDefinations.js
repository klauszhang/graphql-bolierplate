import {
  Product,
  User,
  getProductById,
  getUserById
} from '../data/database';
import {
  nodeDefinitions,
  fromGlobalId
} from 'graphql-relay';
import { GraphQLProduct } from './Product';
import { GraphQLUser } from './User';

const { nodeInterface, nodeField } = nodeDefinitions(
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
      return GraphQLUser;
    }
    return null;
  }
);

export { nodeInterface, nodeField };
