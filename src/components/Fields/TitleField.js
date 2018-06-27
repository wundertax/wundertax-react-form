import PropTypes from "prop-types";
import React, { Component } from "react";
import { Header } from "semantic-ui-react";

class TitleField extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Header as="h2">{this.props.title}</Header>;
  }
}

if (process.env.NODE_ENV !== "production") {
  TitleField.propTypes = {
    title: PropTypes.string,
    required: PropTypes.bool,
  };
}

export default TitleField;
