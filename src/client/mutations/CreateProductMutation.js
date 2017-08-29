import { commitMutation, graphql } from 'react-relay';
import environment from '../Environment';
import { ConnectionHandler } from 'relay-runtime';

const mutation = graphql`
  mutation CreateProductMutation($input: CreateProductInput!) {
    createProduct(input: $input) {
      id
      name
    }
  }
`;

export default (name, callback) => {
  const variables = {
    input: {
      name
    }
  };
  commitMutation(environment, {
    mutation,
    variables,
    onCompleted: (data) => {
      callback();
    },
    updater: (store, data) => {
      const current = store.getRootField('createProduct');
      const proxy = current.get(data.createProduct.id);
      const connection = ConnectionHandler.getConnection(
        proxy,
        'Product_products'
      );
      console.log(current);
    },
    onError: (err) => console.err(err)
  });
};
