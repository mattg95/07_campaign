// Render Prop
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";

// Constant URL value for JAAS API
const TWFY_API = "https://www.theyworkforyou.com/api/";
const KEY = process.env.REACT_APP_TWFY_KEY;

const PostcodeForm = ({ body, subject }) => {
  const [state, setState] = useState({});

  const postcodeToConstituencyAPIReq = (postcode) => {
    postcode.replace(/\s/g, "+");
    return (
      TWFY_API + "getMp?key=" + KEY + "&postcode=" + postcode + "&output=js"
    );
  };

  const handleSubmit = (values, { setSubmitting }) => {
    axios
      .get(postcodeToConstituencyAPIReq(values.postcode))
      .then(({ data }) => {
        setState({
          data,
          mpEmail:
            data.full_name.toLowerCase().replace(" ", ".") +
            ".mp@parliament.uk",
        });
      })
      .catch((error) => {
        return console.log(error), setState({ error: "Could not find MP" });
      });
    setSubmitting(false);
  };

  const handleValidation = (values) => {
    const errors = {};
    const postCodeRegex = /([A-Z][A-HJ-Y]?[0-9][A-Z0-9]? ?[0-9][A-Z]{2}|GIR ?0A{2})$/;
    if (!values.postcode) {
      errors.postcode = "Required";
    } else if (!postCodeRegex.test(values.postcode)) {
      errors.postcode = "Invalid postcode";
    }
    console.log(errors);
    return errors;
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={{ postcode: "" }}
      validate={handleValidation}
    >
      {({ isSubmitting, isValid }) => (
        <Form>
          <ErrorMessage name="postcode" component="div" />
          <label htmlFor="postcode">Postcode:</label>
          <Field type="text" name="postcode" />
          <button type="submit" disabled={!isValid || isSubmitting}>
            Submit
          </button>
          {state.data?.constituency && <div>{state.data.constituency}</div>}
          {state.data?.full_name && <div>{state.data.full_name}</div>}
          {state.data?.party && <div>{state.data.party}</div>}
          {state.error && <div>{state.error}</div>}
          {state.mpEmail && (
            <a
              href={
                "mailto:" +
                state.mpEmail +
                "?Subject=" +
                encodeURIComponent(subject) +
                "&Body=" +
                encodeURIComponent(Object.values(body).join(" "))
              }
            >
              {state.mpEmail}
            </a>
          )}
        </Form>
      )}
    </Formik>
  );
};
export default PostcodeForm;
