/**
*
* EditCmt
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

class EditCmt extends React.Component { 
  constructor(props) {
    super(props);
    this.state = { 
      cmt : false,
    }
  }
  onChangeCMND=(e)=>{
    this.setState({
      cmt: e.target.value,
    });
   
  }
  save=()=>{
    if(this.refs.txt_chu_thich.value.trim() !=="" && this.refs.cmnd.refs.input.value.trim()!==""){
      this.props.edit_cmt(this.props.info.nn,this.refs.cmnd.refs.input.value.trim(),this.refs.txt_chu_thich.value.trim());
      this.props.cancel();
      this.refs.txt_chu_thich.value = "";
    }else{
      message.error("Không được để trống !")
    }
  }
  render() {
    return (
      <div style={{fontSize:13}}>
          <div>Chứng minh thư</div>
            <Input 
                style={{textAlign:'left',padding:5,width:'90%',height:35,}} 
                defaultValue={this.props.info.cmtnd} ref="cmnd" onChange={this.onChangeCMND}/>
          <div style={{marginTop:20}}>Chú thích</div>
          <textarea rows="4" ref="txt_chu_thich"  style={{textAlign:'left',padding:5,width:'90%',border:'1px solid #e2e2e2'}} />
          <div style={{marginTop:20,textAlign:'center'}}><Button type="primary" icon="save" onClick={this.save}>Lưu</Button></div>
      </div>
    );
  }
}

EditCmt.propTypes = {

};

export default EditCmt;
