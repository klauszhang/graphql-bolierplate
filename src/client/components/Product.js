import React, { Component } from 'react';
import {
  createFragmentContainer,
  graphql
} from 'react-relay';

class Product extends Component {
  render() {
    return (
      <div>
        {this.props.products.edges.map(
          ({ node }) => {
            return (
              <div key={node.id}>
                {node.name}-{node.isActive.toString()}
              </div>
            );
          }
        )}

        <div>
          <label>
            new product name
            <input />
          </label>
          <button>Ok</button>
        </div>
      </div>
    );
  }
}

export default createFragmentContainer(
  Product,
  graphql`
    # get products collection
    fragment Product_products on ProductConnection {
      edges {
        node {
          id
          name
          isActive
        }
      }
    }
  `
);
