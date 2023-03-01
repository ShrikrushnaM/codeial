const express = require("express");
const app = express();

const port = 8000;

app.use("/", require("./routes/index"));

app.listen(port, (err, data) => {
  if (err) {
    console.log(`Error: ${err}`);
  } else {
    console.log(`Server is running on port ${port}`);
  }
});
