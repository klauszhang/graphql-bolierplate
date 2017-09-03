import { commitMutation, graphql } from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';
import environment from '../../renderers/environment';

// the update ql
const mutation = graphql`
  # add product
  mutation AddProductMutation(
    $input: AddProductInput!
  ) {
    # call the addProduct func
    addProduct(input: $input) {
      # response the newly created stuff
      productEdge {
        # grab the node
        node {
          id
          name
          isActive
        }
      }
      # grab the viewer as well
      viewer {
        id
        name
      }
    }
  }
`;

// updater for response. can be used by both optimistic and real update
function sharedUpdater(store, user, newEdge) {
  // get the root object
  const userProxy = store.get(user.id);
  // get link, the key is defined by @connection directive in the ql 'viewer' is defined
  const conn = ConnectionHandler.getConnection(
    userProxy,
    'ProductList_products'
  );
  // append the new object
  ConnectionHandler.insertEdgeAfter(conn, newEdge);
}

// commit mutation function
function commit(productName, user) {
  // return a function
  return commitMutation(environment, {
    mutation,
    variables: {
      input: {
        name: productName,
        userId: user.id
      }
    },
    onError: (err) => {
      console.log(err);
    },
    // updater for REAL update
    updater: (store) => {
      // get payload from response
      const payload = store.getRootField('addProduct');
      // get newEdge from payload
      const newEdge = payload.getLinkedRecord(
        'productEdge'
      );
      // use share updater to update local store
      sharedUpdater(store, user, newEdge);
    }
  });
}

export default { commit };
