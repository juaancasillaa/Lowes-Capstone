// server/server.js
const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 5000;

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "..", "build")));

// API route example (optional, add as needed)
app.get("/api/hello", (req, res) => {
  res.send({ message: "Hello from the server!" });
});

// All other requests should send back the React app's index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
