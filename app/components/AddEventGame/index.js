/**
*
* AddEventGame
*
*/

import React from 'react';
// import styled from 'styled-components';

const format = 'HH:mm';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { 
  Tabs,
  Input,
  Button,
  message,
  Pagination ,
  TimePicker ,
  Select,
} from 'antd';

class AddEventGame extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      dateMoney : moment(),
      todateMoney : moment(),
    
      fromTime : "00:00",
      toTime : "23:59",
     
      count : 0,
      gn : "taixiu",

    };
    this.onChangeDate = this.onChangeDate.bind(this);
    
    this.onChangeToDate = this.onChangeToDate.bind(this);
   
  }
  onChangeCount=(e)=>{
    // console.log(e.target.value)
    this.setState({
      count: e.target.value,
    });   
  }
  onChangeDate=(date)=>{
    this.setState({
      dateMoney: date,
    });     
  }
  onChangeToDate=(date)=>{
    this.setState({
      todateMoney: date,
    });
     
  }
  changeTime=(time, timeString)=>{
    this.setState({fromTime:timeString.toString()})
  }
  changeToTime=(time, timeString)=>{
    this.setState({toTime:timeString})
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
    result = date ;
    return result;
  }
  onChangeGID=(e)=>{
    this.setState({gn : e.target.value})
  }
  reset=()=>{
    this.refs.name.value = "";
    this.setState({count : 0})
    this.setState({gn :"taixiu"})
    this.setState({dateMoney : moment()})
    this.setState({todateMoney : moment()})
    
  }
  addEvent=()=>{
    var _date = false;
    var _todate = false;
    if(this.refs.name.value.trim()!=="" && this.refs.fromDate.input.props.value.toString().trim()!=="" && this.refs.toDate.input.props.value.toString().trim()!==""
      && this.state.count >0)
    {
      _date = this.refs.fromDate.input.props.value.toString().trim().split('/').reverse().join('/')+ " "+"00:00" ;
      _todate = this.refs.toDate.input.props.value.toString().trim().split('/').reverse().join('/')+ " " +"23:59";
      var someDate = new Date(_date).getTime();
      var toDate = new Date(_todate).getTime();
      this.props.add_even(this.state.gn,this.refs.name.value.trim(),someDate,toDate,this.state.count);
      this.props.cancel();
      this.reset();
    }else{
      message.error('Nhập đầy đủ thông tin !');

    }
  }
  render() {
    return (
      <div>
          <span>Tên sự kiện :</span>
        
          <textarea rows="2" 
            style={{width:'100%',border:'1px solid #e2e2e2',fontSize:13,padding:5,borderRadius:5}} 
            placeholder="Nhập tên sự kiện" ref="name"/>
          <div >
            <span>Chọn game :</span>
            <select style={{width:150,height:35,borderRadius:5,border:'1px solid #e2e2e2',marginLeft:10,marginTop:5,marginBottom:10}}
                value={this.state.gn} onChange={(e)=>this.onChangeGID(e)}
              >
                <option value={"taixiu"}>Tài xỉu</option>
                <option value={"bacay"}>Ba cây</option>
                <option value={"baicao"}>Bài cao</option>
                <option value={"binh"}>Binh</option>
                <option value={"lieng"}>Liêng</option>
                <option value={"poker"}>Poker</option>
                <option value={"sam"}>Sam</option>
                <option value={"tienlen"}>Tiến lên</option>
                <option value={"xocdia"}>Xóc đĩa</option>
                <option value={"baucua"}>Bầu cua</option>
                <option value={"caothap"}>Cao thấp</option>
                <option value={"luongson"}>Lương sơn</option>
                <option value={"quanan"}>Quán ăn</option>
                <option value={"minipoker"}>Mini poker</option>
                <option value={"como"}>Cổ mộ</option>
                <option value={"caoboi"}>Cao bồi</option>
              </select>         
          </div>   
          <span style={{marginTop:5}}>Chọn ngày bắt đầu :</span>
          <div style={{display:'-webkit-box'}}>
              <DatePicker
                  style={{color:'red', }}
                  ref="fromDate"
                  selected={this.state.dateMoney}
                  onChange={this.onChangeDate}
                  customInput={<Input  style={{width:'80%',height:'35px',border:'1px solid #e2e2e2',borderRadius:'5px',background:'white',flex: 1}}/>}
                  dateFormat="DD/MM/YYYY"
                  showYearDropdown
                  scrollableYearDropdown
                  yearDropdownItemNumber={5}
                  isClearable={false}
                  placeholderText="Ngày bắt đầu"
                  withPortal
                  // maxDate={moment()}
                />
              <TimePicker 
                defaultValue={moment('00:00', format)} 
                format={format} 
                placeholder="Nhập giờ"
                style={{height:35,width:120,display:"none"}}
                onChange={this.changeTime}
                // value={this.state.fromTime}
                
             />  
          </div>  
          <div style={{marginTop:10}}>Chọn ngày kết thúc :</div>
          <div style={{display:'-webkit-box'}}>
              <DatePicker
                  style={{color:'red', }}
                  ref="toDate"
                  selected={this.state.todateMoney}
                  onChange={this.onChangeToDate}
                  customInput={<Input  style={{width:'80%',height:'35px',border:'1px solid #e2e2e2',borderRadius:'5px',background:'white',flex: 1}}/>}
                  dateFormat="DD/MM/YYYY"
                  showYearDropdown
                  scrollableYearDropdown
                  yearDropdownItemNumber={5}
                  isClearable={false}
                  placeholderText="Ngày bắt đầu"
                  withPortal
                  // maxDate={moment()}
                />
              <TimePicker 
                defaultValue={moment('23:59', format)} 
                format={format} 
                placeholder="Nhập giờ"
                style={{height:35,width:120,display:"none"}}
                onChange={this.changeToTime}
                // value={this.state.toTime}
             />  
          </div>  
          <div style={{marginTop:10}}>Nhập số lượng :</div>
          <input type="number" min={0} defaultValue={0} onChange={this.onChangeCount} value={this.state.count}
            style={{width:'100%',border:'1px solid #e2e2e2',fontSize:13,padding:5,borderRadius:5,textAlign:'right',padding:5}}/>
            <center>
                <Button type="primary" style={{marginTop:'2%'}} onClick={this.addEvent}>
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

AddEventGame.propTypes = {

};

export default AddEventGame;
