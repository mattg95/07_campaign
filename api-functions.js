require("dotenv").config();

const key = process.env.REACT_APP_TWFY_KEY;
const axios = require("axios");
const theyWorkForYouUrl = "https://www.theyworkforyou.com/api/";

exports.getMpByPostcode = (postcode) => {
  const errors = {};
  postcode.replace(/\s/g, "+");
  return (
    axios
      .get(
        theyWorkForYouUrl +
          "getMp?key=" +
          key +
          "&postcode=" +
          postcode +
          "&output=js"
      )
      //error handling needs simplifying
      .then(({ data }) => {
        if (data.error) {
          errors.postcode = "Invalid postcode";
          return errors;
        } else {
          return data;
        }
      })
      .catch((error) => {
        console.error(error);
        errors.postcode = "Could not retrieve MP";
      })
  );
};
