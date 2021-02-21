import React, { useState, useEffect, useRef } from "react";

const MpForm = ({ passDataUpstream }) => {
  const [state, setState] = useState({
    dropDownOpen: false,
    postcodeError: "",
    isLoading: false,
  });

  const { dropDownOpen, postcodeError, isLoading } = state;

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

  const postToApi = async (postcode) => {
    setState({ ...state, isLoading: true });
    const response = await fetch(`/api/postcode/${postcode}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setState({ ...state, isLoading: false, postcodeError: data.error });
        } else {
          passDataUpstream({ mpData: data });
          setState({ ...state, isLoading: false, postcodeError: "" });
        }
      });
    return response;
  };

  const handleValidation = (e) => {
    e.preventDefault();
    const { value } = e.target;
    const postCodeRegex = /([A-Z][A-HJ-Y]?[0-9][A-Z0-9]? ?[0-9][A-Z]{2}|GIR ?0A{2})$/;
    if (value) {
      if (value.length > 5) {
        if (postCodeRegex.test(value.toUpperCase())) {
          postToApi(value);
        } else {
          setState({ ...state, postcodeError: "Invalid postcode" });
        }
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
        <form
          className="get-MP-form"
          id="postcodeDropdown"
          ref={dropdownRef}
          onChange={handleValidation}
          onSubmit={handleValidation}
        >
          <label htmlFor="postcode">Postcode:</label>
          <input type="text" name="postcode" />
          <div className="error postcode-error">
            {postcodeError && !isLoading ? postcodeError : ""}
          </div>
          {/* Probably should not use 'error' style class for this loading message */}
          <div className="loading">
            {isLoading ? "Fetching your MP..." : ""}
          </div>
        </form>
      )}
    </div>
  );
};
export default MpForm;
