// models/Form.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FormSchema = new Schema({
  userId: {
    type: String,
    // required: true,
  },
  folderId: {
    type: String,
    // required: true,
  },
  name: {
    type: String,
    required: true,
  },
  fields: [
    {
      label: { type: String,  },
      value: { type: String,  },
      type: { type: String,  },
      readOnly: { type: Boolean, },
    },
  ],
  views: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Form', FormSchema);
