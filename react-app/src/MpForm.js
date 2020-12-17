// Render Prop
import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Search from "react-search";

import axios from "axios";
import DisplayMp from "./DisplayMp";

// Constant URL value for JAAS API
const TWFY_API = "https://www.theyworkforyou.com/api/";
const KEY = process.env.REACT_APP_TWFY_KEY;

const MpForm = ({ body, subject }) => {
  const [state, setState] = useState({});
  const [usePostcode, setUsePostcode] = useState(false);
  const [mps, setMps] = useState({});

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
  useEffect(() => {
    axios.get(searchMpsAPIReq("")).then((items) => {
      const newMps = items.data.map(({ member_id: id, ...rest }) => ({
        id,
        ...rest,
      }));
      let newNewMps = newMps.map(({ name: value, ...rest }) => ({
        value,
        ...rest,
      }));
      let mpSelection = newNewMps.slice(10, 20);
      setMps(newNewMps);
    });
  }, []);

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
    if (!usePostcode && values.mpName.length > 3) {
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

  // search
  let items = mps;

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

      <div>
        <Search items={mps} placeholder="mp" multiple={true} />
      </div>
    </div>
  );
};
export default MpForm;
