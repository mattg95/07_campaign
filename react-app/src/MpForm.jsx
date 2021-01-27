import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

const MpForm = ({ passDataUpstream, postcodeError, postcodeDropdownOpen }) => {
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
          passDataUpstream({ postcodeError: data.error });
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
        passDataUpstream({ postcodeError: "Invalid postcode" });
      }
    }
  };

  return (
    <div>
      <button onClick={() => passDataUpstream({ postcodeDropdownOpen: true })}>
        Don't see your MP?
      </button>
      <button onClick={() => passDataUpstream({ postcodeDropdownOpen: false })}>
        Continue with this MP
      </button>
      {console.log(postcodeDropdownOpen)}
      {postcodeDropdownOpen && (
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
              {postcodeError && <div>{postcodeError}</div>}
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};
export default MpForm;
