import React, { Component } from "react";
import { render } from "react-dom";
import { Container, Grid, Segment } from 'semantic-ui-react';
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
        <Container>
          {" " + title}
        </Container>
        <CodeMirror
          value={this.state.code}
          onChange={this.onCodeChange}
          options={Object.assign({}, cmOptions, { theme })}
        />
      </Container>
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
      shareURL: null,
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

  setLiveValidate = ({ formData }) => this.setState({ liveValidate: formData });

  onFormDataChange = ({ formData }) => this.setState({ formData, shareURL: null });

  render() {

    const {
      schema,
      uiSchema,
      formData,
      liveValidate,
      validate,
      editor,
      transformErrors,
    } = this.state;

    return (
      <Container>
        <Container>
          <Form
            schema={liveValidateSchema}
            formData={liveValidate}
            onChange={this.setLiveValidate}>
            <div />
          </Form>
        </Container>
        <Grid container stackable verticalAlign='top'>
          <Grid.Row style={{ marginTop: '2em' }}>
            <Grid.Column width={8}>
              <Segment>
                <Editor
                  title="formData"
                  theme={editor}
                  code={toJson(formData)}
                  onChange={this.onFormDataEdited}
                />
              </Segment>
              <Segment>
                <Editor
                  title="JSONSchema"
                  theme={editor}
                  code={toJson(schema)}
                  onChange={this.onSchemaEdited}
                />
              </Segment>
              <Segment>
                <Editor
                  title="UISchema"
                  theme={editor}
                  code={toJson(uiSchema)}
                  onChange={this.onUISchemaEdited}
                />
              </Segment>
            </Grid.Column>
            <Grid.Column floated='right' width={8}>
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
      </Container>
    );
  }
}

render(
  <App />, 
  document.getElementById("app")
);
