const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();
var http = require("http").createServer(app);

const io = require("socket.io")(http);

const { getMpByPostcode } = require("./api-functions");

//initialise express and define a port
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/api/postcode/:postcodeInput", (req, res) => {
  getMpByPostcode(req.params.postcodeInput).then((response) =>
    res.send(response)
  );
});

app.get("/api/webhook", (req, res) => {
  res.send({ express: "Hello From Express" });
});

let storage = {};

io.on("connection", (socket) => {
  console.log("New client connected" + socket.id);
  socket.send("Hello!");
  socket.on("initial_data", () => {
    console.log("initial data");
  });
});

app.post("/hook", (req, res) => {
  storage = req.body; // Call your action on the request here
  res.status(200).end(); // Responding is important
  console.log(storage);
});

http.listen(port, () =>
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
