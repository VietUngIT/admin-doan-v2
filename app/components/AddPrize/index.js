/**
*
* AddPrize
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
  TimePicker ,
  Select,
} from 'antd';

class AddPrize extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     
      top : 0,

    };
    
  }
  onChangeTop=(e)=>{
    // console.log(e.target.value)
    this.setState({
      top: e.target.value,
    });   
  }
  reset=()=>{
    this.refs.name.value = "";
    this.setState({top : 0})

    
  }
  addPrize=()=>{
    if(this.refs.name.value.trim()!=="" && this.state.top >0){
      this.props.add_prize(this.props.id_e,this.state.top,this.refs.name.value.trim())
      this.props.cancel();
      this.reset();

    }else{
      message.error('Nhập đầy đủ thông tin !');

    }
  }
  render() {
    return (
      <div style={{fontSize:13}}>
         <div style={{marginTop:10}}>Top :</div>
          <input type="number" min={0} defaultValue={0} onChange={this.onChangeTop} 
            style={{width:'100%',border:'1px solid #e2e2e2',fontSize:13,padding:5,borderRadius:5,textAlign:'right',padding:5}}/>
          <div style={{marginTop:10}}>Giải thưởng :</div>
        
        <textarea rows="2" 
          style={{width:'100%',border:'1px solid #e2e2e2',fontSize:13,padding:5,borderRadius:5}} 
          placeholder="Nhập giải thưởng" ref="name"/>
            <center>
                <Button type="primary" style={{marginTop:'2%'}} onClick={this.addPrize}>
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

AddPrize.propTypes = {

};

export default AddPrize;
