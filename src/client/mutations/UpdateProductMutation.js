import { commitMutation, graphql } from 'react-relay';
import environment from '../Environment';

const mutation = graphql`
  mutation updateProductMutation($input: UpdateProductInput!) {
    updateProduct(input: $input) {
      id
      name
    }
  }
`;

export default (id, name, callback) => {
  const variables = {
    input: {
      name
    }
  };

  commitMutation(environment, {
    mutation,
    variables,
    optimisticUpdater: (proxy) => {
      const product = proxy.get(id);
      console.log(proxy);
      // product.setValue(name, 'id');
    },
    updater: (proxy) => {
      const field = proxy.getRootField('updateProduct');
      console.log(field);

      const updated = field.getLinkRecord('product');
      const current = proxy.get(id);
    },
    onError: (err) => console.err(err)
  });
};
