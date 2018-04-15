/**
*
* Tags
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import {Icon} from 'antd';

class Tags extends React.Component { 
  closeTag=()=>{
    this.props.removeTags(this.props.index)
  }
  render() {
    let content = "";
    if(this.props.content){
      content = this.props.content;
    }
    return (
      <div style={{display:'inline-block',padding:'3px 5px', borderRadius:3,border:'1px solid #1565C0',background: '#BBDEFB',margin: 5}}>
        <span>{content}</span>
        <Icon type="close" onClick={this.closeTag} style={{paddingLeft: 5,verticalAlign: 'middle'}}/>
      </div>
    );
  }
}

Tags.propTypes = {

};

export default Tags;
