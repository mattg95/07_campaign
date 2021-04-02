require("dotenv").config();

const axios = require("axios");
const apiBase =
  "https://members-api.parliament.uk/api/Members/Search?Location=";

exports.getMpByPostcode = (postcode) => {
  return axios
    .get(apiBase + postcode + "&House=Commons&IsEligible=true")
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
