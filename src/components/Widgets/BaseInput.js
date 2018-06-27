import React from "react";
import PropTypes from "prop-types";
import { Input } from "semantic-ui-react";

function BaseInput(props) {
  // Note: since React 15.2.0 we can't forward unknown element attributes, so we
  // exclude the "options" and "schema" ones here.
  const {
    fluid,
    iconPosition,
    children,
    value,
    readonly,
    disabled,
    autofocus,
    onBlur,
    onFocus,
    options,
    schema,
    formContext,
    registry,
    ...inputProps
  } = props;

  inputProps.type = options.inputType || inputProps.type || "text";
  inputProps.label = undefined;
  const _onChange = ({ target: { value } }) => {
    return props.onChange(value === "" ? options.emptyValue : value);
  };
  const { rawErrors, ...cleanProps } = inputProps;
  const hasErrors = rawErrors !== undefined ? true : undefined;
  return (
    <Input
      error={hasErrors}
      fluid={fluid}
      disabled={disabled}
      autoFocus={autofocus}
      value={value == null ? "" : value}
      {...cleanProps}
      iconPosition={iconPosition}
      onChange={_onChange}
      onBlur={onBlur && (event => onBlur(inputProps.id, event.target.value))}
      onFocus={
        onFocus && (event => onFocus(inputProps.id, event.target.value))
      }>
      {children}
      <input />
    </Input>
  );
}

BaseInput.defaultProps = {
  type: "text",
  required: false,
  disabled: false,
  readonly: false,
  autofocus: false,
  fluid: false,
};

if (process.env.NODE_ENV !== "production") {
  BaseInput.propTypes = {
    id: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.any,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    autofocus: PropTypes.bool,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    fluid: PropTypes.bool,
    children: PropTypes.node,
    iconPosition: PropTypes.string,
  };
}

export default BaseInput;
