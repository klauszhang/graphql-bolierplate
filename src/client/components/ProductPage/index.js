import React from 'react';
import { QueryRenderer, graphql } from 'react-relay';

import environment from 'Environment';
import ProductPage from './ProductPage';
const query = graphql`
  # query for this page
  query ProductPageQuery {
    # query for all products
    allProducts {
      ...Product_products
    }
  }
`;

const renderer = ({ error, props }) => {
  if (error) {
    return (
      <div>
        {error.message}
      </div>
    );
  } else if (props) {
    return <ProductPage data={props.allProducts} />;
  }
  return <div>Loading data...</div>;
};

class Root extends React.Component {
  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={query}
        render={renderer}
      />
    );
  }
}

export default Root;
