const express = require("express");
const chatRouter = express.Router();
const chatController = require("../Controller/chat.controller");
const verifyToken = require("../Middelwares/verifyToken");

// Folder routes
chatRouter.post("/create-folder", verifyToken, chatController.createFolder);
chatRouter.get("/get-folders", verifyToken, chatController.getFolders);
chatRouter.delete("/delete-folder/:folderId", verifyToken, chatController.deleteFolder);

// Form routes
chatRouter.get("/get-forms/:folderId", verifyToken, chatController.getFormsByFolder);
chatRouter.post("/create-form", verifyToken, chatController.createForm);
chatRouter.get("/getsingle-form/:folderId/:formId", verifyToken, chatController.getSingleForm);
chatRouter.get("/getsingle-form/:formId", chatController.getSingleUserForm);
chatRouter.get("/generate-shareable-url/:formId", chatController.generateShareableUrl);

module.exports = chatRouter;
