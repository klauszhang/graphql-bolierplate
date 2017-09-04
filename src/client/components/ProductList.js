import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  createFragmentContainer,
  graphql
} from 'react-relay';
import Product from './Product';
import AddProductMutation from '../mutations/AddProductMutation';

class ProductList extends Component {
  state = {
    name: ''
  };
  render() {
    return (
      <div>
        <div>
          <p>create new product</p>
          <p>
            <label>
              name
              <input
                value={this.state.name}
                onChange={(evt) =>
                  this.setState({
                    name: evt.target.value
                  })}
              />
            </label>
            <button onClick={this._addNewProduct}>
              Submit
            </button>
          </p>
        </div>

        <hr />

        {this.props.viewer.products.edges.map(
          ({ node }, idx) => (
            <Product
              key={node.__id}
              index={idx}
              product={node}
            />
          )
        )}
      </div>
    );
  }

  _addNewProduct = () => {
    AddProductMutation.commit(
      this.state.name,
      this.props.viewer
    );
  };
}

ProductList.propTypes = {};

export default createFragmentContainer(
  ProductList,
  graphql`
    # list fragment
    # naming convention : [FileName]_[propertyName]
    fragment ProductList_viewer on User {
      id
      # for product property, pagination is required when using connection
      products(first: 100)
        # define connection key, so that it can be used by others
        # naming convention : [FileName]_[propertyName]
        @connection(key: "ProductList_products") {
        edges {
          node {
            ...Product_product
          }
        }
      }
    }
  `
);
