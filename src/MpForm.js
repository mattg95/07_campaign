// Render Prop
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import DisplayMp from "./DisplayMp";

const TWFY_API = "https://www.theyworkforyou.com/api/";
const KEY = process.env.REACT_APP_TWFY_KEY;

const MpForm = ({ body, subject }) => {
  const [state, setState] = useState({ data: "" });
  const [usePostcode, setUsePostcode] = useState(false);

  const postcodeToConstituencyAPIReq = (postcode) => {
    postcode.replace(/\s/g, "+");
    return (
      TWFY_API + "getMp?key=" + KEY + "&postcode=" + postcode + "&output=js"
    );
  };

  const handleValidation = (values) => {
    const errors = {};
    const postCodeRegex = /([A-Z][A-HJ-Y]?[0-9][A-Z0-9]? ?[0-9][A-Z]{2}|GIR ?0A{2})$/;
    if (usePostcode & postCodeRegex.test(values.postcode.toUpperCase())) {
      axios
        .get(postcodeToConstituencyAPIReq(values.postcode))
        .then(({ data }) => {
          if (data.error) {
            errors.postcode = "Invalid postcode";
            return errors;
          } else {
            setState(() => {
              return { data: [data] };
            });
          }
        })
        .catch((error) => {
          console.error(error);
          errors.postcode = "Could not retrieve MP";
        });
    }
    if (!usePostcode) {
      //if we are not using the postcode to find MP, we trigger some other function that displays or filters MPs by name
    }
    return errors;
  };

  return (
    <div>
      <Formik
        initialValues={{ postcode: "", mpName: "" }}
        validate={handleValidation}
      >
        {(values) => (
          <Form className="getMpForm">
            <ErrorMessage name="postcode" component="div" />
            <label htmlFor="postcode">Postcode:</label>
            <Field
              type="text"
              name="postcode"
              value={usePostcode ? values.postcode : ""}
              onClick={() => setUsePostcode(true)}
            />
            {/*<ErrorMessage name="mpName" component="div" />
             <label htmlFor="mpName">MP name:</label>
            <Field
              type="text"
              name="mpName"
              value={usePostcode ? "" : values.mpName}
              onClick={() => setUsePostcode(false)}
            /> */}
          </Form>
        )}
      </Formik>
      {state.data && Array.isArray(state.data) && (
        <DisplayMp
          state={{ data: state.data[0] }}
          body={body}
          subject={subject}
        />
      )}
    </div>
  );
};
export default MpForm;
