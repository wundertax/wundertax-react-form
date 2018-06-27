import React from "react";
import { Container, Form, Label } from "semantic-ui-react";

function cleanBootstrapClasses(classNames) {
  let response = classNames;
  const replacements = [
    ["field", ""],
    ["form-group", ""],
    ["has-error", "error"],
  ];
  replacements.forEach(function(key, value) {
    response = response.replace(key, value);
  });
  return response;
}

function FieldTemplate(props) {
  const {
    id,
    label,
    children,
    rawErrors,
    rawHelp,
    description,
    hidden,
    required,
    displayLabel,
  } = props;

  let classNames = cleanBootstrapClasses(props.classNames);

  if (hidden) {
    return children;
  }
  let errors = null;
  let help = null;
  if (rawHelp !== undefined) {
    help = <Container> {rawHelp} </Container>;
  }
  if (rawErrors !== undefined) {
    errors = (
      <Label basic color="red" pointing="above">
        {" "}
        {rawErrors.join(", ")}{" "}
      </Label>
    );
    classNames = classNames.replace("has-error", "error");
  }
  return (
    <Form.Field className={classNames}>
      {displayLabel && (
        <label htmlFor={id}>
          {label}
          {required ? "*" : null}
        </label>
      )}
      {displayLabel && description ? description : null}
      {children}
      {errors}
      {help}
    </Form.Field>
  );
}

export default FieldTemplate;
