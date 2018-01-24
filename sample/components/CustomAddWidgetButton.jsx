import React from 'react';
import PropTypes from 'prop-types';

function CustomAddWidgetButton({ text, onClick }) {
  return (
    <div>
      <button onClick={onClick}>{text}</button>
    </div>
  );
}

CustomAddWidgetButton.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
};

export default CustomAddWidgetButton;
