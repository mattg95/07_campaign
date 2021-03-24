require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();
const http = require("http").createServer(app);
const crypto = require("crypto");
const fs = require("fs");
const io = require("socket.io")(http);

const { getMpByPostcode } = require("./apiCalls");
const { generateEmail } = require("./emailGenerator");

//initialise express and define a port
const port = process.env.PORT || 5000;
const client = require("socket.io-client")("http://localhost:" + port);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const writeDataToExampleResponsesFile = (data) => {
  // Use hashed answers as filename to avoid generating multiple files containing the same responses.
  const answersJson = JSON.stringify(data.form_response.answers);
  const answersHashCode = crypto
    .createHash("md5")
    .update(answersJson)
    .digest("hex");
  const filePath = `./tests/exampleTypeformResponses/${answersHashCode}.json`;
  fs.writeFileSync(filePath, JSON.stringify(data));
  console.log("Wrote form data to", filePath);
};

const axios = require("axios");
const membersApiBase =
  "https://members-api.parliament.uk/api/Members/Search?Location=";

exports.getMpByPostcode = (postcode) => {
  return axios
    .get(membersApiBase + postcode + "&House=Commons&IsEligible=true")
    .then(async ({ data }) => {
      if (!data.items.length) {
        throw new Error();
      }
      const contactInfoArr = data.items[0].links;
      const contactInfoUrl = contactInfoArr.find(
        ({ rel }) => (rel = "contactInformation")
      );
      return {
        full_name: data.items[0].value.nameDisplayAs,
        constituency: data.items[0].value.latestHouseMembership.membershipFrom,
        party: data.items[0].value.latestParty.name,
        mpEmailAddress: await axios
          .get(
            `https://members-api.parliament.uk/api${contactInfoUrl.href}/Contact`
          )
          .then(({ data }) => {
            const allContactDetailsArr = data.value;
            const consituencyDetails = allContactDetailsArr.find(
              ({ type }) => (type = "Constituency")
            );
            return consituencyDetails.email;
          })
          .catch(() => {
            return { error: "Could not retrieve MP contact details" };
          }),
      };
    })
    .catch(() => {
      return { error: "Could not retrieve MP" };
    });
};

app.get("/api/postcode/:postcodeInput", (req, res) => {
  getMpByPostcode(req.params.postcodeInput).then((response) =>
    res.send(response)
  );
});

app.post("/hook", (req, res) => {
  res.status(200).end(); // Responding is important
  client.emit("create", req.body);
});

//our webhook is triggered by the post request above
io.on("connection", (socket) => {
  socket.on("create", (data) => {
    generateEmail(data.form_response).then((generatedEmail) => {
      io.emit("typeform-incoming", {
        formToken: data.form_response.token,
        generatedEmail: generatedEmail,
      });
      if (app.settings.env === "development") {
        writeDataToExampleResponsesFile(data);
      }
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
