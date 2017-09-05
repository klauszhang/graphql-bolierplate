import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt
} from 'graphql';
import {
  globalIdField,
  connectionDefinitions
} from 'graphql-relay';

import { getUserById } from '../data/database';

import { nodeInterface } from './nodeDefinations';

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

const {
  connectionType: ProductConnection,
  edgeType: GraphQLProductEdge
} = connectionDefinitions({
  name: 'Product',
  nodeType: GraphQLProduct,
  connectionFields: {
    totalCount: {
      type: GraphQLInt,
      resolve: (root, args, context) => {
        return getUserById(context.user.id).productIds
          .length;
      }
    }
  }
  // resolveCursor: (source, args, context) => {
  //   // todo
  // }
});

export {
  ProductConnection,
  GraphQLProduct,
  GraphQLProductEdge
};
