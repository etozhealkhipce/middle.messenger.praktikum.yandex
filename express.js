const express = require("express");
const path = require("path");

const app = express();

app.use("/", express.static(path.join(__dirname, "dist")));

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${3000}!`);
});
