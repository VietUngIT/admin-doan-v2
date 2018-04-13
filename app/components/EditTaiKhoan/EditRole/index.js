/**
*
* EditRole
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

class EditRole extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = { 
      r : false,
    }
  }
  onChangeRole(e){
  
    this.setState({r:e.target.value})
  
  } 
  save=()=>{
    if(this.refs.txt_chu_thich.value.trim() !==""){
      this.props.edit_role(this.props.info.nn,this.state.r?this.state.r:this.props.info.role,this.refs.txt_chu_thich.value.trim());
      this.props.cancel();
      this.refs.txt_chu_thich.value = "";
    }else{
      message.error("Không được để trống !")
    }
  }
  render() {
    return (
      <div style={{fontSize:13}}>
          <div>Vai trò</div>
          
                 <select id="role" onChange={(e)=>this.onChangeRole(e)}                  
                  style={{height:'35px',width:120,border:'1px solid #e2e2e2',borderRadius:'5px',background:'white'}}>
                  <option value={0} selected={this.props.info.role==0?"selected":""}>Người chơi</option>
                  <option value={1} selected={this.props.info.role==1?"selected":""}>Đại lý</option>                        
                  <option value={2} selected={this.props.info.role==2?"selected":""}>Admin</option>                   
                  <option value={4} selected={this.props.info.role==4?"selected":""}>MOD</option>                   
                  <option value={5} selected={this.props.info.role==5?"selected":""}>GM</option>                   
                </select>
             
          <div style={{marginTop:20}}>Chú thích</div>
          <textarea rows="4" ref="txt_chu_thich"  style={{textAlign:'left',padding:5,width:'90%',border:'1px solid #e2e2e2'}} />
          <div style={{marginTop:20,textAlign:'center'}}><Button type="primary" icon="save" onClick={this.save}>Lưu</Button></div>
      </div>
    );
  }
}

EditRole.propTypes = {

};

export default EditRole;
