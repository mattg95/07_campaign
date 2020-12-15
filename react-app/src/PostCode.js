// Render Prop
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";

// Constant URL value for JAAS API
const TWFY_API = "https://www.theyworkforyou.com/api/";
const KEY = process.env.REACT_APP_TWFY_KEY;
function postcodeToConstituencyAPIReq(postcode) {
  postcode.replace(/\s/g, "+");
  return TWFY_API + "getMp?key=" + KEY + "&postcode=" + postcode + "&output=js";
}

function DisplayEmail(props) {
  const mp = props.mp;
  console.log("MP= " + mp);
  if (mp !== " ") {
    return (
      <div>
        <a
          href={
            "mailto:" +
            mp.replace(" ", ".") +
            ".mp@parliament.uk?Subject=stop%20taking%20away%20poor%20people%27s%20money&Body=please%20please%20please%20be%20a%20reasonable%20person"
          }
        >
          {mp.replace(" ", ".") + ".mp@parliament.uk"}
        </a>
      </div>
    );
  }
  return <div></div>;
}

class PostcodeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: " ",
      constituency: " ",
      mp: " ",
      party: " ",
      email: " ",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value.toUpperCase() });
  }

  handleSubmit(event) {
    console.log(this.state.value);
    event.preventDefault();
    console.log(postcodeToConstituencyAPIReq(this.state.value));
    axios
      .get(postcodeToConstituencyAPIReq(this.state.value))
      .then((response) => {
        this.setState({ constituency: response.data.constituency });
        this.setState({ mp: response.data.full_name });
        this.setState({ party: response.data.party });
        console.log(response);
      })
      .then(() => console.log(this.state.constituency))
      .catch((error) => console.error("On get constituency error", error));
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Postcode:
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
        <div>{this.state.constituency}</div>
        <div>{this.state.mp}</div>
        <div>{this.state.party}</div>

        <DisplayEmail mp={this.state.mp} />
      </form>
    );
  }
}
export default PostcodeForm;
