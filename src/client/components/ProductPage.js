import React from 'react';
import { QueryRenderer, graphql } from 'react-relay';

import environment from '../../renderers/environment';
import ProductList from './ProductList';

const query = graphql`
  # query for this page
  query ProductPageQuery {
    # query for all products
    viewer {
      name
      # spread the list stuff
      ...ProductList_viewer
    }
  }
`;

class ProductPage extends React.Component {
  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={query}
        render={({ error, props }) => {
          if (error) {
            // when error
            return <div>{error.message}</div>;
          } else if (props) {
            if (!props.viewer) {
              return (
                <div>
                  Authentication failed, please check
                  your credential
                </div>
              );
            }
            // when success
            return (
              <div>
                hello {props.viewer.name}
                <ProductList viewer={props.viewer} />
              </div>
            );
          }
          // when loading
          return <div>Loading data...</div>;
        }}
      />
    );
  }
}

export default ProductPage;
