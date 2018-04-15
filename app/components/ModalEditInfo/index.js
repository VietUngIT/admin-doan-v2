/**
*
* ModalEditInfo
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import {
  Tabs,
  Input,
  Button,
  message,
  Pagination ,
  Dropdown,
  Menu,
  Modal,
  Icon,
  Select,
} from 'antd';

class ModalEditInfo extends React.Component { 
  constructor(props) {
    super(props);
    this.state = { 
      value : false,
    }
  }
  onChangeInfo=(e)=>{
    this.setState({
      value: e.target.value,
    });
   
  }
  save=()=>{
    if(this.refs.valueinput.refs.input.value.trim()!==""){
      this.props.editInfo(this.refs.valueinput.refs.input.value.trim());
      this.props.cancel();
    }else{
      message.error("Không được để trống !")
    }
  }
  render() {
    return (
      <div style={{fontSize:13}}>
          
          <Input 
                style={{textAlign:'left',padding:5,width:'90%',height:35,}} 
                defaultValue={this.props.info} ref="valueinput" onChange={this.onChangeInfo}/>
          <div style={{marginTop:20,textAlign:'center'}}><Button type="primary" icon="save" onClick={this.save}>Lưu</Button></div>
      </div>
    );
  }
}

ModalEditInfo.propTypes = {

};

export default ModalEditInfo;
