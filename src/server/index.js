var path = require("path");
const express = require("express");
const mockAPIResponse = require("./mockAPI.js");
// You could call it aylienapi, or anything else
const dotenv = require("dotenv");
dotenv.config();
console.log(`Your API key is ${process.env.API_KEY}`);

const app = express();

app.use(express.static("dist"));

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
  // res.sendFile(path.resolve("src/client/views/index.html"));
});

// app.get("/test", function (req, res) {
//   console.log("test");
//   res.send(mockAPIResponse);
// });
app.get("/apiKey", function (req, res) {
  res.send({ key: process.env.API_KEY });
});
// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
  console.log("Example app listening on port 8081!");
});
