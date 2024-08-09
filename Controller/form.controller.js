const Form = require("../Model/form.model");
require("dotenv").config();

const createForm = async (req, res) => {
  try {
    const { userId, folderId, name, fields } = req.body;

    if (!name || !fields) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newForm = new Form({
      userId,
      folderId,
      name,
      fields,
    });

    const savedForm = await newForm.save();

    // Generate the shareable link
    const shareableLink = `${process.env.BASE_URL}/form/${savedForm._id}`;

    res.status(201).json({ formId: savedForm._id, shareableLink });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const getFormById = async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }
    res.status(200).json(form);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};




const getShareableLink = async (req, res) => {
  try {
    const { formId } = req.params;

    // Validate formId
    if (!formId) {
      return res.status(400).json({ message: "Form ID is required" });
    }

    // Check if form exists
    const form = await Form.findById(formId);
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    // Generate the shareable link
    const shareableLink = `${process.env.BASE_URL}/form/${formId}`;

    res.status(200).json({ shareableLink });
  } catch (error) {
    res.status(500).json({ message: "Error generating shareable link", error });
  }
};


const views = async (req, res) => {
  try {
    const { formId } = req.params;
    const form = await Form.findById(formId);

    if (form) {
      form.views = (form.views || 0) + 1;
      await form.save();
      res.status(200).json({ message: 'View count incremented', views: form.views });
    } else {
      res.status(404).json({ error: 'Form not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Controller to fetch form details
const getFormDetails = async (req, res) => {
  try {
    const { formId } = req.params;

    if (!formId) {
      return res.status(400).json({ message: "Form ID is required" });
    }

    const form = await Form.findById(formId);
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    res.status(200).json({
      formId: form._id,
      name: form.name,
      views: form.views,
      createdAt: form.createdAt,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching form details", error });
  }
};


const getForms = async (req, res) => {
  try {
    const forms = await Form.find();
    res.status(200).json(forms);
  } catch (error) {
    res.status(500).json({ message: "Error fetching forms", error });
  }
};



module.exports = {
  createForm,
  getFormById,
  getShareableLink,
  views,
  getFormDetails,
  getForms
};
