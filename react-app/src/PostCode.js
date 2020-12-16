// Render Prop
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import DisplayMp from "./DisplayMp";

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

  const handleValidation = (values) => {
    const errors = {};
    const postCodeRegex = /([A-Z][A-HJ-Y]?[0-9][A-Z0-9]? ?[0-9][A-Z]{2}|GIR ?0A{2})$/;
    if (postCodeRegex.test(values.postcode.toUpperCase())) {
      axios
        .get(postcodeToConstituencyAPIReq(values.postcode))
        .then(({ data }) => {
          if (data.error) {
            errors.postcode = "Invalid postcode";
            return errors;
          } else {
            setState({
              data,
              mpEmail:
                data.full_name.toLowerCase().replace(" ", ".") +
                ".mp@parliament.uk",
            });
          }
        })
        .catch((error) => {
          console.error(error);
          errors.postcode = "Could not retrieve MP";
        });
    }
    return errors;
  };

  return (
    <div>
      <Formik
        initialValues={{ postcode: "", mpName: " " }}
        validate={handleValidation}
      >
        <Form>
          <ErrorMessage name="postcode" component="div" />
          <label htmlFor="postcode">Postcode:</label>
          <Field type="text" name="postcode" />
          <ErrorMessage name="mpName" component="div" />
          <label htmlFor="mpName">MP name:</label>
          <Field type="text" name="mpName" />
        </Form>
      </Formik>
      {state.data && <DisplayMp state={state} body={body} subject={subject} />}
    </div>
  );
};
export default PostcodeForm;
