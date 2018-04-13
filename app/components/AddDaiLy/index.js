/**
*
* AddDaiLy
*
*/

import React from 'react';
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
} from 'antd';


class AddDaiLy extends React.Component { // eslint-disable-line react/prefer-stateless-function
  addDL=()=>{
    if(this.refs.nickname.value.trim()!=="" &&this.refs.address.value.trim()!==""&& this.refs.fb.value.trim()!==""&&this.refs.nickname.value.trim()!=="" )
    {
      if(this.refs.phone.value.trim()!=="" && this.refs.phone2.value.trim()!==""){
        this.props.addDL(this.refs.name.value.trim(),
        this.refs.phone.value.trim() +"/"+this.refs.phone2.value.trim(),
        this.refs.address.value.trim(),
        this.refs.fb.value.trim(),
        this.refs.nickname.value.trim());
        this.props.handleCancel();
        this.props.handleVisibleChange(false);
      }
      if(this.refs.phone.value.trim()!=="" && this.refs.phone2.value.trim()==""){
        this.props.addDL(this.refs.name.value.trim(),
        this.refs.phone.value.trim(),
        this.refs.address.value.trim(),
        this.refs.fb.value.trim(),
        this.refs.nickname.value.trim());
        this.props.handleCancel();
        this.props.handleVisibleChange(false);
      }
      if(this.refs.phone.value.trim()=="" && this.refs.phone2.value.trim()!==""){
        this.props.addDL(this.refs.name.value.trim(),
        this.refs.phone2.value.trim(),
        this.refs.address.value.trim(),
        this.refs.fb.value.trim(),
        this.refs.nickname.value.trim());
        this.props.handleCancel();
        this.props.handleVisibleChange(false);
      }
      if(this.refs.phone.value.trim()=="" && this.refs.phone2.value.trim()==""){
        message.error("Nhập ít nhất 1 sđt !")        
      }
      
    }else{
      message.error("Nhập đầy đủ thông tin !")
    }
  }
  reset=()=>{
      this.refs.name.value = "";
      this.refs.nickname.value = "";
      this.refs.address.value="";
      this.refs.phone.value="";
      this.refs.phone2.value="";
      this.refs.fb.value="";
  }
  render() {
    return (
      <div>
          <textarea rows="2" style={{width:'100%',border:'1px solid #e2e2e2',fontSize:13,padding:5,borderRadius:5}} placeholder="Nhập tên" ref="name"/>
          <textarea rows="2" style={{width:'100%',border:'1px solid #e2e2e2',fontSize:13,padding:5,borderRadius:5}} placeholder="Nhập nickname" ref="nickname"/>          
          <textarea rows="2" style={{width:'100%',border:'1px solid #e2e2e2',fontSize:13,padding:5,borderRadius:5}} placeholder="Nhập sđt thứ 1" ref="phone"/>
          <textarea rows="2" style={{width:'100%',border:'1px solid #e2e2e2',fontSize:13,padding:5,borderRadius:5}} placeholder="Nhập sđt thứ 2" ref="phone2"/>
          <textarea rows="2" style={{width:'100%',border:'1px solid #e2e2e2',fontSize:13,padding:5,borderRadius:5}} placeholder="Nhập facebook" ref="fb"/>
          <textarea rows="4" style={{width:'100%',border:'1px solid #e2e2e2',fontSize:13,padding:5,borderRadius:5}} placeholder="Nhập địa chỉ" ref="address"/>
            <center>
                <Button type="primary" style={{marginTop:'2%'}} onClick={this.addDL}>
                  Thêm 
                </Button>
                <Button style={{marginTop:'2%',marginLeft:'2%'}} onClick={this.reset}>
                  Reset 
                </Button>
            </center>
            
        </div>
    );
  }
}

AddDaiLy.propTypes = {

};

export default AddDaiLy;
