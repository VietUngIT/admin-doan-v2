/*
 *
 * TopLoose
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { Tabs,
         Input,
         Button,
         message,
         Pagination ,
         TimePicker,
         Icon
       } from 'antd';
import { createStructuredSelector } from 'reselect';
import {
  top_loose,
} from './actions';
import {
  selectDataLoose,
  selectisLoadLoose,
  selectDataLooseUser,
  selectDataLooseBot,
}from './selectors';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import {withRouter} from 'react-router' ;
const TabPane = Tabs.TabPane;
import Workbook from 'react-excel-workbook';

var st_loose = false;
var et_loose = false;

var g_name_l = 1;
var st_win = false;
var et_win = false;

var gn_ = false;

export class TopLoose extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
  
      loose_fromdate : moment(),
      loose_todate : moment(),
      gn_l : 1,
      un_l:false,
      activePageWin : 1,
      activePageWinBot : 1,
    };

    this.onChangeLooseFromDate = this.onChangeLooseFromDate.bind(this);
    this.onChangeLooseToDate = this.onChangeLooseToDate.bind(this);
  }
  onChangeWin = (page) => {
    this.setState({
      activePageWin: page,
    });
  }
  onChangeWinBot = (page) => {
    this.setState({
      activePageWinBot: page,
    });
  }
  onChangeLooseFromDate=(date)=>{
    this.setState({
      loose_fromdate: date,
    });
     
  }
  onChangeLooseToDate=(date)=>{
    this.setState({
      loose_todate: date,
    });
     
  }
  onChangeInputLoose=(k)=>{
    this.setState({
      un_l: k.target.value,
    });
  }
  onChangGn = (e)=>{
    g_name_l = (e.target.value);
   
    this.setState({
      gn_l: g_name_l,
    });
  }
  top_loose=()=>{

    this.setState({isClick:true});
    var _date = false;
    var _todate = false;
    var someDate = false;
    var toDate = false;
    
    if(this.refs.l_fromDate.input.props.value.toString().trim() && this.refs.l_fromDate.input.props.value.toString().trim()!==""
    && this.refs.l_toDate.input.props.value.toString().trim() && this.refs.l_toDate.input.props.value.toString().trim()!=="")
    {
      if(this.convertDate(new Date().getTime()) ===this.refs.l_toDate.input.props.value.toString().trim()){
        toDate = new Date().getTime();
      }else{
        _todate = this.refs.l_toDate.input.props.value.toString().trim().split('/').reverse().join('/')+ " 23:59:59";
        toDate = new Date(_todate).getTime();
      }
     _date = this.refs.l_fromDate.input.props.value.toString().trim().split('/').reverse().join('/')+ " 00:00:00";
     someDate = new Date(_date).getTime();
     st_loose = this.refs.l_fromDate.input.props.value.toString().trim();
     et_loose = this.refs.l_toDate.input.props.value.toString().trim() ;
  
      this.props.top_loose(g_name_l,someDate,toDate);
      this.setState({activePageWin:1})
      this.setState({activePageWinBot:1})
      gn_ = g_name_l;

    }else{
      _date = 0;
      _todate = 0;
      message.error('Ngày chưa được chọn !');
    }

    // var _date = false;
    // var _todate = false;
    // if(this.refs.l_fromDate.input.props.value.toString().trim() && this.refs.l_fromDate.input.props.value.toString().trim()!==""&&
    // this.refs.l_toDate.input.props.value.toString().trim() && this.refs.l_toDate.input.props.value.toString().trim()!==""){
    //  _date = this.refs.l_fromDate.input.props.value.toString().trim().split('/').reverse().join('/')+ " 00:00";
    //  _todate = this.refs.l_toDate.input.props.value.toString().trim().split('/').reverse().join('/')+ " 23:59";
    //  st_loose = this.refs.l_fromDate.input.props.value.toString().trim();
    //  et_loose = this.refs.l_toDate.input.props.value.toString().trim();
    // }else{
    //   _todate = false;
    //   _date = false;
    //     message.error('Ngày chưa được chọn !');
    // }
    // if(_date &&_todate ){
    //   var someDate = new Date(_date).getTime();
    //   var toDate = new Date(_todate).getTime();
      
    //   this.props.top_loose(g_name_l,someDate,toDate);
    //   this.setState({activePageWin:1})
    //   this.setState({activePageWinBot:1})
    //   gn_ = g_name_l;
    // }else{
    //   message.error("Nhập đầy đủ thông tin !")
    // }
  }
  formatCurency(price){
    var strPrice = price+'';
    var a = strPrice.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')+ ' King';
    return a;
  }
  convertDate (time){
    var d = new Date(time),
    yyyy = d.getFullYear(),
    mm = ('0' + (d.getMonth() + 1)).slice(-2),
    dd = ('0' + d.getDate()).slice(-2),
    hh = ('0' + d.getHours()).slice(-2),
    min = ('0' + d.getMinutes()).slice(-2),

    result, time;
    
    const date =   dd+ '/' + mm + '/'+ yyyy ;
    result = date;
    return result;
  }
  render() {
    var content1 = false;
    var table1 = false;
    var table2 = false;

    var itemsPerPage = 10;
    var total_item_win = 0;  
    var total_item_win_bot = 0;  
    var print1 = false;
    var print2 = false;

    var data_print1 = [];
    var data_print2 = [];
    var data_print3 = [];
    var data_print4 = [];

    var body_table1 = false;
    var body_table = false;

    var pagewin = false;
    var pagewinbot = false;
    if(this.props.loadLoose){
      content1=(
        <center>
          <img src={require('images/loading.gif')} style={{width:100,height:100}}/>
        </center>  
      )
    }else{
      if(this.props.data_loose_user.lenght>0 || this.props.data_loose_bot.length>0){
       
        if(this.props.data_loose_user && this.props.data_loose_user.length > 0){
        
          this.props.data_loose_user.map((row,index)=>{
            if((gn_==1 )){
              if(row.bank){
                data_print2.push(
                  {
                    "r1":row.nickName,  
                    "r2":row.bank,  
                    "r3":row.cBank.toString(),                   
                    "r4":"Bank",                   
                    
                  },
                )  
              }
            
            }
            if((gn_==2 )){
              if(row.inVongQuay !==0){
                data_print2.push(
                  {
                    "r1":row.nickName,  
                    "r2":row.inVongQuay,  
                    "r3":row.cVongQuay.toString(),                   
                    "r4":"VongQuay",                   
                    
                  },
                )  
              }
              
            }
            if((gn_==3 )){
              if(row.napThe !==0){
                data_print2.push(
                  {
                    "r1":row.nickName,  
                    "r2":row.napThe,  
                    "r3":row.cNapThe.toString(),                   
                    "r4":"NapThe",                   
                    
                  },
                )  
              }
              
            }
            if((gn_==4 )){
              if(row.giftCode!==0){
                data_print2.push(
                  {
                    "r1":row.nickName,  
                    "r2":row.giftCode,  
                    "r3":row.cGiftCode.toString(),                   
                    "r4":"GiftCode",                   
                    
                  },
                )  
              }
              
            }
            if((gn_==5 )){
              if(row.hoanThe!==0){
                data_print2.push(
                  {
                    "r1":row.nickName,  
                    "r2":row.hoanThe,  
                    "r3":row.cHoanThe.toString(),                   
                    "r4":"HoanThe",                   
                    
                  },
                )  
              }
              
            }
            if((gn_==6 )){
              if(row.muaThe!==0){
                data_print2.push(
                  {
                    "r1":row.nickName,  
                    "r2":row.muaThe,  
                    "r3":row.cMuaThe.toString(),                   
                    "r4":"MuaThe",                   
                    
                  },
                )  
              }
              
            }
            if((gn_==50 )){
              if(row.napKingSMS!==0){
                data_print2.push(
                  {
                    "r1":row.nickName,  
                    "r2":row.napKingSMS,  
                    "r3":row.cKingSMS.toString(),                   
                    "r4":"napKingSMS",                   
                    
                  },
                )  
              }
              
            }
            if((gn_==7 || gn_==8)){
              if(row.all !=="0/0/0"){
                data_print2.push(
                  {
                    "r1":row.nickName,  
                    "r6":"TatCa",  
                    "r2":(Math.abs(row.all.split("/")[0])),  
                    "r3":(row.all.split("/")[1]),                   
                    "r4":(row.all.split("/")[2]),                   
                    "r5":"",                   
                    
                  },
                )  
              }
              
            }
            if((gn_==9 || gn_==10 )){
              if(row.taixiu!="0/0/0/0/0/0"){
                data_print2.push(
                  {
                    "r1":row.nickName,  
                    "r6":"TaiXiu",  
                    "r2":(Math.abs(row.taixiu.split("/")[4])),  
                    "r3":(row.taixiu.split("/")[5]),                   
                    "r4":(row.taixiu.split("/")[2]),                   
                    "r5":(row.taixiu.split("/")[3]),                   
                    
                  },
                )  
              }
              
            }
            if((gn_==11 || gn_==12 )){
              if(row.baucua!=="0/0/0/0"){
                data_print2.push(
                  {
                    "r1":row.nickName,  
                    "r6":"BauCua",  
                    "r2":(Math.abs(row.baucua.split("/")[0])),  
                    "r3":(row.baucua.split("/")[1]),                   
                    "r4":(row.baucua.split("/")[2]),                   
                    "r5":(row.baucua.split("/")[3]),                   
                    
                  },
                )  
              }
              
            }
            if((gn_==13 || gn_==14 )){
              if(row.caothap!=="0/0/0/0/0"){
                data_print2.push(
                  {
                    "r1":row.nickName,  
                    "r6":"CaoThap",  
                    "r2":(Math.abs(row.caothap.split("/")[0])),  
                    "r3":(row.caothap.split("/")[4]),                   
                    "r4":(row.caothap.split("/")[2]),                   
                    "r5":(row.caothap.split("/")[3]),                   
                    
                  },
                )  
              }
              
            }
            if((gn_==15 || gn_==16 )){
              if(row.minipoker!=="0/0/0/0"){
                data_print2.push(
                  {
                    "r1":row.nickName,  
                    "r6":"MiniPoker",  
                    "r2":(Math.abs(row.minipoker.split("/")[0])),  
                    "r3":(row.minipoker.split("/")[1]),                   
                    "r4":(row.minipoker.split("/")[2]),                   
                    "r5":(row.minipoker.split("/")[3]),                   
                    
                  },
                )  
              }
              
            }
            if((gn_==17 || gn_==18 )){
              if(row.quanan!=="0/0/0/0"){
                data_print2.push(
                  {
                    "r1":row.nickName,  
                    "r6":"QuanAn",  
                    "r2":(Math.abs(row.quanan.split("/")[0])),  
                    "r3":(row.quanan.split("/")[1]),                   
                    "r4":(row.quanan.split("/")[2]),                   
                    "r5":(row.quanan.split("/")[3]),                   
                    
                  },
                )  
              }
              
            }
            if((gn_==19 || gn_==20 )){
              if(row.caoboi!=="0/0/0/0"){
                data_print2.push(
                  {
                    "r1":row.nickName,  
                    "r6":"CaoBoi",  
                    "r2":(Math.abs(row.caoboi.split("/")[0])),  
                    "r3":(row.caoboi.split("/")[1]),                   
                    "r4":(row.caoboi.split("/")[2]),                   
                    "r5":(row.caoboi.split("/")[3]),                   
                    
                  },
                )  
              }
              
            }
            if((gn_==21 || gn_==22 )){
              if(row.luongson!=="0/0/0/0"){
                data_print2.push(
                  {
                    "r1":row.nickName,  
                    "r6":"LuongSon",  
                    "r2":(Math.abs(row.luongson.split("/")[0])),  
                    "r3":(row.luongson.split("/")[1]),                   
                    "r4":(row.luongson.split("/")[2]),                   
                    "r5":(row.luongson.split("/")[3]),                   
                    
                  },
                )  
              }
            
            }
            if((gn_==23 || gn_==24 )){
              if(row.como!=="0/0/0/0"){
                data_print2.push(
                  {
                    "r1":row.nickName,  
                    "r6":"CoMo",  
                    "r2":(Math.abs(row.como.split("/")[0])),  
                    "r3":(row.como.split("/")[1]),                   
                    "r4":(row.como.split("/")[2]),                   
                    "r5":(row.como.split("/")[3]),                   
                    
                  },
                )  
              }
              
            }
            if((gn_==25 || gn_==26 )){
              if(row.bacay!=="0/0/0/0"){
                data_print2.push(
                  {
                    "r1":row.nickName,  
                    "r6":"BaCay",  
                    "r2":(Math.abs(row.bacay.split("/")[0])),  
                    "r3":(row.bacay.split("/")[1]),                   
                    "r4":(row.bacay.split("/")[2]),                   
                    "r5":(row.bacay.split("/")[3]),                   
                    
                  },
                )  
              }
              
            }
            if((gn_==27 || gn_==28 )){
              if(row.baicao!=="0/0/0/0"){
                data_print2.push(
                  {
                    "r1":row.nickName,  
                    "r6":"BaiCao",  
                    "r2":(Math.abs(row.baicao.split("/")[0])),  
                    "r3":(row.baicao.split("/")[1]),                   
                    "r4":(row.baicao.split("/")[2]),                   
                    "r5":(row.baicao.split("/")[3]),                   
                    
                  },
                )  
              }
              
            }
            if((gn_==29 || gn_==30 )){
              if(row.binh!=="0/0/0/0"){
                data_print2.push(
                  {
                    "r1":row.nickName,  
                    "r6":"Binh",  
                    "r2":(Math.abs(row.binh.split("/")[0])),  
                    "r3":(row.binh.split("/")[1]),                   
                    "r4":(row.binh.split("/")[2]),                   
                    "r5":(row.binh.split("/")[3]),                   
                    
                  },
                )  
              }
              
            }
            if((gn_==31 || gn_==32 )){
              if(row.lieng!=="0/0/0/0"){
                data_print2.push(
                  {
                    "r1":row.nickName,  
                    "r6":"Lieng",  
                    "r2":(Math.abs(row.lieng.split("/")[0])),  
                    "r3":(row.lieng.split("/")[1]),                   
                    "r4":(row.lieng.split("/")[2]),                   
                    "r5":(row.lieng.split("/")[3]),                   
                    
                  },
                )  
              }
              
            }
            if((gn_==33 || gn_==34 )){
              if(row.poker!=="0/0/0/0"){
                data_print2.push(
                  {
                    "r1":row.nickName,  
                    "r6":"Poker",  
                    "r2":(Math.abs(row.poker.split("/")[0])),  
                    "r3":(row.poker.split("/")[1]),                   
                    "r4":(row.poker.split("/")[2]),                   
                    "r5":(row.poker.split("/")[3]),                   
                    
                  },
                )  
              }
              
            }
            if((gn_==35 || gn_==36 )){
              if(row.sam!=="0/0/0/0"){
                data_print2.push(
                  {
                    "r1":row.nickName,  
                    "r6":"Sam",  
                    "r2":(Math.abs(row.sam.split("/")[0])),  
                    "r3":(row.sam.split("/")[1]),                   
                    "r4":(row.sam.split("/")[2]),                   
                    "r5":(row.sam.split("/")[3]),                   
                    
                  },
                )  
              }
              
            }
            if((gn_==37 || gn_==38 )){
              if(row.tienlen!=="0/0/0/0"){
                data_print2.push(
                  {
                    "r1":row.nickName,  
                    "r6":"Tiến lên",  
                    "r2":(Math.abs(row.tienlen.split("/")[0])),  
                    "r3":(row.tienlen.split("/")[1]),                   
                    "r4":(row.tienlen.split("/")[2]),                   
                    "r5":(row.tienlen.split("/")[3]),                   
                    
                  },
                )  
              }
              
            }
            if((gn_==39 || gn_==40 )){
              if(row.xocdia!=="0/0/0/0"){
                data_print2.push(
                  {
                    "r1":row.nickName,  
                    "r6":"Xóc đĩa",  
                    "r2":(Math.abs(row.xocdia.split("/")[0])),  
                    "r3":(row.xocdia.split("/")[1]),                   
                    "r4":(row.xocdia.split("/")[2]),                   
                    "r5":(row.xocdia.split("/")[3]),                   
                    
                  },
                )  
              }
              
            }
            if((gn_==41 || gn_==42 )){
              if(row.admin!=="0/0/0/0"){
                data_print2.push(
                  {
                    "r1":row.nickName,  
                    "r6":"Admin",  
                    "r2":(row.admin.split("/")[0]),  
                    "r3":(row.admin.split("/")[1]),                   
                    "r4":(row.admin.split("/")[2]),                   
                    "r5":(row.admin.split("/")[3]),                   
                    
                  },
                )  
              }
              
            }
            if((gn_==43 || gn_==44 )){
              if(row.chuyenkhoan!=="0/0/0/0"){
                data_print2.push(
                  {
                    "r1":row.nickName,  
                    "r6":"Chuyển khoản",  
                    "r2":(row.chuyenkhoan.split("/")[0]),  
                    "r3":(row.chuyenkhoan.split("/")[1]),                   
                    "r4":(row.chuyenkhoan.split("/")[2]),                   
                    "r5":(row.chuyenkhoan.split("/")[3]),                   
                    
                  },
                )  
              }
              
            }
            if((gn_==45 || gn_==46 )){
              if(row.bot!=="0/0/0/0"){
                data_print2.push(
                  {
                    "r1":row.nickName,  
                    "r6":"Bot",  
                    "r2":(row.bot.split("/")[0]),  
                    "r3":(row.bot.split("/")[1]),                   
                    "r4":(row.bot.split("/")[2]),                   
                    "r5":(row.bot.split("/")[3]),                   
                    
                  },
                )  
              }
              
            }
            if((gn_==47 || gn_==48 )){
              if(row.other!=="0/0/0/0"){
                data_print2.push(
                  {
                    "r1":row.nickName,  
                    "r6":"Khác",  
                    "r2":(row.other.split("/")[0]),  
                    "r3":(row.other.split("/")[1]),                   
                    "r4":(row.other.split("/")[2]),                   
                    "r5":(row.other.split("/")[3]),                   
                    
                  },
                )  
              }
              
            }
     
          })
          
          if(data_print2 && data_print2.length>0){
            total_item_win = data_print2.length;
            
            body_table = data_print2.map((rows,indexs)=>{

              if(indexs >= (this.state.activePageWin-1) *itemsPerPage && indexs < (this.state.activePageWin) *itemsPerPage ){  
    
                if((gn_==1 ||gn_==2 ||gn_==3||gn_==4||gn_==5||gn_==6||gn_==50)){
                  
                   return(
                    <tr key={indexs}>
                      <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{indexs+1}</td>                
                      <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{rows.r1}</td>
                      <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(rows.r2)}</td>
                      <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{rows.r3}</td>
                    </tr>
                   )
                    
                }else{
                  if(gn_>=7 && gn_<=48 ){
                    return(
                      <tr key={indexs}>
                        <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{indexs+1}</td>                
                        <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{rows.r1}</td>
                        <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(rows.r2)}</td>
                        <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(rows.r3)}</td>
                        <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(rows.r4)}</td>
                        <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{rows.r5}</td>
                      </tr>
                     
                    )
                   
                  }
                }  

              }
            })
          }else{
              if((gn_==1 ||gn_==2 ||gn_==3||gn_==4||gn_==5||gn_==6||gn_==50)){
                    
                body_table=(
                  <tr>
                    <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}} colSpan={4}>Không có dữ liệu</td>                
                    
                  </tr>
                )
                
            }else{
              if(gn_>=7 && gn_<=48 ){
                body_table = (
                  <tr>
                      <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}} colSpan={6}>Không có dữ liệu</td>                

                  </tr>
                  
                )
                
              }
            }  
          }

          if((gn_==1 ||gn_==2 ||gn_==3||gn_==4||gn_==5||gn_==6||gn_==50)){
            
              table1 =(
                    <div style={{overflow:'auto'}}> 
                      <table style={{width:'95%',marginBottom:30}} >
                        <tbody>
                          <tr style={{background:'#f7f7f7'}}>
                            <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}} >STT </th>
                            <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}} >NickName </th>
                            <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}} >Số tiền </th>
                            <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}} >Số giao dịch </th>
                          </tr> 
                          {body_table}
                        </tbody>
                      </table>
                    </div>
                  
              )
              print1 = (
                <div style={{marginBottom:10}}>
                  <Workbook filename={"Top_Loose_User_"+st_loose+"_"+et_loose+".xlsx"} element={<Button type="primary">Xuất file</Button>}>
                    <Workbook.Sheet data={data_print2} name="Top game">
                      <Workbook.Column label="Nickname" value="r1"/>             
                      <Workbook.Column label="Tên " value="r4"/>             
                      <Workbook.Column label="Số giao dịch" value="r3"/>             
                      <Workbook.Column label="Tổng tiền" value={r=>this.formatCurency(r.r2)}/>   
                    
                    </Workbook.Sheet> 
                    
                  </Workbook> 
                </div>
              ) 
          }else{
            if(gn_>=7 && gn_<=48 ){
              table1=(
                <div style={{overflow:'auto'}}> 
                  <table style={{width:'95%',marginBottom:30}} >
                    <tbody>
                      <tr style={{background:'#ecf6fd'}}>
                        <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,fontStyle:'italic'}} >STT</th>
                        <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,fontStyle:'italic'}} >Nickname</th>
                        <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,fontStyle:'italic'}} >Tổng tiền chơi</th>
                        <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,fontStyle:'italic'}} >Tiền user nhận</th>
                        <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,fontStyle:'italic'}} >Tiền lãi</th>
                        <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,fontStyle:'italic',display:(gn_!=7&&gn_!=8)?"":"none"}} >Số giao dịch</th>
                      </tr>  
                      {body_table}
                    </tbody>
                  </table>
                </div>
              )

              print1 = (
                <div style={{marginBottom:10}}>
                  <Workbook filename={"Top_Loose_User_"+st_loose+"_"+et_loose+".xlsx"} element={<Button type="primary">Xuất file</Button>}>
                    <Workbook.Sheet data={data_print2} name="Top game">
                      <Workbook.Column label="Nickname" value="r1"/>             
                      <Workbook.Column label="Tên game" value="r6"/>             
                      <Workbook.Column label="Số giao dịch" value="r5"/>             
                      <Workbook.Column label="Tổng tiền chơi" value={r=>this.formatCurency(r.r2)}/>             
                      <Workbook.Column label="Tiền user nhận" value={r=>this.formatCurency(r.r3)}/>             
                      <Workbook.Column label="Tiền lãi" value={r=>this.formatCurency(r.r4)}/>             
                    
                    </Workbook.Sheet> 
                    
                  </Workbook> 
                </div>
              ) 
            }
          }   
        
         
          pagewin=(
            <div style={{}}>
            <div style={{display: 'inline-block'}}>
              <Pagination
                style={{display: 'inline-block'}}
                total={total_item_win?total_item_win:0}
                pageSize={itemsPerPage}
                defaultCurrent={1}
                current={this.state.activePageWin}
                onChange={this.onChangeWin}
              />
              <div style={{display:total_item_win?"inline-block":'none',float:'right',border:'1px solid #c4c4c4',borderRadius:'3px',padding:'4px 10px',marginLeft:'10px',fontSize:'13px'}}>
                {this.state.activePageWin}/{total_item_win>0?(total_item_win%itemsPerPage==0?total_item_win/itemsPerPage:parseInt(total_item_win/itemsPerPage)+1):0}
  
              </div>
            </div>
          </div> 
          )
  
         
        }else{
          table1=(
            <table style={{width:'95%',marginBottom:30}}>
              <tbody>
                <tr style={{background:'#ecf6fd'}}>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}} colSpan={8}>Không có dữ liệu</th>
                </tr>
              </tbody>
            </table>      
          )
        }
        if(this.props.data_loose_bot && this.props.data_loose_bot.length > 0){
        
          this.props.data_loose_bot.map((row,index)=>{
            if((gn_==1 )){
              if(row.bank){
                data_print3.push(
                  {
                    "r1":row.nickName,  
                    "r2":row.bank,  
                    "r3":row.cBank.toString(),                   
                    "r4":"Bank",                   
                    
                  },
                )  
              }
             
            }
            if((gn_==2 )){
              if(row.inVongQuay !==0){
                data_print3.push(
                  {
                    "r1":row.nickName,  
                    "r2":row.inVongQuay,  
                    "r3":row.cVongQuay.toString(),                   
                    "r4":"VongQuay",                   
                    
                  },
                )  
              }
              
            }
            if((gn_==3 )){
              if(row.napThe !==0){
                data_print3.push(
                  {
                    "r1":row.nickName,  
                    "r2":row.napThe,  
                    "r3":row.cNapThe.toString(),                   
                    "r4":"NapThe",                   
                    
                  },
                )  
              }
              
            }
            if((gn_==4 )){
              if(row.giftCode!==0){
                data_print3.push(
                  {
                    "r1":row.nickName,  
                    "r2":row.giftCode,  
                    "r3":row.cGiftCode.toString(),                   
                    "r4":"GiftCode",                   
                    
                  },
                )  
              }
              
            }
            if((gn_==5 )){
              if(row.hoanThe!==0){
                data_print3.push(
                  {
                    "r1":row.nickName,  
                    "r2":row.hoanThe,  
                    "r3":row.cHoanThe.toString(),                   
                    "r4":"HoanThe",                   
                    
                  },
                )  
              }
              
            }
            if((gn_==6 )){
              if(row.muaThe!==0){
                data_print3.push(
                  {
                    "r1":row.nickName,  
                    "r2":row.muaThe,  
                    "r3":row.cMuaThe.toString(),                   
                    "r4":"MuaThe",                   
                    
                  },
                )  
              }
              
            }
            if((gn_==50 )){
              if(row.napKingSMS!==0){
                data_print3.push(
                  {
                    "r1":row.nickName,  
                    "r2":row.napKingSMS,  
                    "r3":row.cKingSMS.toString(),                   
                    "r4":"napKingSMS",                   
                    
                  },
                )  
              }
              
            }
            if((gn_==7 || gn_==8)){
              if(row.all !=="0/0/0"){
                data_print3.push(
                  {
                    "r1":row.nickName,  
                    "r6":"TatCa",  
                    "r2":(row.all.split("/")[0]),  
                    "r3":(row.all.split("/")[1]),                   
                    "r4":(row.all.split("/")[2]),                   
                    "r5":"",                   
                    
                  },
                )  
              }
              
            }
            if((gn_==9 || gn_==10 )){
              if(row.taixiu!="0/0/0/0/0/0"){
                data_print3.push(
                  {
                    "r1":row.nickName,  
                    "r6":"TaiXiu",  
                    "r2":(row.taixiu.split("/")[4]),  
                    "r3":(row.taixiu.split("/")[5]),                   
                    "r4":(row.taixiu.split("/")[2]),                   
                    "r5":(row.taixiu.split("/")[3]),                   
                    
                  },
                )  
              }
              
            }
            if((gn_==11 || gn_==12 )){
              if(row.baucua!=="0/0/0/0"){
                data_print3.push(
                  {
                    "r1":row.nickName,  
                    "r6":"BauCua",  
                    "r2":(row.baucua.split("/")[0]),  
                    "r3":(row.baucua.split("/")[1]),                   
                    "r4":(row.baucua.split("/")[2]),                   
                    "r5":(row.baucua.split("/")[3]),                   
                    
                  },
                )  
              }
              
            }
            if((gn_==13 || gn_==14 )){
              if(row.caothap!=="0/0/0/0/0"){
                data_print3.push(
                  {
                    "r1":row.nickName,  
                    "r6":"CaoThap",  
                    "r2":(row.caothap.split("/")[0]),  
                    "r3":(row.caothap.split("/")[4]),                   
                    "r4":(row.caothap.split("/")[2]),                   
                    "r5":(row.caothap.split("/")[3]),                   
                    
                  },
                )  
              }
              
            }
            if((gn_==15 || gn_==16 )){
              if(row.minipoker!=="0/0/0/0"){
                data_print3.push(
                  {
                    "r1":row.nickName,  
                    "r6":"MiniPoker",  
                    "r2":(row.minipoker.split("/")[0]),  
                    "r3":(row.minipoker.split("/")[1]),                   
                    "r4":(row.minipoker.split("/")[2]),                   
                    "r5":(row.minipoker.split("/")[3]),                   
                    
                  },
                )  
              }
              
            }
            if((gn_==17 || gn_==18 )){
              if(row.quanan!=="0/0/0/0"){
                data_print3.push(
                  {
                    "r1":row.nickName,  
                    "r6":"QuanAn",  
                    "r2":(row.quanan.split("/")[0]),  
                    "r3":(row.quanan.split("/")[1]),                   
                    "r4":(row.quanan.split("/")[2]),                   
                    "r5":(row.quanan.split("/")[3]),                   
                    
                  },
                )  
              }
              
            }
            if((gn_==19 || gn_==20 )){
              if(row.caoboi!=="0/0/0/0"){
                data_print3.push(
                  {
                    "r1":row.nickName,  
                    "r6":"CaoBoi",  
                    "r2":(row.caoboi.split("/")[0]),  
                    "r3":(row.caoboi.split("/")[1]),                   
                    "r4":(row.caoboi.split("/")[2]),                   
                    "r5":(row.caoboi.split("/")[3]),                   
                    
                  },
                )  
              }
              
            }
            if((gn_==21 || gn_==22 )){
              if(row.luongson!=="0/0/0/0"){
                data_print3.push(
                  {
                    "r1":row.nickName,  
                    "r6":"LuongSon",  
                    "r2":(row.luongson.split("/")[0]),  
                    "r3":(row.luongson.split("/")[1]),                   
                    "r4":(row.luongson.split("/")[2]),                   
                    "r5":(row.luongson.split("/")[3]),                   
                    
                  },
                )  
              }
             
            }
            if((gn_==23 || gn_==24 )){
              if(row.como!=="0/0/0/0"){
                data_print3.push(
                  {
                    "r1":row.nickName,  
                    "r6":"CoMo",  
                    "r2":(row.como.split("/")[0]),  
                    "r3":(row.como.split("/")[1]),                   
                    "r4":(row.como.split("/")[2]),                   
                    "r5":(row.como.split("/")[3]),                   
                    
                  },
                )  
              }
              
            }
            if((gn_==25 || gn_==26 )){
              if(row.bacay!=="0/0/0/0"){
                data_print3.push(
                  {
                    "r1":row.nickName,  
                    "r6":"BaCay",  
                    "r2":(row.bacay.split("/")[0]),  
                    "r3":(row.bacay.split("/")[1]),                   
                    "r4":(row.bacay.split("/")[2]),                   
                    "r5":(row.bacay.split("/")[3]),                   
                    
                  },
                )  
              }
              
            }
            if((gn_==27 || gn_==28 )){
              if(row.baicao!=="0/0/0/0"){
                data_print3.push(
                  {
                    "r1":row.nickName,  
                    "r6":"BaiCao",  
                    "r2":(row.baicao.split("/")[0]),  
                    "r3":(row.baicao.split("/")[1]),                   
                    "r4":(row.baicao.split("/")[2]),                   
                    "r5":(row.baicao.split("/")[3]),                   
                    
                  },
                )  
              }
              
            }
            if((gn_==29 || gn_==30 )){
              if(row.binh!=="0/0/0/0"){
                data_print3.push(
                  {
                    "r1":row.nickName,  
                    "r6":"Binh",  
                    "r2":(row.binh.split("/")[0]),  
                    "r3":(row.binh.split("/")[1]),                   
                    "r4":(row.binh.split("/")[2]),                   
                    "r5":(row.binh.split("/")[3]),                   
                    
                  },
                )  
              }
              
            }
            if((gn_==31 || gn_==32 )){
              if(row.lieng!=="0/0/0/0"){
                data_print3.push(
                  {
                    "r1":row.nickName,  
                    "r6":"Lieng",  
                    "r2":(row.lieng.split("/")[0]),  
                    "r3":(row.lieng.split("/")[1]),                   
                    "r4":(row.lieng.split("/")[2]),                   
                    "r5":(row.lieng.split("/")[3]),                   
                    
                  },
                )  
              }
              
            }
            if((gn_==33 || gn_==34 )){
              if(row.poker!=="0/0/0/0"){
                data_print3.push(
                  {
                    "r1":row.nickName,  
                    "r6":"Poker",  
                    "r2":(row.poker.split("/")[0]),  
                    "r3":(row.poker.split("/")[1]),                   
                    "r4":(row.poker.split("/")[2]),                   
                    "r5":(row.poker.split("/")[3]),                   
                    
                  },
                )  
              }
              
            }
            if((gn_==35 || gn_==36 )){
              if(row.sam!=="0/0/0/0"){
                data_print3.push(
                  {
                    "r1":row.nickName,  
                    "r6":"Sam",  
                    "r2":(row.sam.split("/")[0]),  
                    "r3":(row.sam.split("/")[1]),                   
                    "r4":(row.sam.split("/")[2]),                   
                    "r5":(row.sam.split("/")[3]),                   
                    
                  },
                )  
              }
              
            }
            if((gn_==37 || gn_==38 )){
              if(row.tienlen!=="0/0/0/0"){
                data_print3.push(
                  {
                    "r1":row.nickName,  
                    "r6":"Tiến lên",  
                    "r2":(row.tienlen.split("/")[0]),  
                    "r3":(row.tienlen.split("/")[1]),                   
                    "r4":(row.tienlen.split("/")[2]),                   
                    "r5":(row.tienlen.split("/")[3]),                   
                    
                  },
                )  
              }
              
            }
            if((gn_==39 || gn_==40 )){
              if(row.xocdia!=="0/0/0/0"){
                data_print3.push(
                  {
                    "r1":row.nickName,  
                    "r6":"Xóc đĩa",  
                    "r2":(row.xocdia.split("/")[0]),  
                    "r3":(row.xocdia.split("/")[1]),                   
                    "r4":(row.xocdia.split("/")[2]),                   
                    "r5":(row.xocdia.split("/")[3]),                   
                    
                  },
                )  
              }
              
            }
            if((gn_==41 || gn_==42 )){
              if(row.admin!=="0/0/0/0"){
                data_print3.push(
                  {
                    "r1":row.nickName,  
                    "r6":"Admin",  
                    "r2":(row.admin.split("/")[0]),  
                    "r3":(row.admin.split("/")[1]),                   
                    "r4":(row.admin.split("/")[2]),                   
                    "r5":(row.admin.split("/")[3]),                   
                    
                  },
                )  
              }
              
            }
            if((gn_==43 || gn_==44 )){
              if(row.chuyenkhoan!=="0/0/0/0"){
                data_print3.push(
                  {
                    "r1":row.nickName,  
                    "r6":"Chuyển khoản",  
                    "r2":(row.chuyenkhoan.split("/")[0]),  
                    "r3":(row.chuyenkhoan.split("/")[1]),                   
                    "r4":(row.chuyenkhoan.split("/")[2]),                   
                    "r5":(row.chuyenkhoan.split("/")[3]),                   
                    
                  },
                )  
              }
              
            }
            if((gn_==45 || gn_==46 )){
              if(row.bot!=="0/0/0/0"){
                data_print3.push(
                  {
                    "r1":row.nickName,  
                    "r6":"Bot",  
                    "r2":(row.bot.split("/")[0]),  
                    "r3":(row.bot.split("/")[1]),                   
                    "r4":(row.bot.split("/")[2]),                   
                    "r5":(row.bot.split("/")[3]),                   
                    
                  },
                )  
              }
              
            }
            if((gn_==47 || gn_==48 )){
              if(row.other!=="0/0/0/0"){
                data_print3.push(
                  {
                    "r1":row.nickName,  
                    "r6":"Khác",  
                    "r2":(row.other.split("/")[0]),  
                    "r3":(row.other.split("/")[1]),                   
                    "r4":(row.other.split("/")[2]),                   
                    "r5":(row.other.split("/")[3]),                   
                    
                  },
                )  
              }
              
            }
          })
             
          if(data_print3 && data_print3.length>0){
            total_item_win_bot = data_print3.length;
            
            body_table1 = data_print3.map((rows,indexs)=>{

              if(indexs >= (this.state.activePageWinBot-1) *itemsPerPage && indexs < (this.state.activePageWinBot) *itemsPerPage ){  
    
                if((gn_==1 ||gn_==2 ||gn_==3||gn_==4||gn_==5||gn_==6||gn_==50)){
                  
                   return(
                    <tr key={indexs}>
                      <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{indexs+1}</td>                
                      <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{rows.r1}</td>
                      <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(rows.r2)}</td>
                      <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{rows.r3}</td>
                    </tr>
                   )
                    
                }else{
                  if(gn_>=7 && gn_<=48 ){
                    return(
                      <tr key={indexs}>
                        <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{indexs+1}</td>                
                        <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{rows.r1}</td>
                        <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(rows.r2)}</td>
                        <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(rows.r3)}</td>
                        <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(rows.r4)}</td>
                        <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{rows.r5}</td>
                      </tr>
                     
                    )
                   
                  }
                }  

              }
            })
          }else{
              if((gn_==1 ||gn_==2 ||gn_==3||gn_==4||gn_==5||gn_==6||gn_==50)){
                    
                body_table1=(
                  <tr>
                    <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}} colSpan={4}>Không có dữ liệu</td>                
                    
                  </tr>
                )
                
            }else{
              if(gn_>=7 && gn_<=48 ){
                body_table1 = (
                  <tr>
                      <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}} colSpan={6}>Không có dữ liệu</td>                

                  </tr>
                  
                )
                
              }
            }  
          }

          if((gn_==1 ||gn_==2 ||gn_==3||gn_==4||gn_==5||gn_==6||gn_==50)){
            
            table2 =(
                  <div style={{overflow:'auto'}}> 
                    <table style={{width:'95%',marginBottom:30}} >
                      <tbody>
                        <tr style={{background:'#f7f7f7'}}>
                          <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}} >STT </th>
                          <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}} >Nickname </th>
                          <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}} >Số tiền </th>
                          <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}} >Số giao dịch </th>
                        </tr> 
                        {body_table1}
                      </tbody>
                    </table>
                  </div>
                
            )
            print2 = (
              <div style={{marginBottom:10}}>
                <Workbook filename={"Top_Loose_Bot_"+st_loose+"_"+et_loose+".xlsx"} element={<Button type="primary">Xuất file</Button>}>
                  <Workbook.Sheet data={data_print3} name="Top game">
                    <Workbook.Column label="Nickname" value="r1"/>             
                    <Workbook.Column label="Tên " value="r4"/>             
                    <Workbook.Column label="Số giao dịch" value="r3"/>             
                    <Workbook.Column label="Tổng tiền" value={r=>this.formatCurency(r.r2)}/>   
                  
                  </Workbook.Sheet> 
                  
                </Workbook> 
              </div>
            ) 
          }else{
           if(gn_>=7 && gn_<=48 ){
            table2=(
              <div style={{overflow:'auto'}}> 
                <table style={{width:'95%',marginBottom:30}} >
                  <tbody>
                    <tr style={{background:'#ecf6fd',fontStyle:'italic'}}>
                      <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,fontStyle:'italic'}} >STT</th>
                      <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,fontStyle:'italic'}} >Nickname</th>
                      <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,fontStyle:'italic'}} >Tổng tiền chơi</th>
                      <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,fontStyle:'italic'}} >Tiền user nhận</th>
                      <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,fontStyle:'italic'}} >Tiền lãi</th>
                      <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,fontStyle:'italic',display:(gn_!=7&&gn_!=8)?"":"none"}} >Số giao dịch</th>
                    </tr>  
                    {body_table1}
                  </tbody>
                </table>
              </div>
            )
            print2 = (
              <div style={{marginBottom:10}}>
                <Workbook filename={"Top_Loose_Bot_"+st_loose+"_"+et_loose+".xlsx"} element={<Button type="primary">Xuất file</Button>}>
                  <Workbook.Sheet data={data_print3} name="Top game">
                    <Workbook.Column label="Nickname" value="r1"/>             
                    <Workbook.Column label="Tên game" value="r6"/>             
                    <Workbook.Column label="Số giao dịch" value="r5"/>             
                    <Workbook.Column label="Tổng tiền chơi" value={r=>this.formatCurency(r.r2)}/>             
                    <Workbook.Column label="Tiền user nhận" value={r=>this.formatCurency(r.r3)}/>             
                    <Workbook.Column label="Tiền lãi" value={r=>this.formatCurency(r.r4)}/>             
                  
                  </Workbook.Sheet> 
                  
                </Workbook> 
              </div>
            ) 
          }
        }  
        
          pagewinbot=(
            <div style={{}}>
            <div style={{display: 'inline-block'}}>
              <Pagination
                style={{display: 'inline-block'}}
                total={total_item_win_bot?total_item_win_bot:0}
                pageSize={itemsPerPage}
                defaultCurrent={1}
                current={this.state.activePageWinBot}
                onChange={this.onChangeWinBot}
              />
              <div style={{display:total_item_win?"inline-block":'none',float:'right',border:'1px solid #c4c4c4',borderRadius:'3px',padding:'4px 10px',marginLeft:'10px',fontSize:'13px'}}>
                {this.state.activePageWinBot}/{total_item_win_bot>0?(total_item_win_bot%itemsPerPage==0?total_item_win_bot/itemsPerPage:parseInt(total_item_win_bot/itemsPerPage)+1):0}
  
              </div>
            </div>
          </div> 
          )
  
         
        }else{
          table2=(
            <table style={{width:'95%',marginBottom:30}}>
              <tbody>
                  
                <tr style={{background:'#ecf6fd'}}>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}} colSpan={8}>Không có dữ liệu</th>
                </tr> 
                
              </tbody>
            </table>      
          )
        }
        content1= (
          <div style={{marginLeft:'5%',marginTop:'2%'}}>
            <Tabs defaultActiveKey="1" type="card">
              <TabPane tab={<span style={{width:100,padding:20}}><Icon type="user" />User</span>}  key="1">              
                {print1}               
                {table1} 
                {pagewin}  
              </TabPane>
              <TabPane tab={<span style={{width:100,padding:20}}><Icon type="android" />Bot</span>}  key="2">
                {print2}            
                {table2}  
                {pagewinbot}
              </TabPane>
            </Tabs>
          </div>
        )
      }else{
      
        
        content1=(<h3 style={{marginLeft:'5%',marginTop:'2%',marginBottom:'2%'}}>Không có dữ liệu</h3>)
      }
    }
    
    return (
      <div style={{width:'100%',height:'100%'}}>
      <h3 style={{marginLeft:'5%',marginTop:'2%',marginBottom:'2%'}}>Top thua game</h3>
          <div style={{overflow:'auto'}}>
            <table style={{marginLeft:'5%',marginBottom:10}}>  
            <tbody>
              <tr>
                <td>Ngày bắt đầu
                </td>
               
                <td>Ngày kết thúc
                </td>  
              </tr>  
                <tr>
                  <td>
                    <DatePicker
                      style={{color:'red'}}
                      ref="l_fromDate"
                      selected={this.state.loose_fromdate}
                      onChange={this.onChangeLooseFromDate}
                      customInput={<Input  style={{width:'80%',height:'35px',border:'1px solid #e2e2e2',borderRadius:'5px',background:'white'}}/>}
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
                    <DatePicker
                      style={{color:'red'}}
                      ref="l_toDate"
                      selected={this.state.loose_todate}
                      onChange={this.onChangeLooseToDate}
                      customInput={<Input  style={{width:'80%',height:'35px',border:'1px solid #e2e2e2',borderRadius:'5px',background:'white'}}/>}
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
                </tr>
                <tr style={{height:20}}>
                  <td colSpan={2}/>
                </tr>  
                <tr>
                  <td colSpan={2}>
                  <select id="gn" onChange={(e)=>this.onChangGn(e)}
                        value={this.state.gn_l}
                        style={{marginLeft:'0%',height:'35px',width:270,border:'1px solid #e2e2e2',borderRadius:'5px',background:'white'}}>
                        <option value={1}>Bank</option>
                        <option value={2}>Vòng quay</option>
                        <option value={3}>Nạp thẻ</option>
                        <option value={4}>GiftCode</option>
                        <option value={5}>Hoàn thẻ</option>
                        <option value={6}>Mua thẻ</option>
                        <option value={50}>SMS</option>                        
                        <option value={7}>Luồng tiền tất cả(game + nạp tiền)</option>
                        <option value={8}>Tiền thắng tất cả(game + nạp tiền)</option>
                        <option value={9}>Luồng tiền tài xỉu</option>
                        <option value={10}>Tiền thắng tài xỉu</option>
                        <option value={11}>Luồng tiền bầu cua</option>
                        <option value={12}>Tiền thắng bầu cua</option>
                        <option value={13}>Luồng tiền cao thấp</option>
                        <option value={14}>Tiền thắng cao thấp</option>
                        <option value={15}>Luồng tiền minipoker</option>
                        <option value={16}>Tiền thắng minipoker</option>
                        <option value={17}>Luồng tiền quán ăn</option>
                        <option value={18}>Tiền thắng quán ăn</option>
                        <option value={19}>Luồng tiền cao bồi</option>
                        <option value={20}>Tiền thắng cao bồi</option>
                        <option value={21}>Luồng tiền lương sơn</option>
                        <option value={22}>Tiền thắng lương sơn</option>
                        <option value={23}>Luồng tiền cổ mộ</option>
                        <option value={24}>Tiền thắng cổ mộ</option>
                        <option value={25}>Luồng tiền ba cây</option>
                        <option value={26}>Tiền thắng ba cây</option>
                        <option value={27}>Luồng tiền bài cao</option>
                        <option value={28}>Tiền thắng bài cao</option>
                        <option value={29}>Luồng tiền binh</option>
                        <option value={30}>Tiền thắng binh</option>
                        <option value={31}>Luồng tiền liêng</option>
                        <option value={32}>Tiền thắng liêng</option>
                        <option value={33}>Luồng tiền poker</option>
                        <option value={34}>Tiền thắng poker</option>
                        <option value={35}>Luồng tiền sam</option>
                        <option value={36}>Tiền thắng sam</option>
                        <option value={37}>Luồng tiền tiến lên</option>
                        <option value={38}>Tiền thắng tiến lên</option>
                        <option value={39}>Luồng tiền xóc đĩa</option>
                        <option value={40}>Tiền thắng xóc đĩa</option>
                        <option value={41}>Luồng tiền admin</option>
                        <option value={42}>Tiền thắng admin</option>
                        <option value={43}>Luồng tiền chuyển khoản</option>
                        <option value={44}>Tiền thắng chuyển khoản</option>
                        {/* <option value={45}>Luồng tiền bot</option>
                        <option value={46}>Tiền thắng bot</option> */}
                        <option value={47}>Luồng tiền khác</option>
                        <option value={48}>Tiền thắng khác</option>
          
                    </select>
                
                  </td>
                  <td>
                    <Button icon="search" style={{marginLeft:'2%',height:35,width:35}} onClick={this.top_loose}/>
                      
                  </td>    
                </tr>   
              </tbody> 
              </table>               
          </div>
          <div>
            {content1}
          </div>  
        </div>
    );
  }
}

TopLoose.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loadLoose : selectisLoadLoose(),
  data_loose_user : selectDataLooseUser(),
  data_loose_bot: selectDataLooseBot(),
  
});

function mapDispatchToProps(dispatch) {
  return {
    top_loose:(gn,st,et)=> dispatch(top_loose(gn,st,et)),
    
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TopLoose);
