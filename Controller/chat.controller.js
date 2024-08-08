const Folder = require("../Model/folder.model");
const Form = require("../Model/form.model");
const { decodeJwtToken } = require("../Middelwares/verifyToken");
const { ObjectId } = require("mongoose");

const createFolder = async (req, res, next) => {
  try {
    const { folderName, refUserId } = req.body;

    if (!folderName) {
      return res.status(400).json({
        errorMessage: "Bad request",
      });
    }

    const userId = req.userId;

    const folderDetails = new Folder({
      folderName,
      refUserId: userId,
    });

    await folderDetails.save();
    res.json({ message: "Folder created successfully", folderDetails });
  } catch (error) {
    next(error);
  }
};

const getFolders = async (req, res, next) => {
  try {
    const userId = req.userId;

    const folders = await Folder.find({ refUserId: userId });

    res.json({ folders });
  } catch (error) {
    next(error);
  }
};

const deleteFolder = async (req, res, next) => {
  try {
    const { folderId } = req.params;
    const userId = req.userId;

    const folder = await Folder.findOneAndDelete({
      _id: folderId,
      refUserId: userId,
    });

    if (!folder) {
      return res
        .status(404)
        .json({ message: "Folder not found or not authorized" });
    }

    res.json({ message: "Folder deleted successfully" });
  } catch (error) {
    next(error);
  }
};

const createForm = async (req, res, next) => {
  try {
    const { formName, folderId } = req.body;

    if (!formName || !folderId) {
      return res.status(400).json({
        errorMessage: "Bad request",
      });
    }

    const userId = req.userId;

    // Check if the folder exists and belongs to the user
    const folder = await Folder.findOne({ _id: folderId, refUserId: userId });

    if (!folder) {
      return res.status(404).json({
        errorMessage:
          "Folder not found or you do not have access to this folder",
      });
    }

    const formDetails = new Form({
      formName,
      refUserId: userId,
      refFolderId: folderId,
    });

    await formDetails.save();
    res.json({ message: "Form created successfully", formDetails });
  } catch (error) {
    next(error);
  }
};

const getSingleForm = async (req, res, next) => {
  try {
    const { folderId, formId } = req.params;
    const userId = req.userId;

    // Check if the folder exists and belongs to the user
    const folder = await Folder.findOne({ _id: folderId, refUserId: userId });

    if (!folder) {
      return res.status(404).json({
        errorMessage:
          "Folder not found or you do not have access to this folder",
      });
    }

    // Find the form in the same folder and owned by the same user
    const form = await Form.findOne({
      _id: formId,
      refFolderId: folderId,
      refUserId: userId,
    });

    if (!form) {
      return res.status(404).json({
        errorMessage: "Form not found or you do not have access to this form",
      });
    }

    res.json({ form });
  } catch (error) {
    next(error);
  }
};

const getSingleUserForm = async (req, res, next) => {
  try {
    const { formId } = req.params;

    // Find the form by its ID
    const form = await Form.findById(formId);

    if (!form) {
      return res.status(404).json({
        errorMessage: "Form not found",
      });
    }

    res.json({ form });
  } catch (error) {
    next(error);
  }
};

const getFormsByFolder = async (req, res, next) => {
  try {
    const { folderId } = req.params;
    const userId = req.userId; // Assuming you want to ensure forms are fetched for the current user
    const forms = await Form.find({ folderId, userId });
    res.json({ forms });
  } catch (error) {
    next(error);
  }
};

// Controller for generating shareable URL
const generateShareableUrl = async (req, res) => {
  const { formId } = req.params;

  try {
    const form = await Form.findById(formId);
    console.log("Received formId:", formId);

    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    // Construct the shareable URL
    const baseUrl = "http://localhost:5173"; // Replace with your actual frontend URL
    const shareableUrl = `${baseUrl}/form/${formId}`;
    res.json({ shareableUrl });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

module.exports = {
  createFolder,
  getFolders,
  deleteFolder,

  getFormsByFolder,
  createForm,
  getSingleForm,
  getSingleUserForm,
  generateShareableUrl,
};
