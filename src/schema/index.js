import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList
} from 'graphql';
import {
  getUserById,
  getProducts
} from '../data/database';
import { GraphQLUser } from './User';
import { GraphQLProduct } from './Product';
import { nodeField } from './nodeDefinations';
import { GraphQLAddProductMutation } from './ProductMutation';

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    viewer: {
      type: GraphQLUser,
      resolve: (root, args, context) => {
        return getUserById(context.user.id);
      }
    },
    node: nodeField,
    allProducts: {
      type: new GraphQLList(GraphQLProduct),
      resolve: () => {
        return getProducts();
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addProduct: GraphQLAddProductMutation
  }
});

const schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

export { schema };
