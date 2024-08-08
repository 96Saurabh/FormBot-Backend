const express = require("express");
const responseRouter = express.Router();
const responseController = require("../Controller/response.controller.js");

responseRouter.post('/save-responses', responseController.saveResponse);
responseRouter.get('/responses', responseController.getAllResponses);

module.exports = responseRouter;
