import React, { Component } from 'react'
import EdiText from 'react-editext'

class TextBox extends React.Component {
  constructor(props){
    super(props);
  }
  onSave = val => {
    console.log('Edited Value -> ', val)
  }

  render () {
    return (
      <EdiText
        viewContainerClassName='my-custom-view-wrapper'
        type='textarea'
        inputProps={{
          rows: 5
        }}
        saveButtonContent='Apply'
        cancelButtonContent={<strong>Cancel</strong>}
        editButtonContent='Edit Your Email'
        value="Email to MP. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        onSave={this.onSave}
      />
    )
  }
}

export default TextBox
