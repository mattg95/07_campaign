const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const { getMpByPostcode } = require("./controllers/PostcodeController");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/api/:postcode", (req, res) => {
  getMpByPostcode(req.params.postcode).then((response) => res.send(response));
});

app.post("/api/world", (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));
