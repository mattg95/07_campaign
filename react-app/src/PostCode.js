// Render Prop
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";

// Constant URL value for JAAS API
const TWFY_API = "https://www.theyworkforyou.com/api/";
const KEY = process.env.REACT_APP_TWFY_KEY;

const postcodeToConstituencyAPIReq = (postcode) => {
  postcode.replace(/\s/g, "+");
  return TWFY_API + "getMp?key=" + KEY + "&postcode=" + postcode + "&output=js";
};

function textToUrl(text) {
  //function to covert text to url format for mailto:
  return text.replaceAll(" ", "%20");
}

const DisplayEmail = ({ mp, subject, body }) => {
  if (mp !== " ") {
    // const subject = "Sample Subject";
    // const body = "Sample Body";
    return (
      <div>
        <a
          href={
            "mailto:" +
            mp.replace(" ", ".") +
            ".mp@parliament.uk?Subject=" +
            textToUrl(subject) +
            "&Body=" +
            textToUrl(Object.values(body))
          }
        >
          {mp.replace(" ", ".") + ".mp@parliament.uk"}
        </a>
      </div>
    );
  }
  return <div></div>;
};

class PostcodeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: " ",
      constituency: " ",
      mp: " ",
      party: " ",
      email: " ",
      error: " ",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    axios
      .get(postcodeToConstituencyAPIReq(values.postcode))
      .then((response) => {
        this.setState({ constituency: response.data.constituency });
        this.setState({ mp: response.data.full_name });
        this.setState({ party: response.data.party });
      })
      .catch((error) => {
        return (
          console.log(error), this.setState({ error: "Could not find MP" })
        );
      });
  }

  render() {
    return (
      <Formik
        onSubmit={(values, { setSubmitting }) => {
          return this.handleSubmit(values), setSubmitting(false);
        }}
        initialValues={{ postcode: "" }}
        validate={(values) => {
          const errors = {};
          const postCodeRegex = /([A-Z][A-HJ-Y]?[0-9][A-Z0-9]? ?[0-9][A-Z]{2}|GIR ?0A{2})$/;
          console.log(values);
          if (!values.postcode) {
            errors.postcode = "Required";
          } else if (!postCodeRegex.test(values.postcode)) {
            errors.postcode = "Invalid postcode";
          }
          console.log(errors);
          return errors;
        }}
      >
        {({ isSubmitting, isValid }) => (
          <Form>
            <ErrorMessage name="postcode" component="div" />
            <label htmlFor="postcode">Postcode:</label>
            <Field type="text" name="postcode" />
            <button type="submit" disabled={!isValid || isSubmitting}>
              Submit
            </button>
            <div>{this.state.constituency}</div>
            <div>{this.state.mp}</div>
            <div>{this.state.party}</div>
            <div>{this.state.error}</div>
            <DisplayEmail
              mp={this.state.mp}
              subject={this.props.subject}
              body={Object.values(this.props.body)}
            />
          </Form>
        )}
      </Formik>
    );
  }
}
export default PostcodeForm;
