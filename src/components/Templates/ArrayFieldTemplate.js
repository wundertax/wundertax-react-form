import React from "react";
import { Container, Segment, Button, Header } from "semantic-ui-react";

function ElementActionButtons(props) {
  const element = props.element;
  return (
    <Container>
      {element.hasMoveDown && (
        <Button
          circular
          icon="arrow down"
          onClick={element.onReorderClick(element.index, element.index + 1)}
        />
      )}
      {element.hasMoveUp && (
        <Button
          circular
          icon="arrow up"
          onClick={element.onReorderClick(element.index, element.index - 1)}
        />
      )}
      <Button
        circular
        icon="delete"
        onClick={element.onDropIndexClick(element.index)}
      />
    </Container>
  );
}

function ArrayFieldTemplate(props) {
  return (
    <Segment basic className={props.className}>
      {props.title && <Header as="h3">{props.title}</Header>}
      {props.description && <Header as="h4">{props.description}</Header>}
      {props.items &&
        props.items.map(element => (
          <Container key={element.index}>
            {element.children}
            <ElementActionButtons element={element} />
          </Container>
        ))}

      {props.canAdd && (
        <Button circular icon="add" onClick={props.onAddClick} />
      )}
    </Segment>
  );
}

export default ArrayFieldTemplate;
