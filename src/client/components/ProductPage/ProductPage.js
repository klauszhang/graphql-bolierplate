import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Product from './Product';
import CreateProductInput from './CreateProductInput';
import UpdateProductInput from './UpdateProductInput';

class ProductPage extends Component {
  render() {
    return (
      <div>
        <Product products={this.props.data} />
        <hr />
        <CreateProductInput />
        <hr />
        <UpdateProductInput />
        <hr />
      </div>
    );
  }
}

ProductPage.propTypes = {
  data: PropTypes.array.isRequired
};

export default ProductPage;
