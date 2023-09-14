const express = require("express");

const app = express();
const PORT = 8000;

app.listen(PORT, () => {
  console.log(`App listening to port ${PORT}`);
});
