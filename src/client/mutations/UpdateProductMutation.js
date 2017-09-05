import { commitMutation, graphql } from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';
import environment from '../../renderers/environment';

const mutation = graphql`
  mutation UpdateProductMutation(
    $input: UpdateProductInput!
  ) {
    updateProduct(input: $input) {
      updatedProduct {
        id
        name
        isActive
      }
    }
  }
`;

function commit(payload) {
  return commitMutation(environment, {
    mutation,
    variables: {
      input: {
        productId: payload.id,
        updatedProduct: {
          name: payload.name,
          isActive: payload.isActive
        }
      }
    },
    optimisticResponse: {
      updateProduct: {
        updatedProduct: {
          ...payload
        }
      }
    }
  });
}

export default { commit };
