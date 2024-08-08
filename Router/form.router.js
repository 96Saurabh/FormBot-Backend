const express = require("express");
const verifyToken = require("../Middelwares/verifyToken");
const formController = require("../Controller/form.controller.js");
const formRouter = express.Router();

formRouter.post("/create-chat", formController.createForm);
formRouter.get("/:id", formController.getFormById);
formRouter.get('/shareable-link/:formId', formController.getShareableLink);
formRouter.get('/increment-views/:formId', formController.views);
formRouter.get('/form/:formId', formController.getFormDetails);
formRouter.get('/', formController.getForms);

module.exports = formRouter;
