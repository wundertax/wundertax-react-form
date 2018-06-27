import { expect } from "chai";
import { createFormComponent, createSandbox } from "./test_utils";

describe("Form", () => {
  let sandbox;

  beforeEach(() => {
    sandbox = createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe("Empty schema", () => {
    it("should render a form tag", () => {
      const { node } = createFormComponent({ schema: {} });

      expect(node.tagName).eql("FORM");
    });

    it("should have 'ui form' as classes", () => {
      const { node } = createFormComponent({ schema: {} });

      expect(node.className).eql("ui form");
    });

    it("should render a submit button", () => {
      const { node } = createFormComponent({ schema: {} });

      expect(node.querySelectorAll("button[type=submit]")).to.have.length.of(1);
    });
  });
});
