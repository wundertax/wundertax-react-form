import React from 'react';
import { Container, Form, Label } from 'semantic-ui-react';


function cleanBootstrapClasses(classNames) {
  let response = classNames;
  [ 'field', 'form-group'].forEach(function(element) {
    response = response.replace(element, '');
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

  const classNames = cleanBootstrapClasses(props.classNames);

  if (hidden) {
    return children;
  }
  let errors = null;
  let help = null;
  if (rawHelp !== undefined) {
    help = <Container> { rawHelp } </Container>;
  }
  if (rawErrors !== undefined) {
    errors = <Label basic color='red' pointing='above'> { rawErrors.join(', ') } </Label>;
  }
  return (
    <Form.Field className={classNames}>
      { displayLabel && <label htmlFor={id}>{label}{required ? "*" : null}</label>}
      { displayLabel && description ? description : null }
      {children}
      { errors }
      { help }
    </Form.Field>
  );
}

export default FieldTemplate;