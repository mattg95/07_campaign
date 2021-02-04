import React, { useState } from "react";
import { Formik, Form, Field } from "formik";

const MpForm = ({ passDataUpstream }) => {
  const [state, setState] = useState({
    dropDownOpen: false,
    postcodeError: "",
  });
  const { dropDownOpen, postcodeError } = state;

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
          setState({ ...state, postcodeError: data.error });
        } else {
          passDataUpstream({ mpData: data });
          setState({ ...state, postcodeError: "" });
        }
      });
    return response;
  };

  const handleValidation = ({ postcode }) => {
    const postCodeRegex = /([A-Z][A-HJ-Y]?[0-9][A-Z0-9]? ?[0-9][A-Z]{2}|GIR ?0A{2})$/;
    if (postCodeRegex.test(postcode.toUpperCase())) {
      postToApi(postcode);
    } else {
      if (postcode.length > 5) {
        setState({ ...state, postcodeError: "Invalid postcode" });
      }
    }
  };

  return (
    <div>
      <div className="button-container">
        <button
          className="btn btn-lg cta btn-outline-primary"
          type="submit"
          onClick={() => setState({ ...state, dropDownOpen: true })}
        >
          Don't see your MP?
        </button>
        <a href="#emailBox">
          <button
            className="btn btn-lg cta btn-primary"
            type="submit"
            onClick={() => setState({ ...state, dropDownOpen: false })}
          >
            Continue with this MP
          </button>
        </a>
      </div>
      {dropDownOpen && (
        <Formik
          initialValues={{ postcode: "" }}
          validate={handleValidation}
          onSubmit={handleValidation}
        >
          {(values) => (
            <Form className="get-MP-form">
              <label htmlFor="postcode">Postcode:</label>
              <Field type="text" name="postcode" />
              <div className="error postcode-error">
                {postcodeError ? postcodeError : ""}
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};
export default MpForm;
