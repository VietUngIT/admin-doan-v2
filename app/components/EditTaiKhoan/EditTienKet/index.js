/**
*
* EditTienKet
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
import Cleave from 'cleave.js/react';

class EditTienKet extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = { 
      sm : false,
    }
  }

  onChangeSM=(event)=>{
    this.setState(
      {sm: event.target.rawValue},
    );
   
  }
  save=()=>{
    if(this.refs.txt_chu_thich.value.trim() !==""){
      this.props.edit_ket(this.props.info.nn,this.state.sm?this.state.sm:this.props.info.sm,this.refs.txt_chu_thich.value.trim());
      this.props.cancel();
      this.refs.txt_chu_thich.value = "";
    }else{
      message.error("Không được để trống !")
    }
  }
  render() {
    return (
      <div style={{fontSize:13}}>
          <div>Lượng tiền trong két : {this.props.formatCurency(this.props.info.sm)}</div>
          
           <div style={{marginTop:20}}>Lượng tiền cộng/trừ</div>
            <Cleave 
                style={{width:'90%',height:35,marginRight:10,border:'1px solid #e2e2e2',textAlign:'right',padding:5,borderRadius:5}}
                options={{
                  numeral: true,
                  numeralThousandsGroupStyle: 'thousand'
                }}
                onChange={this.onChangeSM} 
                // placeholder = "Nhập lượng tiền" 
              />      
          <div style={{marginTop:20}}>Chú thích</div>
          <textarea rows="4" ref="txt_chu_thich"  style={{textAlign:'left',padding:5,width:'90%',border:'1px solid #e2e2e2'}} />
          <div style={{marginTop:20,textAlign:'center'}}><Button type="primary" icon="save" onClick={this.save}>Lưu</Button></div>
      </div>
    );
  }
}

EditTienKet.propTypes = {

};

export default EditTienKet;
