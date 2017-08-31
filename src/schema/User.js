import {
  globalIdField,
  connectionArgs,
  connectionFromArray
} from 'graphql-relay';
import { getProducts } from '../data/database';
import {
  GraphQLString,
  GraphQLBoolean,
  GraphQLObjectType
} from 'graphql';
import { ProductConnection } from './Product';
import { nodeInterface } from './nodeDefinations';

const GraphQLUser = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: globalIdField('User'),
    name: {
      type: GraphQLString,
      resolve: (obj) => {
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

export { GraphQLUser };
