import React from 'react';
import PropTypes from 'prop-types';

const UpdateProductInput = (props) => {
  return (
    <div>
      <label>
        Id
        <input />
      </label>

      <label>
        Name
        <input />
      </label>

      <button>Ok</button>
    </div>
  );
};

UpdateProductInput.propTypes = {};

export default UpdateProductInput;
