const Response = require("../Model/response.model.js");

// Server-side example to check values are stored correctly
const saveResponse = async (req, res) => {
  const { formId, responses } = req.body;
  try {
    const newResponse = new Response({
      formId,
      responses: responses.map(r => ({
        chatId: r.chatId,
        response: r.response,
        label: r.label,
        value: r.response 
      }))
    });
    await newResponse.save();
    res.status(201).json({ message: "Responses saved successfully" });
  } catch (error) {
    console.error("Error saving responses:", error);
    res.status(500).json({ error: "Error saving responses" });
  }
};



const getAllResponses = async (req, res) => {
  try {
    const responses = await Response.find({}).populate('formId', 'name fields');
    if (!responses || responses.length === 0) {
      return res.status(404).json({ message: "No responses found" });
    }
    res.status(200).json(responses);
  } catch (error) {
    console.error("Error retrieving responses:", error);
    res.status(500).json({ error: "Error retrieving responses" });
  }
};

module.exports = {
  saveResponse,
  getAllResponses
};
