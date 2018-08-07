import React from 'react';
import PropTypes from 'prop-types';

const AddWidget = ({ text, onClick }) => (
  <div className="add-widget-button" onClick={onClick}>
    <a className="add-widget-link">{text}</a>
  </div>
);

AddWidget.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
};

AddWidget.defaultProps = {
  text: 'Add Widget',
};

export default AddWidget;
