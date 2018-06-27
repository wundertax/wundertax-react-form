import React from "react";
import { IntlCurrencyInput } from "../Currency";
import PropTypes from "prop-types";

const style = {
  textAlign: "right",
};

function CurrencyWidget(props) {
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
    currency,
    registry,
    ...inputProps
  } = props;
  inputProps.type = options.inputType || inputProps.type || "text";
  inputProps.label = undefined;
  const useCurrency = options.currency || currency;
  const _onChange = (event, value, maskedValue) => {
    return props.onChange(value === "" ? options.emptyValue : value.toString());
  };
  const { rawErrors, ...cleanProps } = inputProps;
  const hasErrors = rawErrors !== undefined ? true : undefined;
  return (
    <IntlCurrencyInput
      style={style}
      currency={useCurrency}
      error={hasErrors}
      disabled={disabled}
      autoFocus={autofocus}
      value={value == null ? "" : value}
      {...cleanProps}
      onChange={_onChange}
      onBlur={onBlur && (event => onBlur(inputProps.id, event.target.value))}
      onFocus={onFocus && (event => onFocus(inputProps.id, event.target.value))}
    />
  );
}

CurrencyWidget.defaultProps = {
  type: "text",
  required: false,
  disabled: false,
  readonly: false,
  autofocus: false,
  fluid: false,
  currency: "EUR",
};

if (process.env.NODE_ENV !== "production") {
  CurrencyWidget.propTypes = {
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
    currency: PropTypes.string,
  };
}

export default CurrencyWidget;
