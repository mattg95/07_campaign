require("dotenv").config();

const key = process.env.REACT_APP_TWFY_KEY;
const axios = require("axios");
const theyWorkForYouUrl = "https://www.theyworkforyou.com/api/";

exports.getMpByPostcode = (postcode) => {
  postcode.replace(/\s/g, "+");
  return axios
    .get(
      theyWorkForYouUrl +
        "getMp?key=" +
        key +
        "&postcode=" +
        postcode +
        "&output=js"
    )
    .then(({ data }) => {
      if (data.error) {
        throw new Error("Error");
      } else {
        return data;
      }
    })
    .catch(() => {
      return { error: "Could not retrieve MP" };
    });
};
