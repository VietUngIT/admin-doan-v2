/**
*
* EditActive
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

class EditActive extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = { 
      ac : false,
    }
  }
  onChangeAC(e){  
    this.setState({ac:e.target.value}) 
 }  
 save=()=>{
  if(this.refs.txt_chu_thich.value.trim() !==""){
    this.props.edit_active(this.props.info.nn,this.state.ac?this.state.ac:this.props.info.ac,this.refs.txt_chu_thich.value.trim());
    this.props.cancel();
    this.refs.txt_chu_thich.value = "";
  }else{
    message.error("Không được để trống !")
  }
}
  render() {
    return (
      <div style={{fontSize:13}}>
          <div>Trạng thái tài khoản</div>
            <select id="active" onChange={(e)=>this.onChangeAC(e)}                  
              style={{height:'35px',width:"90%",border:'1px solid #e2e2e2',borderRadius:'5px',background:'white'}}>
              <option value={0} selected={this.props.info.ac==0?"selected":""}>Chưa active</option>
              <option value={1} selected={this.props.info.ac==1?"selected":""}>Đã update thông tin</option>         
              <option value={2} selected={this.props.info.ac==2?"selected":""}>Đã active</option>                   
            </select>
          <div style={{marginTop:20}}>Chú thích</div>
          <textarea rows="4" ref="txt_chu_thich"  style={{textAlign:'left',padding:5,width:'90%',border:'1px solid #e2e2e2'}} />
          <div style={{marginTop:20,textAlign:'center'}}><Button type="primary" icon="save" onClick={this.save}>Lưu</Button></div>
      </div>
    );
  }
}

EditActive.propTypes = {

};

export default EditActive;
