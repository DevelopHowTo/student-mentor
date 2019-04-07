const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const users = require("./routes/apis/users");
const profile = require("./routes/apis/profile");
const posts = require("./routes/apis/post");
const bodyParser = require("body-parser");
const passport = require("passport");

const port = process.env.PORT || 5000;

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

//Passport middleware
app.use(passport.initialize());

//Password config
require("./config/passport")(passport);

app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/post", posts);

app.get("*", (req,res,next) => {
  res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
})
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/StudentMentor")
  .then(() => {
    console.log("MongoDB connected");
    app.listen(port, () => console.log(`Server on port on ${port}`));
  })
  .catch(err => console.log(err));
