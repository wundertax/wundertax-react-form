module.exports = {
  schema: {
    title: "A registration form",
    description: "A simple form example.",
    type: "object",
    required: ["firstName", "lastName"],
    properties: {
      firstName: {
        type: "string",
        title: "First name",
      },
      lastName: {
        type: "string",
        title: "Last name",
      },
      age: {
        type: "integer",
        title: "Age",
      },
      date: {
        type: "string",
        title: "Date",
        format: "date",
      },
      email: {
        type: "string",
        title: "Email",
      },
      bio: {
        type: "string",
        title: "Bio",
      },
      password: {
        type: "string",
        title: "Password",
        minLength: 3,
      },
      country: {
        type: "string",
        title: "Country",
      },
      amount: {
        type: "string",
        title: "Amount",
      },
      telephone: {
        type: "string",
        title: "Telephone",
        minLength: 10,
      },
    },
  },
  uiSchema: {
    "ui:options": {
      displayTitle: true,
      displayDescription: true,
    },
    firstName: {
      "ui:autofocus": true,
      "ui:emptyValue": "",
    },
    age: {
      "ui:widget": "updown",
      "ui:title": "Age of person",
      "ui:description": "(earthian year)",
    },
    email: {
      "ui:widget": "email",
    },
    bio: {
      "ui:widget": "textarea",
    },
    password: {
      "ui:widget": "password",
      "ui:help": "Hint: Make it strong!",
    },
    date: {
      "ui:title": "A date",
    },
    country: {
      "ui:widget": "CountryWidget",
      "ui:placeholder": "Germany",
    },
    amount: {
      "ui:widget": "CurrencyWidget",
      "ui:currency": "USD",
    },
    telephone: {
      "ui:options": {
        inputType: "tel",
      },
    },
  },
  formData: {
    firstName: "Elon",
    lastName: "Musk",
    age: 43,
    email: "overlord@teslax.net",
    bio: "Moving Making, one planet at the time.",
    password: "mars_or_die",
    country: "us",
    amount: "42.12",
  },
};
