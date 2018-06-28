import React from "react";
import ReactPhoneInput from "react-phone-input-2";
import PropTypes from "prop-types";


function PhoneWidget(props) {
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
    defaultCountry,
    registry,
    ...inputProps
  } = props;
  inputProps.type = options.inputType || inputProps.type || "text";
  inputProps.label = undefined;
  const _log = event => {
    console.log(event);
  };
  const _onChange = value => {
    console.log(value);
    //return props.onChange(value === "" ? options.emptyValue : value.toString());
  };
  //const { rawErrors, ...cleanProps } = inputProps;
  //const hasErrors = rawErrors !== undefined ? true : undefined;
  return (
    <ReactPhoneInput
      defaultCountry={"de"}
      className="ui left labeled input"
      onChange={_onChange}
      onBlur={_log}
      onFocus={_log}
      onClick={_log}
      onKeyDown={_log}
    />
  );
}

PhoneWidget.defaultProps = {
  type: "text",
  required: false,
  disabled: false,
  readonly: false,
  autofocus: false,
  fluid: false,
  defaultCountry: "de",
};

if (process.env.NODE_ENV !== "production") {
  PhoneWidget.propTypes = {
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
    defaultCountry: PropTypes.string.isRequired,
  };
}

export default PhoneWidget;
