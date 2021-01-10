const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const path = require("path");
const { getMpByPostcode } = require("./api-functions");

const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join("./react-app", "build")));

app.get("/*", (req, res) => {
  res.sendFile(path.join("./react-app", "build", "index.html"));
});

app.get("/api/postcode/:postcodeInput", (req, res) => {
  getMpByPostcode(req.params.postcodeInput).then((response) =>
    res.send(response)
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));
