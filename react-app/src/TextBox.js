import React, { Component } from "react";
import EdiText from "react-editext";
import PostCode from "./PostCode.js";

class TextBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value:
        "Email to MP. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    };
  }
  onSave = (val) => {
    console.log("Edited Value -> ", val);
    this.setState({ value: val });
  };

  render() {
    return (
      <div>
        <EdiText
          viewContainerClassName="my-custom-view-wrapper"
          type="textarea"
          inputProps={{
            rows: 5,
          }}
          saveButtonContent="Apply"
          cancelButtonContent={<strong>Cancel</strong>}
          editButtonContent="Edit Your Email"
          value={this.state.value}
          onSave={this.onSave}
        />
        <PostCode body={this.state.value} subject={"subject"} />
      </div>
    );
  }
}

export default TextBox;
