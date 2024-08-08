require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const router = require("./Router/auth.router");
const chatRouter = require("./Router/chat.router");
const formRouter = require("./Router/form.router");
const responseRouter = require("./Router/response.router");

const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("DB Connected!"))
  .catch((error) => console.log("DB failed to connect", error));

app.get("/api/health", (req, res) => {
  res.json({
    service: "Backend Joblisting server",
    status: "active",
    time: new Date(),
  });
});

app.use("/api/v1/auth", router);
app.use("/api/v1/chat", chatRouter);
app.use("/api/v1/form", formRouter);
app.use("/api/v1/response", responseRouter);

app.use("*", (req, res) => {
  res.status(404).json({ errorMessage: "Route not found!" });
});

app.use((error, req, res, next) => {
  console.log(error);
  res.status(500).json({ errorMessage: "Something went wrong!" });
});

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Backend server running at port ${PORT}`);
});
