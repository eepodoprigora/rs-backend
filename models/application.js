const mongoose = require("mongoose");

const ApplicationSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^\+?\d{10,15}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  description: {
    type: String,
  },
  date: {
    type: String,
  },
});

const Application = mongoose.model("Application", ApplicationSchema);

module.exports = Application;
