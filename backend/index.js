const express = require("express");
const passport = require("./services/passport");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config({ path: path.resolve(__dirname, "..", ".env") });
const port = 3000;

mongoose.connect(process.env.MONGODB, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Atlas Connection Successful');
    require("./update");
});


app.use(passport.initialize());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/token",   passport.authenticate("password", { session: false })
, require("./routes/token"));

app.use("/api/photos", passport.authenticate("token", {session: false}), require("./routes/photos"));

// passport.authenticate("token", {session: false})

app.use(express.static(path.join(__dirname, "/../frontend/dist")));

app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/../frontend/dist/index.html"));
});

app.listen(port, () => {
  console.log(`photos app listening on port ${port}`);
});


