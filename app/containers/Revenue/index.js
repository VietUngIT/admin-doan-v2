/*
 *
 * Revenue
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import {
  selectData,
  selectisLoad,
  selectSuggestData,
} from './selectors';
import { Tabs,
  Input,
  Button,
  message,
  Pagination ,
  Icon,
  Card,
  Select,
  Form,
} from 'antd';
import {
  get_revenue,
  suggest_user_by_nickname,
  get_revenue_by_user,
} from './actions';
import messages from './messages';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import {withRouter} from 'react-router' ;
import Workbook from 'react-excel-workbook';
const TabPane = Tabs.TabPane;
const Option = Select.Option;
var name = "";
var st= false;
var et = false;
export class Revenue extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      date : moment(),
      todate : moment(),
      activePage : 1,
      key : "",
      nickname : false,
    };
    this.onChangeDate = this.onChangeDate.bind(this);
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
  onChange = (page) => {
    this.setState({
      activePage: page,
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
  convertDate = (time) => {
    var d = new Date(time),
    yyyy = d.getFullYear(),
    mm = ('0' + (d.getMonth() + 1)).slice(-2),
    dd = ('0' + d.getDate()).slice(-2),
    hh = ('0' + d.getHours()).slice(-2),
    min = ('0' + d.getMinutes()).slice(-2),

    result, time;
    time = hh + ':' + min;
    const date =   dd+ '/' + mm + '/'+ yyyy ;
    result = date ;
    return result;
  }
  convertDateTime = (time) => {
    var d = new Date(time),
    yyyy = d.getFullYear(),
    mm = ('0' + (d.getMonth() + 1)).slice(-2),
    dd = ('0' + d.getDate()).slice(-2),
    hh = ('0' + d.getHours()).slice(-2),
    min = ('0' + d.getMinutes()).slice(-2),

    result, time;
    time = hh + ':' + min;
    const date =   dd+ '/' + mm + '/'+ yyyy ;
    result = date + " "+time;
    return result;
  }
  formatCurency(price){
    var strPrice = price+'';
    var a = strPrice.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')+ ' King';
    return a;
  }
  onClick=()=>{
   
    var _date = false;
    var _todate= false;
    var someDate = false;
    var toDate = false;
   
    if(this.refs.fromDate.input.props.value.toString().trim() && this.refs.fromDate.input.props.value.toString().trim()!==""
    && this.refs.toDate.input.props.value.toString().trim() && this.refs.toDate.input.props.value.toString().trim()!=="")
    {
      if(this.convertDate(new Date().getTime()) ===this.refs.toDate.input.props.value.toString().trim()){
        toDate = new Date().getTime();
      }else{
        _todate = this.refs.toDate.input.props.value.toString().trim().split('/').reverse().join('/')+ " 23:59:59";
        toDate = new Date(_todate).getTime();
      }
     _date = this.refs.fromDate.input.props.value.toString().trim().split('/').reverse().join('/')+ " 00:00:00";
     someDate = new Date(_date).getTime();
     st = this.refs.fromDate.input.props.value.toString().trim();
     et = this.refs.toDate.input.props.value.toString().trim() ;
  
    }else{
      _date = 0;
      _todate = 0;
      message.error('Ngày chưa được chọn !');
    }
    if(this.state.key.trim()!==""){
      this.props.get_revenue_by_user(this.state.key.trim(),someDate,toDate);
      name = this.state.key.trim();
    }else{
      this.props.get_revenue(someDate,toDate);
      name = "";
    }
   
    
  }
  handleKeyPress=(target) =>{
    if(target.charCode==13){
        this.onClick();
    }

  };
  render() {
    var table = false;
    var table_name = false;
    var table1 = false;
    var table2 = false;
    var print1 = false;
    var print2 = false;
    var detail_game = false;
    var itemsPerPage = 20;
    var total_item = 0;  
    var data_print1 = [];
    var data_print2 = [];
    var data_print3 = [];
    var data_print4 = [];
    
    var page = false;
    var tabContent = false;

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
     
       
    }else{
      
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

    if(this.props.load){
      tabContent=(
        <center>
          <img src={require('images/loading.gif')} style={{width:100,height:100}}/>
        </center>  
      )
    }else{
      if(this.props.dataRevenue && this.props.dataRevenue.length > 0){
        
        var temp = false;
        var item = false;
        var item1 = false;
        var date = false;
        var total = false;
        var txtHeader = false;
        if(name!==""){
          var tong_name1= 0;
          var tong_name2= 0;
          var tong_name3= 0;
          var tong_name4= 0;
         
          table_name = this.props.dataRevenue.map((r,i)=>{
           
            
            txtHeader=(<div style={{display:'-webkit-box'}}> <Icon type="bars" /><h3 style={{marginLeft:'1%'}}><i>Ngày {this.convertDate(r.startTime)}</i></h3></div>)
            r.data.map((row,index)=>{
              
              if(row.bacay !=="0/0/0/0"){
                data_print1.push(
                  {
                        
                    "name":"bacay",
                    "r1":Math.abs(row.bacay.split("/")[0]),
                    "r2":row.bacay.split("/")[1],
                    "r3":row.bacay.split("/")[2],
                    "r4":row.bacay.split("/")[3],
                    "r5":r.startTime,
                    
                  }
                )
                tong_name1 +=Math.abs(parseInt(row.bacay.split("/")[0]));
                tong_name2 +=parseInt(row.bacay.split("/")[1]);
                tong_name3 +=parseInt(row.bacay.split("/")[2]);
                tong_name4 +=parseInt(row.bacay.split("/")[3]);
              }
              if(row.taixiu !=="0/0/0/0/0/0"){
                data_print1.push(
                  {
                        
                    "name":"taixiu",
                    "r1":Math.abs(row.taixiu.split("/")[4]),
                    "r2":row.taixiu.split("/")[5].toString(),
                    "r3":row.taixiu.split("/")[2],
                    "r4":row.taixiu.split("/")[3],
                    "r5":r.startTime,
                    
                  }
                )
                tong_name1 +=Math.abs(parseInt(row.taixiu.split("/")[4]));
                tong_name2 +=parseInt(row.taixiu.split("/")[5]);
                tong_name3 +=parseInt(row.taixiu.split("/")[2]);
                tong_name4 +=parseInt(row.taixiu.split("/")[3]);
              }
              if(row.minipoker !=="0/0/0/0"){
                data_print1.push(
                  {
                        
                    "name":"minipoker",
                    "r1":Math.abs(row.minipoker.split("/")[0]),
                    "r2":row.minipoker.split("/")[1],
                    "r3":row.minipoker.split("/")[2],
                    "r4":row.minipoker.split("/")[3],
                    "r5":r.startTime,
                    
                  }
                )
                tong_name1 +=Math.abs(parseInt(row.minipoker.split("/")[0]));
                tong_name2 +=parseInt(row.minipoker.split("/")[1]);
                tong_name3 +=parseInt(row.minipoker.split("/")[2]);
                tong_name4 +=parseInt(row.minipoker.split("/")[3]);
              }
              if(row.baucua !=="0/0/0/0"){
                data_print1.push(
                  {
                        
                    "name":"baucua",
                    "r1":Math.abs(row.baucua.split("/")[0]),
                    "r2":row.baucua.split("/")[1],
                    "r3":row.baucua.split("/")[2],
                    "r4":row.baucua.split("/")[3],
                    "r5":r.startTime,
                    
                  }
                )
                tong_name1 +=Math.abs(parseInt(row.baucua.split("/")[0]));
                tong_name2 +=parseInt(row.baucua.split("/")[1]);
                tong_name3 +=parseInt(row.baucua.split("/")[2]);
                tong_name4 +=parseInt(row.baucua.split("/")[3]);
              }
              if(row.caothap !=="0/0/0/0/0"){
                data_print1.push(
                  {
                  
                    "name":"caothap",
                    "r1":Math.abs(row.caothap.split("/")[4]),
                    "r2":row.caothap.split("/")[1],
                    "r3":row.caothap.split("/")[2],
                    "r4":row.caothap.split("/")[3],
                    "r5":r.startTime,
                  },
                )
                tong_name1 +=Math.abs(parseInt(row.caothap.split("/")[4]));
                tong_name2 +=parseInt(row.caothap.split("/")[1]);
                tong_name3 +=parseInt(row.caothap.split("/")[2]);
                tong_name4 +=parseInt(row.caothap.split("/")[3]);
              }
              if(row.quanan !=="0/0/0/0"){
                data_print1.push(
                  {
                 
                    "name":"quanan",
                    "r1":Math.abs(row.quanan.split("/")[0]),
                    "r2":row.quanan.split("/")[1],
                    "r3":row.quanan.split("/")[2],
                    "r4":row.quanan.split("/")[3],
                    "r5":r.startTime,
                  },
                )
                tong_name1 +=Math.abs(parseInt(row.quanan.split("/")[0]));
                tong_name2 +=parseInt(row.quanan.split("/")[1]);
                tong_name3 +=parseInt(row.quanan.split("/")[2]);
                tong_name4 +=parseInt(row.quanan.split("/")[3]);
              }
              if(row.xocdia !=="0/0/0/0"){
                data_print1.push(
                  {
                  
                    "name":"xocdia",
                    "r1":Math.abs(row.xocdia.split("/")[0]),
                    "r2":row.xocdia.split("/")[1],
                    "r3":row.xocdia.split("/")[2],
                    "r4":row.xocdia.split("/")[3],
                    "r5":r.startTime,
                  },
                )
                tong_name1 +=Math.abs(parseInt(row.xocdia.split("/")[0]));
                tong_name2 +=parseInt(row.xocdia.split("/")[1]);
                tong_name3 +=parseInt(row.xocdia.split("/")[2]);
                tong_name4 +=parseInt(row.xocdia.split("/")[3]);
              }
              if(row.luongson !=="0/0/0/0"){
                data_print1.push(
                  {
                  
                    "name":"luongson",
                    "r1":Math.abs(row.luongson.split("/")[0]),
                    "r2":row.luongson.split("/")[1],
                    "r3":row.luongson.split("/")[2],
                    "r4":row.luongson.split("/")[3],
                    "r5":r.startTime,
                  },
                )
                tong_name1 +=Math.abs(parseInt(row.luongson.split("/")[0]));
                tong_name2 +=parseInt(row.luongson.split("/")[1]);
                tong_name3 +=parseInt(row.luongson.split("/")[2]);
                tong_name4 +=parseInt(row.luongson.split("/")[3]);
              }
              if(row.caoboi !=="0/0/0/0"){
                data_print1.push(
                  {
                  
                    "name":"caoboi",
                    "r1":Math.abs(row.caoboi.split("/")[0]),
                    "r2":row.caoboi.split("/")[1],
                    "r3":row.caoboi.split("/")[2],
                    "r4":row.caoboi.split("/")[3],
                    "r5":r.startTime,
                  },
                )
                tong_name1 +=Math.abs(parseInt(row.caoboi.split("/")[0]));
                tong_name2 +=parseInt(row.caoboi.split("/")[1]);
                tong_name3 +=parseInt(row.caoboi.split("/")[2]);
                tong_name4 +=parseInt(row.caoboi.split("/")[3]);
              }
              if(row.como !=="0/0/0/0"){
                data_print1.push(
                  {
                  
                    "name":"como",
                    "r1":Math.abs(row.como.split("/")[0]),
                    "r2":row.como.split("/")[1],
                    "r3":row.como.split("/")[2],
                    "r4":row.como.split("/")[3],
                    "r5":r.startTime,
                  },
                )
                tong_name1 +=Math.abs(parseInt(row.como.split("/")[0]));
                tong_name2 +=parseInt(row.como.split("/")[1]);
                tong_name3 +=parseInt(row.como.split("/")[2]);
                tong_name4 +=parseInt(row.como.split("/")[3]);
              }
              if(row.baicao !=="0/0/0/0"){
                data_print1.push(
                  {
                  
                    "name":"baicao",
                    "r1":Math.abs(row.baicao.split("/")[0]),
                    "r2":row.baicao.split("/")[1],
                    "r3":row.baicao.split("/")[2],
                    "r4":row.baicao.split("/")[3],
                    "r5":r.startTime,
                  },
                )
                tong_name1 +=Math.abs(parseInt(row.baicao.split("/")[0]));
                tong_name2 +=parseInt(row.baicao.split("/")[1]);
                tong_name3 +=parseInt(row.baicao.split("/")[2]);
                tong_name4 +=parseInt(row.baicao.split("/")[3]);
              }
              if(row.lieng !=="0/0/0/0"){
                data_print1.push(
                  {
                  
                    "name":"lieng",
                    "r1":Math.abs(row.lieng.split("/")[0]),
                    "r2":row.lieng.split("/")[1],
                    "r3":row.lieng.split("/")[2],
                    "r4":row.lieng.split("/")[3],
                    "r5":r.startTime,
                  },
                )
                tong_name1 +=Math.abs(parseInt(row.lieng.split("/")[0]));
                tong_name2 +=parseInt(row.lieng.split("/")[1]);
                tong_name3 +=parseInt(row.lieng.split("/")[2]);
                tong_name4 +=parseInt(row.lieng.split("/")[3]);
              }
              if(row.poker !=="0/0/0/0"){
                data_print1.push(
                  {
                  
                    "name":"poker",
                    "r1":Math.abs(row.poker.split("/")[0]),
                    "r2":row.poker.split("/")[1],
                    "r3":row.poker.split("/")[2],
                    "r4":row.poker.split("/")[3],
                    "r5":r.startTime,
                  },
                )
                tong_name1 +=Math.abs(parseInt(row.poker.split("/")[0]));
                tong_name2 +=parseInt(row.poker.split("/")[1]);
                tong_name3 +=parseInt(row.poker.split("/")[2]);
                tong_name4 +=parseInt(row.poker.split("/")[3]);
              }
              if(row.tienlen !=="0/0/0/0"){
                data_print1.push(
                  {
                  
                    "name":"tienlen",
                    "r1":Math.abs(row.tienlen.split("/")[0]),
                    "r2":row.tienlen.split("/")[1],
                    "r3":row.tienlen.split("/")[2],
                    "r4":row.tienlen.split("/")[3],
                    "r5":r.startTime,
                  },
                )
                tong_name1 +=Math.abs(parseInt(row.tienlen.split("/")[0]));
                tong_name2 +=parseInt(row.tienlen.split("/")[1]);
                tong_name3 +=parseInt(row.tienlen.split("/")[2]);
                tong_name4 +=parseInt(row.tienlen.split("/")[3]);
              }
              if(row.sam !=="0/0/0/0"){
                data_print1.push(
                  {
                  
                    "name":"sam",
                    "r1":Math.abs(row.sam.split("/")[0]),
                    "r2":row.sam.split("/")[1],
                    "r3":row.sam.split("/")[2],
                    "r4":row.sam.split("/")[3],
                    "r5":r.startTime,
                  },
                )
                tong_name1 +=Math.abs(parseInt(row.sam.split("/")[0]));
                tong_name2 +=parseInt(row.sam.split("/")[1]);
                tong_name3 +=parseInt(row.sam.split("/")[2]);
                tong_name4 +=parseInt(row.sam.split("/")[3]);
              }
              if(row.binh !=="0/0/0/0"){
                data_print1.push(
                  {
                  
                    "name":"binh",
                    "r1":Math.abs(row.binh.split("/")[0]),
                    "r2":row.binh.split("/")[1],
                    "r3":row.binh.split("/")[2],
                    "r4":row.binh.split("/")[3],
                    "r5":r.startTime,
                  },
                )
                tong_name1 +=Math.abs(parseInt(row.binh.split("/")[0]));
                tong_name2 +=parseInt(row.binh.split("/")[1]);
                tong_name3 +=parseInt(row.binh.split("/")[2]);
                tong_name4 +=parseInt(row.binh.split("/")[3]);
              }  
              
              data_print2.push(
                
                  {
                 
                    "name":"napKingSMS",
                    "r1":row.napKingSMS,
                    "r2":row.cKingSMS,
                    "r3":r.startTime,
                  },
                  {
                 
                    "name":"bank",
                    "r1":row.bank,
                    "r2":row.cBank,
                    "r3":r.startTime,
                   
                  },
                  {
                 
                    "name":"napThe",
                    "r1":row.napThe,
                    "r2":row.cNapThe,
                    "r3":r.startTime,
                   
                  },
                  {
                 
                    "name":"giftCode",
                    "r1":row.giftCode,
                    "r2":row.cGiftCode,
                    "r3":r.startTime,
                   
                  },
                  {
                 
                    "name":"Vongquay",
                    "r1":row.inVongQuay,
                    "r2":row.cVongQuay,
                    "r3":r.startTime,
                   
                  },
                  {
                 
                    "name":"hoanThe",
                    "r1":row.hoanThe,
                    "r2":row.cHoanThe,
                    "r3":r.startTime,
                   
                  },
                  {
                 
                    "name":"muaThe",
                    "r1":row.muaThe,
                    "r2":row.cMuaThe,
                    "r3":r.startTime,
                   
                  },
                  
                
              ) 
              
            })


            // data_print1.push(
            //   {
                    
            //     "name":"tổng",
            //     "r1":tong_name1,
            //     "r2":tong_name2,
            //     "r3":tong_name3,
            //     "r4":tong_name4,
                
            //   }
            // )
            print1 = (
              <div  style={{}}>
                <Workbook filename={"Lợi_nhuận_user_"+st+"_"+et+".xlsx"} element={<Button type="primary">Xuất file</Button>}>
                  <Workbook.Sheet data={data_print1} name="Lợi nhuận từng game">
                    <Workbook.Column label="Ngày" value={r=>this.convertDate(r.r5)}/>   
                    <Workbook.Column label="Tên game" value="name"/>             
                    <Workbook.Column label="Tổng tiền chơi" value={r=>this.formatCurency(r.r1)}  />             
                    <Workbook.Column label="Tiền user nhận" value={r=>this.formatCurency(r.r2)}/>             
                    <Workbook.Column label="Lợi nhuận" value={r=>this.formatCurency(r.r3)}/>             
                    <Workbook.Column label="Số giao dịch" value="r4"/>   
                  </Workbook.Sheet> 
                 
                </Workbook> 
              </div>
            )  
            total_item = data_print1.length;
            page=(
              <div style={{margin: '2% 0%'}}>
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
            // console.log("data_print1",data_print1)
            temp = data_print1.map((rows,indexs)=>{
              if(indexs >= (this.state.activePage-1) *itemsPerPage && indexs < (this.state.activePage) *itemsPerPage ){ 
                return (
                 <tr key={indexs}>
                   <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{indexs+1}</td>
                   <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.convertDate(rows.r5)}</td>
                   <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{rows.name}</td>
                   <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(rows.r1)}</td>
                   <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(rows.r2)}</td>
                   <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(rows.r3)}</td>
                   <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{(rows.r4)}</td>
                 </tr>
                )
             }
            })
           
           
          })
          table1=(
                  
                
                <table style={{marginTop:'2%',width:'95%'}}>
                  <tbody>
                        <tr style={{background:'rgb(236, 246, 253)',fontStyle:'italic'}}>
                          <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>STT</th>
                          <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Ngày</th>
                          <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Tên game</th>
                          <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Luồng tiền</th>
                          <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Tiền user nhận</th>
                          <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Lợi nhuận</th>
                          <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:this.state.key?"":"none"}}>Số giao dịch</th>
                        </tr>  
                        
                        {temp}
                      
                        <tr >
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}} colSpan={2}></td>                
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}><b>Tổng</b></td>                
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(tong_name1)}</td>
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(tong_name2)}</td>
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(tong_name3)}</td>
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{tong_name4}</td>
                          </tr> 
                    </tbody> 
                </table>
             
        
            )
          
        }
        else{
          this.props.dataRevenue.map((row,index)=>{
          


            if(index==0){
              if(row){
            if(name!==""){
              data_print1.push(
                {
                      
                  "name":"tổng",
                  "r1":row.all.split("/")[0],
                  "r2":row.all.split("/")[1],
                  "r3":row.all.split("/")[2],
                  "r4":"",
                  
                },
                {
                  
                  "name":"bacay",
                  "r1":row.bacay.split("/")[0],
                  "r2":row.bacay.split("/")[1],
                  "r3":row.bacay.split("/")[2],
                  "r4":row.bacay.split("/")[3],
                  
                },
                {
                  
                  "name":"taixiu",
                  "r1":row.taixiu.split("/")[4],
                  "r2":row.taixiu.split("/")[5],
                  "r3":row.taixiu.split("/")[2],
                  "r4":row.taixiu.split("/")[3],
                },
                {
                  
                  "name":"minipoker",
                  "r1":row.minipoker.split("/")[0],
                  "r2":row.minipoker.split("/")[1],
                  "r3":row.minipoker.split("/")[2],
                  "r4":row.minipoker.split("/")[3],
                },
                {
                  
                  "name":"baucua",
                  "r1":row.baucua.split("/")[0],
                  "r2":row.baucua.split("/")[1],
                  "r3":row.baucua.split("/")[2],
                  "r4":row.baucua.split("/")[3],
                },
                {
                  
                  "name":"caothap",
                  "r1":row.caothap.split("/")[4],
                  "r2":row.caothap.split("/")[1],
                  "r3":row.caothap.split("/")[2],
                  "r4":row.caothap.split("/")[3],
                },
                {
                 
                  "name":"quanan",
                  "r1":row.quanan.split("/")[0],
                  "r2":row.quanan.split("/")[1],
                  "r3":row.quanan.split("/")[2],
                  "r4":row.quanan.split("/")[3],
                },
                {
                  
                  "name":"xocdia",
                  "r1":row.xocdia.split("/")[0],
                  "r2":row.xocdia.split("/")[1],
                  "r3":row.xocdia.split("/")[2],
                  "r4":row.xocdia.split("/")[3],
                },
                {
                  
                  "name":"luongson",
                  "r1":row.luongson.split("/")[0],
                  "r2":row.luongson.split("/")[1],
                  "r3":row.luongson.split("/")[2],
                  "r4":row.luongson.split("/")[3],
                },
                {
                  
                  "name":"caoboi",
                  "r1":row.caoboi.split("/")[0],
                  "r2":row.caoboi.split("/")[1],
                  "r3":row.caoboi.split("/")[2],
                  "r4":row.caoboi.split("/")[3],
                },
                {
                  
                  "name":"como",
                  "r1":row.como.split("/")[0],
                  "r2":row.como.split("/")[1],
                  "r3":row.como.split("/")[2],
                  "r4":row.como.split("/")[3],
                },
                {
                  
                  "name":"baicao",
                  "r1":row.baicao.split("/")[0],
                  "r2":row.baicao.split("/")[1],
                  "r3":row.baicao.split("/")[2],
                  "r4":row.baicao.split("/")[3],
                },
                {
                  
                  "name":"binh",
                  "r1":row.binh.split("/")[0],
                  "r2":row.binh.split("/")[1],
                  "r3":row.binh.split("/")[2],
                  "r4":row.binh.split("/")[3],
                },
                {
                 
                  "name":"lieng",
                  "r1":row.lieng.split("/")[0],
                  "r2":row.lieng.split("/")[1],
                  "r3":row.lieng.split("/")[2],
                  "r4":row.lieng.split("/")[3],
                },
                {
                  
                  "name":"poker",
                  "r1":row.poker.split("/")[0],
                  "r2":row.poker.split("/")[1],
                  "r3":row.poker.split("/")[2],
                  "r4":row.poker.split("/")[3],
                },
                {
                 
                  "name":"taixiu",
                  "r1":row.sam.split("/")[4],
                  "r2":row.sam.split("/")[5],
                  "r3":row.sam.split("/")[2],
                  "r4":row.sam.split("/")[3],
                },
                {
                 
                  "name":"tienlen",
                  "r1":row.tienlen.split("/")[0],
                  "r2":row.tienlen.split("/")[1],
                  "r3":row.tienlen.split("/")[2],
                  "r4":row.tienlen.split("/")[3],
                },
                {
                 
                  "name":"chuyenkhoan",
                  "r1":row.chuyenkhoan.split("/")[0],
                  "r2":row.chuyenkhoan.split("/")[1],
                  "r3":row.chuyenkhoan.split("/")[2],
                  "r4":row.chuyenkhoan.split("/")[3],
                },
                {
                 
                  "name":"ketsat",
                  "r1":row.ketsat.split("/")[0],
                  "r2":row.ketsat.split("/")[1],
                  "r3":row.ketsat.split("/")[2],
                  "r4":row.ketsat.split("/")[3],
                },
                {
                 
                  "name":"khac",
                  "r1":row.other.split("/")[0],
                  "r2":row.other.split("/")[1],
                  "r3":row.other.split("/")[2],
                  "r4":row.other.split("/")[3],
                },
              )
              data_print2.push(
                
                  {
                 
                    "name":"napKingSMS",
                    "r1":row.napKingSMS,
                    "r2":row.cKingSMS,
                   
                  },
                  {
                 
                    "name":"bank",
                    "r1":row.bank,
                    "r2":row.cBank,
                   
                  },
                  {
                 
                    "name":"napThe",
                    "r1":row.napThe,
                    "r2":row.cNapThe,
                   
                  },
                  {
                 
                    "name":"giftCode",
                    "r1":row.giftCode,
                    "r2":row.cGiftCode,
                   
                  },
                  {
                 
                    "name":"Vongquay",
                    "r1":row.inVongQuay,
                    "r2":row.cVongQuay,
                   
                  },
                  {
                 
                    "name":"hoanThe",
                    "r1":row.hoanThe,
                    "r2":row.cHoanThe,
                   
                  },
                  {
                 
                    "name":"muaThe",
                    "r1":row.muaThe,
                    "r2":row.cMuaThe,
                   
                  },
                  
                
              ) 
  
              print1 = (
                <div  style={{}}>
                  <Workbook filename={"Lợi_nhuận_user_"+st+"_"+et+".xlsx"} element={<Button type="primary">Xuất file</Button>}>
                    <Workbook.Sheet data={data_print1} name="Lợi nhuận từng game">
                      <Workbook.Column label="Tên game" value="name"/>             
                      <Workbook.Column label="Tổng tiền chơi" value={r=>this.formatCurency(r.r1)}/>             
                      <Workbook.Column label="Tiền user nhận" value={r=>this.formatCurency(r.r2)}/>             
                      <Workbook.Column label="Lợi nhuận" value={r=>this.formatCurency(r.r3)}/>             
                      <Workbook.Column label="Số giao dịch" value="r4"/>             
                    
                    </Workbook.Sheet> 
                    <Workbook.Sheet data={data_print2} name="Lợi nhuận khác">
                      <Workbook.Column label="Tên" value="name"/>             
                      <Workbook.Column label="Số tiền" value={r=>this.formatCurency(r.r1)}/>    
                      <Workbook.Column label="Số giao dịch" value="r2"/>    
                    </Workbook.Sheet> 
                  </Workbook> 
                </div>
              )  
            }else{
              data_print1.push(
                {
                      
                  "name":"tổng",
                  "r1":row.all.split("/")[0],
                  "r2":row.all.split("/")[1],
                  "r3":row.all.split("/")[2],
                  
                },
                {
                  
                  "name":"bacay",
                  "r1":row.bacay.split("/")[0],
                  "r2":row.bacay.split("/")[1],
                  "r3":row.bacay.split("/")[2],
                  
                },
                {
                  
                  "name":"taixiu",
                  "r1":row.taixiu.split("/")[4],
                  "r2":row.taixiu.split("/")[5],
                  "r3":row.taixiu.split("/")[2]
                },
                {
                  
                  "name":"minipoker",
                  "r1":row.minipoker.split("/")[0],
                  "r2":row.minipoker.split("/")[1],
                  "r3":row.minipoker.split("/")[2]
                },
                {
                  
                  "name":"baucua",
                  "r1":row.baucua.split("/")[0],
                  "r2":row.baucua.split("/")[1],
                  "r3":row.baucua.split("/")[2]
                },
                {
                  
                  "name":"caothap",
                  "r1":row.caothap.split("/")[4],
                  "r2":row.caothap.split("/")[1],
                  "r3":row.caothap.split("/")[2]
                },
                {
                 
                  "name":"quanan",
                  "r1":row.quanan.split("/")[0],
                  "r2":row.quanan.split("/")[1],
                  "r3":row.quanan.split("/")[2]
                },
                {
                  
                  "name":"xocdia",
                  "r1":row.xocdia.split("/")[0],
                  "r2":row.xocdia.split("/")[1],
                  "r3":row.xocdia.split("/")[2]
                },
                {
                  
                  "name":"luongson",
                  "r1":row.luongson.split("/")[0],
                  "r2":row.luongson.split("/")[1],
                  "r3":row.luongson.split("/")[2]
                },
                {
                  
                  "name":"caoboi",
                  "r1":row.caoboi.split("/")[0],
                  "r2":row.caoboi.split("/")[1],
                  "r3":row.caoboi.split("/")[2]
                },
                {
                  
                  "name":"como",
                  "r1":row.como.split("/")[0],
                  "r2":row.como.split("/")[1],
                  "r3":row.como.split("/")[2]
                },
                {
                  
                  "name":"baicao",
                  "r1":row.baicao.split("/")[0],
                  "r2":row.baicao.split("/")[1],
                  "r3":row.baicao.split("/")[2]
                },
                {
                  
                  "name":"binh",
                  "r1":row.binh.split("/")[0],
                  "r2":row.binh.split("/")[1],
                  "r3":row.binh.split("/")[2]
                },
                {
                 
                  "name":"lieng",
                  "r1":row.lieng.split("/")[0],
                  "r2":row.lieng.split("/")[1],
                  "r3":row.lieng.split("/")[2]
                },
                {
                  
                  "name":"poker",
                  "r1":row.poker.split("/")[0],
                  "r2":row.poker.split("/")[1],
                  "r3":row.poker.split("/")[2]
                },
                {
                 
                  "name":"taixiu",
                  "r1":row.sam.split("/")[4],
                  "r2":row.sam.split("/")[5],
                  "r3":row.sam.split("/")[2]
                },
                {
                 
                  "name":"tienlen",
                  "r1":row.tienlen.split("/")[0],
                  "r2":row.tienlen.split("/")[1],
                  "r3":row.tienlen.split("/")[2]
                },
                {
                 
                  "name":"chuyenkhoan",
                  "r1":row.chuyenkhoan.split("/")[0],
                  "r2":row.chuyenkhoan.split("/")[1],
                  "r3":row.chuyenkhoan.split("/")[2]
                },
                {
                 
                  "name":"ketsat",
                  "r1":row.ketsat.split("/")[0],
                  "r2":row.ketsat.split("/")[1],
                  "r3":row.ketsat.split("/")[2]
                },
                {
                 
                  "name":"khac",
                  "r1":row.other.split("/")[0],
                  "r2":row.other.split("/")[1],
                  "r3":row.other.split("/")[2]
                },
              )
              data_print2.push(
                
                {
               
                  "name":"napKingSMS",
                  "r1":row.napKingSMS,
                  
                },
                {
               
                  "name":"bank",
                  "r1":row.bank,
                  
                },
                {
               
                  "name":"napThe",
                  "r1":row.napThe,
                  
                },
                {
               
                  "name":"giftCode",
                  "r1":row.giftCode,
                  
                },
                {
               
                  "name":"Vongquay",
                  "r1":row.inVongQuay,
                 
                },
                {
               
                  "name":"hoanThe",
                  "r1":row.hoanThe,
                 
                },
                {
               
                  "name":"muaThe",
                  "r1":row.muaThe,
                  
                },
              )
              print1 = (
                <div  style={{}}>
                  <Workbook filename={"Lợi_nhuận_user_"+st+"_"+et+".xlsx"} element={<Button type="primary">Xuất file</Button>}>
                    <Workbook.Sheet data={data_print1} name="Lợi nhuận từng game">
                      <Workbook.Column label="Tên game" value="name"/>             
                      <Workbook.Column label="Tổng tiền chơi" value={r=>this.formatCurency(r.r1)}/>             
                      <Workbook.Column label="Tiền user nhận" value={r=>this.formatCurency(r.r2)}/>             
                      <Workbook.Column label="Lợi nhuận" value={r=>this.formatCurency(r.r3)}/>             
                    
                    </Workbook.Sheet> 
                    <Workbook.Sheet data={data_print2} name="Lợi nhuận khác">
                      <Workbook.Column label="Tên" value="name"/>             
                      <Workbook.Column label="Số tiền" value={r=>this.formatCurency(r.r1)}/>             
                     
                    </Workbook.Sheet> 
                  </Workbook> 
                </div>
              )  
            }   
              
            
            txtHeader=(<div style={{display:'-webkit-box'}}> <Icon type="bars" /><h3 style={{marginLeft:'1%'}}>User</h3></div>)
            table1= (
              <Card key={index} style={{marginTop:'1%',height:'100%',width:'95%',border:'1px solid #e2e2e2'}} 
                title={
                 txtHeader
                 
                }
              >               
                 <table style={{marginLeft:'1%',height:'100%',width:'95%',marginBottom:10}}>
                  <tbody>
                    <tr  style={{background:'rgb(236, 246, 253)',fontStyle:'italic'}}>
                      <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Tên</th>
                      <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Số tiền</th>
                      <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:name?"":"none"}}>Số giao dịch</th>
                    </tr> 
                    <tr>
                      <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Nạp king SMS</th>
                      <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.napKingSMS)}</td>
                      <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:name?"":"none"}}>{row.cKingSMS}</td>
                      
                    </tr> 
                    <tr>
                      <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Nạp bank</th>
                      <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.bank)}</td>
                      <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:name?"":"none"}}>{row.cBank}</td>
                      
                    </tr> 
                    <tr>
                      <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Nạp thẻ</th>
                      <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.napThe)}</td>
                      <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:name?"":"none"}}>{row.cNapThe}</td>
                      
                      
                    </tr> 
                    <tr>
                      <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>GiftCode</th>
                      <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.giftCode)}</td>
                      <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:name?"":"none"}}>{row.cGiftCode}</td>
                      
                      
                    </tr>
                    <tr>
                      <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}> Vòng quay</th>
                      <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.inVongQuay)}</td>
                      <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:name?"":"none"}}>{row.cVongQuay}</td>
                      
                      
                    </tr>
                    <tr>
                      <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Mua thẻ</th>
                      <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.hoanThe)}</td>
                      <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:name?"":"none"}}>{row.cHoanThe}</td>
                      
                      
                    </tr>
                    <tr>
                      <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Hoàn thẻ</th>
                      <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.muaThe)}</td>
                      <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:name?"":"none"}}>{row.cMuaThe}</td>
                      
                      
                    </tr>
                    
                  </tbody>  
                 </table>  
                <table style={{marginLeft:'1%',height:'100%',width:'95%'}}>
                  <tbody>
                        <tr  style={{background:'rgb(236, 246, 253)',fontStyle:'italic'}}>
                          <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Tên game</th>
                          <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Luồng tiền</th>
                          <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Tiền user nhận</th>
                          <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Lợi nhuận</th>
                          <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:this.state.key?"":"none"}}>Số giao dịch</th>
                        </tr>  
                        <tr >
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>tất cả(game+nạp tiền)</td>                
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(Math.abs(row.all.split("/")[0]))}</td>
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.all.split("/")[1])}</td>
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.all.split("/")[2])}</td>
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:name?"":"none"}}></td>
                          </tr>
                          <tr >
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>tài xỉu</td>                
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(Math.abs(row.taixiu.split("/")[4]))}</td>
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.taixiu.split("/")[5])}</td>
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.taixiu.split("/")[2])}</td>
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:name?"":"none"}}>{(row.taixiu.split("/")[3])}</td>
                          </tr>
                          <tr>  
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>minipoker</td>              
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(Math.abs(row.minipoker.split("/")[0]))}</td>
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.minipoker.split("/")[1])}</td>
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.minipoker.split("/")[2])}</td>
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:name?"":"none"}}>{(row.minipoker.split("/")[3])}</td>
                          </tr>  
                          
                          <tr> 
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>bầu cua</td>                
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(Math.abs(row.baucua.split("/")[0]))}</td>
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.baucua.split("/")[1])}</td>
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.baucua.split("/")[2])}</td>
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:name?"":"none"}}>{(row.baucua.split("/")[3])}</td>
                          </tr>
                          <tr>  
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>cao thấp</td>                 
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(Math.abs(row.caothap.split("/")[4]))}</td>
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.caothap.split("/")[1])}</td>
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.caothap.split("/")[2])}</td>
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:name?"":"none"}}>{(row.caothap.split("/")[3])}</td>
                          </tr>
                          <tr> 
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>xóc đĩa</td>                 
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(Math.abs(row.xocdia.split("/")[0]))}</td>
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.xocdia.split("/")[1])}</td>
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.xocdia.split("/")[2])}</td>
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:name?"":"none"}}>{(row.xocdia.split("/")[3])}</td>
                          </tr>  
                          <tr>
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>quán ăn</td>                
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(Math.abs(row.quanan.split("/")[0]))}</td>
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.quanan.split("/")[1])}</td>
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.quanan.split("/")[2])}</td>
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:name?"":"none"}}>{(row.quanan.split("/")[3])}</td>
                          </tr> 
                        
                          <tr>  
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>lương sơn</td>                
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(Math.abs(row.luongson.split("/")[0]))}</td>
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.luongson.split("/")[1])}</td>
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.luongson.split("/")[2])}</td>
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:name?"":"none"}}>{(row.luongson.split("/")[3])}</td>
                          </tr>
                          <tr>  
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>caoboi</td>                
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(Math.abs(row.caoboi.split("/")[0]))}</td>
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.caoboi.split("/")[1])}</td>
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.caoboi.split("/")[2])}</td>
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:name?"":"none"}}>{(row.caoboi.split("/")[3])}</td>
                          </tr>
                        
                          <tr>  
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>como</td>                
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(Math.abs(row.como.split("/")[0]))}</td>
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.como.split("/")[1])}</td>
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.como.split("/")[2])}</td>
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:name?"":"none"}}>{(row.como.split("/")[3])}</td>
                          </tr>
                          <tr>  
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>bacay</td>
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(Math.abs(row.bacay.split("/")[0]))}</td>
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.bacay.split("/")[1])}</td>
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.bacay.split("/")[2])}</td>                
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:name?"":"none"}}>{(row.bacay.split("/")[3])}</td>                
                          </tr>  
                          <tr>
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>baicao</td>
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(Math.abs(row.baicao.split("/")[0]))}</td>
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.baicao.split("/")[1])}</td>
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.baicao.split("/")[2])}</td>
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:name?"":"none"}}>{(row.baicao.split("/")[3])}</td>
                          </tr>
                          <tr>  
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>binh</td>
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(Math.abs(row.binh.split("/")[0]))}</td>
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.binh.split("/")[1])}</td>
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.binh.split("/")[2])}</td>                
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:name?"":"none"}}>{(row.binh.split("/")[3])}</td>                
                          </tr>  
                          <tr>
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>liêng</td>
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(Math.abs(row.lieng.split("/")[0]))}</td>
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.lieng.split("/")[1])}</td>
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.lieng.split("/")[2])}</td>
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:name?"":"none"}}>{(row.lieng.split("/")[3])}</td>
                            
                          </tr>
                          <tr>  
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>poker</td>
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(Math.abs(row.poker.split("/")[0]))}</td>
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.poker.split("/")[1])}</td>
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.poker.split("/")[2])}</td>
                            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:name?"":"none"}}>{(row.poker.split("/")[3])}</td>
                            
                          </tr>  
                          <tr>
                          <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>sam</td>
                          <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(Math.abs(row.sam.split("/")[0]))}</td>
                          <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.sam.split("/")[1])}</td>
                          <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.sam.split("/")[2])}</td>
                          <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:name?"":"none"}}>{(row.sam.split("/")[3])}</td>
                          
                          </tr>
                        <tr> 
                          <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>tiến lên</td>
                          <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(Math.abs(row.tienlen.split("/")[0]))}</td>
                          <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.tienlen.split("/")[1])}</td>
                          <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.tienlen.split("/")[2])}</td>
                          <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:name?"":"none"}}>{(row.tienlen.split("/")[3])}</td>
                            
                        </tr>   
                        <tr> 
                          <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>chuyển khoản</td>
                          <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(Math.abs(row.chuyenkhoan.split("/")[0]))}</td>
                          <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.chuyenkhoan.split("/")[1])}</td>
                          <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.chuyenkhoan.split("/")[2])}</td>
                          <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:name?"":"none"}}>{(row.chuyenkhoan.split("/")[3])}</td>
                            
                        </tr>  
                        <tr> 
                          <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>admin</td>
                          <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(Math.abs(row.admin.split("/")[0]))}</td>
                          <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.admin.split("/")[1])}</td>
                          <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.admin.split("/")[2])}</td>
                          <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:name?"":"none"}}>{(row.admin.split("/")[3])}</td>
                            
                        </tr>  
                        <tr> 
                          <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>két sắt</td>
                          <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(Math.abs(row.ketsat.split("/")[0]))}</td>
                          <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.ketsat.split("/")[1])}</td>
                          <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.ketsat.split("/")[2])}</td>
                          <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:name?"":"none"}}>{(row.ketsat.split("/")[3])}</td>
                            
                        </tr>  
                        <tr> 
                          <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Khác</td>
                          <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(Math.abs(row.other.split("/")[0]))}</td>
                          <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.other.split("/")[1])}</td>
                          <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.other.split("/")[2])}</td>
                          <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:name?"":"none"}}>{(row.other.split("/")[3])}</td>
                            
                        </tr>  
                    </tbody> 
                </table>
              </Card>  
              
              )
              }else{
                table1="Không có dữ liệu !"
              }
            
            }else{
              if(row){
                txtHeader=(<div style={{display:'-webkit-box'}}> <Icon type="bars" /><h3 style={{marginLeft:'1%'}}>Bot</h3></div>);
                if(name!==""){
                  data_print1.push(
                    {
                          
                      "name":"tổng",
                      "r1":row.all.split("/")[0],
                      "r2":row.all.split("/")[1],
                      "r3":row.all.split("/")[2],
                      "r4":"",
                      
                    },
                    {
                      
                      "name":"bacay",
                      "r1":row.bacay.split("/")[0],
                      "r2":row.bacay.split("/")[1],
                      "r3":row.bacay.split("/")[2],
                      "r4":row.bacay.split("/")[3],
                      
                    },
                    {
                      
                      "name":"taixiu",
                      "r1":row.taixiu.split("/")[4],
                      "r2":row.taixiu.split("/")[5],
                      "r3":row.taixiu.split("/")[2],
                      "r4":row.taixiu.split("/")[3],
                    },
                    {
                      
                      "name":"minipoker",
                      "r1":row.minipoker.split("/")[0],
                      "r2":row.minipoker.split("/")[1],
                      "r3":row.minipoker.split("/")[2],
                      "r4":row.minipoker.split("/")[3],
                    },
                    {
                      
                      "name":"baucua",
                      "r1":row.baucua.split("/")[0],
                      "r2":row.baucua.split("/")[1],
                      "r3":row.baucua.split("/")[2],
                      "r4":row.baucua.split("/")[3],
                    },
                    {
                      
                      "name":"caothap",
                      "r1":row.caothap.split("/")[4],
                      "r2":row.caothap.split("/")[1],
                      "r3":row.caothap.split("/")[2],
                      "r4":row.caothap.split("/")[3],
                    },
                    {
                     
                      "name":"quanan",
                      "r1":row.quanan.split("/")[0],
                      "r2":row.quanan.split("/")[1],
                      "r3":row.quanan.split("/")[2],
                      "r4":row.quanan.split("/")[3],
                    },
                    {
                      
                      "name":"xocdia",
                      "r1":row.xocdia.split("/")[0],
                      "r2":row.xocdia.split("/")[1],
                      "r3":row.xocdia.split("/")[2],
                      "r4":row.xocdia.split("/")[3],
                    },
                    {
                      
                      "name":"luongson",
                      "r1":row.luongson.split("/")[0],
                      "r2":row.luongson.split("/")[1],
                      "r3":row.luongson.split("/")[2],
                      "r4":row.luongson.split("/")[3],
                    },
                    {
                      
                      "name":"caoboi",
                      "r1":row.caoboi.split("/")[0],
                      "r2":row.caoboi.split("/")[1],
                      "r3":row.caoboi.split("/")[2],
                      "r4":row.caoboi.split("/")[3],
                    },
                    {
                      
                      "name":"como",
                      "r1":row.como.split("/")[0],
                      "r2":row.como.split("/")[1],
                      "r3":row.como.split("/")[2],
                      "r4":row.como.split("/")[3],
                    },
                    {
                      
                      "name":"baicao",
                      "r1":row.baicao.split("/")[0],
                      "r2":row.baicao.split("/")[1],
                      "r3":row.baicao.split("/")[2],
                      "r4":row.baicao.split("/")[3],
                    },
                    {
                      
                      "name":"binh",
                      "r1":row.binh.split("/")[0],
                      "r2":row.binh.split("/")[1],
                      "r3":row.binh.split("/")[2],
                      "r4":row.binh.split("/")[3],
                    },
                    {
                     
                      "name":"lieng",
                      "r1":row.lieng.split("/")[0],
                      "r2":row.lieng.split("/")[1],
                      "r3":row.lieng.split("/")[2],
                      "r4":row.lieng.split("/")[3],
                    },
                    {
                      
                      "name":"poker",
                      "r1":row.poker.split("/")[0],
                      "r2":row.poker.split("/")[1],
                      "r3":row.poker.split("/")[2],
                      "r4":row.poker.split("/")[3],
                    },
                    {
                     
                      "name":"taixiu",
                      "r1":row.sam.split("/")[4],
                      "r2":row.sam.split("/")[5],
                      "r3":row.sam.split("/")[2],
                      "r4":row.sam.split("/")[3],
                    },
                    {
                     
                      "name":"tienlen",
                      "r1":row.tienlen.split("/")[0],
                      "r2":row.tienlen.split("/")[1],
                      "r3":row.tienlen.split("/")[2],
                      "r4":row.tienlen.split("/")[3],
                    },
                    {
                     
                      "name":"chuyenkhoan",
                      "r1":row.chuyenkhoan.split("/")[0],
                      "r2":row.chuyenkhoan.split("/")[1],
                      "r3":row.chuyenkhoan.split("/")[2],
                      "r4":row.chuyenkhoan.split("/")[3],
                    },
                    {
                     
                      "name":"ketsat",
                      "r1":row.ketsat.split("/")[0],
                      "r2":row.ketsat.split("/")[1],
                      "r3":row.ketsat.split("/")[2],
                      "r4":row.ketsat.split("/")[3],
                    },
                    {
                     
                      "name":"khac",
                      "r1":row.other.split("/")[0],
                      "r2":row.other.split("/")[1],
                      "r3":row.other.split("/")[2],
                      "r4":row.other.split("/")[3],
                    },
                  )
                  data_print2.push(
                    
                      {
                     
                        "name":"napKingSMS",
                        "r1":row.napKingSMS,
                        "r2":row.cKingSMS,
                       
                      },
                      {
                     
                        "name":"bank",
                        "r1":row.bank,
                        "r2":row.cBank,
                       
                      },
                      {
                     
                        "name":"napThe",
                        "r1":row.napThe,
                        "r2":row.cNapThe,
                       
                      },
                      {
                     
                        "name":"giftCode",
                        "r1":row.giftCode,
                        "r2":row.cGiftCode,
                       
                      },
                      {
                     
                        "name":"Vongquay",
                        "r1":row.inVongQuay,
                        "r2":row.cVongQuay,
                       
                      },
                      {
                     
                        "name":"hoanThe",
                        "r1":row.hoanThe,
                        "r2":row.cHoanThe,
                       
                      },
                      {
                     
                        "name":"muaThe",
                        "r1":row.muaThe,
                        "r2":row.cMuaThe,
                       
                      },
                      
                    
                  ) 
      
                  print2 = (
                    <div  style={{}}>
                      <Workbook filename={"Lợi_nhuận_bot_"+st+"_"+et+".xlsx"} element={<Button type="primary">Xuất file</Button>}>
                        <Workbook.Sheet data={data_print3} name="Lợi nhuận từng game">
                          <Workbook.Column label="Tên game" value="name"/>             
                          <Workbook.Column label="Luồng tiền" value={r=>this.formatCurency(r.r1)}/>             
                          <Workbook.Column label="Tiền user nhận" value={r=>this.formatCurency(r.r2)}/>             
                          <Workbook.Column label="Lợi nhuận" value={r=>this.formatCurency(r.r3)}/>             
                          <Workbook.Column label="Số giao dịch" value="r4"/>             
                        
                        </Workbook.Sheet> 
                        <Workbook.Sheet data={data_print4} name="Lợi nhuận khác">
                          <Workbook.Column label="Tên" value="name"/>             
                          <Workbook.Column label="Số tiền" value={r=>this.formatCurency(r.r1)}/>    
                          <Workbook.Column label="Số giao dịch" value="r2"/>    
                        </Workbook.Sheet> 
                      </Workbook> 
                    </div>
                  )  
                }else{
                  data_print3.push(
                    {
                          
                      "name":"tổng",
                      "r1":row.all.split("/")[0],
                      "r2":row.all.split("/")[1],
                      "r3":row.all.split("/")[2],
                      
                    },
                    {
                      
                      "name":"bacay",
                      "r1":row.bacay.split("/")[0],
                      "r2":row.bacay.split("/")[1],
                      "r3":row.bacay.split("/")[2],
                      
                    },
                    {
                      
                      "name":"taixiu",
                      "r1":row.taixiu.split("/")[4],
                      "r2":row.taixiu.split("/")[5],
                      "r3":row.taixiu.split("/")[2]
                    },
                    {
                      
                      "name":"minipoker",
                      "r1":row.minipoker.split("/")[0],
                      "r2":row.minipoker.split("/")[1],
                      "r3":row.minipoker.split("/")[2]
                    },
                    {
                      
                      "name":"baucua",
                      "r1":row.baucua.split("/")[0],
                      "r2":row.baucua.split("/")[1],
                      "r3":row.baucua.split("/")[2]
                    },
                    {
                      
                      "name":"caothap",
                      "r1":row.caothap.split("/")[4],
                      "r2":row.caothap.split("/")[1],
                      "r3":row.caothap.split("/")[2]
                    },
                    {
                     
                      "name":"quanan",
                      "r1":row.quanan.split("/")[0],
                      "r2":row.quanan.split("/")[1],
                      "r3":row.quanan.split("/")[2]
                    },
                    {
                      
                      "name":"xocdia",
                      "r1":row.xocdia.split("/")[0],
                      "r2":row.xocdia.split("/")[1],
                      "r3":row.xocdia.split("/")[2]
                    },
                    {
                      
                      "name":"luongson",
                      "r1":row.luongson.split("/")[0],
                      "r2":row.luongson.split("/")[1],
                      "r3":row.luongson.split("/")[2]
                    },
                    {
                      
                      "name":"caoboi",
                      "r1":row.caoboi.split("/")[0],
                      "r2":row.caoboi.split("/")[1],
                      "r3":row.caoboi.split("/")[2]
                    },
                    {
                      
                      "name":"como",
                      "r1":row.como.split("/")[0],
                      "r2":row.como.split("/")[1],
                      "r3":row.como.split("/")[2]
                    },
                    {
                      
                      "name":"baicao",
                      "r1":row.baicao.split("/")[0],
                      "r2":row.baicao.split("/")[1],
                      "r3":row.baicao.split("/")[2]
                    },
                    {
                      
                      "name":"binh",
                      "r1":row.binh.split("/")[0],
                      "r2":row.binh.split("/")[1],
                      "r3":row.binh.split("/")[2]
                    },
                    {
                     
                      "name":"lieng",
                      "r1":row.lieng.split("/")[0],
                      "r2":row.lieng.split("/")[1],
                      "r3":row.lieng.split("/")[2]
                    },
                    {
                      
                      "name":"poker",
                      "r1":row.poker.split("/")[0],
                      "r2":row.poker.split("/")[1],
                      "r3":row.poker.split("/")[2]
                    },
                    {
                     
                      "name":"taixiu",
                      "r1":row.sam.split("/")[0],
                      "r2":row.sam.split("/")[4],
                      "r3":row.sam.split("/")[2]
                    },
                    {
                     
                      "name":"tienlen",
                      "r1":row.tienlen.split("/")[0],
                      "r2":row.tienlen.split("/")[1],
                      "r3":row.tienlen.split("/")[2]
                    },
                    {
                     
                      "name":"chuyenkhoan",
                      "r1":row.chuyenkhoan.split("/")[0],
                      "r2":row.chuyenkhoan.split("/")[1],
                      "r3":row.chuyenkhoan.split("/")[2]
                    },
                    {
                     
                      "name":"ketsat",
                      "r1":row.ketsat.split("/")[0],
                      "r2":row.ketsat.split("/")[1],
                      "r3":row.ketsat.split("/")[2]
                    },
                    {
                     
                      "name":"khac",
                      "r1":row.other.split("/")[0],
                      "r2":row.other.split("/")[1],
                      "r3":row.other.split("/")[2]
                    },
                  )
                  data_print4.push(
                    
                    {
                   
                      "name":"napKingSMS",
                      "r1":row.napKingSMS,
                      
                    },
                    {
                   
                      "name":"bank",
                      "r1":row.bank,
                      
                    },
                    {
                   
                      "name":"napThe",
                      "r1":row.napThe,
                      
                    },
                    {
                   
                      "name":"giftCode",
                      "r1":row.giftCode,
                      
                    },
                    {
                   
                      "name":"Vongquay",
                      "r1":row.inVongQuay,
                     
                    },
                    {
                   
                      "name":"hoanThe",
                      "r1":row.hoanThe,
                     
                    },
                    {
                   
                      "name":"muaThe",
                      "r1":row.muaThe,
                      
                    },
                  )
                  print2 = (
                    <div  style={{}}>
                      <Workbook filename={"Lợi_nhuận_bot_"+st+"_"+et+".xlsx"} element={<Button type="primary">Xuất file</Button>}>
                        <Workbook.Sheet data={data_print3} name="Lợi nhuận từng game">
                          <Workbook.Column label="Tên game" value="name"/>             
                          <Workbook.Column label="Luồng tiền" value={r=>this.formatCurency(r.r1)}/>             
                          <Workbook.Column label="Tiền user nhận" value={r=>this.formatCurency(r.r2)}/>             
                          <Workbook.Column label="Lợi nhuận" value={r=>this.formatCurency(r.r3)}/>             
                        
                        </Workbook.Sheet> 
                        <Workbook.Sheet data={data_print4} name="Lợi nhuận khác">
                          <Workbook.Column label="Tên" value="name"/>             
                          <Workbook.Column label="Số tiền" value={r=>this.formatCurency(r.r1)}/>             
                         
                        </Workbook.Sheet> 
                      </Workbook> 
                    </div>
                  )  
                }   
                  
                table2= (
                  <Card key={index} style={{marginTop:'1%',height:'100%',width:'95%',border:'1px solid #e2e2e2'}} 
                    title={
                     txtHeader
                     
                    }
                  > 
                    
                    <table style={{marginLeft:'1%',height:'100%',width:'95%',marginBottom:10}}>
                      <tbody>
                        <tr  style={{background:'rgb(236, 246, 253)',fontStyle:'italic'}}>
                          <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Tên</th>
                          <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Số tiền</th>
                          <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:name?"":"none"}}>Số giao dịch</th>
                        </tr> 
                        <tr>
                          <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Nạp king SMS</th>
                          <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.napKingSMS)}</td>
                          <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:name?"":"none"}}>{row.cKingSMS}</td>
                          
                        </tr> 
                        <tr>
                          <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Nạp bank</th>
                          <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.bank)}</td>
                          <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:name?"":"none"}}>{row.cBank}</td>
                          
                        </tr> 
                        <tr>
                          <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Nạp thẻ</th>
                          <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.napThe)}</td>
                          <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:name?"":"none"}}>{row.cNapThe}</td>
                          
                          
                        </tr> 
                        <tr>
                          <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>GiftCode</th>
                          <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.giftCode)}</td>
                          <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:name?"":"none"}}>{row.cGiftCode}</td>
                          
                          
                        </tr>
                        <tr>
                          <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}> Vòng quay</th>
                          <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.inVongQuay)}</td>
                          <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:name?"":"none"}}>{row.cVongQuay}</td>
                          
                          
                        </tr>
                        <tr>
                          <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Mua thẻ</th>
                          <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.hoanThe)}</td>
                          <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:name?"":"none"}}>{row.cMuaThe}</td>
                          
                          
                        </tr>
                        <tr>
                          <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Hoàn thẻ</th>
                          <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.muaThe)}</td>
                          <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:name?"":"none"}}>{row.cHoanThe}</td>
                          
                          
                        </tr>
                        
                      </tbody>  
                    </table>  
                    <table style={{marginLeft:'1%',height:'100%',width:'95%'}}>
                      <tbody>
                            <tr  style={{background:'rgb(236, 246, 253)',fontStyle:'italic'}}>
                              <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Tên game</th>
                              <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Luồng tiền</th>
                              <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Tiền user nhận</th>
                              <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Lợi nhuận</th>
                              <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:this.state.key?"":"none"}}>Số giao dịch</th>
                            </tr>  
                            <tr >
                                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>tất cả</td>                
                                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.all.split("/")[0])}</td>
                                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.all.split("/")[1])}</td>
                                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.all.split("/")[2])}</td>
                                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:name?"":"none"}}></td>
                              </tr>
                              <tr >
                                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>tài xỉu</td>                
                                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.taixiu.split("/")[4])}</td>
                                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.taixiu.split("/")[5])}</td>
                                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.taixiu.split("/")[2])}</td>
                                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:name?"":"none"}}>{(row.taixiu.split("/")[3])}</td>
                              </tr>
                              <tr>  
                                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>minipoker</td>              
                                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.minipoker.split("/")[0])}</td>
                                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.minipoker.split("/")[1])}</td>
                                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.minipoker.split("/")[2])}</td>
                                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:name?"":"none"}}>{(row.minipoker.split("/")[3])}</td>
                              </tr>  
                              
                              <tr> 
                                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>bầu cua</td>                
                                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.baucua.split("/")[0])}</td>
                                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.baucua.split("/")[1])}</td>
                                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.baucua.split("/")[2])}</td>
                                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:name?"":"none"}}>{(row.baucua.split("/")[3])}</td>
                              </tr>
                              <tr>  
                                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>cao thấp</td>                 
                                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.caothap.split("/")[4])}</td>
                                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.caothap.split("/")[1])}</td>
                                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.caothap.split("/")[2])}</td>
                                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:name?"":"none"}}>{(row.caothap.split("/")[3])}</td>
                              </tr>
                              <tr> 
                                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>xóc đĩa</td>                 
                                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.xocdia.split("/")[0])}</td>
                                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.xocdia.split("/")[1])}</td>
                                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.xocdia.split("/")[2])}</td>
                                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:name?"":"none"}}>{(row.xocdia.split("/")[3])}</td>
                              </tr>  
                              <tr>
                                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>quán ăn</td>                
                                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.quanan.split("/")[0])}</td>
                                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.quanan.split("/")[1])}</td>
                                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.quanan.split("/")[2])}</td>
                                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:name?"":"none"}}>{(row.quanan.split("/")[3])}</td>
                              </tr> 
                            
                              <tr>  
                                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>lương sơn</td>                
                                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.luongson.split("/")[0])}</td>
                                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.luongson.split("/")[1])}</td>
                                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.luongson.split("/")[2])}</td>
                                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:name?"":"none"}}>{(row.luongson.split("/")[3])}</td>
                              </tr>
                              <tr>  
                                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>caoboi</td>                
                                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.caoboi.split("/")[0])}</td>
                                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.caoboi.split("/")[1])}</td>
                                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.caoboi.split("/")[2])}</td>
                                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:name?"":"none"}}>{(row.caoboi.split("/")[3])}</td>
                              </tr>
                            
                              <tr>  
                                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>como</td>                
                                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.como.split("/")[0])}</td>
                                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.como.split("/")[1])}</td>
                                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.como.split("/")[2])}</td>
                                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:name?"":"none"}}>{(row.como.split("/")[3])}</td>
                              </tr>
                              <tr>  
                                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>bacay</td>
                                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.bacay.split("/")[0])}</td>
                                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.bacay.split("/")[1])}</td>
                                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.bacay.split("/")[2])}</td>                
                                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:name?"":"none"}}>{(row.bacay.split("/")[3])}</td>                
                              </tr>  
                              <tr>
                                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>baicao</td>
                                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.baicao.split("/")[0])}</td>
                                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.baicao.split("/")[1])}</td>
                                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.baicao.split("/")[2])}</td>
                                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:name?"":"none"}}>{(row.baicao.split("/")[3])}</td>
                              </tr>
                              <tr>  
                                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>binh</td>
                                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.binh.split("/")[0])}</td>
                                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.binh.split("/")[1])}</td>
                                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.binh.split("/")[2])}</td>                
                                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:name?"":"none"}}>{(row.binh.split("/")[3])}</td>                
                              </tr>  
                              <tr>
                                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>liêng</td>
                                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.lieng.split("/")[0])}</td>
                                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.lieng.split("/")[1])}</td>
                                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.lieng.split("/")[2])}</td>
                                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:name?"":"none"}}>{(row.lieng.split("/")[3])}</td>
                                
                              </tr>
                              <tr>  
                                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>poker</td>
                                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.poker.split("/")[0])}</td>
                                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.poker.split("/")[1])}</td>
                                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.poker.split("/")[2])}</td>
                                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:name?"":"none"}}>{(row.poker.split("/")[3])}</td>
                                
                              </tr>  
                              <tr>
                              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>sam</td>
                              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.sam.split("/")[0])}</td>
                              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.sam.split("/")[1])}</td>
                              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.sam.split("/")[2])}</td>
                              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:name?"":"none"}}>{(row.sam.split("/")[3])}</td>
                              
                              </tr>
                            <tr> 
                              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>tiến lên</td>
                              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.tienlen.split("/")[0])}</td>
                              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.tienlen.split("/")[1])}</td>
                              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.tienlen.split("/")[2])}</td>
                              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:name?"":"none"}}>{(row.tienlen.split("/")[3])}</td>
                                
                            </tr>   
                            <tr> 
                              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>chuyển khoản</td>
                              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.chuyenkhoan.split("/")[0])}</td>
                              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.chuyenkhoan.split("/")[1])}</td>
                              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.chuyenkhoan.split("/")[2])}</td>
                              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:name?"":"none"}}>{(row.chuyenkhoan.split("/")[3])}</td>
                                
                            </tr>  
                            <tr> 
                              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>admin</td>
                              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.admin.split("/")[0])}</td>
                              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.admin.split("/")[1])}</td>
                              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.admin.split("/")[2])}</td>
                              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:name?"":"none"}}>{(row.admin.split("/")[3])}</td>
                                
                            </tr>  
                            <tr> 
                              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>két sắt</td>
                              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.ketsat.split("/")[0])}</td>
                              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.ketsat.split("/")[1])}</td>
                              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.ketsat.split("/")[2])}</td>
                              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:name?"":"none"}}>{(row.ketsat.split("/")[3])}</td>
                                
                            </tr>  
                            <tr> 
                              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Khác</td>
                              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.other.split("/")[0])}</td>
                              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.other.split("/")[1])}</td>
                              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.other.split("/")[2])}</td>
                              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:name?"":"none"}}>{(row.other.split("/")[3])}</td>
                                
                            </tr>  
                        </tbody> 
                    </table>
                  </Card>  
                  
                )
           
              }else{
                table2=(<h3>Không có dữ liệu !</h3>)
              }
              
            }
          
              
          })
        }
        
        
        tabContent= (
          <div style={{marginLeft:'3%'}}>
            <Tabs defaultActiveKey="1" >
              <TabPane tab="Lợi nhuận user" key="1">
                {print1}
                {table1} 
                {page}               
              </TabPane>
              <TabPane tab="Lợi nhuận bot" key="2" disabled={name!==""?true:false}>
                {print2}              
                {table2}
              </TabPane>
            </Tabs>
          </div>
        )
      }else{
        tabContent=(<h3 style={{marginLeft:'3%',marginTop:'3%'}}>Không có dữ liệu </h3>)
      }
    }
    
   
    return (
      <div style={{width:'100%',height:'100%'}}>
       <h3 style={{marginLeft:'3%',marginTop:'1%'}}>Lợi nhuận</h3>
       <Form onKeyPress={this.handleKeyPress}>    
          <div style={{marginLeft:'3%',width:'100%',display:'flex',marginTop:30,marginBottom:35}}>
          <table>
            <tbody>
              <tr>
                <td>Ngày bắt đầu
                </td>
               
                <td>Ngày kết thúc
                </td>  
                <td>Nickname
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
                
                  {manager}
                </td>  
                <td>
                  <Button style={{height:35,width:35,marginLeft:10}} icon="search"
                    onClick={this.onClick}
                  >
                  
                  </Button>
                </td>
                </tr>
              </tbody>
            </table>
          </div> 
          </Form>
          <div style={{height:'100%'}} >
            {tabContent}
            {detail_game}
          </div>
          {print}
        </div> 
    );
  }
}

Revenue.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  dataRevenue: selectData(),
  load : selectisLoad(),
  suggest_data : selectSuggestData(),
});

function mapDispatchToProps(dispatch) {
  return {
    get_revenue:(date,todate)=> dispatch(get_revenue(date,todate)),   
    suggest_user_by_nickname:(key)=>dispatch(suggest_user_by_nickname(key)), 
    get_revenue_by_user:(nick,st,et)=>dispatch(get_revenue_by_user(nick,st,et)), 
    
    dispatch,
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Revenue));
 {/* <tr> 
                          <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:row.chuyenkhoan!=="0/0/0/0"?"":"none"}}>chuyển khoản</td>
                          <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:row.chuyenkhoan!=="0/0/0/0"?"":"none"}}>{this.formatCurency(row.chuyenkhoan.split("/")[0])}</td>
                          <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:row.chuyenkhoan!=="0/0/0/0"?"":"none"}}>{this.formatCurency(row.chuyenkhoan.split("/")[1])}</td>
                          <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:row.chuyenkhoan!=="0/0/0/0"?"":"none"}}>{this.formatCurency(row.chuyenkhoan.split("/")[2])}</td>
                          <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:row.chuyenkhoan!=="0/0/0/0"?"":"none"}}>{(row.chuyenkhoan.split("/")[3])}</td>
                            
                        </tr>  
                        <tr> 
                          <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:row.admin!=="0/0/0/0"?"":"none"}}>admin</td>
                          <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:row.admin!=="0/0/0/0"?"":"none"}}>{this.formatCurency(row.admin.split("/")[0])}</td>
                          <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:row.admin!=="0/0/0/0"?"":"none"}}>{this.formatCurency(row.admin.split("/")[1])}</td>
                          <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:row.admin!=="0/0/0/0"?"":"none"}}>{this.formatCurency(row.admin.split("/")[2])}</td>
                          <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:row.admin!=="0/0/0/0"?"":"none"}}>{(row.admin.split("/")[3])}</td>
                            
                        </tr>  
                        <tr> 
                          <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:row.ketsat!=="0/0/0/0"?"":"none"}}>két sắt</td>
                          <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:row.ketsat!=="0/0/0/0"?"":"none"}}>{this.formatCurency(row.ketsat.split("/")[0])}</td>
                          <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:row.ketsat!=="0/0/0/0"?"":"none"}}>{this.formatCurency(row.ketsat.split("/")[1])}</td>
                          <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:row.ketsat!=="0/0/0/0"?"":"none"}}>{this.formatCurency(row.ketsat.split("/")[2])}</td>
                          <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:row.ketsat!=="0/0/0/0"?"":"none"}}>{(row.ketsat.split("/")[3])}</td>
                            
                        </tr>  
                        <tr> 
                          <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:row.other!=="0/0/0/0"?"":"none"}}>Khác</td>
                          <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:row.other!=="0/0/0/0"?"":"none"}}>{this.formatCurency(row.other.split("/")[0])}</td>
                          <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:row.other!=="0/0/0/0"?"":"none"}}>{this.formatCurency(row.other.split("/")[1])}</td>
                          <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:row.other!=="0/0/0/0"?"":"none"}}>{this.formatCurency(row.other.split("/")[2])}</td>
                          <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,display:row.other!=="0/0/0/0"?"":"none"}}>{(row.other.split("/")[3])}</td>
                            
                        </tr>  */}