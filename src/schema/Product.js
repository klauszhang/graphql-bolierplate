import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean
} from 'graphql';
import {
  globalIdField,
  connectionDefinitions
} from 'graphql-relay';
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
  nodeType: GraphQLProduct
  // resolveCursor: (source, args, context) => {
  //   console.log(source);
  // }
});

export {
  ProductConnection,
  GraphQLProduct,
  GraphQLProductEdge
};
