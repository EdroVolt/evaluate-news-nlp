var path = require("path");
const express = require("express");
const mockAPIResponse = require("./mockAPI.js");
var aylien = require("aylien_textapi");

const dotenv = require("dotenv");
dotenv.config();

// set aylien API credentials
// NOTICE that textapi is the name I used, but it is arbitrary.
// You could call it aylienapi, nlp, or anything else,
//   just make sure to make that change universally!
var textapi = new aylien({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY,
});

const app = express();

// middle-ware body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

app.use(express.static("dist"));

console.log(__dirname);

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
});

// designates what port the app will listen to for incoming requests
app.listen(8082, function () {
  console.log("Example app listening on port 8082!");
});

app.post("/text-api", function (req, res) {
  textapi.classify({
      text: req.body.formText,
    },
    function (error, response) {
      if (error === null) {
        response["categories"].forEach(function (c) {
          console.log(c);
        });

        console.log(req.body);
        res.send(response["categories"]);
      }
    }
  );
});