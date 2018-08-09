import React from 'react';
import PropTypes from 'prop-types';

/**
 * Default frame that will be used with the widgets.
 */
const DefaultFrame = ({ children, onRemove, onEdit, editable, title }) => (
  <div className="defaultWidgetFrame">
    <div className="defaultWidgetFrameHeader">
      <span className="title">{title}</span>
      {editable && <div><a className="remove" onClick={() => onEdit()}>Edit</a><a className="remove" onClick={() => onRemove()}>Remove</a></div>}
    </div>
    {children}
  </div>
);

DefaultFrame.propTypes = {
  /**
   * Indicates weather the dashboard is in editable mode.
   */
  editable: PropTypes.bool,

  /**
   * Children of the frame.
   */
  children: PropTypes.node,

  /**
   * Function to call when the widget is removed.
   */
  onRemove: PropTypes.func,

 /**
  * Title of the widget
  */
  title: PropTypes.string,
};

export default DefaultFrame;