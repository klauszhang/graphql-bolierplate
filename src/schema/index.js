import {
  GraphQLObjectType,
  GraphQLSchema
} from 'graphql';
import { getUserById } from '../data/database';
import { GraphQLUser } from './User';

import { nodeField } from './nodeDefinations'; //<- this will fail!

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

const schema = new GraphQLSchema({
  query: Query
});

export { schema };
