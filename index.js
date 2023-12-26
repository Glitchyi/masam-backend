const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const cors = require("cors");

dotenv.config();

// Connect to MongoDB

let client = mongoose.connect(process.env.MONGOURL);
let events = mongoose.connection.collection("events");
let users = mongoose.connection.collection("users");

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  start: Date,
  end: Date,
});

events = mongoose.model("events", eventSchema);

const app = express();
const port = 3000;

// Middleware to parse JSON in request body
app.use(bodyParser.json());
app.use(cors());

// Routes
app.post("/events", (req, res) => {
  let event = req.body;
  console.log(event);
  events.insertOne(event, (err, result) => {
    if (err) {
      console.log(err);
    }
  });
  res.json({ message: "Hello World!" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
