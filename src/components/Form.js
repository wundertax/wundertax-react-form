import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import { fields } from "./Fields";
import { widgets } from "./Widgets";
import {
  ArrayFieldTemplate,
  FieldTemplate,
  ObjectFieldTemplate,
} from "./Templates";
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
    className: "ui form",
    ArrayFieldTemplate: ArrayFieldTemplate,
    FieldTemplate: FieldTemplate,
    ObjectFieldTemplate: ObjectFieldTemplate,
  };

  render() {
    const props = this.props;
    const children = props.children;
    return (
      <Form {...props}>
        {children ? children : <Button type="submit">Submit</Button>}
      </Form>
    );
  }
}

export default WunderForm;
