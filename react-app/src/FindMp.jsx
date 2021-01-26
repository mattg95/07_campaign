// Render Prop
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import DisplayMp from "./DisplayMp";

const MpForm = ({ body, subject }) => {
  const [state, setState] = useState({ data: "", error: "" });

  const postToApi = async (postcode) => {
    const response = await fetch(`/api/postcode/${postcode}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setState({ ...state, error: data.error });
        } else setState({ error: "", data: data });
      });
    return response;
  };

  const handleValidation = ({ postcode }) => {
    const postCodeRegex = /([A-Z][A-HJ-Y]?[0-9][A-Z0-9]? ?[0-9][A-Z]{2}|GIR ?0A{2})$/;
    if (postCodeRegex.test(postcode.toUpperCase())) {
      postToApi(postcode);
    } else {
      if (postcode.length > 5) {
        setState({ ...state, error: "Invalid postcode" });
      }
    }
  };

  return (
    <div>
      <h2 className="secondary-header">2. Find Your Mp</h2>
      <Formik
        initialValues={{ postcode: "" }}
        validate={handleValidation}
        onSubmit={handleValidation}
      >
        {(values) => (
          <Form className="getMpForm">
            <ErrorMessage name="postcode" component="div" />
            <label htmlFor="postcode">Postcode:</label>
            <Field type="text" name="postcode" />
            {state.error && <div>{state.error}</div>}
          </Form>
        )}
      </Formik>
      {state.data && (
        <DisplayMp data={state.data} body={body} subject={subject} />
      )}
    </div>
  );
};
export default MpForm;
