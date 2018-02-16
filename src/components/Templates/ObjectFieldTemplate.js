import React from 'react';
import { Container } from 'semantic-ui-react';

function ObjectFieldTemplate({ TitleField, properties, title, description }) {
  return (
    <Container>
      {properties.map(prop => (
        <Container key={prop.content.key}>
          {prop.content}
        </Container>
      ))}
    </Container>
  );
}

export default ObjectFieldTemplate;