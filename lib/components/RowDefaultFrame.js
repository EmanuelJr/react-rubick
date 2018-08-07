import React from 'react';
import PropTypes from 'prop-types';

function RowFrame({ children }) {
  return (
    <div className="row">
      {children}
    </div>
  );
}

RowFrame.propTypes = {
  editable: PropTypes.bool,
  children: PropTypes.node,
};

export default RowFrame;
