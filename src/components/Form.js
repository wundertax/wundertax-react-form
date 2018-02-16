import React, { Component } from 'react';
import { Container, Button } from 'semantic-ui-react';
import { fields } from "./Fields";
import { widgets } from "./Widgets";
import { FieldTemplate, ObjectFieldTemplate } from "./Templates";
import Form from "react-jsonschema-form";


class WunderForm extends Component {

  static defaultProps = {
    uiSchema: {},
    noValidate: false,
    liveValidate: true,
    safeRenderCompletion: false,
    noHtml5Validate: true,
    fields: fields,
    widgets: widgets,
    showErrorList: false,
    className: 'ui form',
    FieldTemplate: FieldTemplate,
    ObjectFieldTemplate: ObjectFieldTemplate,
  };

  render() {
    const props = this.props;
    const children = props.children;
    return (
        <Form
          {...props}
        >
          {children ? (
            children
          ) : (
            <Container>
              <Button type="submit">Submit</Button>
            </Container>
          )}
        </Form>
    );
  }
}

export default WunderForm;