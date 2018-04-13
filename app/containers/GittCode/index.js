/*
 *
 * GittCode
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import messages from './messages';
import CurrencyInput from 'react-currency-input';

import {
  loadGitt,
  genGitt,
  countGittGTT,
  countGittGCD,
  countGittGHV,
  searchNN,
  search,
  del,
  searchCode,
  } from './actions';
  import {
    selectIsLoad,
    selectData,
    selectDataGTT,
    selectDataGCD,
    selectDataGHV,
    selectCheckDelete,
    
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
  Select,
} from 'antd';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Workbook from 'react-excel-workbook';
const format = 'HH:mm';
const Option = Select.Option;
import { selectSuggestData, selectIsSuperAdmin } from '../App/selectors';
import { suggest_user_by_nickname } from '../App/actions';
const TabPane = Tabs.TabPane;
export class GittCode extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {    
      isMobile: false,   
      display_button : "none",  
      date : moment(),
      todate : moment(), 
      dateS : false,
      todateS : moment(), 
      activePage : 1,
      activePageGtt : 1,
      activePageGhv : 1,
      activePageGcd : 1,
      gn : "GTT",
      gnS : "",
      m_value : "",
      key_input :"",
      key_input_c :"",
      data_ : false,
      click : false,
      isSearch : false,
      nn : "",
      admin : '',
      m_valueS : "",
      checked : false,
      checkedAll : false,
      del : false,
      id : [],
      code : false,
      fromAddTime : "",
      toAddTime : "",
      fromSTime : "",
      toSTime : "",
      key : "",
      nickname : false,
      key2 : "",
      nickname2 : false,
    };
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeToDate = this.onChangeToDate.bind(this);
    this.onChangeDateS = this.onChangeDateS.bind(this);
    this.onChangeToDateS = this.onChangeToDateS.bind(this);
  }
  handleChangeNick = (value) => {
    this.setState({ key : value });
    if(value !==""){
      this.props.suggest_user_by_nickname(value);
    }
    
  }
  onSelectNick=(value)=>{
    this.setState({nickname : value})
  }
  handleChangAd = (value) => {
    this.setState({ key2 : value });
    if(value !==""){
      this.props.suggest_user_by_nickname(value);
    }
    
  }
  onSelectAd=(value)=>{
    this.setState({nickname2 : value})
  }
  changeAddTime=(time, timeString)=>{
    this.setState({fromAddTime:timeString.toString()})
  }
  changeAddToTime=(time, timeString)=>{
    this.setState({toAddTime:timeString})
  }
  changeSTime=(time, timeString)=>{
    this.setState({fromSTime:timeString.toString()})
  }
  changeSToTime=(time, timeString)=>{
    this.setState({toSTime:timeString})
  }
  changeChecked=(e)=>{
    if(e.target.checked){
      this.setState({id:this.state.id.concat(e.target.value)})
    }else{
      this.setState({
        id:this.state.id.filter((item)=>{return item != e.target.value}),
        checkedAll: false,
      })

    }
  }
  changeCheckedAll=()=>{
    var i;
    var array = [];
    for(i=0;i<document.getElementsByClassName("chk").length;i++){
      document.getElementsByClassName("chk")[i].checked = !this.state.checkedAll;
      if(!this.state.checkedAll){    
        array.push(document.getElementsByClassName("chk")[i].value);
      }
    }
    this.setState({id:array})
    this.setState({checkedAll:!this.state.checkedAll});
  }
  ok=()=>{
    if(this.state.id && (this.state.id.size>0 || this.state.id.length>0)){
      this.props.del(this.state.id);      
    }
    if(this.props.isDeleteSuccess){
      
    }
    this.cancel();
  }
  cancel=()=>{
    this.setState({
      del: false,
    });
  }
  showConfirm=()=>{
    this.setState({
      del: true,
    });
  }
  updateDimensions() {
    if(window.innerWidth < 760) {
     this.setState({isMobile: true,});
    } else {
     this.setState({isMobile: false,});
    }
  }
  
  handleChange=(event, maskedvalue, floatvalue)=>{
    this.setState({m_value: maskedvalue});
  }
  handleChangeS=(event, maskedvalue, floatvalue)=>{
    this.setState({m_valueS: maskedvalue});
  }
  componentDidMount=()=>{
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
    //this.props.loadGitt();
    this.props.countGittGHV();
    this.props.countGittGTT();
    this.props.countGittGCD();
    
  }
  componentWillMount=()=>{
    window.removeEventListener("resize", this.updateDimensions.bind(this));
    // this.props.countGittGCD();
    // this.props.countGittGHV();
    // this.props.countGittGTT();
    
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.isDeleteSuccess!==nextProps.isDeleteSuccess && nextProps.isDeleteSuccess===true){
      this.setState({
        id:[],
        checkedAll: false,
      })
      var i;
      for(i=0;i<document.getElementsByClassName("chk").length;i++){
        document.getElementsByClassName("chk")[i].checked = false
        
      }
    }
    
  }
  onChangeInput=(k)=>{
    this.setState({
      key_input: k.target.value,
    });
  }
  onChangeInputCode=(k)=>{
    this.setState({
      code: k.target.value,
    });
  }
  onChangeInputNN=(k)=>{
    this.setState({
      nn: k.target.value,
    });
  }
  onChangeInputAdmin=(k)=>{
    this.setState({
      admin: k.target.value,
    });
  }
  onChangeInputC=(k)=>{
    this.setState({
      key_input_c: k.target.value,
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
  onChangeDateS=(date)=>{
    this.setState({
      dateS: date,
    });
  }
  onChangeToDateS=(date)=>{
    this.setState({
      todateS: date,
    });
     
  }
  onChange = (page) => {
    this.setState({
      activePage: page,
    });
    this.setState({checkedAll:!this.state.checkedAll});    
  }

  onChangeGtt = (page) => {
    this.setState({
      activePageGtt: page,
    });
  }
  onChangeGhv = (page) => {
    this.setState({
      activePageGhv: page,
    });
  } 
  onChangeGcd = (page) => {
    this.setState({
      activePageGcd: page,
    });
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
    result = date+":"+time;
    return result;
  }
  formatCurency(price){
    var strPrice = price+'';
    var a = strPrice.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')+ ' King';
    return a;
  }
  onChangGn = (e)=>{   
    this.setState({
      gn: e.target.value,
    });
  }
  onChangGnS = (e)=>{   
    this.setState({
      gnS: e.target.value,
    });
  }
  onClickCheck=()=>{
    this.setState({click : true}) 
    if(this.state.code && this.state.code!==""){
      this.props.searchCode(this.state.code);
      this.setState({activePage : 1})
    }else{
      message.error('Nhập mã code !');      
    }
  }
  onClick=()=>{
    var _date = false;
    var _todate= false;
    if(this.refs.fromDate.input.props.value.toString().trim() && this.refs.fromDate.input.props.value.toString().trim()!==""
    && this.refs.toDate.input.props.value.toString().trim() && this.refs.toDate.input.props.value.toString().trim()!=="")
    {
      _date = this.refs.fromDate.input.props.value.toString().trim().split('/').reverse().join('/')+ " " +this.state.fromAddTime;
      if(this.state.toAddTime){
       _todate = this.refs.toDate.input.props.value.toString().trim().split('/').reverse().join('/')+ " " +this.state.toAddTime;
       
      }else{
       _todate = this.refs.toDate.input.props.value.toString().trim().split('/').reverse().join('/')+ " 23:59";
      }
    }else{
      _date = false;
      _todate = false;
      message.error('Ngày chưa được chọn !');
    }
    if(_date && _todate && this.refs.Input_camp.refs.input.value.trim() && this.refs.Input_amount.refs.input.value.trim() && this.state.m_value){
    
      if(parseInt(this.state.m_value.split(".").join("")) % 1000 ==0){
        var someDate = new Date(_date).getTime();
        var toDate = new Date(_todate).getTime();
        var camp = this.refs.Input_camp.refs.input.value.trim();
        var amount = this.refs.Input_amount.refs.input.value.trim();
        this.props.genGitt(this.state.gn,amount,someDate,toDate,camp,this.state.m_value.split(".").join(""));
        this.setState({activePage:1})
        
      }else{
        message.error('Giá trị giftcode phải là bội của 1.000 !');
      }
      this.props.countGittGCD();
      this.props.countGittGHV();
      this.props.countGittGTT();
    }else{
      message.error('Nhập đủ thông tin !');
      
    }
    this.setState(
      {id : []},
      {checked:false}
    )
    document.getElementsByClassName("chk").checked = false;
    
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
    result = date +" "+time;
    return result;
  }

  btn=()=>{
    this.setState({
      isSearch : true
    })
  }
  onClickSearch=()=>{
    this.setState({click : true})    
    var _d = false;
    var value = 0;
    var nickname ="";
    var camp ="";
    if(this.refs.fromDateS.input.props.value.toString().trim() && this.refs.fromDateS.input.props.value.toString().trim()!=="")
    {
     _d = new Date(this.refs.fromDateS.input.props.value.toString().trim().split('/').reverse().join('/')+ " " +this.state.fromSTime).getTime();
     
    }else{
      _d = 0;     
    }
    if(this.refs.Input_campS.refs.input.value.trim() !== "" ) camp =this.refs.Input_campS.refs.input.value.trim();
    else camp ="";
    // if(this.refs.Input_nn.refs.input.value.trim() !== "" ) nickname =this.refs.Input_nn.refs.input.value.trim();
    // else nickname ="";
    if(this.state.m_valueS.trim() !== "" ) value =this.state.m_valueS.split(".").join("");
    else value = 0;
    this.props.search(
      _d,
      camp,
      this.state.gnS,
      this.state.key2,
      value,
      this.state.key,
    )
    this.setState({activePage : 1})
    this.setState(
      {id : []},
      {checked:false}
    )
    document.getElementsByClassName("chk").checked = false;
  }
  
  codeType=(t)=>{
    var kq = false;
    switch(t){
      case 'GTT' :{
        kq = "Tân thủ"
        break;
      }
      case 'GCD' :{
        kq = "Cộng đồng"
        break;
        
      }
      case 'KHV' :{
        kq = "VIP"
        break;
        
      }
    }  
    return kq;    
  }
  render() {
    var search_content = false;
    var add_content = false;
    var check_code = false;
    var content = false;
    var page = false;
    var pageGtt = false;
    var pageGhv = false;
    var pageGcd = false;
    var total_item=0;
    var itemsPerPage = 10;
    var content_gtt = false;
    var content_gcd = false;
    var content_ghv = false;
    var total_gtt = 0;
    var total_ghv = 0;
    var total_gcd = 0;
    var timkiem = false;
    var itemsPerPageGtt = 5;
    var btnXoa = false;
    var print = false;
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
        onChange={this.handleChangeNick }
        onSelect={this.onSelectNick}
        refs="selectSuggest"
      >
        {options_suggest}
      </Select>
     )
     var manager2 = (
      <Select
        mode="combobox"
        value={this.state.key2}
        placeholder="Nhập nick admin"
        style={{width:120,height:'35px !important'}}
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        onChange={this.handleChangAd }
        onSelect={this.onSelectAd}
        refs="selectSuggest"
      >
        {options_suggest}
      </Select>
     )
    var menu = (
      <ul style={{ border: "1px solid #e2e2e2",borderRadius: 5,width: 150,background: "#f7f7f7",color: "#404040",marginLeft:'5%'}} prefixCls ="">
        <li key="1"  style={{padding:10,background:'#e2e2e2'}}>Gift Tân thủ</li>
        <li key="2" style={{padding:10}}> Gift Công đồng</li>
        <li key="3" style={{padding:10,background:'#e2e2e2'}}> Gift VIP</li>
      </ul>  
    )
    if(this.props.data_gtt && this.props.data_gtt.length>0){
      var item_gtt = false;
    
      total_gtt = this.props.data_gtt.length;
      item_gtt = this.props.data_gtt.map((row,index)=>{
       
        if(index >= (this.state.activePageGtt-1) *itemsPerPageGtt && index < (this.state.activePageGtt) *itemsPerPageGtt ){      
        return(
          <tr key={index}>
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>
                {row.campaign}
              </td>  
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>
                {row.count}
              </td> 
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>
                {row.count_active}
              </td> 
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>
                {row.count_deleted}
              </td> 
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>
                {row.count_expired}
              </td>
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>
                {row.count_used}
              </td>
              
          </tr>
        )
      }
      })
      pageGtt =(
        <div style={{float: 'right',margin: '3% 5%'}}>
          <div style={{display: 'inline-block'}}>
            <Pagination
              style={{display: 'inline-block'}}
              total={total_gtt?total_gtt:0}
              pageSize={itemsPerPageGtt}
              defaultCurrent={1}
              current={this.state.activePageGtt}
              onChange={this.onChangeGtt}
            />
            <div style={{display:total_gtt?"inline-block":'none',float:'right',border:'1px solid #c4c4c4',borderRadius:'3px',padding:'4px 10px',marginLeft:'10px',fontSize:'13px'}}>
              {this.state.activePageGtt}/{total_gtt>0?(total_gtt%itemsPerPageGtt==0?total_gtt/itemsPerPageGtt:parseInt(total_gtt/itemsPerPageGtt)+1):0}

            </div>
          </div>
        </div>
      )
      content_gtt = (
        <div style={{flex:1}} >
          <div style={{overflow:'auto'}}>
            <table style={{marginTop:'2%',width:'95%'}}>            
            <tbody>
            <tr>
                <th colSpan={6} style={{height:50,border:'1px solid #e2e2e2',fontSize:14,textAlign:'center'}}>Tân thủ</th>
              </tr> 
              <tr  style={{background:'rgb(236, 246, 253)',fontStyle:'italic'}}>
                <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Chiến dịch</th>
                <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Số lượng</th>
                <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Active</th>
                <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Đã xóa</th>
                <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Hết hạn</th>
                <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Đã dùng</th>         
              </tr>  
              {item_gtt}
            </tbody>
            </table>  
            {pageGtt}
          </div>
        </div>
      )
      
    }else{
      
      content_gtt = (
        <div style={{flex:1}}>
        <table style={{marginTop:'2%',width:'95%'}}>        
        <tbody>
          <tr>
            <th colSpan={6} style={{height:50,border:'1px solid #e2e2e2',fontSize:14,textAlign:'center'}}>Tân thủ</th>
          </tr>  
          <tr  style={{background:'rgb(236, 246, 253)',fontStyle:'italic'}}>
            <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Chiến dịch</th>
            <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Tổng số lượng</th>
            <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Active</th>
            <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Đã xóa</th>
            <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Hết hạn</th>
            <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Đã dùng</th>         
          </tr>  
          <tr>
            <td colSpan={6} style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Không có dữ liệu</td>
          </tr>  
        </tbody>
        </table>  
        
        </div>
      )
      
    }
    if(this.props.data_ghv && this.props.data_ghv.length>0){
      var item_ghv = false;
    
      total_ghv = this.props.data_ghv.length;
      item_ghv = this.props.data_ghv.map((row,index)=>{
       
        if(index >= (this.state.activePageGhv-1) *itemsPerPageGtt && index < (this.state.activePageGhv) *itemsPerPageGtt ){      
        return(
          <tr key={index}>
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>
                {row.campaign}
              </td>  
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>
                {row.count}
              </td> 
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>
                {row.count_active}
              </td> 
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>
                {row.count_deleted}
              </td> 
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>
                {row.count_expired}
              </td>
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>
                {row.count_used}
              </td>
              
          </tr>
        )
      }
      })
      pageGhv =(
        <div style={{float: 'right',margin: '3% 5%'}}>
          <div style={{display: 'inline-block'}}>
            <Pagination
              style={{display: 'inline-block'}}
              total={total_ghv?total_ghv:0}
              pageSize={itemsPerPageGtt}
              defaultCurrent={1}
              current={this.state.activePageGhv}
              onChange={this.onChangeGhv}
            />
            <div style={{display:total_ghv?"inline-block":'none',float:'right',border:'1px solid #c4c4c4',borderRadius:'3px',padding:'4px 10px',marginLeft:'10px',fontSize:'13px'}}>
              {this.state.activePageGhv}/{total_ghv>0?(total_ghv%itemsPerPageGtt==0?total_ghv/itemsPerPageGtt:parseInt(total_ghv/itemsPerPageGtt)+1):0}

            </div>
          </div>
        </div>
      )
      content_ghv = (
        <div style={{flex:1}}>
          <div style={{overflow:'auto'}}>
            <table style={{marginTop:'2%',width:'95%'}}>
            
            <tbody>
              <tr>
                <th colSpan={6} style={{height:50,border:'1px solid #e2e2e2',fontSize:14,textAlign:'center'}}>VIP</th>
              </tr>  
              <tr  style={{background:'rgb(236, 246, 253)',fontStyle:'italic'}}>
                <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Chiến dịch</th>
                <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Số lượng</th>
                <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Active</th>
                <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Đã xóa</th>
                <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Hết hạn</th>
                <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Đã dùng</th>         
              </tr>  
              {item_ghv}
            </tbody>
            </table>  
            {pageGhv}
          </div>
        </div>
      )
      
    }else{
      
      content_ghv = (
        <div style={{flex:1}}>
        <table style={{marginTop:'2%',width:'95%'}}>        
        <tbody>
          <tr>
            <th colSpan={6} style={{height:50,border:'1px solid #e2e2e2',fontSize:14,textAlign:'center'}}>VIP</th>
          </tr>  
          <tr  style={{background:'rgb(236, 246, 253)',fontStyle:'italic'}}>
            <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Chiến dịch</th>
            <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Tổng số lượng</th>
            <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Active</th>
            <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Đã xóa</th>
            <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Hết hạn</th>
            <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Đã dùng</th>         
          </tr>  
          <tr>
            <td colSpan={6} style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Không có dữ liệu</td>
          </tr>  
        </tbody>
        </table>  
        
        </div>
      )
      
    }

    if(this.props.data_gcd && this.props.data_gcd.length>0){
      var item_gcd = false;
    
      total_gcd = this.props.data_gcd.length;
      item_gcd = this.props.data_gcd.map((row,index)=>{
       
        if(index >= (this.state.activePageGcd-1) *itemsPerPageGtt && index < (this.state.activePageGcd) *itemsPerPageGtt ){      
        return(
          <tr key={index}>
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>
                {row.campaign}
              </td>  
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>
                {row.count}
              </td> 
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>
                {row.count_active}
              </td> 
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>
                {row.count_deleted}
              </td> 
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>
                {row.count_expired}
              </td>
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>
                {row.count_used}
              </td>
              
          </tr>
        )
      }
      })
      pageGcd =(
        <div style={{float: 'right',margin: '3% 5%'}}>
          <div style={{display: 'inline-block'}}>
            <Pagination
              style={{display: 'inline-block'}}
              total={total_gcd?total_gcd:0}
              pageSize={itemsPerPageGtt}
              defaultCurrent={1}
              current={this.state.activePageGcd}
              onChange={this.onChangeGcd}
            />
            <div style={{display:total_gcd?"inline-block":'none',float:'right',border:'1px solid #c4c4c4',borderRadius:'3px',padding:'4px 10px',marginLeft:'10px',fontSize:'13px'}}>
              {this.state.activePageGcd}/{total_gcd>0?(total_gcd%itemsPerPageGtt==0?total_gcd/itemsPerPageGtt:parseInt(total_gcd/itemsPerPageGtt)+1):0}

            </div>
          </div>
        </div>
      )
      content_gcd = (
        <div style={{flex:1}}>
        <div style={{overflow:'auto'}}>
          <table style={{marginTop:'2%',width:'95%'}}>        
            <tbody>
            <tr>
                <th colSpan={6} style={{height:50,border:'1px solid #e2e2e2',fontSize:14,textAlign:'center'}}>Cộng đồng</th>
              </tr> 
              <tr  style={{background:'rgb(236, 246, 253)',fontStyle:'italic'}}>
                <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Chiến dịch</th>
                <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Số lượng</th>
                <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Active</th>
                <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Đã xóa</th>
                <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Hết hạn</th>
                <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Đã dùng</th>         
              </tr>  
              {item_gcd}
            </tbody>
          </table>  
        </div>
        {pageGcd}
        
        </div>
      )
      
    }else{
      
      content_gcd = (
        <div style={{flex:1}}>
        <table style={{marginTop:'2%',width:'95%'}}>        
        <tbody>
          <tr>
            <th colSpan={6} style={{height:50,border:'1px solid #e2e2e2',fontSize:14,textAlign:'center'}}>Cộng đồng</th>
          </tr>  
          <tr  style={{background:'rgb(236, 246, 253)',fontStyle:'italic'}}>
            <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Chiến dịch</th>
            <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Tổng số lượng</th>
            <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Active</th>
            <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Đã xóa</th>
            <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Hết hạn</th>
            <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Đã dùng</th>         
          </tr>  
          <tr>
            <td colSpan={6} style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Không có dữ liệu</td>
          </tr>  
        </tbody>
        </table>  
        
        </div>
      )
      
    }

    check_code = (
      <table style={{marginLeft:'2%',marginTop:'1%'}}>
        <tbody>
          <tr>
            <td>Nhập mã code
            </td>
            <td />
          </tr>
          <tr>
            <td> 
              <Input placeholder="Nhậ­p mã code" style={{height:35,width:120,marginRight:10}} 
              ref="Input_code"              
              onChange={this.onChangeInputCode}/>
            </td>
            <td>
              <Button icon="search" style={{height:35,width:67,padding:5,marginRight:20}} onClick={this.onClickCheck}>Check</Button>
            </td>  
          </tr>  
        </tbody>
      </table>    
    )
    if(!this.state.isMobile){
      add_content = (
        <table style={{marginLeft:'2%',marginTop:'1%'}}>
        <tbody>
          <tr>
            <td>Ngày bắt đầu
            </td>
            <td>Giờ bắt đầu
            </td>
            <td>Ngày hết hạn
            </td>
            <td>Giờ hết hạn
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
                
              />
            </td> 
            <td>
                <TimePicker 
                    defaultValue={moment('00:00', format)} 
                    format={format} 
                    placeholder="Nhập giờ"
                    style={{height:35,width:120}}
                    onChange={this.changeAddTime}
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
                placeholderText="Ngày hết hạn"
                withPortal
                
              />
            </td>
            <td>
                <TimePicker 
                    defaultValue={moment('23:59', format)} 
                    format={format} 
                    placeholder="Nhập giờ"
                    style={{height:35,width:120}}
                    onChange={this.changeAddToTime}
                />
              </td> 
            
          </tr>  
          <tr style={{height:20}} />
          <tr>
            <td>Chiến dịch
            </td>
            <td>Số lượng </td>  
            <td>Mệnh giá vipcode </td>  
           
          </tr>  
          <tr>
            <td>
            <Input placeholder="Nhậ­p chiến dịch" style={{height:35,width:120,marginRight:10}} 
              ref="Input_camp"
              
              onChange={this.onChangeInputC}/>
            </td>
            <td>
            <Input placeholder="Số lượng " style={{height:35,width:120,marginRight:10}} 
              ref="Input_amount"
              type = "number"
              min = {0}
              onChange={this.onChangeInput}/>
            </td>
            
            <td>
              
              <CurrencyInput 
                      style={{height:35,width:'87%',marginRight:10,border:'1px solid #e2e2e2',textAlign:'right',padding:5,borderRadius:5}}
                      value={this.state.m_value} 
                      onChangeEvent={this.handleChange} 
                      precision={0} 
                      thousandSeparator={"."} />
            </td> 
            <td>
              <select id="gn" onChange={(e)=>this.onChangGn(e)}
                value={this.state.gn}
                style={{marginLeft:'2%',height:'35px',width:120,border:'1px solid #e2e2e2',borderRadius:'5px',background:'white'}}>
                <option  disabled selected>Chọn loại gittcode</option>
                <option value={"GTT"}>Tân Thủ</option>
                <option value={"GCD"}>Cộng đồng</option>
                <option value={"KHV"}>VIP</option>
              </select>  
            </td>  
            <td style={{width:10}}/> 
            <td style={{}}>
              <Button icon="plus" style={{height:35,width:67,padding:5,marginRight:20}} onClick={this.onClick}>Thêm</Button>
            </td>
            
          </tr>  
          
          </tbody>
        </table>           
      )
      search_content = (
        <table style={{marginLeft:'2%',marginTop:'1%'}}>
        <tbody>
          <tr>
            <td>Ngày bắt đầu
            </td>
            <td style={{width:10}} />
            <td>Giờ bắt đầu
            </td>
            
            <td>Chiến dịch
            </td>
          </tr>  
          <tr>
            <td>
              <DatePicker
                ref="fromDateS"
                selected={this.state.dateS}
                onChange={this.onChangeDateS}
                customInput={<Input  style={{width: '100%',height:'35px',border:'1px solid #e2e2e2',borderRadius:'5px',background:'white'}}/>}
                dateFormat="DD/MM/YYYY"
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={5}
                isClearable={true}
                placeholderText="Ngày bắt đầu"
                withPortal
                
              />
            </td> 
            <td style={{width:10}} />
            <td>
                <TimePicker 
                    defaultValue={moment('00:00', format)} 
                    format={format} 
                    placeholder="Nhập giờ"
                    style={{height:35,width:120}}
                    onChange={this.changeSTime}
                />
              </td>        
            <td>
            <Input placeholder="Nhậ­p chiến dịch" style={{height:35,width:120,marginRight:10}} 
              ref="Input_campS"
              
              onChange={this.onChangeInputCS}/>
            </td>
            <td>
             <select id="gnS" onChange={(e)=>this.onChangGnS(e)}
                value={this.state.gnS}
                style={{marginLeft:'2%',height:'35px',width:120,border:'1px solid #e2e2e2',borderRadius:'5px',background:'white'}}>
                <option  disabled selected>Chọn loại gittcode</option>
                <option value={""}>Tất cả</option>
                <option value={"GTT"}>Tân Thủ</option>
                <option value={"GCD"}>Cộng đồng</option>
                <option value={"KHV"}>VIP</option>
              </select>  
            </td> 
          </tr>  
          <tr style={{height:20}} />
          <tr>
            <td>Admin </td>  
            <td style={{width:10}} />
            <td>Mệnh giá vipcode </td>  
            <td>Nick name </td>  
          </tr>  
          <tr>
            <td>
            {/* <Input placeholder="Nhập nick Admin " style={{height:35,width:120,marginRight:10}} 
              ref="Input_admin"
              onChange={this.onChangeInputAdmin}/> */}
              {manager2}
            </td>
            <td style={{width:10}} />
            <td>
              
              <CurrencyInput 
                      style={{height:35,width:'87%',marginRight:10,border:'1px solid #e2e2e2',textAlign:'right',padding:5,borderRadius:5}}
                      value={this.state.m_valueS} 
                      onChangeEvent={this.handleChangeS} 
                      precision={0} 
                      thousandSeparator={"."} />
            </td> 
            <td>
              {/* <Input placeholder="Nhập nickname " style={{height:35,width:120,marginRight:10}} 
                ref="Input_nn"
                onChange={this.onChangeInputNN}/> */}
                {manager}
            </td>   
            <td >
              <Button icon="search" style={{height:35,width:80,padding:5,marginRight:20}} onClick={this.onClickSearch}>Tìm kiếm</Button>
            </td>
            
          </tr>  
          
          </tbody>
        </table>           
      )
    }else{
      
      add_content = (
        <table style={{marginLeft:'2%',marginTop:'1%'}}>
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
              />
            </td> 
            <td>
                <TimePicker 
                    defaultValue={moment('00:00', format)} 
                    format={format} 
                    placeholder="Nhập giờ"
                    style={{height:35,width:120}}
                    onChange={this.changeAddTime}
                />
              </td>  
          </tr>
          <tr style={{height:10}} />
          
          <tr>
            <td>Ngày hết hạn
            </td>
            <td>Giờ hết hạn
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
                placeholderText="Ngày hết hạn"
                withPortal
              />
            </td>
            <td>
                <TimePicker 
                    defaultValue={moment('23:59', format)} 
                    format={format} 
                    placeholder="Nhập giờ"
                    style={{height:35,width:120}}
                    onChange={this.changeAddToTime}
                />
              </td>  
            <td />
          </tr>  
          <tr style={{height:10}} />
          <tr>
            <td>Số lượng
            </td>
           
          </tr>  
          <tr>
            <td>
            <Input placeholder="Số lượng " style={{height:35,width:120,marginRight:10}} 
              ref="Input_amount"
              type = "number"
              min = {0}
              onChange={this.onChangeInput}/>
            </td>
            <td>
              <select id="gn" onChange={(e)=>this.onChangGn(e)}
                value={this.state.gn}
                style={{marginLeft:'2%',height:'35px',width:120,border:'1px solid #e2e2e2',borderRadius:'5px',background:'white'}}>
                <option  disabled selected>Chọn loại gittcode</option>
                <option value={"GTT"}>Tân Thủ</option>
                <option value={"GCD"}>Cộng đồng</option>
                <option value={"KHV"}>VIP</option>
              </select>  
            </td>                       
                        
          </tr>  
          <tr style={{height:10}} />
          <tr>
            <td>Chiến dịch</td>
            <td>Giá trị của vipcode </td>  
          </tr>  
          <tr>
          <td>
            <Input placeholder="Nhậ­p chiến dịch" style={{height:35,width:120,marginRight:10}} 
              ref="Input_camp"
              
              onChange={this.onChangeInputC}/>
            </td>
            <td>
              
              <CurrencyInput 
                      style={{height:35,width:'81%',marginRight:10,border:'1px solid #e2e2e2',textAlign:'right',padding:5,borderRadius:5}}
                      value={this.state.m_value} 
                      onChangeEvent={this.handleChange} 
                      precision={0} 
                      thousandSeparator={"."} />
            </td> 
            <td style={{}}>
              <Button icon="plus" style={{height:35,width:67,padding:5,marginRight:20}} onClick={this.onClick}>Thêm</Button>
            </td>
          </tr>  
          
          </tbody>
        </table>           
      )
      search_content = (
        <table style={{marginLeft:'2%',marginTop:'1%'}}>
        <tbody>
          <tr>
            <td>Ngày bắt đầu
            </td>
            <td style={{width:10}} />
            <td>Giờ bắt đầu</td>
             
          </tr>  
          <tr>
            <td>
              <DatePicker
                ref="fromDateS"
                selected={this.state.dateS}
                onChange={this.onChangeDateS}
                customInput={<Input  style={{width: '100%',height:'35px',border:'1px solid #e2e2e2',borderRadius:'5px',background:'white'}}/>}
                dateFormat="DD/MM/YYYY"
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={5}
                placeholderText="Ngày bắt đầu"
                withPortal
                isClearable={true}
              />
            </td> 
            <td style={{width:10}} />
            <td>
                <TimePicker 
                    defaultValue={moment('00:00', format)} 
                    format={format} 
                    placeholder="Nhập giờ"
                    style={{height:35,width:100}}
                    onChange={this.changeSTime}
                />
              </td>              
            
          </tr>  
          <tr style={{height:10}} />
          <tr>
            <td>Admin
            </td>
            <td style={{width:10}} />
            <td>Nickname
            </td>
            <td>Loại GiftCode
            </td> 
          </tr>  
          <tr>
            <td>
            {/* <Input placeholder="Nhập nick Admin " style={{height:35,width:100,marginRight:10}} 
              ref="Input_admin"             
              onChange={this.onChangeInputAdmin}/> */}{manager2}
            </td>
            <td style={{width:10}} />
            
            <td>
              {/* <Input placeholder="Nhập Nickname " style={{height:35,width:100,marginRight:10}} 
              ref="Input_nn"             
              onChange={this.onChangeInputNN}/> */}{manager}
            </td>                       
            <td>
              <select id="gnS" onChange={(e)=>this.onChangGnS(e)}
                value={this.state.gnS}
                style={{marginLeft:'2%',height:'35px',width:80,border:'1px solid #e2e2e2',borderRadius:'5px',background:'white'}}>
                <option  disabled selected>Chọn loại gittcode</option>
                <option value={""}>Tất cả</option>
                <option value={"GTT"}>Tân Thủ</option>
                <option value={"GCD"}>Cộng đồng</option>
                <option value={"KHV"}>VIP</option>
              </select>  
            </td>            
          </tr>  
          <tr style={{height:10}} />
          <tr>
            <td>Chiến dịch</td>
            <td style={{width:10}} />
            <td>Mệnh giá vipcode </td>  
          </tr>  
          <tr>
          <td>
            <Input placeholder="Nhậ­p chiến dịch" style={{height:35,width:80,marginRight:10}} 
              ref="Input_campS"
              
              onChange={this.onChangeInputCS}/>
            </td>
            <td style={{width:10}} />
            
            <td>
              
              <CurrencyInput 
                      style={{height:35,width:'81%',marginRight:10,border:'1px solid #e2e2e2',textAlign:'right',padding:5,borderRadius:5}}
                      value={this.state.m_valueS} 
                      onChangeEvent={this.handleChangeS} 
                      precision={0} 
                      thousandSeparator={"."} />
            </td> 
            <td style={{}}>
              <Button icon="search" style={{height:35,width:80,padding:5,marginRight:20}} onClick={this.onClickSearch}>Tìm kiếm</Button>
            </td>
          </tr>  
          
          </tbody>
        </table>           
      )
    }
   
    if(this.props.isLoad){
      content = (
        <center>
          <img src={require('images/loading.gif')} style={{width:100,height:100}}/>
        </center>  
      )
    }else{
      if(this.props.data && this.props.data.length > 0){
        var item = false;
        var status = false;
        var code_type = false;
        var mang = [];
        this.props.data.map((row,index)=>{
          // if(row.status){
            mang.push(row);
          //}
        })
        var delContent = false;
        var now = new Date();
        if(mang.length > 0){
          total_item = mang.length;
          print = (
            <div  style={{marginTop: '2%',marginLeft:'2%',marginBottom:'2%'}}>
              <Workbook filename={"DS_GiftCode.xlsx"} element={<Button type="primary">Xuất file</Button>}>
                <Workbook.Sheet data={mang} name="Danh sách GiftCode">
                  <Workbook.Column label="Mã code" value="gift_code"/>
                  <Workbook.Column label="Nickname" value="nickName"/>             
                  <Workbook.Column label="Admin" value="admin"/>             
                  <Workbook.Column label="Mệnh giá" value={r=>this.formatCurency(r.value)}/>  
                  <Workbook.Column label="Loại code" value={r=>this.codeType(r.code_type)}/>             
                  <Workbook.Column label="Chiến dịch" value="campaign"/>           
                  <Workbook.Column label="Ngày bắt đầu" value={r=>this.convertDate(r.start_time)}/>             
                  <Workbook.Column label="Ngày kết thúc" value={r=>this.convertDate(r.end_time)}/>             
                
                </Workbook.Sheet> 
                
              </Workbook> 
            </div>
          )
          item = mang.map((row,index)=>{
              switch(row.status){
                case 0 :{
                  status = (<div style={{background:'green',padding:5,borderRadius:10,color:'white',width:'max-content',}}>Đã active</div>);                
                  break;
                }
                case 2 :{
                  status = (<div style={{background:'#FF9800',padding:5,borderRadius:10,color:'white',width:'max-content'}}>Đã dùng</div>)
                  break;
                }
                case 3 :{
                  status = (<div style={{background:'red',padding:5,borderRadius:10,color:'white',width:'max-content'}}>Đã xóa</div>)
                  break;
                }
                case 1 :{
                  status = (<div style={{background:'red',padding:5,borderRadius:10,color:'white',width:'max-content'}}>Hết hạn</div>)
                  break;
                }
              }      
              switch(row.code_type){
                case 'GTT' :{
                  code_type = "Tân thủ"
                  break;
                }
                case 'GCD' :{
                  code_type = "Cộng đồng"
                  break;
                  
                }
                case 'KHV' :{
                  code_type = "VIP"
                  break;
                  
                }
              }      
              if(row.status==0){
                delContent=( <input value={row.gift_code}  onChange={(e)=>this.changeChecked(e)} className="chk" type="checkbox" />)
              }else{
                delContent = "";
              }
              if(index >= (this.state.activePage-1) *itemsPerPage && index < (this.state.activePage) *itemsPerPage ){ 
                
              return(
                <tr key={index}>
                  <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>
                    {delContent}
                  </td> 
                  <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>
                    {row.gift_code}
                  </td>  
                  <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>
                    {row.nickName!==null?row.nickName:"Chưa có"}
                  </td> 
                  <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>
                    {row.admin}
                  </td> 
                  <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>
                    {this.formatCurency(row.value)}
                  </td> 
                  <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>
                    {row.campaign}
                  </td>
                  <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>
                    {code_type}
                  </td>
                  <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>
                    {this.convertDate(row.start_time)}
                  </td>  
                  <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>
                    {this.convertDate(row.end_time)}
                  </td>
                  <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'-webkit-center',padding:5}}>
                    {status}
                  </td>
                 
                </tr>
              )
            }
                     
          })
          page = (
            <div style={{float: 'right',marginTop:'2%',marginRight:'5%',marginBottom:'2%'}}>
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
          content=(
            <div style={{marginBottom:this.state.isMobile?'12%':'5%'}}>
            <Modal
            
              width = {600}
              visible={this.state.del}
              onOk={this.ok}
              onCancel={this.cancel}
              footer={[
                <div>
                  <Button type="primary" onClick={this.ok} style={{marginLeft:'1%'}}>Đồng ý</Button>
                  <Button type="danger" onClick={this.cancel} style={{marginLeft:'1%'}}>Hủy</Button>
                </div>  
              ]}
            >
              Bạn có muốn xóa GiftCode không ?
            </Modal>
            <Button type="danger" ghost style={{marginLeft:'2%',}} disabled={this.state.id.length>0?false:true} onClick={this.showConfirm}>Xóa</Button>
            <div style={{overflow:'auto'}}>
            <table style={{marginLeft:'2%',marginTop:'1%',width:'96%'}}>
            <tbody>
              <tr>
                <th colSpan={10} style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center',background:'#ecf6fd'}}>Danh sách GiftCode </th>
              </tr>  
              <tr  style={{background:'rgb(236, 246, 253)',fontStyle:'italic'}}>
                <th style={{height:50,width:100,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center',padding:5}}>
                    {/* <input checked={this.state.checkedAll} onChange={this.changeCheckedAll} ref="chkAll" type="checkbox"/> */}
                </th>
                <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center',padding:5}}>Mã code</th>
                <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center',padding:5}}>Nickname nhận quà</th>
                <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center',padding:5}}>Admin</th>
                <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center',padding:5}}>Mệnh giá</th>
                <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center',padding:5}}>Chiến dịch</th>
                <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center',padding:5}}>Loại code</th>
                <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center',padding:5}}>Ngày bắt đầu</th>
                <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center',padding:5}}>Ngày hết hạn</th>
                <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center',padding:5}}>Trạng thái</th>
              </tr>  
              {item}
            </tbody>
            </table>  
            </div>
            {page}
            
            </div>
          )
        }else{
          if(this.state.click){
            content=(
              <table style={{marginLeft:'2%',marginTop:'1%',width:'96%',marginBottom:'5%'}}>
              <tbody>
                <tr>
                  <th colSpan={9} style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center',background:'#ecf6fd'}}>Danh sách GiftCode </th>
                </tr>  
                <tr  style={{background:'rgb(236, 246, 253)',fontStyle:'italic'}}>
                  <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>gift_code</th>
                  <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>Nickname nhận quà</th>
                  <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>Admin</th>
                  <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>Giá trị</th>
                  <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>Chiến dịch</th>
                  <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>Loại code</th>
                  <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>Ngày bắt đầu</th>
                  <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>Ngày hết hạn</th>
                  <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>Trạng thái</th>
                </tr>  
               <tr>
                 <td colSpan={10} style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>Không có dữ liệu </td>
               </tr>  
              </tbody>
              </table>  
            )
            
          }
        }
        
      }else{
        if(this.state.click){
          content=(
            <table style={{marginLeft:'2%',marginTop:'1%',width:'96%',marginBottom:'5%'}}>
            <tbody>
              <tr>
                <th colSpan={9} style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center',background:'#ecf6fd'}}>Danh sách GiftCode </th>
              </tr>  
              <tr  style={{background:'rgb(236, 246, 253)',fontStyle:'italic'}}>
                <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>gift_code</th>
                <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>Nickname nhận quà</th>
                <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>Admin</th>
                <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>Giá trị</th>
                <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>Chiến dịch</th>
                <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>Loại code</th>
                <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>Ngày bắt đầu</th>
                <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>Ngày hết hạn</th>
                <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>Trạng thái</th>
              </tr>  
             <tr>
               <td colSpan={10} style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>Không có dữ liệu </td>
             </tr>  
            </tbody>
            </table>  
          )
          
        }
      }
    }
    return (
      <div>   
        <div style={{marginBottom:'3%',borderBottom:'1px solid #e2e2e2',paddingBottom:'3%',marginLeft:'2%',marginRight:'2%'}}>        
          <Tabs defaultActiveKey="1" >
            <TabPane tab="Thêm GiftCode" key="1">{add_content}</TabPane>
            <TabPane tab="Tìm kiếm" key="2">{search_content}</TabPane>
            <TabPane tab="Check mã code" key="3">{check_code}</TabPane>
          </Tabs>
        </div>
        <div style={{overflow:'auto'}}>
          {content}
          {print}
        </div>  
        <div style={{border:'1px solid #e2e2e2',marginLeft:'2%',width:'96%',marginBottom:'3%'}}>
         <h3 style={{borderBottom:'1px solid #e2e2e2',padding:5,marginBottom:5,background:'#ecf6fd',height:50}}>Thống kê GiftCode</h3>
        <div style={{display:this.state.isMobile?'':'flex',marginBottom:'2%',overflow:'auto',paddingLeft:5}}>         
         {content_gtt}
         {content_ghv}
         {content_gcd}
        </div>
        </div>
      </div>
    );
  }
}

GittCode.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isLoad: selectIsLoad(),
  data : selectData(),
  data_gtt :selectDataGTT(),
  data_gcd : selectDataGCD(),
  data_ghv : selectDataGHV(),
  isDeleteSuccess: selectCheckDelete(),
  suggest_data : selectSuggestData(),
  isSuperAdmin : selectIsSuperAdmin(),

});

function mapDispatchToProps(dispatch) {
  return {
    loadGitt:()=>dispatch(loadGitt()),
    searchNN:(un)=>dispatch(searchNN(un)),
    search:(date,c,t,ad,v,nn)=>dispatch(search(date,c,t,ad,v,nn)),
    countGittGCD:()=>dispatch(countGittGCD()),
    countGittGHV:()=>dispatch(countGittGHV()),
    countGittGTT:()=>dispatch(countGittGTT()),
    genGitt:(t,a,st,et,c,v)=>dispatch(genGitt(t,a,st,et,c,v)),
    del :(id)=> dispatch(del(id)),
    searchCode:(code)=>dispatch(searchCode(code)),
    suggest_user_by_nickname:(key)=>dispatch(suggest_user_by_nickname(key)),

    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GittCode);
