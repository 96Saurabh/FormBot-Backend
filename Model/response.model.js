const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
  formId: String,
  responses: [
    {
      chatId: String,
      response: String,
      label: String, 
      value: String 
    }
  ]
}, { timestamps: true });

const Response = mongoose.model('Response', responseSchema);

module.exports = Response;
