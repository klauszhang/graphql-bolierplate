import React from 'react';
import {
  createFragmentContainer,
  graphql
} from 'react-relay';

const Product = (props) => {
  return <div>{props.product.name}</div>;
};

export default createFragmentContainer(
  Product,
  graphql`
    # define a even lower level fragment. used here
    # naming convention : [FileName]_[propertyName]
    fragment Product_product on Product {
      id
      name
      isActive
    }
  `
);
