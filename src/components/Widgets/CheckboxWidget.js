import React from "react";
import PropTypes from "prop-types";
import { Container, Checkbox } from 'semantic-ui-react';

function CheckboxWidget(props) {
  const {
    schema,
    id,
    value,
    required,
    disabled,
    readonly,
    label,
    autofocus,
    onChange,
  } = props;
  return (
    <Container className={`checkbox ${disabled || readonly ? "disabled" : ""}`}>
      {schema.description && (
        <p id={id}><small>{schema.description}</small></p>
      )}
      <Checkbox 
        id={id} 
        label={label} 
        // value={typeof value === "undefined" ? false : true}
        defaultChecked={typeof value === "undefined" ? false : value}
        required={typeof required === "undefined" ? false : true}
        disabled={disabled || readonly}
        autoFocus={autofocus}
        onChange={event => onChange(event.target.checked)}
      />
    </Container>
  );
}

CheckboxWidget.defaultProps = {
  autofocus: false,
};

if (process.env.NODE_ENV !== "production") {
  CheckboxWidget.propTypes = {
    schema: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    value: PropTypes.bool,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    autofocus: PropTypes.bool,
    onChange: PropTypes.func,
  };
}

export default CheckboxWidget;