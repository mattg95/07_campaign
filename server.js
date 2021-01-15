const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();
var http = require("http").createServer(app);
const fs = require("fs");

const io = require("socket.io")(http);

const { getMpByPostcode } = require("./api-functions");
const { generateEmail } = require("./formResponseHandler");

//initialise express and define a port
const port = process.env.PORT || 5000;
const client = require("socket.io-client")("http://localhost:" + port);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const makeFileName = () => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

app.get("/api/postcode/:postcodeInput", (req, res) => {
  getMpByPostcode(req.params.postcodeInput).then((response) =>
    res.send(response)
  );
});

app.post("/hook", (req, res) => {
  res.status(200).end(); // Responding is important
  console.log(req.body);
  client.emit("create", req.body);
});

//our webhook is triggered by the post request above
io.on("connection", (socket) => {
  socket.on("create", (data) => {
    fs.writeFileSync(
      `./tests/exampleResponses/${makeFileName()}.json`,
      JSON.stringify(data)
    );
    io.emit("typeform-incoming", {
      formToken: data.form_response.token,
      generatedEmail: generateEmail(data.form_response),
    });
  });
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
