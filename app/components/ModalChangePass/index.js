/**
*
* ModalChangePass
*
*/

import React from 'react';
import { FormattedMessage } from 'react-intl';
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

class ModalChangePass extends React.Component { 
  save=()=>{
    if(this.refs.valueoldpass.refs.input.value.trim()!=="" && this.refs.valuenewpass.refs.input.value.trim()!=="" && this.refs.valuerepeatnewpass.refs.input.value.trim()!==""){
      if(this.refs.valuenewpass.refs.input.value.trim()==this.refs.valuerepeatnewpass.refs.input.value.trim()){
        this.props.changePassAdmin(this.refs.valueoldpass.refs.input.value.trim(),this.refs.valuenewpass.refs.input.value.trim());
        this.props.cancel();
      }else{
        message.error('Mật khẩu mới không khớp nhau.!');
      }
    }else{
      message.error("Không được để trống !")
    }
  }
  render() {
    return (
      <div>
        <div style={{margin: "10px 20px"}}>
          <div style={{marginBottom:5}}>Mật khẩu hiện tai:</div>
          <Input style={{textAlign:'left',padding:5,height:35,}} ref="valueoldpass"/>
        </div>
        <div style={{margin: "10px 20px"}}>
          <div style={{marginBottom:5}}>Mật khẩu mới:</div>
          <Input style={{textAlign:'left',padding:5,height:35,}} ref="valuenewpass"/>
        </div>
        <div style={{margin: "10px 20px"}}>
          <div style={{marginBottom:5}}>Mật khẩu mới:</div>
          <Input style={{textAlign:'left',padding:5,height:35,}}  ref="valuerepeatnewpass"/>
        </div>
        <div style={{marginTop:20,textAlign:'center'}}><Button type="primary" icon="save" onClick={this.save}>Lưu</Button></div>
      </div>
    );
  }
}

ModalChangePass.propTypes = {

};

export default ModalChangePass;
