/*
 *
 * TienHt
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import messages from './messages';
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
} from 'antd';
const format = 'HH:mm';
import moment from 'moment';
import{
  selectData,
  selectIsLoading,
} from './selectors';
import{
  search_money_ht,
} from './actions';
var st = false;
var et = false;;
export class TienHt extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      dateMoney : moment(),      
      todateMoney : moment(),     
      gid : 1,
      isMobile: false,
      un : false,
      visible: false,
      detail : false,
      width: 0,
      activePage :1,
      fromTime : "",
      toTime : "",
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
     st = this.refs.fromDate.input.props.value.toString().trim();
     et = this.refs.toDate.input.props.value.toString().trim();
    }else{
      _todate = false;
      _date = false;
        message.error('Ngày chưa được chọn !');
    }
    if(_date &&_todate){
      var someDate = new Date(_date).getTime();
      var toDate = new Date(_todate).getTime();
      
      this.props.search_money_ht(someDate,toDate);
      this.setState({activePage:1})
    
    }else{
      message.error('Nhập đầy đủ thông tin !');
    }
  }
  render() {
    var content = false;
    var item = false;
    var total_item = 0;
    var itemsPerPage = 10;
    var print = false;
    var page = false;

    var search = (
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
    if(this.props.isLoading){
      content=(
        <center>
          <img src={require('images/loading.gif')} style={{width:100,height:100}}/>
        </center> 
      )
    }else{
      if(this.props.data && this.props.data.length >0){
        total_item = this.props.data.length;
        
        page =(
          <div style={{margin: '2% 3%'}}>
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
        item = this.props.data.map((row,index)=>{
          var tong_tien = 0;
          tong_tien += row.totalMoneyUser + row.totalMoneyLock;
          if(index >= (this.state.activePage-1) *itemsPerPage && index < (this.state.activePage) *itemsPerPage ){
            return(
              <tr key={index}>
                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.convertDate(row.time)}</td>
                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{row.totalBot}</td>
                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{row.totalUser}</td>
                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.formatCurency(row.totalMoneyBot)}</td>
                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.formatCurency(row.totalMoneyUser)}</td>
                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.formatCurency(row.totalMoneyLock)}</td>
                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.formatCurency(tong_tien)}</td>
              </tr>
            )
          }
        });
        
        content = (
          <div style={{overflow:'auto'}}>
            <table style={{marginLeft:'3%',marginTop:'2%',width:'95%'}}>
              <tbody>
                <tr style={{background:'#ecf6fd',fontStyle:"italic"}}>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Thời gian</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Tổng số Bot</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Tổng số người chơi</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Tổng tiền Bot</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Tổng tiền người chơi</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Tổng tiền két sắt</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Tổng tiền két sắt+người chơi</th>
                  
                </tr>  
                {item}
              
              </tbody>  
            </table>  
          </div>
        )
      }else{
        content = (
          <div style={{overflow:'auto'}}>
            <table style={{marginLeft:'3%',marginTop:'2%',width:'95%'}}>
              <tbody>
                <tr style={{background:'#ecf6fd',fontStyle:"italic"}}>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Thời gian</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Tổng số Bot</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Tổng số người chơi</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Tổng tiền Bot</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Tổng tiền người chơi</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Tổng tiền két sắt</th>
                  
                </tr>  
                <tr>
                  <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}} colSpan={6}>Không có dữ liệu</td>
                </tr>  
              </tbody>  
            </table>  
          </div>
        )
      }
    }
    return (
      <div>
        <h3 style={{marginLeft:'5%',marginTop:'2%'}}>Tra cứu tiền hệ thống</h3>
        {search}
        {content}
        {page}
      </div>
    );
  }
}

TienHt.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  data : selectData(),
  isLoading : selectIsLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    search_money_ht:(st,et)=>dispatch(search_money_ht(st,et)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TienHt);
