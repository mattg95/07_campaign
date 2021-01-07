// Render Prop
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import DisplayMp from "./DisplayMp";

const MpForm = ({ body, subject }) => {
  const [state, setState] = useState({ data: "" });
  const [usePostcode, setUsePostcode] = useState(false);
  console.log(state);

  const postToApi = async (postcode) => {
    const response = await fetch(`http://localhost:5000/api/${postcode}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setState({ data: data }));

    return response;
  };
  const handleValidation = ({ postcode }) => {
    const errors = {};
    const postCodeRegex = /([A-Z][A-HJ-Y]?[0-9][A-Z0-9]? ?[0-9][A-Z]{2}|GIR ?0A{2})$/;
    if (postCodeRegex.test(postcode.toUpperCase())) {
      postToApi(postcode);
    }
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
      {state.data && (
        <DisplayMp state={{ data: state.data }} body={body} subject={subject} />
      )}
    </div>
  );
};
export default MpForm;
