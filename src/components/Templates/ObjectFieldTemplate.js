import React, { Component } from "react";
import { Segment, Container, Form, Header } from "semantic-ui-react";

class FieldsList extends Component {
  render() {
    const properties = this.props.properties;
    const inline = this.props.inline;
    return (
      <Segment.Group
        horizontal={inline}
        style={{ border: "none", boxShadow: "none" }}>
        {properties.map(prop => (
          <Segment
            basic
            key={prop.content.key}
            style={{ border: "none", boxShadow: "none" }}>
            {prop.content}
          </Segment>
        ))}
      </Segment.Group>
    );
  }
}

function ObjectFieldTemplate(props) {
  const { properties, uiSchema } = props;
  const uiOptions =
    uiSchema && uiSchema["ui:options"] ? uiSchema["ui:options"] : undefined;
  const inline = uiOptions && uiOptions["inline"] === true ? true : undefined;
  const displayTitle =
    uiOptions && uiOptions["displayTitle"] === true ? true : false;
  const displayDescription =
    uiOptions && uiOptions["displayDescription"] === true ? true : false;
  return (
    <Container>
      {displayTitle ? <Header>{props.title}</Header> : ""}
      {displayDescription ? (
        <Header.Subheader>{props.description}</Header.Subheader>
      ) : (
        ""
      )}
      <Form.Group inline={inline} widths={16}>
        <FieldsList properties={properties} inline={inline} />
      </Form.Group>
    </Container>
  );
}

export default ObjectFieldTemplate;
