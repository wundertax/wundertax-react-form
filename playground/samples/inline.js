module.exports = {
  schema: {
    type: "object",
    required: ["workEmail"],
    properties: {
      workEmail: {
        type: "string",
        title: "Work Email",
      },
      personalEmail: {
        type: "string",
        title: "Personal Email",
      },
    },
  },
  uiSchema: {
    "ui:options": {
      inline: true,
    },
    workEmail: {
      "ui:widget": "email",
    },
    personalEmail: {
      "ui:widget": "email",
      "ui:title": "Email pessoal",
      "ui:description": "Adding a text here to show how text breaks",
      "ui:icon": "envelope",
    },
  },
  formData: {},
};
