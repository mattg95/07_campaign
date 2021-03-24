//these map the question ids from the form onto our json object
export const questionKeys: Object = {
  gil6UCe4dG9T: "supportAid",
  wKGNjgRDml1H: "motivation",
  MRPxTl6j1QAw: "whichCountry",
  Z4awe4sDljLR: "countryLinks",
  EejpFBEzP9wK: "conservative",
  IdqRPd6SUMVh: "religion",
  vdZgYVyiLE13: "meetMp",
  UhNb2Z5nqHtb: "meetMpDoubleCheck",
  ghzBmQTQ2npF: "emailAddress",
  uLPPjjg5B0Bn: "homeAddress",
  hgdzZ05GxSAs: "postcode",
  daZZA6TwyMP5: "name",
};
interface Religion {
  adj:string,
  noun:string
}
export const religions: Religion[] = [
  { adj: "Christian", noun: "Christian" },
  { adj: "Muslim", noun: "Muslim" },
  { adj: "Hindu", noun: "Hindu" },
  { adj: "Sikh", noun: "Sikh" },
  { adj: "Jewish", noun: "Jew" },
  { adj: "Buddhist", noun: "Buddhist" },
  { adj: "religious", noun: "person of faith" },
];
