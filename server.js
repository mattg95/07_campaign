const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const { getMpByPostcode } = require("./api-functions");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/api/postcode/:postcodeInput", (req, res) => {
  getMpByPostcode(req.params.postcodeInput).then((response) =>
    res.send(response)
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));
