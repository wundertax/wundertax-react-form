import PropTypes from 'prop-types';
import React, { Component } from 'react';


class DescriptionField extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const description = this.props.description;
    if (description === undefined) {
      return null;
    }
    return (
      <p id={this.props.id}><small>{description}</small></p>
    );
  }

}

if (process.env.NODE_ENV !== "production") {
  DescriptionField.propTypes = {
    id: PropTypes.string,
    description: PropTypes.string
  };
}

export default DescriptionField;