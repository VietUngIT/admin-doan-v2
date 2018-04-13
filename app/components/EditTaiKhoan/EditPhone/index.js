/**
*
* EditPhone
*
*/

import React from 'react';
// import styled from 'styled-components';
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

class EditPhone extends React.Component { 
  constructor(props) {
    super(props);
    this.state = { 
      sdt : false,
    }
  }
  onChangeMobile=(e)=>{
    this.setState({
      sdt: e.target.value,
    });
    
  }
  save=()=>{
    if(this.refs.txt_chu_thich.value.trim() !=="" && this.refs.sdt.refs.input.value.trim()!==""){
      this.props.edit_phone(this.props.info.nn,this.refs.sdt.refs.input.value.trim(),this.refs.txt_chu_thich.value.trim());
      this.props.cancel();
      this.refs.txt_chu_thich.value = "";
    }else{
      message.error("Không được để trống !")
    }
  }
  render() {
    return (
      <div style={{fontSize:13}}>
          <div>Số điện thoại</div>
          <Input 
            style={{textAlign:'left',padding:5,width:'90%',height:35}} 
            defaultValue={this.props.info.m} ref="sdt"  onChange={this.onChangeMobile}/> 
          <div style={{marginTop:20}}>Chú thích</div>
          <textarea rows="4" ref="txt_chu_thich"  style={{textAlign:'left',padding:5,width:'90%',border:'1px solid #e2e2e2'}} />
          <div style={{marginTop:20,textAlign:'center'}}><Button type="primary" icon="save" onClick={this.save}>Lưu</Button></div>
      </div>
    );
  }
}

EditPhone.propTypes = {

};

export default EditPhone;
