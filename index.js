const express = require("express");
const app = express();

const port = 8000;
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");

app.use(express.static("./assets"));

app.use(expressLayouts);

//extract sytle and script from sub pages into layouts
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//use express router
app.use("/", require("./routes/index"));

//set up the view engine and views
app.set("view engine", "ejs");
app.set("views", "./views");

app.listen(port, (err) => {
  if (err) {
    console.log(`Error: ${err}`);
  } else {
    console.log(`Server is running on port ${port}`);
  }
});
