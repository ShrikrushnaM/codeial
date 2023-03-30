const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

const port = 8000;
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local");
const MongoStore = require("connect-mongo")(session);
const sassMiddleware = require("node-sass-middleware");

app.use(
  sassMiddleware({
    src: "./assets/scss",
    dest: "./assets/css",
    debug: true,
    outputStyle: "extended",
    prefix: "/css",
  })
);

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static("./assets"));

app.use(expressLayouts);

//extract sytle and script from sub pages into layouts
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//set up the view engine and views
app.set("view engine", "ejs");
app.set("views", "./views");

//mongo store is used to store the session cookie in the db
app.use(
  session({
    name: "codeial",
    secret: "blansdjdc",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: new MongoStore(
      {
        mongooseConnection: db,
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || "connect-mongoo setup OKK");
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//use express router
app.use("/", require("./routes/index"));

app.listen(port, (err) => {
  if (err) {
    console.log(`Error: ${err}`);
  } else {
    console.log(`Server is running on port ${port}`);
  }
});
