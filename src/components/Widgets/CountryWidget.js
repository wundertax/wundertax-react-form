import React from "react";
import PropTypes from "prop-types";
import { countryOptions } from "./common";
import { asNumber } from "react-jsonschema-form/lib/utils";
import { Select } from "semantic-ui-react";

function processValue({ type, items }, value) {
  if (value === "") {
    return undefined;
  } else if (
    type === "array" &&
    items &&
    ["number", "integer"].includes(items.type)
  ) {
    return value.map(asNumber);
  } else if (type === "boolean") {
    return value === "true";
  } else if (type === "number") {
    return asNumber(value);
  }
  return value;
}

function CountryWidget(props) {
  const {
    schema,
    id,
    value,
    required,
    disabled,
    readonly,
    multiple,
    autofocus,
    onChange,
    onBlur,
    onFocus,
    placeholder,
  } = props;
  const emptyValue = multiple ? [] : "";
  return (
    <Select
      id={id}
      search
      multiple={multiple}
      value={typeof value === "undefined" ? emptyValue : value}
      required={required}
      disabled={disabled || readonly}
      autoFocus={autofocus}
      placeholder={placeholder}
      options={countryOptions}
      onBlur={
        onBlur &&
        ((e, { value }) => {
          onBlur(id, processValue(schema, value));
        })
      }
      onFocus={
        onFocus &&
        ((e, { value }) => {
          onFocus(id, processValue(schema, value));
        })
      }
      onChange={(e, { value }) => {
        onChange(processValue(schema, value));
      }}
    />
  );
}

CountryWidget.defaultProps = {
  autofocus: false,
};

if (process.env.NODE_ENV !== "production") {
  CountryWidget.propTypes = {
    schema: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    value: PropTypes.any,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    multiple: PropTypes.bool,
    autofocus: PropTypes.bool,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
  };
}

export default CountryWidget;
