import React from 'react';
import { QueryRenderer, graphql } from 'react-relay';

import environment from '../../renderers/Environment';
import Product from './Product';

const query = graphql`
  # query for this page
  query ProductPageQuery {
    # query for all products
    viewer {
      name
      products {
        ...Product_products
      }
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
            return <div>{error.message}</div>;
          } else if (props) {
            return (
              <div>
                hello {props.viewer.name}
                <Product
                  products={props.viewer.products}
                />
                <div>
                  <button
                    onClick={() => this.forceUpdate()}
                  >
                    Reload
                  </button>
                </div>
              </div>
            );
          }
          return <div>Loading data...</div>;
        }}
      />
    );
  }
}

export default ProductPage;
