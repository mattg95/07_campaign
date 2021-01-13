const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();
var http = require("http").createServer(app);
const fs = require("fs");

const io = require("socket.io")(http);

const { getMpByPostcode } = require("./api-functions");

//initialise express and define a port
const port = process.env.PORT || 5000;
const client = require("socket.io-client")("http://localhost:" + port);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/api/postcode/:postcodeInput", (req, res) => {
  getMpByPostcode(req.params.postcodeInput).then((response) =>
    res.send(response)
  );
});

let i = 0;

io.on("connection", (socket) => {
  // this will be triggered by client sides emitting 'create'
  socket.on("create", (data) => {
    fs.writeFile(
      `./exampleResponses/example${i}.txt`,
      JSON.stringify(data),
      () => {
        console.log(data);
      }
    );
    i++;
    io.emit("typeform-incoming", data);
  });
});

app.post("/hook", (req, res) => {
  res.status(200).end(); // Responding is important
  console.log(req.body);
  client.emit("create", { data: req.body });
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
