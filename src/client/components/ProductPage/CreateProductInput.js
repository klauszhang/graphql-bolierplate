import React, { Component } from 'react';
import PropTypes from 'prop-types';
import createProductMutation from 'mutations/createProductMutation';
class CreateProductInput extends Component {
  state = { value: '' };
  render() {
    return (
      <div>
        <label>
          Name
          <input
            value={this.state.value}
            onChange={(e) => this.setState({ value: e.target.value })}
          />
        </label>
        <button onClick={this._submit}>Ok</button>
      </div>
    );
  }

  _submit = () => {
    createProductMutation(this.state.value, () => {
      this.setState({ value: '' });
    });
  };
}

CreateProductInput.propTypes = {};

export default CreateProductInput;
