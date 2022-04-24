const express = require("express");
const app = express();

const port = process.env.PORT || 4040;

app.get("/", (req, res) => {
  res.send("Hello ak World!");
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
