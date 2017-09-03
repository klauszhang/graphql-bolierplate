import {
  GraphQLNonNull,
  GraphQLString
} from 'graphql';
import {
  mutationWithClientMutationId,
  cursorForObjectInConnection,
  fromGlobalId
} from 'graphql-relay';
import { GraphQLUser } from './User';
import { GraphQLProductEdge } from './Product';
import {
  addProduct,
  getProductById,
  getProducts,
  getUserById
} from '../data/database';

const GraphQLAddProductMutation = mutationWithClientMutationId(
  {
    name: 'AddProduct',
    inputFields: {
      name: {
        type: new GraphQLNonNull(GraphQLString)
      },
      userId: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    outputFields: {
      productEdge: {
        type: GraphQLProductEdge,
        resolve: ({ localProductId }) => {
          const product = getProductById(
            localProductId
          );
          return {
            cursor: cursorForObjectInConnection(
              getProducts(), // todo cursor part need refactory
              product
            ),
            node: product
          };
        }
      },
      viewer: {
        type: GraphQLUser,
        resolve: (root, args, context) => {
          return getUserById(context.user.id);
        }
      }
    },
    mutateAndGetPayload: ({ name, userId }) => {
      const { id } = fromGlobalId(userId);
      const newProduct = addProduct({
        name,
        userId: id
      });
      return { localProductId: newProduct.id };
    }
  }
);

export { GraphQLAddProductMutation };
