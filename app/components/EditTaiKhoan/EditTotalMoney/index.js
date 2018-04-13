/**
*
* EditTotalMoney
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

class EditTotalMoney extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = { 
      m : false,
    }
  }

  onChangeM=(event)=>{
    this.setState(
      {m: event.target.rawValue},
    );
   
  }
  save=()=>{
    if(this.refs.txt_chu_thich.value.trim() !==""){
      this.props.edit_total(this.props.info.nn,this.state.m?this.state.m:this.props.info.tm,this.refs.txt_chu_thich.value.trim());
      this.props.cancel();
      this.refs.txt_chu_thich.value = "";
    }else{
      message.error("Không được để trống !")
    }
  }
  render() {
    return (
      <div style={{fontSize:13}}>
           <div>Tổng tiền : {this.props.formatCurency(this.props.info.tm)}</div>
          
          <div style={{marginTop:20}}>Lượng tiền cộng/trừ </div>
            <Cleave 
                style={{width:'90%',height:35,marginRight:10,border:'1px solid #e2e2e2',textAlign:'right',padding:5,borderRadius:5}}
                options={{
                  numeral: true,
                  numeralThousandsGroupStyle: 'thousand'
                }}
                onChange={this.onChangeM} 
                // placeholder = "Nhập lượng tiền" 
              />
          <div style={{marginTop:20}}>Chú thích</div>
          <textarea rows="4" ref="txt_chu_thich"  style={{textAlign:'left',padding:5,width:'90%',border:'1px solid #e2e2e2'}} />
          <div style={{marginTop:20,textAlign:'center'}}><Button type="primary" icon="save" onClick={this.save}>Lưu</Button></div>
      </div>
    );
  }
}

EditTotalMoney.propTypes = {

};

export default EditTotalMoney;
