/**
*
* SearchName
*
*/
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DetailSlot from 'components/DetailSlot'

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
  Select,
} from 'antd';
import moment from 'moment';
import {withRouter} from 'react-router' ;
import Workbook from 'react-excel-workbook';
var st = false;
var et = false;
var g_name = "XocDia";
const format = 'HH:mm';
const Option = Select.Option;

class SearchName extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      key : "",
      nickname : false,
      gn : 'XocDia',
      dateMoney : moment(),      
      todateMoney : moment(),   
      visible: false,
      activePage : 1,
      id :false,
      fromTime : "",
      toTime : "",
    };
    this.onChangeDate = this.onChangeDate.bind(this);
    
    this.onChangeToDate = this.onChangeToDate.bind(this);
  }
  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    this.setState({
      visible: false,
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
  onChangeInput=(k)=>{
    this.setState({
      key: k.target.value.trim(),
    });
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
  onChangGn = (e)=>{
    g_name = (e.target.value);
   
    this.setState({
      gn: g_name,
    });
  }
  search_by_id=()=>{
    if(this.state.id){
      this.props.search_by_id(this.state.id,g_name);
    }else{
      message.error("Nhập đầy đủ thông tin !")
    }
  }
  changeTime=(time, timeString)=>{
    this.setState({fromTime:timeString.toString()})
  }
  changeToTime=(time, timeString)=>{
    this.setState({toTime:timeString})
  }
  search_by_user=()=>{
    var _date = false;
    var _todate = false;
    if(this.refs.fromDate.input.props.value.toString().trim() && this.refs.fromDate.input.props.value.toString().trim()!==""&&
    this.refs.toDate.input.props.value.toString().trim() && this.refs.toDate.input.props.value.toString().trim()!==""){
     _date = this.refs.fromDate.input.props.value.toString().trim().split('/').reverse().join('/')+" " +this.state.fromTime;
     if(this.state.toTime){
      _todate = this.refs.toDate.input.props.value.toString().trim().split('/').reverse().join('/')+ " " +this.state.toTime;
      
     }else{
      _todate = this.refs.toDate.input.props.value.toString().trim().split('/').reverse().join('/')+ " 23:59";
     }
     st = this.refs.fromDate.input.props.value.toString().trim();
     et = this.refs.toDate.input.props.value.toString().trim();
     
    }else{
      _todate = false;
      _date = false;
        message.error('Ngày chưa được chọn !');
    }

    
    if(_date &&_todate && this.state.key && g_name){
      var someDate = new Date(_date).getTime();
      var toDate = new Date(_todate).getTime();
      
      this.props.search_by_user(this.state.key,g_name,someDate,toDate);
      this.setState({activePage:1})
      
    }else{
      message.error('Nhập đầy đủ thông tin !');
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
  showDetail=(id)=>{
    this.setState({
      visible: true,
    });
    this.props.search_by_id(id,g_name);
  }
  onChange = (page) => {
    this.setState({
      activePage: page,
    });
  }
  render() {
    var content = false;
    var detailSlot = false;
    var detail_slot = false;
    var itemsPerPage = 10;
    var total_item = 0;
    var content_id = false;
    var page = false;
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
    var menu = (
      <ul style={{ border: "1px solid #e2e2e2",borderRadius: 5,width: 150,background: "#f7f7f7",color: "#404040"}} prefixCls ="">
        <li key="1" onClick={this.search_by_user} style={{padding:10,background:'#e2e2e2'}}>Tìm theo nickname</li>
        <li key="2" onClick={this.search_by_id_1} style={{padding:10}}> Tìm theo phiên game </li>
      </ul>  
    )
   
    if(this.props.data_id && (this.props.data_id.length > 0 || this.props.data_id.size > 0)){
     
      this.props.data_id.map((row,index)=>{ 
     
      detail_slot=(
        <DetailSlot referenceId={row.referenceId} time={row.updateTime} gameDetail={row.gameDetail}/>
      ) })
    }
    if(this.props.load){
      content=(
        <center>
          <img src={require('images/loading.gif')} style={{width:100,height:100}}/>
        </center> 
      )
    }else{
    
      if(this.props.data_un && (this.props.data_un.length > 0 || this.props.data_un.size > 0)){
        total_item = this.props.data_un.length; 
        page = (
          <div style={{margin: '3% 5%'}}>
            <div style={{display: 'inline-block'}}>
              <Pagination
                style={{display: 'inline-block'}}
                total={total_item?total_item:0}
                pageSize={itemsPerPage}
                defaultCurrent={1}
                current={this.state.activePage}
                onChange={this.onChange}
              />
              <div style={{display:total_item?"inline-block":'none',float:'right',border:'1px solid #c4c4c4',borderRadius:'3px',padding:'4px 10px',marginLeft:'10px',fontSize:'13px'}}>
                {this.state.activePage}/{total_item>0?(total_item%itemsPerPage==0?total_item/itemsPerPage:parseInt(total_item/itemsPerPage)+1):0}

              </div>
            </div>
          </div>
        )
        var item = this.props.data_un.map((row,index)=>{          
          if(index >= (this.state.activePage-1) *itemsPerPage && index < (this.state.activePage) *itemsPerPage ){
            return(
              <tr key={index} onClick={(id)=>this.showDetail(row.referenceId)}>
                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{row.referenceId}</td>
                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.convertTime(row.updateTime)}</td>
              </tr>  
            )
          }
          
        })
        detailSlot = (
          <Modal
              title="Chi tiết"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              footer={[
                <Button key="back" type="primary" onClick={this.handleCancel}>OK</Button>,
                
              ]}
            >
              {detail_slot}
              
          </Modal>
        )
        content=(
          <div>
            {detailSlot}
            <table style={{width:'90%',marginTop:'3%',marginLeft:'4%'}}>
              <tbody>
                <tr style={{overflow:'auto',background:'rgb(236, 246, 253)',fontStyle:'italic'}}>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>Phiên bài</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>Thời gian</th>
                </tr>
                {item}
              </tbody>  
            </table> 
          </div> 
        )
      }else{
        // if(!this.props.data_id){
          content=(
            <h3 style={{marginLeft:'3%',marginTop:'5%'}}>Không có dữ liệu !</h3>
          )
        //}
        
      }
    }
    return (
      <div>
        <h3 style={{marginLeft:'3%',marginTop:'1%'}}>Tra cứu thông tin game bài</h3>
        <table style={{marginLeft:'5%',marginTop:'2%'}}>
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
                  selected={this.state.dateMoney}
                  onChange={this.onChangeDate}
                  customInput={<Input  style={{width: '80%',height:'35px',border:'1px solid #e2e2e2',borderRadius:'5px',background:'white'}}/>}
                  dateFormat="DD/MM/YYYY"
                  showYearDropdown
                  scrollableYearDropdown
                  yearDropdownItemNumber={5}
                  isClearable={false}
                  placeholderText="Chọn ngày bắt đầu"
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
            <tr>
                <td>Ngày Kết thúc
                </td>
               
                <td>Giờ kết thúc
                </td>  
            </tr>  
            <tr>  
              <td>
                <DatePicker
                ref="toDate"
                selected={this.state.todateMoney}
                onChange={this.onChangeToDate}
                customInput={<Input  style={{width: '80%',height:'35px',border:'1px solid #e2e2e2',borderRadius:'5px',background:'white'}}/>}
                dateFormat="DD/MM/YYYY"
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={5}
                isClearable={false}
                placeholderText="Chọn ngày kết thúc"
                withPortal
                maxDate={moment()}
                /> 
              </td>
              <td>
                <TimePicker  style={{height:35,width:120}} defaultValue={moment('23:59', format)} format={format} placeholder="Nhập giờ"  onChange={this.changeToTime}/>
              </td>
              
            </tr>
            <tr style={{height:10}}>
            <td/>
            <td/>
            <td/>
            </tr>  
            <tr>
              <td>
                <select id="gn" onChange={(e)=>this.onChangGn(e)}
                  value={this.state.gn}
                  style={{marginLeft:'1%',height:'35px',width:120,border:'1px solid #e2e2e2',borderRadius:'5px',background:'white'}}>                
                  <option value={"XocDia"}>Xóc đĩa</option>
                  <option value={"Lieng"}>Liêng</option>
                  <option value={"Poker"}>Poker</option>
                  <option value={"Tienlen"}>Tiến lên</option>
                  <option value={"Binh"}>Binh</option>                 
                  <option value={"Sam"}>Sam</option>
                  <option value={"BaCay"}>Ba cây</option>
                </select>
              </td>
              <td>
                {/* <Input placeholder="Nhậ­p nickname" style={{height:35,width:120}} 
                onChange={this.onChangeInput}/> */}
                {manager}
              </td>
              <td style={{width:10}} />
              <td>
                <Button icon="search" style={{height:35,width:35}}
                  onClick={this.search_by_user}
                >
                
                </Button>
              </td> 
            </tr> 
            <tr style={{height:10,borderBottom:'1px dashed #e2e2e2'}}>
              <td colSpan={2}/>
            </tr>  
            </tbody>  
          </table>
        <div style={{marginLeft:'1%',marginTop:'1%'}}>
        {content}
        {content_id}
        </div>
        {page}
      </div>
    );
  }
}

SearchName.propTypes = {

};

export default SearchName;
