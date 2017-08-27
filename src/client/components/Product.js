import React, { Component } from 'react';
import { createFragmentContainer, graphql } from 'react-relay';

class Product extends Component {
  render() {
    return (
      <div>
        {this.props.products.map((product) => {
          return (
            <div key={product.id}>
              {product.name}
            </div>
          );
        })}
      </div>
    );
  }
}

export default createFragmentContainer(
  Product,
  graphql`
    # get products collection
    fragment Product_products on Product @relay(plural: true) {
      id
      name
    }
  `
);
