import React, { useState } from "react";
import EdiText from "react-editext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Select from "react-select";

import PostCode from "./PostCode.js";

const TextBox = () => {
  const [email, setEmail] = useState("");

  const q1options = [
    { value: "International development is good. ", label: "good" },
    { value: "International development is bad. ", label: "bad" },
    {
      value: "International development is flippin rad. ",
      label: "flippin rad",
    },
  ];
  const q2options = [
    { value: "I am a member of the Conservative Party. ", label: "yes" },
    { value: "I am not a member of the Conservative Party. ", label: "no" },
    {
      value: "I am maybe a member of the Conservative Party. ",
      label: "maybe",
    },
  ];
  const q3options = [
    {
      value:
        "I am angry about the conservatives breaking their manifesto promises. ",
      label: "anger",
    },
    {
      value:
        "I am confused about the conservatives breaking their manifesto promises. ",
      label: "confusion",
    },
    {
      value:
        "I am not angry, just dissapointed about the conservatives breaking their manifesto promises. ",
      label: "not angry, just dissapointed",
    },
  ];

  return (
    <div>
      <Formik>
        <Form>
          <label htmlFor="q1">
            What are your thoughs on International Development?
          </label>
          <Select
            options={q1options}
            name="q1"
            onChange={({ value }) => {
              setEmail(email + value);
            }}
          />
          <label htmlFor="q2">
            Are you a member of the Conservative party?
          </label>
          <Select
            options={q2options}
            name="q2"
            onChange={({ value }) => {
              setEmail(email + value);
            }}
          />
          <label htmlFor="q3">
            How do you feel about the Consevatives breaking their manifesto
            promises?
          </label>
          <Select
            options={q3options}
            name="q3"
            onChange={({ value }) => {
              setEmail(email + value);
            }}
          />
        </Form>
      </Formik>
      <EdiText
        viewContainerClassName="my-custom-view-wrapper"
        type="textarea"
        inputProps={{
          rows: 5,
        }}
        saveButtonContent="Apply"
        cancelButtonContent={<strong>Cancel</strong>}
        editButtonContent="Edit Your Email"
        value={email}
        onSave={(val) => {
          setEmail(val);
        }}
      />
      <PostCode body={email} subject={"subject"} />
    </div>
  );
};

export default TextBox;
