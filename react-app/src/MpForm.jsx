// Render Prop
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

const MpForm = ({ passDataUpstream, error }) => {
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
          passDataUpstream({ error: data.error });
        } else passDataUpstream({ mpData: data });
      });
    return response;
  };

  const handleValidation = ({ postcode }) => {
    const postCodeRegex = /([A-Z][A-HJ-Y]?[0-9][A-Z0-9]? ?[0-9][A-Z]{2}|GIR ?0A{2})$/;
    if (postCodeRegex.test(postcode.toUpperCase())) {
      postToApi(postcode);
    } else {
      if (postcode.length > 5) {
        passDataUpstream({ error: "Invalid postcode" });
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
            {error && <div>{error}</div>}
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default MpForm;
