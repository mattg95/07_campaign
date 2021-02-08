import React, { useState, useEffect, useRef } from "react";
import { Formik, Form, Field } from "formik";

const MpForm = ({ passDataUpstream, emailBoxRef, emailVisible }) => {
  const [state, setState] = useState({
    dropDownOpen: false,
    postcodeError: "",
  });

  const { dropDownOpen, postcodeError } = state;

  const dropdownRef = useRef();

  //if the dropdown postcode is opened, on 'don't see your MP' this scrolls the page down to it
  useEffect(() => {
    const { current } = dropdownRef;
    current &&
      current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    window.scrollBy(0, 100);
  }, [dropDownOpen]);

  //once the emailBox postcode is rendered on click of 'Continue with this MP', this scrolls the page down to it
  useEffect(() => {
    const { current } = emailBoxRef;
    current &&
      current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  }, [emailVisible, emailBoxRef]);

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
      <div className="button-container" id="postcodeDropdown">
        <button
          className="btn btn-lg cta btn-outline-primary left-button"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            setState({ ...state, dropDownOpen: true });
          }}
        >
          Don't see your MP?
        </button>
        <button
          className="btn btn-lg cta btn-primary right-button "
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            setState({ ...state, dropDownOpen: false });
            passDataUpstream({ emailVisible: true });
          }}
        >
          Yes, continue with this MP
        </button>
      </div>
      {dropDownOpen && (
        <Formik
          initialValues={{ postcode: "" }}
          validate={handleValidation}
          onSubmit={handleValidation}
        >
          {(values) => (
            <Form
              className="get-MP-form"
              id="postcodeDropdown"
              ref={dropdownRef}
            >
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
