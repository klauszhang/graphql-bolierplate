import { commitMutation, graphql } from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';
import environment from '../../renderers/environment';
const mutation = graphql`
  mutation RemoveProductMutation(
    $input: RemoveProductInput!
  ) {
    removeProduct(input: $input) {
      removedProduct {
        id
        name
        isActive
      }
    }
  }
`;

function sharedUpdater(store, user, deletedId) {
  const userProxy = store.get(user.id);
  const conn = ConnectionHandler.getConnection(
    userProxy,
    'ProductList_products'
  );
  ConnectionHandler.deleteNode(conn, deletedId);

  conn.setValue(
    conn.getValue('totalCount') - 1,
    'totalCount'
  );
}

function commit(productId, user) {
  return commitMutation(environment, {
    mutation,
    variables: {
      input: { productId }
    },
    updater: (store) => {
      const payload = store.getRootField(
        'removeProduct'
      );
      sharedUpdater(
        store,
        user,
        payload
          .getLinkedRecord('removedProduct')
          .getValue('id')
      );
    }
  });
}

export default { commit };
