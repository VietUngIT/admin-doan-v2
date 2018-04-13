/**
*
* MiniName
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TaiXiu from 'components/Minigames/TaiXiu'
import BauCua from 'components/Minigames/BauCua'
import CaoThap from 'components/Minigames/CaoThap'
import {
  Tabs,
  Input,
  Button,
  message,
  Pagination ,
  Dropdown,
  Modal,
  Icon,
  TimePicker,
  Select
} from 'antd';
import moment from 'moment';
import {withRouter} from 'react-router' ;
import Workbook from 'react-excel-workbook';
var st = false;
var et = false;
var g_name = "CaoThap";
var key_input = "";
const format = 'HH:mm';
const Option = Select.Option;

class MiniName extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      key : "",
      nickname : false,
      gn : "CaoThap",
      isMobile: false,
      date : moment(),
      todate : moment(),
      fromTime : "",
      toTime : "",
    };
   
  }
  handleChange = (value) => {
    this.setState({ key : value });
    if(value !==""){
      this.props.suggest_user_by_nickname(value);
    }
    
  }
  onSelect=(value)=>{
    this.setState({nickname : value})
  }
  changeTime=(time, timeString)=>{
    this.setState({fromTime:timeString.toString()})
  }
  changeToTime=(time, timeString)=>{
    this.setState({toTime:timeString})
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
  updateDimensions() {
    if(window.innerWidth < 450) {
     this.setState({
       isMobile: true,
     });
    } else {
     this.setState({
       isMobile: false,
     });
    }
  }
  
  /**
   * Add event listener
   */
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }
  
  /**
   * Remove event listener
   */
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }
  onChangeInput=(k)=>{
    key_input = k.target.value.trim();
    // this.setState({
    //   key: k.target.value,
    // });
  }
  onChangGn = (e)=>{
     g_name = (e.target.value);
    // console.log("g_name: ",g_name)
   
  }
  onClick =()=>{
    var _date = false;
    var _todate= false;
    if(this.refs.fromDate.input.props.value.toString().trim() && this.refs.fromDate.input.props.value.toString().trim()!==""
    && this.refs.toDate.input.props.value.toString().trim() && this.refs.toDate.input.props.value.toString().trim()!=="")
    {
     _date = this.refs.fromDate.input.props.value.toString().trim().split('/').reverse().join('/')+ " " +this.state.fromTime;
     if(this.state.toTime){
      _todate = this.refs.toDate.input.props.value.toString().trim().split('/').reverse().join('/')+ " " +this.state.toTime;
      
     }else{
      _todate = this.refs.toDate.input.props.value.toString().trim().split('/').reverse().join('/')+ " 23:59";
     }
     st = this.refs.fromDate.input.props.value.toString().trim();
     et = this.refs.toDate.input.props.value.toString().trim();
    }else{
      _date = false;
      _todate = false;
      message.error('Ngày chưa được chọn !');
    }
    if(_date && _todate && g_name && this.state.key!==""){
      var someDate = new Date(_date).getTime();
      var toDate = new Date(_todate).getTime();
      this.props.search_mini_game(this.state.key,g_name,someDate,toDate);
    }
    else{
      message.error("Nhập Nickname !")
    }
  }
  
  formatCurency(price){
    var strPrice = price+'';
    var a = strPrice.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')+ ' King';
    return a;
  }
  convertTime (time){
    var d = new Date(time),
    yyyy = d.getFullYear(),
    mm = ('0' + (d.getMonth() + 1)).slice(-2),
    dd = ('0' + d.getDate()).slice(-2),
    hh = ('0' + d.getHours()).slice(-2),
    min = ('0' + d.getMinutes()).slice(-2),
  
    result, time;
    time = hh + ':' + min;
    const date =   dd+ '/' + mm + '/'+ yyyy ;
    result =date+" "+ time ;
    return result;
  }
  render() {
    if(this.props.suggest_data){
    
      var options_suggest = false;     
        options_suggest = this.props.suggest_data.map((r,index)=>{    
          return(          
               <Option 
                 key={r} 
                 value={r}                  
                 style={{background:''}}
               >
                 {r} 
               </Option>              
             )        
          })
     
       
    }
    var manager = (
      <Select
        mode="combobox"
        value={this.state.key}
        placeholder="Nhập nickname"
        style={{width:120,height:'35px !important'}}
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        onChange={this.handleChange }
        onSelect={this.onSelect}
        refs="selectSuggest"
      >
        {options_suggest}
      </Select>
     )
    var table=false;
    if(this.props.load){
      table=(
        <center>
          <img src={require('images/loading.gif')} style={{width:100,height:100}}/>
        </center>  
      )
    }else{
      if(this.props.data && (this.props.data.length > 0 || this.props.data.size > 0)){
        var item = false;
        if(g_name == "TaiXiu"){
          table = (<TaiXiu st={st} et={et} data={this.props.data} formatCurency={(prize)=>this.formatCurency(prize)} convertTime={(time)=>this.convertTime(time)}/>)   
        }
        if(g_name == "CaoThap"){
          table = (<CaoThap st={st} et={et} data={this.props.data} formatCurency={(prize)=>this.formatCurency(prize)} convertTime={(time)=>this.convertTime(time)}/>) 
        }
        if(g_name == "BauCua"){
          table = (<BauCua st={st} et={et} data={this.props.data} formatCurency={(prize)=>this.formatCurency(prize)} convertTime={(time)=>this.convertTime(time)}/>) 
        }
      }else{
        table=(<h3 style={{marginLeft:'5%',marginTop:'5%'}}>Không có dữ liệu</h3>)
      }
    }
    
    return (
      <div>
        <h3 style={{marginLeft:'3%',marginTop:'1%'}}>Tra cứu lịch sử mini game</h3>
          <table style={{marginLeft:'5%',marginTop:'1%'}}>
          <tbody>
            <tr>
              <td>Ngày bắt đầu
              </td>
               
              <td>Giờ bắt đầu
              </td>  
            </tr>  
            <tr>
              <td>
                <DatePicker
                  ref="fromDate"
                  selected={this.state.date}
                  onChange={this.onChangeDate}
                  customInput={<Input  style={{width: '80%',height:'35px',border:'1px solid #e2e2e2',borderRadius:'5px',background:'white'}}/>}
                  dateFormat="DD/MM/YYYY"
                  showYearDropdown
                  scrollableYearDropdown
                  yearDropdownItemNumber={5}
                  isClearable={false}
                  placeholderText="Ngày bắt đầu"
                  withPortal
                  maxDate={moment()}
                />
              </td>
              <td>
                <TimePicker 
                    defaultValue={moment('00:00', format)} 
                    format={format} 
                    placeholder="Nhập giờ"
                    style={{height:35,width:120}}
                    onChange={this.changeTime}
                />
              </td>  
            </tr>
            <tr style={{height:10}}>
              <td colSpan={2}/>
            </tr>
            <tr>
              <td>Ngày kết thúc
              </td>
                
              <td>Giờ kết thúc
              </td>  
            </tr>  
            <tr>
              <td>
                <DatePicker
                  ref="toDate"
                  selected={this.state.todate}
                  onChange={this.onChangeToDate}
                  customInput={<Input  style={{width: '80%',height:'35px',border:'1px solid #e2e2e2',borderRadius:'5px',background:'white'}}/>}
                  dateFormat="DD/MM/YYYY"
                  showYearDropdown
                  scrollableYearDropdown
                  yearDropdownItemNumber={5}
                  isClearable={false}
                  placeholderText="Ngày kết thúc"
                  withPortal
                  maxDate={moment()}
                />
              </td>   
              <td>
                <TimePicker  style={{height:35,width:120}} defaultValue={moment('23:59', format)} format={format} placeholder="Nhập giờ"  onChange={this.changeToTime}/>
              </td> 
            </tr>
            <tr colSpan={2} style={{height:20}} />  
            <tr>
              <td>
              {/* <Input placeholder="Nhậ­p Nickname" style={{height:35,width:120,marginRight:10}} 
                ref="Input"
                onChange={this.onChangeInput}/> */}
                {manager}
              </td>
              <td>
              <select id="gn" onChange={(e)=>this.onChangGn(e)}
                    
                    style={{marginLeft:'2%',height:'35px',width:120,border:'1px solid #e2e2e2',borderRadius:'5px',background:'white'}}>
                    <option value={"CaoThap"}>Cao thấp</option>
                    <option value={"TaiXiu"}>Tài xỉu</option>
                    <option value={"BauCua"}>Bầu cua</option>              
              </select>
              </td>  
              <td style={{width:30}}/>
              <td >
                <Button icon="search" style={{height:35,width:35}} onClick={this.onClick}/>

              </td>
            </tr>  
            <tr style={{height:10,borderBottom:'1px dashed #e2e2e2'}}>
              <td colSpan={4}/>
            </tr>  
            </tbody>
          </table>           
         
          <div style={{height:'100%',width:'100%'}} >
            {table}
          </div>
      </div>
    );
  }
}

MiniName.propTypes = {

};

export default MiniName;
