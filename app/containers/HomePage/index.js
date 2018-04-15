/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import CKEditor from "react-ckeditor-component";
var editor;
export default class HomePage extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
        content: "<p>I published a package on Npm for using CKEditor with React. It takes just 1 line of code to integrate in your project.</p><p>Github link -&nbsp;<a href='https://github.com/codeslayer1/react-ckeditor' rel='noreferrer'>https://github.com/codeslayer1/react-ckeditor</a>.</p><p>How to Use?</p>",
        
    }
  }

  onChange=(evt)=>{
    var content = evt.editor.getData();
    console.log("content: \n"+content);
    this.setState({ content });
  }

onBlur(evt){
  console.log("onBlur event called with event info: ", evt);
}

afterPaste(evt){
  console.log("afterPaste event called with event info: ", evt);
}

render() {
    return (
        <CKEditor 
          activeClass="p10" 
          content={this.state.content} 
          events={{
            "blur": this.onBlur,
            "afterPaste": this.afterPaste,
            "change": this.onChange
          }}
         />
    )
}
}
