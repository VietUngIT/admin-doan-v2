/*
 *
 * MoneyHistory
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';

import {

  getHisGame,
} from './actions';
import {

  selectDataGame,
  selectIsLoadingGame,
} from './selectors';
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
  TimePicker,
  Select
} from 'antd';
import {withRouter} from 'react-router' ;
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import Workbook from 'react-excel-workbook';
const TabPane = Tabs.TabPane;
var st_p = false;
var et_p = false;
var un_p = false;
var key_input = "";
var g_name = "";
var pre_g_name = "";
var is_g_name = false;
const format = 'HH:mm:ss';
import { selectSuggestData } from '../App/selectors';
import { suggest_user_by_nickname } from '../App/actions';
const Option = Select.Option;
var active = 1;
var wait_content = false;

export class MoneyHistory extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {    
      isMobile: false,   
      display_button : "none",  
      date : moment(),
      todate : moment(), 
      activePage : 1,
      gn : "",
      fromTime : "",
      toTime : "",
      key : "",
      nickname : false,
      action : false,
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
  onChange = (page) => {
    this.setState({
      activePage: page,
    });
  //  console.log("onchange")
    this.setState({
      action: true,
    });
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
  onChangeInput=(k)=>{
    key_input = k.target.value.trim();
    // this.setState({
    //   key: k.target.value,
    // });
  }
  onClickGetGame=()=>{
    // console.log("g_name-onClickGetGame",g_name)
    if(g_name == ""){
      is_g_name = false;
    }else{
      is_g_name = true;
    }
    pre_g_name = g_name;
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
     st_p = this.refs.fromDate.input.props.value.toString().trim();
     et_p = this.refs.toDate.input.props.value.toString().trim() ;
     
    }else{
      _date = false;
      _todate = false;
      message.error('Ngày chưa được chọn !');
    }
    if(_date && _todate){
      
      var someDate = new Date(_date).getTime();
      var toDate = new Date(_todate).getTime();
      if(this.state.key && this.state.key!==""){
        un_p = this.state.key.trim();
        this.props.getHisGame(g_name,this.state.key,someDate,toDate);
        this.setState({activePage:1})
      }else{
        message.error('Chưa nhập nickname !');
        
      }
     
    }
    
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
    result = date;
    return result;
  }
  convertDateTime(time){
    var d = new Date(time),
    yyyy = d.getFullYear(),
    mm = ('0' + (d.getMonth() + 1)).slice(-2),
    dd = ('0' + d.getDate()).slice(-2),
    hh = ('0' + d.getHours()).slice(-2),
    min = ('0' + d.getMinutes()).slice(-2),
    seconds = ('0' + d.getSeconds()).slice(-2),
    result, time;
    time = hh + ':' + min + ":" + seconds;
    result = time ;
    const date =   dd+ '/' + mm + '/'+ yyyy ;
    result = date+" "+time;
    return result;
  }

  formatCurency(price){
    var strPrice = price+'';
    var a = strPrice.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')+ ' King';
    return a;
  }
  onChangGn = (e)=>{
    pre_g_name = g_name;
    g_name = (e.target.value);
    // console.log("g_name-onchange",g_name)
   
    this.setState({
      gn: g_name,
    });
  }
  componentDidUpdate=()=>{
    if(this.state.activePage !== active){
      this.setState({
        action: false,
      });
    }
   
  }
  componentWillUpdate=()=>{
    active = this.state.activePage;
   
  }
  render() {
    var game_content = false;
    var itemsPerPage = 3;
    var total_item = 0; 
    var revenue_content = false;
    var print = false;
    var revenue_p = [];
    var data_p = [];
    var search_content_game = false;
    var item_tt = 0;
    var page = false;
    var content = false;
  
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
        defaultActiveFirstOption={true}
        showArrow={true}
        filterOption={true}
        onChange={this.handleChange }
        onSelect={this.onSelect}
        refs="selectSuggest"
      >
        {options_suggest}
      </Select>
     )
    search_content_game = (
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
        <tr style={{height:20}} />
        <tr>
          <td>
          {/* <Input placeholder="Nhậ­p Nickname" style={{height:35,width:120,marginRight:10}} 
            ref="Input_game"
            onChange={this.onChangeInput}/> */}
            {manager}
          </td>
          
          <td>
            <select id="gn" onChange={(e)=>this.onChangGn(e)}
              value={this.state.gn}
              style={{marginLeft:'2%',height:'35px',width:120,border:'1px solid #e2e2e2',borderRadius:'5px',background:'white'}}>
              <option  disabled selected>Chọn game</option>
              <option value={""}>All</option>              
              <option value={"KetSat"}>Két sắt</option>              
              <option value={"XocDia"}>Xóc đĩa</option>
              <option value={"luongson"}>Lương sơn bạc</option>
              <option value={"Lieng"}>Liêng</option>
              <option value={"Poker"}>Poker</option>
              <option value={"Tienlen"}>Tiến lên</option>
              <option value={"Binh"}>Binh</option>                 
              <option value={"Sam"}>Sam</option>
              <option value={"BaCay"}>Ba cây</option>
              <option value={"BaiCao"}>Bài cao</option>
              <option value={"BauCua"}>Bầu cua</option>
              <option value={"caoboi"}>Cao bồi</option>
              <option value={"como"}>Cổ mộ</option>
              <option value={"CaoThap"}>Cao Thấp</option>
              <option value={"quanan"}>Quán ăn</option>
              <option value={"TaiXiu"}>Tài Xỉu</option>
              <option value={"minipoker"}>Mini pocker</option>
              <option value={"VongQuay"}>VongQuay</option>
              <option value={"IAPGoogle"}>IAPGoogle</option>
              <option value={"IAPApple"}>IAPApple</option>
              <option value={"ChuyenKhoan"}>ChuyenKhoan</option>              
              <option value={"BankCharging"}>BankCharging</option>
              <option value={"MuaThe"}>MuaThe</option>
              <option value={"LichSuNap"}>Lịch Sử Nạp</option>
              <option value={"GiftCode"}>GiftCode</option>
            </select>
          </td>  
          <td style={{width:10}}/>
          
          <td style={{}}>
            <Button icon="search" style={{height:35,width:35,marginRight:20}} onClick={this.onClickGetGame}></Button>
          </td>
          
        </tr>  
        
        </tbody>
      </table>           
    )
    if(this.props.loading_game){
      content=(
        <center>
          <img src={require('images/loading.gif')} style={{width:100,height:100}}/>
        </center>  
      )
    }else{
      if(this.props.data_game && this.props.data_game.length > 0){
        // console.log("this.props.data_game",this.props.data_game)
        
                var item = false;
                var item1 = false;
                var date = false;
                var total = false;
                total_item = this.props.data_game.length -1 ;   
                        page = (
                          <div style={{margin: '2% 1%'}}>
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
                game_content = this.props.data_game.map((row,index)=>{
                  
                  if(!is_g_name){
                    // console.log("is_g_name:",is_g_name)
                    if(this.props.data_game.length>1){
                      if(index==0 ){                     
                        revenue_p.push(row);
                        var total_revenue = this.formatCurency(row.totalRevenueInDay);
                          
                         revenue_content=(
                          <div key={index} style={{marginTop:'2%'}}>
                            <i><h3 style={{marginLeft:'1%',marginBottom:'2%'}}>Tổng tiền lợi nhuận các game: {total_revenue}</h3></i>
                            <table style={{marginLeft:'1%',height:'100%',width:'95%'}}>
                             <tbody>
                             <tr >
                               <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>taixiu</th>
                               
                               <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.taixiu)}</td>
                               <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>minipoker</th>              
                               <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.minipoker)}</td>
                             </tr>  
                           
                             <tr> 
                               <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>baucua</th>
                               
                               <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.baucua)}</td>
                               <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>caothap</th>
                                
                               <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.caothap)}</td>
                             </tr>
                             <tr> 
                               <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>xocdia</th>
                                
                               <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.xocdia)}</td>
                               <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>quanan</th>
                               
                               <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.quanan)}</td>
                             </tr> 
                            
                             <tr>  
                               <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>luongson</th>
                               
                               <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.luongson)}</td>
                               <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>caoboi</th>
                               
                               <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.caoboi)}</td>
                             </tr>
                            
                             <tr>  
                               <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>como</th>
                               
                               <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.como)}</td>
                               <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>bacay</th>
                               <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.bacay)}</td>
                               
                             </tr>  
                             <tr>
                               <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>baicao</th>
                               <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.baicao)}</td>
                               <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>binh</th>
                               <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.binh)}</td>
                               
                             </tr>  
                             <tr>
                               <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>lieng</th>
                               <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.lieng)}</td>
                               <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>poker</th>
                               <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.poker)}</td>
                               
                             </tr>  
                             <tr>
                              <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>sam</th>
                              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.sam)}</td>
                              <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>tienlen</th>
                              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.tienlen)}</td>
                               
                             </tr>  
                             <tr>
                              <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>vong quay</th>
                              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.vongquay)}</td>
                              
                             </tr>    
                             </tbody> 
                            </table>
                         </div>  )
                      }else{
                                 
                        date = this.convertDate(row.updateTime);
                        total = this.formatCurency(row.total);
                        // console.log("total_item:",row.array.length)
                        if(row.array && row.array.length >0){
                          item_tt = row.array.length;
                          // if(!this.state.isMobile){
                            var loinhuan = 0;
                            item = row.array.map((r,i)=>{
                              if(r.referenceId !== 0){
                                loinhuan+=r.exchangeMoney;
                              }
                              data_p.push(r)
                              // if(i >= (this.state.activePage-1) *itemsPerPage && i < (this.state.activePage) *itemsPerPage ){
                                 return(
                                   <tr key={i} >
                                     <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{i+1}</td>
                                     <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{r.referenceId}</td>
                                     <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.formatCurency(r.currentMoney)}</td>
                                     <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.formatCurency(r.exchangeMoney)}</td>
                                     <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{r.reason}</td>
                                     <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{r.gameName }</td>
                                     <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.convertDateTime(r.updateTime)}</td>
                                     
                                   </tr>
                                 )
                                // }
                               })
                               if((index-1) >= (this.state.activePage-1) *itemsPerPage && (index-1) < (this.state.activePage) *itemsPerPage ){
                                
                                 var temp=(
                                   <div key={index} style={{marginTop:'2%'}}>
                                     <h3 style={{marginLeft:'1%'}}>Ngày : {date}</h3>
                                     <i><h3 style={{marginLeft:'1%'}}>Lợi nhuận : {this.formatCurency(loinhuan)}</h3></i>
                                     <div style={{marginTop:'2%',height:item_tt>10?'500px':'auto',overflow:'auto'}}>
                                      <table style={{marginLeft:'1%',height:'100%',width:'95%'}}>
                                        <tbody>
                                        <tr  style={{background:'rgb(236, 246, 253)',fontStyle:'italic'}}>
                                        <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>STT</th>
                                        <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Phiên chơi</th>
                                        <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Tiền hiện tại</th>                
                                        <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Tiền trao đổi</th>
                                        <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Chi tiết</th>
                                        <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Tên game</th>
                                        <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Thời gian</th>
                                        
                                      </tr>
                                        {item}
                                        </tbody> 
                                      </table>
                                     </div>
                                   </div>  
                                 )
                                }   
                                 return temp;
                               
                          // } 
                          // else{
                          //   item = row.array.map((r,i)=>{
                          //     var loinhuan = 0;
                            
                          //     if(r.referenceId !== 0){
                          //       loinhuan+=r.exchangeMoney;
                          //     }
                          //     data_p.push(r)
                              
                          //        return(
                          //          <tr key={i}>
                          //            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{i+1}</td>
                          //            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{r.referenceId}</td>
                          //            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.formatCurency(r.currentMoney)}</td>
                          //            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.formatCurency(r.exchangeMoney)}</td>
                          //            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{r.reason}</td>
                          //            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{r.gameName }</td>
                          //            <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.convertDateTime(r.updateTime)}</td>
                          //          </tr>
                          //        )
                       
                          //      })
                               
                               
                          //      if((index-1) >= (this.state.activePage-1) *itemsPerPage && (index-1) < (this.state.activePage) *itemsPerPage ){
                          //        var temp=(
                          //          <div key={index} style={{marginTop:'2%'}}>
                          //            <h3 style={{marginLeft:'1%'}}>Ngày : {date}</h3>
                          //            <i><h3 style={{marginLeft:'1%'}}>Lợi nhuận : {this.formatCurency(loinhuan)}</h3></i>
                          //            <div style={{marginTop:'2%',height:500,overflow:'auto'}}>
                          //            <table style={{marginLeft:'1%',height:'100%',width:'95%'}}>
                          //             <tbody>
                          //             <tr  style={{background:'rgb(236, 246, 253)',fontStyle:'italic'}}>
                          //              <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>STT</th>
                          //              <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Phiên chơi</th>
                          //              <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Tiền hiện tại</th>                
                          //              <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Tiền trao đổi</th>
                          //              <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Chi tiết</th>
                          //              <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Tên game</th>
                          //              <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Thời gian</th>
                          //            </tr>
                          //              {item}
                          //             </tbody> 
                          //            </table>
                          //            </div>
                          //          </div>  
                          //        )
                                 
                          //        return temp;
                          //      }
                          // } 
                          
                        }else{
                          // return(
                            var temp=(<table style={{marginLeft:'1%',height:'100%',width:'95%'}}>
                              <tbody>
                                <tr  style={{background:'rgb(236, 246, 253)',fontStyle:'italic'}}>
                                  <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>STT</th>
                                  <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Phiên chơi</th>
                                  <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Tiền hiện tại</th>                
                                  <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Tiền trao đổi</th>
                                  <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Chi tiết</th>
                                  <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Tên game</th>
                                  <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Thời gian</th>
                                </tr>
                                <tr>
                                  <td colSpan={7} style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}> Không có dữ liệu</td>
                                </tr>  
                              </tbody> 
                           </table>)
                          // )
                          return temp;
                        }
                      
                      }
                      print = (
                        <div  style={{marginTop: '2%',marginLeft:'1%'}}>
                          <Workbook filename={"TT_Game_của_"+un_p+"_"+st_p+"_"+et_p+".xlsx"} element={<Button type="primary">Xuất file</Button>}>
                            <Workbook.Sheet data={data_p} name="Thông tin chơi game">
                              <Workbook.Column label="Phiên chơi" value="referenceId"/>
                              <Workbook.Column label="Nickname" value="nickName"/>
                              <Workbook.Column label="Game name" value="gameName"/>
                              <Workbook.Column label="Tiền hiện tại" value={r=>this.formatCurency(r.currentMoney)}/>
                              <Workbook.Column label="Tiền trao đổi" value={r=>this.formatCurency(r.exchangeMoney)}/>
                              <Workbook.Column label="Chi tiết" value="reason"/>          
                                     
                              <Workbook.Column label="Thời gian" value={r=>this.convertDateTime(r.updateTime)}/>             
                              
                            </Workbook.Sheet> 
                            <Workbook.Sheet data={revenue_p} name="Lợi nhuận từng game">
                              <Workbook.Column label="Tổng tiền" value={r=>this.formatCurency(r.totalRevenueInDay)}/>
                              <Workbook.Column label="Tài xỉu" value={r=>this.formatCurency(r.taixiu)}/>             
                              <Workbook.Column label="Mini pocker" value={r=>this.formatCurency(r.minipoker)}/>             
                              <Workbook.Column label="Bầu cua" value={r=>this.formatCurency(r.baucua)}/>             
                              <Workbook.Column label="Cao thấp" value={r=>this.formatCurency(r.caothap)}/>             
                              <Workbook.Column label="Xóc đĩa" value={r=>this.formatCurency(r.xocdia)}/>             
                              <Workbook.Column label="Quán ăn" value={r=>this.formatCurency(r.quanan)}/>             
                              <Workbook.Column label="Lương sơn" value={r=>this.formatCurency(r.luongson)}/>             
                              <Workbook.Column label="Cao bồi" value={r=>this.formatCurency(r.caoboi)}/>             
                              <Workbook.Column label="Cổ mộ" value={r=>this.formatCurency(r.como)}/>             
                              <Workbook.Column label="Ba cây" value={r=>this.formatCurency(r.bacay)}/>            
                              <Workbook.Column label="Baì cao" value={r=>this.formatCurency(r.baicao)}/>             
                              <Workbook.Column label="Binh" value={r=>this.formatCurency(r.binh)}/>             
                              <Workbook.Column label="Liêng" value={r=>this.formatCurency(r.lieng)}/>             
                              <Workbook.Column label="Pocker" value={r=>this.formatCurency(r.poker)}/>             
                              <Workbook.Column label="Sam" value={r=>this.formatCurency(r.sam)}/>             
                              <Workbook.Column label="Tiến lên" value={r=>this.formatCurency(r.tienlen)}/>  
                              <Workbook.Column label="Vòng quay" value={r=>this.formatCurency(r.vongquay)}/>  
                            </Workbook.Sheet> 
                          </Workbook> 
                        </div>
                      )
                    }else{
                      revenue_content=(<h3 key={index}>Không có dữ liệu</h3>)
                      return(<h3 key={index}>Không có dữ liệu</h3>)
                    }
                  
                 
                  }else{      
                    // console.log("is_g_name-else:",is_g_name)
                    date = this.convertDate(row.updateTime);
                    total = this.formatCurency(row.total);
                    total_item = this.props.data_game.length ; 
                    page = (
                      <div style={{margin: '2% 1%'}}>
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
                    // console.log("total_item-else:",row.array.length)
                    if(!this.state.isMobile){
                   
                      if(row.array){
                        item_tt = row.array.length;
                        item = row.array.map((r,i)=>{
                          data_p.push(r)
                          
                          
                             return(
                               <tr key={i}>
                                 <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{i+1}</td>
                                 <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{r.referenceId}</td>
                                 <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.formatCurency(r.currentMoney)}</td>
                                 <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.formatCurency(r.exchangeMoney)}</td>
                                 <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{r.reason}</td>
                                 <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{r.gameName }</td>
                                 <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.convertDateTime(r.updateTime)}</td>
                               </tr>
                             )
                            
                            
                           })
                           if((index) >= (this.state.activePage-1) *itemsPerPage && (index) < (this.state.activePage) *itemsPerPage ){
                             var temp=(
                               <div key={index} style={{marginTop:'2%'}}>
                                 <h3 style={{marginLeft:'1%'}}>Ngày : {date}</h3>
                                 <i><h3 style={{marginLeft:'1%',marginBottom:'2%'}}>Lợi nhuận : {total}</h3></i>
                                 <div style={{marginTop:'2%',height:item_tt>10?'500px':'auto',overflow:'auto'}}>
                                 <table style={{marginLeft:'1%',height:'100%',width:'95%'}}>
                                  <tbody>
                                  <tr  style={{background:'rgb(236, 246, 253)',fontStyle:'italic'}}>
                                   <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>STT</th>
                                   <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Phiên chơi</th>
                                   <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Tiền hiện tại</th>                
                                   <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Tiền trao đổi</th>
                                   <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Chi tiết</th>
                                   <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Tên game</th>
                                   <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Thời gian</th>
                                   
                                 </tr>
                                   {item}
                                  </tbody> 
                                 </table>
                                 </div>
                               </div>  
                             )
                            }
                             
                             return temp;
                           
                      }
                      
                    } else{
                      if(row.array){
                        
                        item = row.array.map((r,i)=>{
                        
                          data_p.push(r)
                             return(
                               <tr key={i}>
                                 <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{i+1}</td>
                                 <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{r.referenceId}</td>
                                 <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.formatCurency(r.currentMoney)}</td>
                                 <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.formatCurency(r.exchangeMoney)}</td>
                                 <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{r.reason}</td>
                                 <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{r.gameName }</td>
                                 <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.convertDateTime(r.updateTime)}</td>
                                 
                               </tr>
                             )
                   
                           })
                           
                           
                           if(index >= (this.state.activePage-1) *itemsPerPage && index < (this.state.activePage) *itemsPerPage ){
                             var temp=(
                               <div key={index} style={{marginTop:'2%',overflow:'auto'}}>
                                 <h3 style={{marginLeft:'1%'}}>Ngày : {date}</h3>
                                 <i><h3 style={{marginLeft:'1%',marginBottom:'2%'}}>Lợi nhuận : {total}</h3></i>
                                 <div style={{marginTop:'2%',height:500,overflow:'auto'}}>
                                 <table style={{marginLeft:'1%',height:'100%',width:'95%'}}>
                                  <tbody>
                                  <tr  style={{background:'rgb(236, 246, 253)',fontStyle:'italic'}}>
                                   <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>STT</th>
                                   <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Phiên chơi</th>
                                   <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Tiền hiện tại</th>                
                                   <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Tiền trao đổi</th>
                                   <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Chi tiết</th>
                                   <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Tên game</th>
                                   <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Thời gian</th>
                                   
                                 </tr>
                                   {item}
                                  </tbody> 
                                 </table>
                                 </div>
                               </div>  
                             )
                             
                             return temp;
                           }
                      }
                      
                    } 
                 
                    print = (
                      <div  style={{marginTop: '2%',marginLeft:'1%'}}>
                        <Workbook filename={"TT_Game_của_"+un_p+"_"+st_p+"_"+et_p+".xlsx"} element={<Button type="primary">Xuất file</Button>}>
                          <Workbook.Sheet data={data_p} name="Thông tin chơi game">
                            <Workbook.Column label="Phiên chơi" value="referenceId"/>
                            <Workbook.Column label="Nickname" value="nickName"/>
                            <Workbook.Column label="Game name" value="gameName"/>
                            <Workbook.Column label="Tiền hiện tại" value={r=>this.formatCurency(r.currentMoney)}/>
                            <Workbook.Column label="Tiền trao đổi" value={r=>this.formatCurency(r.exchangeMoney)}/>
                            <Workbook.Column label="Chi tiết" value="reason"/>          
                                   
                            <Workbook.Column label="Thời gian" value={r=>this.convertDateTime(r.updateTime)}/>             
                            
                          </Workbook.Sheet> 
                          <Workbook.Sheet data={revenue_p} name="Lợi nhuận từng game">
                            <Workbook.Column label="Tổng tiền" value={r=>this.formatCurency(r.totalRevenueInDay)}/>
                            <Workbook.Column label="Tài xỉu" value={r=>this.formatCurency(r.taixiu)}/>             
                            <Workbook.Column label="Mini pocker" value={r=>this.formatCurency(r.minipoker)}/>             
                            <Workbook.Column label="Bầu cua" value={r=>this.formatCurency(r.baucua)}/>             
                            <Workbook.Column label="Cao thấp" value={r=>this.formatCurency(r.caothap)}/>             
                            <Workbook.Column label="Xóc đĩa" value={r=>this.formatCurency(r.xocdia)}/>             
                            <Workbook.Column label="Quán ăn" value={r=>this.formatCurency(r.quanan)}/>             
                            <Workbook.Column label="Lương sơn" value={r=>this.formatCurency(r.luongson)}/>             
                            <Workbook.Column label="Cao bồi" value={r=>this.formatCurency(r.caoboi)}/>             
                            <Workbook.Column label="Cổ mộ" value={r=>this.formatCurency(r.como)}/>             
                            <Workbook.Column label="Ba cây" value={r=>this.formatCurency(r.bacay)}/>            
                            <Workbook.Column label="Baì cao" value={r=>this.formatCurency(r.baicao)}/>             
                            <Workbook.Column label="Binh" value={r=>this.formatCurency(r.binh)}/>             
                            <Workbook.Column label="Liêng" value={r=>this.formatCurency(r.lieng)}/>             
                            <Workbook.Column label="Pocker" value={r=>this.formatCurency(r.poker)}/>             
                            <Workbook.Column label="Sam" value={r=>this.formatCurency(r.sam)}/>             
                            <Workbook.Column label="Tiến lên" value={r=>this.formatCurency(r.tienlen)}/>  
                            <Workbook.Column label="Vòng quay" value={r=>this.formatCurency(r.vongquay)}/>  
                          </Workbook.Sheet> 
                        </Workbook> 
                      </div>
                    )
                  }
                  
                  
                })
              
              }else{
                game_content=(<h3 style={{marginLeft:'0%',marginTop:'0%'}}>Không có dữ liệu </h3>)
                revenue_content=(<h3 style={{marginLeft:'0%',marginTop:'0%'}}>Không có dữ liệu </h3>)
              }

              content=(
                <Tabs type="card" style={{display:this.props.data_game?"":"none",marginTop:'2%',marginLeft:'5%'}}>
                  <TabPane tab="Chi tiết từng ngày" key="1" disabled={this.state.key?false:true}>
                    <div style={{overflow:'auto'}}>
                      {game_content}
                    </div>
                    {print}
                    {page}
                    <div style={{marginLeft:'5%',width:'90%',height:50}}>
                      {wait_content}
                      {/* {this.state.action?"":"Đang chuyển trang ..."} */}
                    </div>
                  </TabPane>
                  <TabPane tab="Lợi nhuận từng game" key="2" disabled={!is_g_name?false:true}>{revenue_content}</TabPane>
                </Tabs>
              )
    }

    return (
      <div>
        
        <h3 style={{marginLeft:'5%',marginTop:'1%'}}>Tra cứu lịch sử giao dịch </h3>
          {search_content_game}
          {content}
          
          
      </div>
    );
  }
}

MoneyHistory.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  data_game : selectDataGame(),
  loading_game : selectIsLoadingGame(),
  suggest_data : selectSuggestData(),
});

function mapDispatchToProps(dispatch) {
  return {
    getHisGame :(gn,un,st,et)=>dispatch(getHisGame(gn,un,st,et)),
    suggest_user_by_nickname:(key)=>dispatch(suggest_user_by_nickname(key)),

    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MoneyHistory);
