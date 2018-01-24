import React from 'react';
import PropTypes from 'prop-types';

function Container({ children }) {
  return (
    <div className="container body">
      <div className="main_container">
        {children}
      </div>
    </div>
  );
}

Container.propTypes = {
  children: PropTypes.array,
};

export default Container;
