/**
*
* EditLock
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
  TimePicker,
} from 'antd';
const format = 'HH:mm';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
class EditLock extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = { 
      lock : false,
      date : moment(),
      todate : moment(), 
      fromTime : "",
      toTime : "23:59",
    }
  }
  onChangeDate=(date)=>{
    this.setState({
      date: date,
    });
     
  }
  onChangeToDate=(date)=>{
    this.setState({
      todate: date,
    });
     
  }
  changeTime=(time, timeString)=>{
    this.setState({fromTime:timeString.toString()})
  }
  changeToTime=(time, timeString)=>{
    this.setState({toTime:timeString.toString()})
  }
  onChangeLock(e){
    
   this.setState({lock:e.target.value})

 }  
 convertDate (time){
  var d = new Date(time),
  yyyy = d.getFullYear(),
  mm = ('0' + (d.getMonth() + 1)).slice(-2),
  dd = ('0' + d.getDate()).slice(-2),
  hh = ('0' + d.getHours()).slice(-2),
  min = ('0' + d.getMinutes()).slice(-2),

  result, time;
  time = hh + ':' + min;
  result = time ;
  const date =   dd+ '/' + mm + '/'+ yyyy ;
  result = date +" " + time;
  return result;
}
 save=()=>{
  if(this.refs.txt_chu_thich.value.trim() !=="" ){
    
          this.props.edit_lock(
            this.props.info.nn,
            this.state.lock?this.state.lock:(this.props.info.l?1:0),
            this.refs.txt_chu_thich.value.trim()
           
          );
          this.props.cancel();     
          this.refs.txt_chu_thich.value = "";
     
  }else{
    message.error("Không được để trống !")
  }
}
onChangeDate=(date)=>{
  this.setState({
    date: date,
  });
   
}
onChangetoDate=(date)=>{
  this.setState({
    todate: date,
  });
   
}
  render() {
    return (
      <div style={{fontSize:13}}>
         
            <div style={{marginTop:20}}>Trạng thái tài khoản</div>
            <select id="lockid" onChange={(e)=>this.onChangeLock(e)}                  
                style={{height:'35px',width:120,border:'1px solid #e2e2e2',borderRadius:'5px',background:'white'}}>
              <option value={1} selected={this.props.info.l?"selected":""}>Lock</option>
              <option value={0} selected={!this.props.info.l?"selected":""}>UnLock</option>                        
            </select>
           
           
          <div style={{marginTop:20}}>Chú thích</div>
          <textarea rows="4" ref="txt_chu_thich"  style={{textAlign:'left',padding:5,width:'90%',border:'1px solid #e2e2e2'}} />
          <div style={{marginTop:20,textAlign:'center'}}><Button type="primary" icon="save" onClick={this.save}>Lưu</Button></div>
      </div>
    );
  }
}

EditLock.propTypes = {

};

export default EditLock;
