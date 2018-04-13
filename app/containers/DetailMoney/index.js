/*
 *
 * DetailMoney
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
  TimePicker ,
  Select,
} from 'antd';
import { createStructuredSelector } from 'reselect';
import {
  suggest_user_by_nickname,
  detail_ouput_money,
} from './actions';
import {
  selectSuggestData,
  selectDataDetail,
  selectisLoadDetail,
  
}from './selectors';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import {withRouter} from 'react-router' ;
import TabDetail from 'components/Money/TabDetail';
const Option = Select.Option;

const format = 'HH:mm';
var st_print_detail = false;
var et_print_detail = false;
var un_detail = "";
export class DetailMoney extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      
      dateDetail : moment(),
      
      todateDetail : moment(),
    
      un_detail:"",
      isMobile: false,
      overflow : "unset",
      fromTime : "",
      toTime : "",
      key : "",
      nickname : false,
    };
   
    this.onChangeDateDetail = this.onChangeDateDetail.bind(this);
   
    this.onChangeToDateDetail = this.onChangeToDateDetail.bind(this);
  }
  
  changeTime=(time, timeString)=>{
    this.setState({fromTime:timeString.toString()})
  }
  changeToTime=(time, timeString)=>{
    this.setState({toTime:timeString})
  }
  updateDimensions() {
    if(window.innerWidth < 760) {
     this.setState({
      overflow :"unset"
     });
    } else {
     this.setState({
       overflow : "-webkit-paged-x"
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
  onChangeDateDetail=(date)=>{
    this.setState({
      dateDetail: date,
    });
     
  }
  onChangeToDateDetail=(date)=>{
    this.setState({
      todateDetail: date,
    });
     
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
  
  convertTime = (time) => {
    var d = new Date(time),
    yyyy = d.getFullYear(),
    mm = ('0' + (d.getMonth() + 1)).slice(-2),
    dd = ('0' + d.getDate()).slice(-2),
    hh = ('0' + d.getHours()).slice(-2),
    min = ('0' + d.getMinutes()).slice(-2),

    result, time;
    time = hh + ':' + min;
    const date =   dd+ '/' + mm + '/'+ yyyy ;
    result = time ;
    return result;
  }
  formatCurency(price){
    var strPrice = price+'';
    var a = strPrice.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')+ ' King';
    return a;
  }
  formatCard(price){
    var strPrice = price+'';
    var a = strPrice.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    return a;
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
  onChangeInputDetail=(k)=>{
    this.setState({
      un_detail: k.target.value.trim(),
    });
    un_detail = k.target.value.trim();
  }
  onClickDetail=()=>{
    var _date = false;
    var _todate = false;
    if(this.refs.detailDate.input.props.value.toString().trim() && this.refs.detailDate.input.props.value.toString().trim()!==""
    && this.refs.todetailDate.input.props.value.toString().trim() && this.refs.todetailDate.input.props.value.toString().trim()!=="")
  {
     _date = this.refs.detailDate.input.props.value.toString().trim().split('/').reverse().join('/')+ " " +this.state.fromTime;
     if(this.state.toTime){
      _todate = this.refs.todetailDate.input.props.value.toString().trim().split('/').reverse().join('/')+ " " +this.state.toTime;
      
     }else{
      _todate = this.refs.todetailDate.input.props.value.toString().trim().split('/').reverse().join('/')+ " 23:59";
     }
     st_print_detail = this.refs.detailDate.input.props.value.toString().trim();
     et_print_detail = this.refs.todetailDate.input.props.value.toString().trim();
    }else{
      _date = false;
      _todate = false;
      message.error('Ngày chưa được chọn !');
    }
   
    if(_date && _todate){
     
       var someDate = new Date(_date).getTime();
       var toDate = new Date(_todate).getTime();
       this.props.detail_ouput_money(someDate,toDate,this.state.key);
     
    }
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
    var tableDetail =false;
    tableDetail=(<TabDetail st={st_print_detail} et={et_print_detail} loadDetail={this.props.loadDetail} dataDetail={this.props.dataDetail}/>)
    var search = (
      <div style={{width:'100%',height:'100%'}}>
      <table style={{marginLeft:'5%'}}>
      <tbody>
        <tr>
            <td>Ngày bắt đầu
            </td>
            <td>Giờ bắt đầu
            </td>
        </tr>
        
      <tr style={{marginBottom:'1%'}}>
        <td><DatePicker
          ref="detailDate"
          selected={this.state.dateDetail}
          onChange={this.onChangeDateDetail}
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
          <TimePicker defaultValue={moment('00:00', format)} format={format} placeholder="Nhập giờ"  onChange={this.changeTime}/>
        </td>
      </tr>
      <tr>   
            <td>Ngày kết thúc
            </td>  
            <td>Giờ kết thúc
            </td> 
      </tr>  
      <tr>  
        <td><DatePicker
          ref="todetailDate"
          selected={this.state.todateDetail}
          onChange={this.onChangeToDateDetail}
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
          <TimePicker defaultValue={moment('23:59', format)} format={format} placeholder="Nhập giờ"  onChange={this.changeToTime}/>
        </td>
      </tr>
      <tr style={{height:10}}>
        <td/>
        <td/>
      </tr>  
      <tr>
        <td>{manager}
        </td>
        <td>
        <Button icon="search" style={{height:35,width:35}} onClick={this.onClickDetail}/>
          
        </td>
      </tr>  
      <tr style={{height:10,borderBottom:'1px dashed #e2e2e2'}}>
          <td colSpan={2}/>
        </tr> 
       </tbody> 
      </table>  
     
      <div style={{width:'98%',height:'100%'}} >
        {tableDetail}
      </div>
    </div> 
    )
    return (
      <div>
        <h3 style={{marginLeft:'5%',marginBottom:'1%',marginTop:'1%'}}>Tiền rút</h3>
       {search}
      </div>
    );
  }
}

DetailMoney.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  dataDetail : selectDataDetail(),
  loadDetail : selectisLoadDetail(),
  suggest_data : selectSuggestData(),

});

function mapDispatchToProps(dispatch) {
  return {
    detail_ouput_money:(date,todate,un)=> dispatch(detail_ouput_money(date,todate,un)),   
    suggest_user_by_nickname:(key)=>dispatch(suggest_user_by_nickname(key)),
 
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailMoney);
