module.exports = {
  schema: {
    type: "object",
    required: ["Email"],
    properties: {
      workEmail: {
        type: "string",
        title: "Work Email",
      },
      personalEmail: {
        type: "string",
        title: "Personal Email",
      }
    },
  },
  uiSchema: {
    "ui:options": {
      "inline": true
    },
    personalEmail: {
      "ui:widget": "email",
    },
    workEmail: {
      "ui:widget": "email",
    }
  },
  formData: {
  },
};
