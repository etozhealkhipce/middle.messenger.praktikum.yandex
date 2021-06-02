const express = require("express");

const app = express();

app.use("/", express.static(`${__dirname}/dist`));

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${3000}!`);
});
