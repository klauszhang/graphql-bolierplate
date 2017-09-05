import React from 'react';
import {
  createFragmentContainer,
  graphql
} from 'react-relay';
class Product extends React.Component {
  state = { showInput: false, inputValue: '' };

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.showInput) {
      if (this.state.showInput) {
        this.inputElem.focus();
        this.setState({
          inputValue: this.props.product.name
        });
      }
    }
  }

  render() {
    return (
      <div
        onKeyDown={(evt) => {
          if (evt.keyCode === 27) {
            this.setState({ showInput: false });
          }
        }}
        onDoubleClick={() =>
          this.setState({ showInput: true })}
      >
        <span
          style={{
            display: this.state.showInput
              ? 'none'
              : undefined
          }}
        >
          {this.props.product.name}
        </span>
        <span
          style={{
            display: this.state.showInput
              ? undefined
              : 'none'
          }}
        >
          <input
            ref={(elem) => (this.inputElem = elem)}
            style={{
              border: 'none',
              paddingBottom: 4,
              borderBottom: '1px solid #333'
            }}
            value={this.state.inputValue}
            onChange={(evt) =>
              this.setState({
                inputValue: evt.target.value
              })}
          />
          <span
            style={{ cursor: 'pointer' }}
            onClick={() => {
              this.props.onUpdateProduct({
                ...this.props.product,
                name: this.state.inputValue
              });
              this.setState({ showInput: false });
            }}
          >
            ✔
          </span>
          <span
            style={{ cursor: 'pointer' }}
            onClick={() =>
              this.props.onRemoveProduct(
                this.props.product.id
              )}
          >
            ✗
          </span>
        </span>
      </div>
    );
  }
}

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
