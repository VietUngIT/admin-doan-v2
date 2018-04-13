/**
*
* MiniId
*
*/

import React from 'react';
// import styled from 'styled-components';

import TaiXiuId from 'components/Minigames/TaiXiuId'
import BauCuaId from 'components/Minigames/BauCuaId'
import {
  Tabs,
  Input,
  Button,
  message,
  Pagination ,
  Dropdown,
  Modal,
  Icon
} from 'antd';
import moment from 'moment';
import {withRouter} from 'react-router' ;
import Workbook from 'react-excel-workbook';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
var st = false;
var et = false;
var g_name = "TaiXiu";
var key_input = "";

class MiniId extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      key : false,
      gn : "TaiXiu",
      isMobile: false,
      date : moment(),
      todate : moment(),
    };
   
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
    // var _date = false;
    // var _todate= false;
    // if(this.refs.fromDate.input.props.value.toString().trim() && this.refs.fromDate.input.props.value.toString().trim()!==""
    // && this.refs.toDate.input.props.value.toString().trim() && this.refs.toDate.input.props.value.toString().trim()!=="")
    // {
    //  _date = this.refs.fromDate.input.props.value.toString().trim().split('/').reverse().join('/')+ " 00:00";
    //  _todate = this.refs.toDate.input.props.value.toString().trim().split('/').reverse().join('/')+ " 23:59";
    //  st = this.refs.fromDate.input.props.value.toString().trim();
    //  et = this.refs.toDate.input.props.value.toString().trim();
    // }else{
    //   _date = false;
    //   _todate = false;
    //   message.error('Ngày chưa được chọn !');
    // }
    if(g_name && key_input){
      // var someDate = new Date(_date).getTime();
      // var toDate = new Date(_todate).getTime();
      this.props.search_mini_id(key_input,g_name);
    }
    else{
      message.error("Nhập phiên game !")
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
    var table=false;
    if(this.props.load){
      table=(
        <center>
          <img src={require('images/loading.gif')} style={{width:100,height:100}}/>
        </center>  
      )
    }else{
           
      if(this.props.data){
        var item = false;
        if(g_name == "TaiXiu"){
          table = (<TaiXiuId data={this.props.data} formatCurency={(prize)=>this.formatCurency(prize)} convertTime={(time)=>this.convertTime(time)} key_input={key_input}/>)   
        }
       
        if(g_name == "BauCua"){
          table = (<BauCuaId data={this.props.data} formatCurency={(prize)=>this.formatCurency(prize)} convertTime={(time)=>this.convertTime(time)} key_input={key_input}/>) 
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
              <td>
              <Input placeholder="Nhậ­p phiên game" style={{height:35,width:120,marginRight:10}} 
                ref="Input"
                onChange={this.onChangeInput}/>
              </td>
              <td>
              <select id="gn" onChange={(e)=>this.onChangGn(e)}
                    
                    style={{marginLeft:'2%',height:'35px',width:120,border:'1px solid #e2e2e2',borderRadius:'5px',background:'white'}}>
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

MiniId.propTypes = {

};

export default MiniId;
