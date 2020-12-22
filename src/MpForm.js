// Render Prop
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import DisplayMp from "./DisplayMp";
import AsyncSelect from "react-select/async";

const TWFY_API = "https://www.theyworkforyou.com/api/";
const KEY = process.env.REACT_APP_TWFY_KEY;

const MpForm = ({ body, subject }) => {
  const [state, setState] = useState({});
  const [usePostcode, setUsePostcode] = useState(false);

  const postcodeToConstituencyAPIReq = (postcode) => {
    postcode.replace(/\s/g, "+");
    return (
      TWFY_API + "getMp?key=" + KEY + "&postcode=" + postcode + "&output=js"
    );
  };

  const searchMpsAPIReq = (searchStr) => {
    return (
      TWFY_API + "getMps?key=" + KEY + "&search=" + searchStr + "&output=js"
    );
  };
  const filterMps = (inputValue) => {
    const filteredMps = state.data.filter((mp) =>
      mp.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    const Arr = [];
    filteredMps.forEach((mp) => {
      Arr.push({ value: mp.name, label: mp.name });
    });
    console.log(Arr);
    return Arr;
  };

  const promiseOptions = (inputValue) => {
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(filterMps(inputValue));
      }, 1000);
    });
  };

  // const displayMpList = (state) => {
  //   const Arr = [];
  //   state.data.forEach((mp) => {
  //     Arr.push({ value: mp.name, label: mp.name });
  //   });
  //   return Arr;
  // };

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
      axios
        .get(searchMpsAPIReq(values.mpName))
        .then(({ data }) => {
          setState({ data });
        })
        .catch((error) => {
          console.error(error);
          errors.postcode = "Could not retrieve MP";
        });
    }
    return errors;
  };
  console.log(state);
  return (
    <div>
      <Formik
        initialValues={{ postcode: "", mpName: "" }}
        validate={handleValidation}
      >
        {(values) => (
          <Form>
            <ErrorMessage name="postcode" component="div" />
            <label htmlFor="postcode">Postcode:</label>
            <Field
              type="text"
              name="postcode"
              value={usePostcode ? values.postcode : ""}
              onClick={() => setUsePostcode(true)}
            />
            <ErrorMessage name="mpName" component="div" />
            <label htmlFor="mpName">MP name:</label>
            <Field
              type="text"
              name="mpName"
              value={usePostcode ? "" : values.mpName}
              onClick={() => setUsePostcode(false)}
            />
            <AsyncSelect
              cacheOptions
              defaultOptions
              loadOptions={promiseOptions}
            />
          </Form>
        )}
      </Formik>

      {state.data &&
        Array.isArray(state.data) &&
        state.data.slice(0, 6).map((mp, i) => {
          return (
            <DisplayMp
              key={i}
              state={{ data: mp }}
              body={body}
              subject={subject}
            />
          );
        })}
    </div>
  );
};
export default MpForm;
