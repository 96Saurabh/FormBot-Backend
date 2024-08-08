const mongoose = require("mongoose");

const folderSchema = new mongoose.Schema(
  {
    folderName: {
      type: String,
      required: true,
    },

    refUserId: {
      type: mongoose.ObjectId,
    },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

module.exports = mongoose.model("Folder", folderSchema);
