import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  createFragmentContainer,
  createPaginationContainer,
  graphql
} from 'react-relay';
import Product from './Product';
import AddProductMutation from '../mutations/AddProductMutation';
import RemoveProductMutation from '../mutations/RemoveProductMutation';
import UpdateProductMutation from '../mutations/UpdateProductMutation';

class ProductList extends Component {
  state = {
    name: '',
    currentPage: 0
  };
  render() {
    const showNext =
      (this.state.currentPage + 1) * 10 <
      this.props.viewer.products.totalCount;

    return (
      <div style={{ padding: 8 }}>
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

        {this.props.viewer.products.edges
          .slice(
            this.state.currentPage * 10,
            (this.state.currentPage + 1) * 10
          )
          .map(({ node }, idx) => (
            <Product
              key={node.__id}
              product={node}
              onRemoveProduct={this._removeProduct}
              onUpdateProduct={this._updateProduct}
            />
          ))}

        <hr />
        <div>
          {this.props.viewer.products.totalCount}
        </div>
        <button
          style={{
            display:
              this.state.currentPage < 1
                ? 'none'
                : undefined
          }}
          onClick={() =>
            this.setState({
              currentPage: this.state.currentPage - 1
            })}
        >
          Previous
        </button>
        {this.state.currentPage + 1}
        <button
          style={{
            display: showNext ? undefined : 'none'
          }}
          onClick={this._loadMore}
        >
          Next
        </button>
      </div>
    );
  }

  _addNewProduct = () => {
    AddProductMutation.commit(
      this.state.name,
      this.props.viewer
    );
  };
  _updateProduct = (payload) => {
    UpdateProductMutation.commit(payload);
  };

  _removeProduct = (productId) => {
    RemoveProductMutation.commit(
      productId,
      this.props.viewer
    );
  };

  _loadMore = () => {
    if (this.props.relay.hasMore()) {
      this.props.relay.loadMore(10);
    } else if (this.props.relay.isLoading()) {
      console.log('Request is already pending');
      return;
    }

    this.setState({
      currentPage: this.state.currentPage + 1
    });
  };
}

ProductList.propTypes = {};

// export default createFragmentContainer(
//   ProductList,
//   graphql`
//     # list fragment
//     # naming convention : [FileName]_[propertyName]
//     fragment ProductList_viewer on User {
//       id
//       # for product property, pagination is required when using connection
//       products(first: 10)
//         # define connection key, so that it can be used by others
//         # naming convention : [FileName]_[propertyName]
//         @connection(key: "ProductList_products") {
//         edges {
//           node {
//             ...Product_product
//           }
//         }
//       }
//     }
//   `
// );

export default createPaginationContainer(
  ProductList,
  {
    viewer: graphql`
      fragment ProductList_viewer on User {
        id
        products(first: $count, after: $after)
          @connection(key: "ProductList_products") {
          edges {
            node {
              ...Product_product
            }
          }
          totalCount
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    `
  },
  {
    direction: 'forward',
    query: graphql`
      query ProductListForwardQuery(
        $count: Int!
        $after: String
      ) {
        viewer {
          ...ProductList_viewer
        }
      }
    `,
    getConnectionFromProps(props) {
      return props.viewer && props.viewer.products;
    },
    getFragmentVariables(
      previousVariables,
      totalCount
    ) {
      return {
        ...previousVariables,
        count: 10
      };
    },
    getVariables(
      props,
      paginationInfo,
      fragmentVariables
    ) {
      return {
        count: paginationInfo.count,
        after: paginationInfo.cursor
      };
    }
  }
);
