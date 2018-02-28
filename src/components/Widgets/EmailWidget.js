import React from "react";
import { Icon } from 'semantic-ui-react';
import PropTypes from "prop-types";

function EmailWidget(props) {
  const { BaseInput } = props.registry.widgets;
  const icon = props.options.icon === undefined ? 'at': props.options.icon;
  const iconInverted = props.options.iconInverted === undefined ? undefined: true;
  const iconPosition = props.options.iconPosition === undefined ? 'left': props.options.iconPosition;
  return <BaseInput type="email" {...props} iconPosition={iconPosition}><Icon name={icon} inverted={iconInverted}/></BaseInput>;
}

if (process.env.NODE_ENV !== "production") {
  EmailWidget.propTypes = {
    value: PropTypes.string
  };
}

export default EmailWidget;
