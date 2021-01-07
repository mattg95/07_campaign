require("dotenv").config();

const TWFY_API = "https://www.theyworkforyou.com/api/";
const KEY = process.env.REACT_APP_TWFY_KEY;
const axios = require("axios");

const postcodeToConstituencyAPIReq = (postcode) => {
  postcode.replace(/\s/g, "+");
  return TWFY_API + "getMp?key=" + KEY + "&postcode=" + postcode + "&output=js";
};

exports.getMpByPostcode = (postcode) => {
  const errors = {};
  return axios
    .get(postcodeToConstituencyAPIReq(postcode))
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
    });
};
