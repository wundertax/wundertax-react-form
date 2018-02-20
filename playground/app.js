import React, { Component } from "react";
import { render } from "react-dom";
import { Container, Grid, Menu, Dropdown } from 'semantic-ui-react';
import CodeMirror from "react-codemirror2";
import "codemirror/mode/javascript/javascript";
import { shouldRender } from "react-jsonschema-form/lib/utils";

import { samples } from "./samples";
import { Form } from "../src";

import "codemirror/lib/codemirror.css";

const log = type => console.log.bind(console, type);
const fromJson = json => JSON.parse(json);
const toJson = val => JSON.stringify(val, null, 2);

const liveValidateSchema = { 
  type: "boolean",
  title: "Live validation"
};

const displayJsonSchema = {
  type: "boolean",
  title: "Display Editors?"
};

const cmOptions = {
  theme: "default",
  height: "auto",
  viewportMargin: Infinity,
  mode: {
    name: "javascript",
    json: true,
    statementIndent: 2,
  },
  lineNumbers: true,
  lineWrapping: true,
  indentWithTabs: false,
  tabSize: 2,
};

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = { valid: true, code: props.code };
  }

  componentWillReceiveProps(props) {
    this.setState({ valid: true, code: props.code });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shouldRender(this, nextProps, nextState);
  }

  onCodeChange = (editor, metadata, code) => {
    this.setState({ valid: true, code });
    setImmediate(() => {
      try {
        this.props.onChange(fromJson(this.state.code));
      } catch (err) {
        this.setState({ valid: false, code });
      }
    });
  };

  render() {
    const { title, theme } = this.props;
    return (
      <Container>
        {" " + title}
        <CodeMirror
          value={this.state.code}
          onChange={this.onCodeChange}
          options={Object.assign({}, cmOptions, { theme })}
        />
      </Container>
    );
  }
}

class Selector extends Component {
  constructor(props) {
    super(props);
    this.state = { current: "Simple" };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shouldRender(this, nextProps, nextState);
  }

  onLabelClick = label => {
    return event => {
      event.preventDefault();
      this.setState({ current: label });
      setImmediate(() => this.props.onSelected(samples[label]));
    };
  };

  render() {
    return (
      <Dropdown text='Examples' pointing>
        <Dropdown.Menu>
          {Object.keys(samples).map((label, i) => {
            return (
              <Dropdown.Item key={i} active={this.state.current === label ? true : undefined} onClick={this.onLabelClick(label)}>
                  {label}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

class App extends Component {

  constructor(props) {
    super(props);
    // initialize state with Simple data sample
    const { schema, uiSchema, formData, validate } = samples.Simple;
    this.state = {
      form: false,
      schema,
      uiSchema,
      formData,
      validate,
      editor: "default",
      theme: "default",
      liveValidate: true,
      displayJson: true,
      shareURL: null,
      columns: {
        editors: 10,
        form: 6
      }
    };
  }

  componentDidMount() {
    const hash = document.location.hash.match(/#(.*)/);
    if (hash && typeof hash[1] === "string" && hash[1].length > 0) {
      try {
        this.load(JSON.parse(atob(hash[1])));
      } catch (err) {
        alert("Unable to load form setup data.");
      }
    } else {
      this.load(samples.Simple);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shouldRender(this, nextProps, nextState);
  }

  load = data => {
    this.setState({ form: false }, _ =>
      this.setState({
        ...data,
        form: true
      })
    );
  };

  onSchemaEdited = schema => this.setState({ schema, shareURL: null });

  onUISchemaEdited = uiSchema => this.setState({ uiSchema, shareURL: null });

  onFormDataEdited = formData => this.setState({ formData, shareURL: null });

  setDisplayJsonSchema = ({ formData }) => this.setState(
    { displayJson: formData, columns: { editors: formData ? 10 : 0, form: formData ? 6 : 16 } }
  );

  setLiveValidate = ({ formData }) => this.setState({ liveValidate: formData });

  onFormDataChange = ({ formData }) => this.setState({ formData, shareURL: null });

  render() {

    const {
      schema,
      uiSchema,
      formData,
      liveValidate,
      displayJson,
      validate,
      editor,
      transformErrors,
    } = this.state;

    return (
      <Grid container stackable verticalAlign='top'>
        <Grid.Row>
          <Grid.Column width={16}>
             <Menu fixed='top'>
                <Container>
                  <Menu.Item header>Wundertax React Form</Menu.Item>
                  <Menu.Item>
                    <Selector onSelected={this.load} />
                  </Menu.Item>
                </Container>
             </Menu>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={8} style={{ marginTop: '2em' }}>
            <Form
              liveValidate={false}
              idPrefix={"validation_form"}
              schema={liveValidateSchema}
              formData={liveValidate}
              onChange={this.setLiveValidate}>
              <div />
            </Form>
          </Grid.Column>
          <Grid.Column width={8} floated='right' style={{ marginTop: '2em' }}>
            <Form
              liveValidate={false}
              idPrefix={"editors_form"}
              schema={displayJsonSchema}
              formData={displayJson}
              onChange={this.setDisplayJsonSchema}>
              <div />
            </Form>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={16}>
          { this.state.displayJson && (
            <Grid.Column width={ this.state.columns.editors }>
              <Grid stackable>
                <Grid.Row>
                  <Grid.Column width={16}>
                    <Editor
                      title="formData"
                      theme={editor}
                      code={toJson(formData)}
                      onChange={this.onFormDataEdited}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={8}>
                    <Editor
                      title="JSONSchema"
                      theme={editor}
                      code={toJson(schema)}
                      onChange={this.onSchemaEdited}
                    />
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <Editor
                      title="UISchema"
                      theme={editor}
                      code={toJson(uiSchema)}
                      onChange={this.onUISchemaEdited}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
            )
          }
          <Grid.Column floated='right' width={ this.state.columns.form }>
          {this.state.form && (
            <Form
              liveValidate={liveValidate}
              schema={ schema }
              uiSchema={ uiSchema }
              formData={ formData }
              onChange={this.onFormDataChange}
              onSubmit={({ formData }) =>
                console.log("submitted formData", formData)
              }
              validate={validate}
              onBlur={(id, value) =>
                console.log(`Touched ${id} with value ${value}`)
              }
              onFocus={(id, value) =>
                console.log(`Focused ${id} with value ${value}`)
              }
              transformErrors={transformErrors}
              onError={log("errors")}
            ></Form>
          )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

render(
  <App />, 
  document.getElementById("app")
);
