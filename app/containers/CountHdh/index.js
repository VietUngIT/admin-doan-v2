/*
 *
 * CountHdh
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { selectData, selectIsLoading, selectTotalPage } from './selectors';
import messages from './messages';
import { count_hdh, count_hdh_success } from './actions';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { 
  Tabs,
  Input,
  Button,
  message,
  Pagination ,
  Modal,
  TimePicker,
  Icon,
} from 'antd';
const format = 'HH:mm:ss';
import moment from 'moment';
import { Link,browserHistory } from 'react-router';
var someDate = false;
var toDate = false;
export class CountHdh extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      dateMoney : moment(),      
      todateMoney : moment(),     
      isMobile: false,
      activePage :1,
      fromTime : "",
      toTime : "",
      hdh : "all",

      sort_user : "asc",
      isSortUser : false,

      sort_nick : "asc",
      isSortNick : false,

      sort_hdh : "asc",
      isSortHDH : false,

      sort_time : "asc",
      isSortTime : false,

      sort_ip : "asc",
      isSortIP : false,

      sort_active : "asc",
      isSortActive : false,

      sort_sdt : "asc",
      isSortSDT : false,

      data_sort : false,
    };
    this.onChangeDate = this.onChangeDate.bind(this);

    this.onChangeToDate = this.onChangeToDate.bind(this);
 
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
    result = date +" "+time;
    return result;
  }
  formatCurency(price){
    var strPrice = price+'';
    var a = strPrice.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')+ ' King';
    return a;
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
  onChange = (page) => {
    
    this.setState({
      activePage: page,
    });
    // this.props.count_hdh(this.state.hdh,someDate,toDate);
    // this.setState({sort_active:"asc"})
    //   this.setState({isSortActive:false})
    //   this.setState({sort_user:"asc"})
    //   this.setState({isSortUser:false})
    //   this.setState({sort_nick:"asc"})
    //   this.setState({isSortNick:false})
    //   this.setState({sort_sdt:"asc"})
    //   this.setState({isSortSDT:false})
    //   this.setState({sort_ip:"asc"})
    //   this.setState({isSortIP:false})
    //   this.setState({sort_time:"asc"})
    //   this.setState({isSortTime:false})
    //   this.setState({sort_hdh:"asc"})
    //   this.setState({isSortHDH:false})
  }
  onClick=()=>{
    var _date = false;
    var _todate = false;
    if(this.refs.fromDate.input.props.value.toString().trim() && this.refs.fromDate.input.props.value.toString().trim()!==""&&
    this.refs.toDate.input.props.value.toString().trim() && this.refs.toDate.input.props.value.toString().trim()!==""){
     _date = this.refs.fromDate.input.props.value.toString().trim().split('/').reverse().join('/')+ " " +this.state.fromTime;
     if(this.state.toTime){
      _todate = this.refs.toDate.input.props.value.toString().trim().split('/').reverse().join('/')+ " " +this.state.toTime;
      
     }else{
      _todate = this.refs.toDate.input.props.value.toString().trim().split('/').reverse().join('/')+ " 23:59";
     }
   
    }else{
      _todate = false;
      _date = false;
        message.error('Ngày chưa được chọn !');
    }
    if(_date &&_todate){
       someDate = new Date(_date).getTime();
       toDate = new Date(_todate).getTime();
      
      this.props.count_hdh("all",someDate,toDate);
      this.setState(
        {activePage:1})
      this.setState({sort_active:"asc"})
      this.setState({isSortActive:false})
      this.setState({sort_user:"asc"})
      this.setState({isSortUser:false})
      this.setState({sort_nick:"asc"})
      this.setState({isSortNick:false})
      this.setState({sort_sdt:"asc"})
      this.setState({isSortSDT:false})
      this.setState({sort_ip:"asc"})
      this.setState({isSortIP:false})
      this.setState({sort_time:"asc"})
      this.setState({isSortTime:false})
      this.setState({sort_hdh:"asc"})
      this.setState({isSortHDH:false})
      this.setState({hdh:"all"})
      
    
    }else{
      message.error('Nhập đầy đủ thông tin !');
    }
  }

  onChangeFilter(e){
    this.setState({hdh:e.target.value})
    this.setState(
      {activePage:1})
    this.setState({sort_active:"asc"})
    this.setState({isSortActive:false})
    this.setState({sort_user:"asc"})
    this.setState({isSortUser:false})
    this.setState({sort_nick:"asc"})
    this.setState({isSortNick:false})
    this.setState({sort_sdt:"asc"})
    this.setState({isSortSDT:false})
    this.setState({sort_ip:"asc"})
    this.setState({isSortIP:false})
    this.setState({sort_time:"asc"})
    this.setState({isSortTime:false})
    this.setState({sort_hdh:"asc"})
    this.setState({isSortHDH:false})
  }
  sortUserName=()=>{
    this.setState({isSortUser:true})
    if(this.state.sort_user==""){
      this.setState({sort_user:"asc"})
      
    }else{
      if(this.state.sort_user==="asc"){
        this.setState({sort_user:"desc"})
        
      }
      if(this.state.sort_user==="desc"){
        this.setState({sort_user:"asc"})
        
      }
    }
    
    this.handleSortUserName();
  }
  handleSortUserName=()=>{
    if(this.state.sort_user=="asc" || this.state.sort_user==""){
     
      this.props.count_hdh_success(this.props.data.sort(function (a, b) {
        if (a.username.toUpperCase()  < b.username.toUpperCase() ) return -1;
        else if (a.username.toUpperCase()  > b.username.toUpperCase() ) return 1;
        return 0;
      }));
      
    }
    if(this.state.sort_user=="desc"){
     
      this.props.count_hdh_success(this.props.data.sort(function (a, b) {
        if (a.username.toUpperCase()  > b.username.toUpperCase() ) return -1;
        else if (a.username.toUpperCase()  < b.username.toUpperCase() ) return 1;
        return 0;
      }));
      
    }
   
  }
  sortNickName=()=>{
    this.setState({isSortNick:true})
    if(this.state.sort_nick==""){
      this.setState({sort_nick:"asc"})
      
    }else{
      if(this.state.sort_nick==="asc"){
        this.setState({sort_nick:"desc"})
        
      }
      if(this.state.sort_nick==="desc"){
        this.setState({sort_nick:"asc"})
        
      }
    }
    
    this.handleSortNickName();
  }
  handleSortNickName=()=>{
    if(this.state.sort_nick=="asc" || this.state.sort_nick==""){
     
      this.props.count_hdh_success(this.props.data.sort(function (a, b) {
        if (a.nickname < b.nickname ) return -1;
        else if (a.nickname  > b.nickname ) return 1;
        return 0;
      }));
      
    }
    if(this.state.sort_nick=="desc"){
     
      this.props.count_hdh_success(this.props.data.sort(function (a, b) {
        if (a.nickname > b.nickname) return -1;
        else if (a.nickname< b.nickname) return 1;
        return 0;
      }));
      
    }
   
  }

  sortHDH=()=>{
    this.setState({isSortHDH:true})
    if(this.state.sort_hdh==""){
      this.setState({sort_hdh:"asc"})
      
    }else{
      if(this.state.sort_hdh==="asc"){
        this.setState({sort_hdh:"desc"})
        
      }
      if(this.state.sort_hdh==="desc"){
        this.setState({sort_hdh:"asc"})
        
      }
    }
    
    this.handleSortHDH();
  }
  handleSortHDH=()=>{
    if(this.state.sort_hdh=="asc" || this.state.sort_hdh==""){
     
      this.props.count_hdh_success(this.props.data.sort(function (a, b) {
        if (a.agent.toUpperCase()  < b.agent.toUpperCase() ) return -1;
        else if (a.agent.toUpperCase()  > b.agent.toUpperCase() ) return 1;
        return 0;
      }));
      
    }
    if(this.state.sort_hdh=="desc"){
     
      this.props.count_hdh_success(this.props.data.sort(function (a, b) {
        if (a.agent.toUpperCase()  > b.agent.toUpperCase() ) return -1;
        else if (a.agent.toUpperCase()  < b.agent.toUpperCase() ) return 1;
        return 0;
      }));
      
    }   
  }
  sortTime=()=>{
    this.setState({isSortTime:true})
    if(this.state.sort_time==""){
      this.setState({sort_time:"asc"})
      
    }else{
      if(this.state.sort_time==="asc"){
        this.setState({sort_time:"desc"})
        
      }
      if(this.state.sort_time==="desc"){
        this.setState({sort_time:"asc"})
        
      }
    }
    
    this.handleSortTime();
  }
  handleSortTime=()=>{
    if(this.state.sort_time=="asc" || this.state.sort_time==""){
     
      this.props.count_hdh_success(this.props.data.sort(function (a, b) {
        if (parseInt(a.time) < parseInt(b.time)) return -1;
        else if (parseInt(a.time) > parseInt(b.time)) return 1;
        return 0;
      }));
      
    }
    if(this.state.sort_time=="desc"){
     
      this.props.count_hdh_success(this.props.data.sort(function (a, b) {
        if (parseInt(a.time) > parseInt(b.time)) return -1;
        else if (parseInt(a.time) < parseInt(b.time)) return 1;
        return 0;
      }));
      
    }
   
  }
  sortIP=()=>{
    this.setState({isSortIP:true})
    if(this.state.sort_ip==""){
      this.setState({sort_ip:"asc"})
      
    }else{
      if(this.state.sort_ip==="asc"){
        this.setState({sort_ip:"desc"})
        
      }
      if(this.state.sort_ip==="desc"){
        this.setState({sort_ip:"asc"})
        
      }
    }
    
    this.handleSortIP();
  }
  handleSortIP=()=>{
    if(this.state.sort_ip=="asc" || this.state.sort_ip==""){
     
      this.props.count_hdh_success(this.props.data.sort(function (a, b) {
        if (a.ip < b.ip) return -1;
        else if (a.ip > b.ip) return 1;
        return 0;
      }));
      
    }
    if(this.state.sort_ip=="desc"){
     
      this.props.count_hdh_success(this.props.data.sort(function (a, b) {
        if (a.ip > b.ip) return -1;
        else if (a.ip < b.ip) return 1;
        return 0;
      }));
      
    }   
  }
  sortActive=()=>{
    this.setState({isSortActive:true})
    if(this.state.sort_active==""){
      this.setState({sort_active:"asc"})
      
    }else{
      if(this.state.sort_active==="asc"){
        this.setState({sort_active:"desc"})
        
      }
      if(this.state.sort_active==="desc"){
        this.setState({sort_active:"asc"})
        
      }
    }
    
    this.handleSortActive();
  }
  handleSortActive=()=>{
    if(this.state.sort_active=="asc" || this.state.sort_active==""){
     
      this.props.count_hdh_success(this.props.data.sort(function (a, b) {
        if (a.active < b.active) return -1;
        else if (a.active > b.active) return 1;
        return 0;
      }));
      
    }
    if(this.state.sort_active=="desc"){
     
      this.props.count_hdh_success(this.props.data.sort(function (a, b) {
        if (a.active > b.active ) return -1;
        else if (a.active < b.active) return 1;
        return 0;
      }));
      
    }   
  }
  sortSDT=()=>{
    this.setState({isSortSDT:true})
    if(this.state.sort_sdt==""){
      this.setState({sort_sdt:"asc"})
      
    }else{
      if(this.state.sort_sdt==="asc"){
        this.setState({sort_sdt:"desc"})
        
      }
      if(this.state.sort_sdt==="desc"){
        this.setState({sort_sdt:"asc"})
        
      }
    }
    
    this.handleSortSDT();
  }
  handleSortSDT=()=>{
    if(this.state.sort_sdt=="asc" || this.state.sort_sdt==""){
     
      this.props.count_hdh_success(this.props.data.sort(function (a, b) {
        if (a.mobile < b.mobile) return -1;
        else if (a.mobile > b.mobile) return 1;
        return 0;
      }));
      
    }
    if(this.state.sort_sdt=="desc"){
     
      this.props.count_hdh_success(this.props.data.sort(function (a, b) {
        if (a.mobile > b.mobile) return -1;
        else if (a.mobile < b.mobile) return 1;
        return 0;
      }));
      
    }   
  }
  render() {
    var search = (
      <table style={{marginLeft:'5%',marginTop:'1%'}}>
        <tbody>
          <tr>
            <td>Ngày bắt đầu
            </td>
              
            <td>Giờ bắt đầu
            </td>  
            <td>
            </td>  
          </tr>  
          <tr>
            <td>
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
            <td style={{width:10}}/>  
            <td>
            
            </td>   
          </tr>
          <tr style={{height:10}}>
            <td colSpan={2}>
              
            </td>
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
                selected={this.state.todateMoney}
                onChange={this.onChangeToDate}
                customInput={<Input  style={{width: '80%',height:'35px',border:'1px solid #e2e2e2',borderRadius:'5px',background:'white',flex: 1}}/>}
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
            <td style={{width:10}}/>  
            <td>
              <Button icon="search" style={{height:35,width:35}} onClick={this.onClick}/>

            </td>
          </tr>          
            
          </tbody>
        </table>           
       
    )
    var content = false;
    var item = false;
    var total_item = false;
    var page = false;
    var itemsPerPage = 10;

    if(this.props.isLoading){
      content=(
        <center>
          <img src={require('images/loading.gif')} style={{width:100,height:100}}/>
        </center>  
      )
    }else{
      if(this.props.data && this.props.data.length>0){
        var filter_data = [];
        
        var active_ = false;
        var nik=[];
  
        // var data_ = this.state.data_sort ? this.state.data_sort:this.props.data;
        this.props.data.map((rows,indexs)=>{
          if(this.state.hdh=="all"){
            filter_data.push(rows);
          }else{
            if(rows.agent==this.state.hdh){

            filter_data.push(rows);
            }
            
          }
          
        })
          
        if(filter_data.size>0 || filter_data.length>0){
          total_item = filter_data.length;
          page =(
            <div style={{margin: '2% 5%'}}>
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
          item = filter_data.map((row,index)=>{
            nik.push(row.username)
            switch(row.active){
              case 0 :{
                active_ = "Chưa active";
                break;
              }
              case 1 :{
                active_ = "Đã active";
                break;
              }
              case 2 :{
                active_ = "Đã update";
                break;
              }
              
            }
            if(index >= (this.state.activePage-1) *itemsPerPage && index < (this.state.activePage) *itemsPerPage ){ 
              return(
                <tr key={index}>
                  <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>{index+1}</td>
                  <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{row.username}</td>
                  <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{row.nickname?row.nickname:" "}</td>
                  <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{row.mobile?row.mobile:" "}</td>
                  <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{row.ip}</td>
                  <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{active_}</td>
                  <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{row.agent}</td>
                  <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>{this.convertDate(row.time)}</td>                
                                      
                </tr>
              )
            }
          })
        
       
        }else{
          item = (
            <tr >
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}} colSpan={8}>Không có dữ liệu</td> 
            </tr>
          ) 
        }
        var icon_user = "";
        
        content = (
          <div style={{overflow:'auto'}}>
            <h3 style={{marginLeft:"5%",marginTop:'2%'}}>Số lượng : {total_item>0?total_item:0} </h3>
            <div style={{marginTop:'1%',marginLeft:'5%',fontSize:13}}>
              <Icon type="filter" /> <span>Lọc : </span>
              <select 
                  style={{border:'1px solid #e2e2e2',borderRadius:5,height:35}}
                  onChange={(e)=>this.onChangeFilter(e)}
                  value={this.state.hdh}
                >
                <option value={"all"}>Tất cả</option>          
                <option value={"Android"}>Android</option>
                <option value={"IOS"}>IOS</option>
                <option value={"Web"}>Web</option>
                <option value={"Unknow"}>Unknow</option>
              </select>  
            </div> 
            <table style={{marginLeft:"5%",marginTop:'2%',width:'90%'}} id="tableBody">
              <tbody>
                <tr style={{background:'#ecf6fd'}}>
                    <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}><Link >STT</Link></th>                
                
                    <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,fontStyle:'italic'}}>
                      <Link onClick={this.sortUserName}>Tên người dùng
                       
                        {this.state.isSortUser?
                           ( <Icon style={{marginLeft: '5px'}} type={this.state.isSortUser? (this.state.sort_user=="desc"?"up-square-o":"down-square-o"):""}></Icon>):
                           <img src={require('images/sort.png')} style={{width:13,height:13,marginLeft:5}}/>} 
                      </Link>
                    </th>
                    <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,fontStyle:'italic'}}>
                      <Link onClick={this.sortNickName}>Tên hiển thị
                       
                        {this.state.isSortNick?
                           ( <Icon style={{marginLeft: '5px'}} type={this.state.isSortNick? (this.state.sort_nick=="desc"?"up-square-o":"down-square-o"):""}></Icon>):
                           <img src={require('images/sort.png')} style={{width:13,height:13,marginLeft:5}}/>} 
                      </Link>
                    </th>
                    <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,fontStyle:'italic'}}>
                      <Link onClick={this.sortSDT}>SĐT
                        
                        {this.state.isSortSDT?
                           (<Icon style={{marginLeft: '5px'}} type={this.state.isSortSDT? (this.state.sort_sdt=="desc"?"up-square-o":"down-square-o"):""}></Icon>):
                           <img src={require('images/sort.png')} style={{width:13,height:13,marginLeft:5}}/>} 
                      </Link>
                    </th>
                    <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,fontStyle:'italic'}}>
                      <Link onClick={this.sortIP}>IP
                        
                        {this.state.isSortIP?
                           (<Icon style={{marginLeft: '5px'}} type={this.state.isSortIP? (this.state.sort_ip=="desc"?"up-square-o":"down-square-o"):""}></Icon>):
                           <img src={require('images/sort.png')} style={{width:13,height:13,marginLeft:5}}/>} 
                      </Link>
                    </th>
                    <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,fontStyle:'italic'}}>
                      <Link onClick={this.sortActive}>Trạng thái
                        
                        {this.state.isSortActive?
                           (<Icon style={{marginLeft: '5px'}} type={this.state.isSortActive? (this.state.sort_active=="desc"?"up-square-o":"down-square-o"):""}></Icon>):
                           <img src={require('images/sort.png')} style={{width:13,height:13,marginLeft:5}}/>} 
                      </Link>
                    </th>
                    <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,fontStyle:'italic'}}>
                      <Link onClick={this.sortHDH}>Hệ điều hành
                          {this.state.isSortHDH?
                           ( <Icon style={{marginLeft: '5px'}} type={this.state.isSortHDH? (this.state.sort_hdh=="desc"?"up-square-o":"down-square-o"):""}></Icon>):
                           <img src={require('images/sort.png')} style={{width:13,height:13,marginLeft:5}}/>} 
                      </Link>
                    </th>
                    <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5,fontStyle:'italic'}}>
                      <Link onClick={this.sortTime}>Thời gian
                          
                          {this.state.isSortTime?
                           (<Icon style={{marginLeft: '5px'}} type={this.state.isSortTime? (this.state.sort_time=="desc"?"up-square-o":"down-square-o"):""}></Icon>):
                           <img src={require('images/sort.png')} style={{width:13,height:13,marginLeft:5}}/>} 
                      </Link>
                      
                    </th>
              
                </tr> 
              {item}
              </tbody> 
            </table>  
          </div>  
          
        )
        // console.log("nik",nik.sort())
        // console.log("nik--",nik.sort())
        
      }else{
        content = (
        <div style={{overflow:'auto'}}>
          <table style={{marginLeft:"5%",marginTop:'2%',width:'90%'}}>
            <tbody>
              <tr style={{background:'#ecf6fd'}}>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5,fontStyle:'italic'}}>Tên người dùng</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5,fontStyle:'italic'}}>Tên hiển thị</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5,fontStyle:'italic'}}>SĐT</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5,fontStyle:'italic'}}>IP</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5,fontStyle:'italic'}}>Trạng thái</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5,fontStyle:'italic'}}>Hệ điều hành</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5,fontStyle:'italic'}}>Thời gian</th>
            
              </tr> 
              <tr >
                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}} colSpan={7}>Không có dữ liệu</td>                
                                 
              </tr>
            </tbody> 
          </table>  
        </div> ) 
      }
    }
    
    return (
      <div>
        <h3 style={{marginLeft:"5%",marginTop:'2%'}}>Chỉ số NRU </h3>
        {search}
        {content}
        {page}
      </div>
    );
  }
}

CountHdh.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  data: selectData(),
  isLoading : selectIsLoading(),
  total_page : selectTotalPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    count_hdh:(t,st,et)=>dispatch(count_hdh(t,st,et)),
    count_hdh_success:(data)=>dispatch(count_hdh_success(data)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CountHdh);
