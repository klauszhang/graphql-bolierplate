import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLInputObjectType
} from 'graphql';
import {
  mutationWithClientMutationId,
  cursorForObjectInConnection,
  fromGlobalId
} from 'graphql-relay';
import { GraphQLUser } from './User';
import {
  GraphQLProductEdge,
  GraphQLProduct
} from './Product';
import {
  addProduct,
  getProductById,
  removeProductById,
  getProducts,
  updateProduct
} from '../data/database';

const GraphQLProductUpdateInput = new GraphQLInputObjectType(
  {
    name: 'ProductUpdateInput',
    fields: {
      name: {
        type: GraphQLString
      },
      isActive: {
        type: GraphQLBoolean
      }
    }
  }
);

const GraphQLUpdateProductMutation = mutationWithClientMutationId(
  {
    name: 'UpdateProduct',
    inputFields: {
      productId: {
        type: new GraphQLNonNull(GraphQLString)
      },
      updatedProduct: {
        type: new GraphQLNonNull(
          GraphQLProductUpdateInput
        )
      }
    },
    mutateAndGetPayload: ({
      productId,
      updatedProduct
    }) => {
      const { id } = fromGlobalId(productId);
      return {
        updatedProduct: updateProduct(
          id,
          updatedProduct
        )
      };
    },
    outputFields: {
      updatedProduct: {
        type: GraphQLProduct,
        resdolve: ({ updatedProduct }) =>
          updatedProduct
      }
    }
  }
);

const GraphQLRemoveProductMutation = mutationWithClientMutationId(
  {
    name: 'RemoveProduct',
    inputFields: {
      productId: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    mutateAndGetPayload: ({ productId }, ctx) => {
      const { id } = fromGlobalId(productId);

      return {
        removedProduct: removeProductById(
          id,
          ctx.user.id
        )
      };
    },
    outputFields: {
      removedProduct: {
        type: GraphQLProduct,
        resolve: ({ removedProduct }) => {
          return removedProduct;
        }
      }
    }
  }
);

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
      totalCount: {
        type: GraphQLInt,
        resolve: (root, args, context) => {
          return context.user.productIds.length;
        }
      },
      viewer: {
        type: GraphQLUser,
        resolve: (root, args, context) => {
          return context.user;
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

export {
  GraphQLAddProductMutation,
  GraphQLRemoveProductMutation,
  GraphQLUpdateProductMutation
};
