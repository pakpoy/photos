const express = require("express");
const passport = require("passport");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
require("dotenv").config({ path: path.resolve(__dirname, "..", ".env") });
const port = 3000;

app.use(passport.initialize());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/photos", require("./routes/photos"));

app.use(express.static(path.join(__dirname, "/../frontend/dist")));

app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/../frontend/dist/index.html"));
});

app.listen(port, () => {
  console.log(`photos app listening on port ${port}`);
});
