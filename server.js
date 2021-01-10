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

app.get("/api/postcode/:postcodeInput", (req, res) => {
  getMpByPostcode(req.params.postcodeInput).then((response) =>
    res.send(response)
  );
});

app.get("/api/typeform/:webhook", (req, res) => {
  console.log(req.params);
});

app.listen(port, () =>
  console.log(
    `Listening on port ${port}, process env = ${process.env.NODE_ENV}`
  )
);

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "react-app/build")));

  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "react-app/build", "index.html"));
  });
}
