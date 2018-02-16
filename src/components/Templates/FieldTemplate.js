import React from 'react';
import { Container, Form, Label } from 'semantic-ui-react';


function FieldTemplate(props) {

  const { id, classNames, label, rawHelp, required, description, rawErrors, children } = props;
  let errors = null;
  let help = null;
  if (rawHelp !== undefined) {
    help = <Container> { rawHelp } </Container>;
  }
  if (rawErrors !== undefined) {
    errors = <Label basic color='red' pointing='above'> { rawErrors.join(', ') } </Label>;
  }
  return (
    <Form.Field classNames={classNames}>
      <label htmlFor={id}>{label}{required ? "*" : null}</label>
      { description }
      <Container>{children}</Container>
      { errors }
      { help }
    </Form.Field>
  );
}

export default FieldTemplate;