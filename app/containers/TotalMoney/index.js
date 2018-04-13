/*
 *
 * TotalMoney
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
  total_money,
  input_money,
  ouput_money,
  suggest_user_by_nickname,
  get_money_by_hdh,
} from './actions';
import {
  selectDataMoney,
  selectDataInput,
  selectDataOut,
  selectSuggestData,
  selectisLoadMoney,
  selectisLoadInput,
  selectisLoadOutput,
  selectisLoadHDH,
  selectDataHDH,
}from './selectors';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import {withRouter} from 'react-router' ;

import TabMoney from 'components/Money/TabMoney';
import TabInput from 'components/Money/TabInput';
import TabOutput from 'components/Money/TabOutput';

var _api ="sms" ;
var un_api = "";
var un_out = "";
var un_detail = "";
const TabPane = Tabs.TabPane;
var st_print = false;
var et_print = false;
var st_print_input = false;
var et_print_input = false;
var st_print_out = false;
var et_print_out = false;
var st_print_detail = false;
var et_print_detail = false;
const format = 'HH:mm';
const Option = Select.Option;

export class TotalMoney extends React.Component { 
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      f_date : moment(),
      t_date : moment(),

      dateMoney : moment(),
      dateInput : moment(),
      dateOut : moment(),
      dateDetail : moment(),
      todateMoney : moment(),
      todateInput : moment(),
      todateOut : moment(),
      todateDetail : moment(),
      type : false,
      un : "",
      un_api :"",
      un_out :"",
      un_detail:"",
      isMobile: false,
      overflow : "unset",
      fromTime : "",
      toTime : "",
      key : "",
      nickname : false,
      activePage : 1,
      aip : "sms",
      isClick : false,
    };
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeDateInput = this.onChangeDateInput.bind(this);
    this.onChangeDateOut = this.onChangeDateOut.bind(this);
    this.onChangeToDate = this.onChangeToDate.bind(this);
    this.onChangeToDateInput = this.onChangeToDateInput.bind(this);
    this.onChangeToDateOut = this.onChangeToDateOut.bind(this);
  }
  onChange = (page) => {
    this.setState({
      activePage: page,
    });
  }
  updateDimensions() {
    if(window.innerWidth < 760) {
     this.setState({
      overflow :"unset",
      isMobile : true,
     });
    } else {
     this.setState({
       overflow : "-webkit-paged-x",
       isMobile : false,
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
  onChangeDateHDH=(date)=>{
    this.setState({
      f_date: date,
    });     
  }
  onChangeToDateDHD=(date)=>{
    this.setState({
      t_date: date,
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
  onChangeDateInput=(date)=>{
    this.setState({
      dateInput: date,
    });
     
  }
  onChangeToDateInput=(date)=>{
    this.setState({
      todateInput: date,
    });
     
  }
  onChangeDateOut=(date)=>{
    this.setState({
      dateOut: date,
    });
     
  }
  onChangeToDateOut=(date)=>{
    this.setState({
      todateOut: date,
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
  onClick=()=>{
    var _date = false;
    var _todate = false;
    if(this.refs.fromDate.input.props.value.toString().trim() && this.refs.fromDate.input.props.value.toString().trim()!==""&&
    this.refs.toDate.input.props.value.toString().trim() && this.refs.toDate.input.props.value.toString().trim()!==""){
      st_print = this.refs.fromDate.input.props.value.toString().trim();
      et_print = this.refs.toDate.input.props.value.toString().trim();
     _date = this.refs.fromDate.input.props.value.toString().trim().split('/').reverse().join('/')+ " 00:00";
     _todate = this.refs.toDate.input.props.value.toString().trim().split('/').reverse().join('/')+ " "+ this.state.toTime;
     
    }else{
      _todate = false;
      _date = false;
        message.error('Ngày chưa được chọn !');
    }
    if(_date &&_todate){
      var someDate = new Date(_date).getTime();
      var toDate = new Date(_todate).getTime();
      
      this.props.total_money(someDate,toDate,this.state.un);
    }
    
  }
  onClickOut=()=>{
    var _date = false;
    var _todate = false;
    if(this.refs.outDate.input.props.value.toString().trim() && this.refs.outDate.input.props.value.toString().trim()!==""
    && this.refs.tooutDate.input.props.value.toString().trim() && this.refs.tooutDate.input.props.value.toString().trim()!=="")
    {
     _date = this.refs.outDate.input.props.value.toString().trim().split('/').reverse().join('/')+" " +this.state.fromTime;
     _todate = this.refs.tooutDate.input.props.value.toString().trim().split('/').reverse().join('/')+ " "+ this.state.toTime;
     st_print_out = this.refs.outDate.input.props.value.toString().trim();
     et_print_out = this.refs.tooutDate.input.props.value.toString().trim()
    }else{
      _date = false;
      _todate = false;
      message.error('Ngày chưa được chọn !');
    }
    if(_date && _todate){
      var someDate = new Date(_date).getTime();
      var toDate = new Date(_date).getTime();
      
      this.props.ouput_money(someDate,toDate,un_out);
    }
    
  }
  onClickAPI=()=>{
    this.setState({isClick:true})
    var _date = false;
    var _todate = false;
  
    if(this.refs.inputDate.input.props.value.toString().trim() && this.refs.inputDate.input.props.value.toString().trim()!==""
    && this.refs.toinputDate.input.props.value.toString().trim() && this.refs.toinputDate.input.props.value.toString().trim()!=="")
    {
      _date = this.refs.inputDate.input.props.value.toString().trim().split('/').reverse().join('/')+" " +this.state.fromTime;
      if(this.state.toTime){
        _todate = this.refs.toinputDate.input.props.value.toString().trim().split('/').reverse().join('/')+ " " +this.state.toTime;
        
       }else{
        _todate = this.refs.toinputDate.input.props.value.toString().trim().split('/').reverse().join('/')+ " 23:59";
       }
      st_print_input = this.refs.inputDate.input.props.value.toString().trim();
      et_print_input = this.refs.toinputDate.input.props.value.toString().trim();
     }else{
       _date = false;
       _todate = false;
       message.error('Ngày chưa được chọn !');
     }
     if(_date && _todate){
      
        var someDate = new Date(_date).getTime();
        var toDate = new Date(_todate).getTime();
        _api = this.state.aip;
        this.props.input_money(someDate,toDate,_api,this.state.key);
       
     }
     
  }
  
  callback(key) {
    
  }
  onChangAPI = (e)=>{
    // _api = (e.target.value);
    this.setState({aip : e.target.value})
  }
  onChangeInput=(k)=>{
    this.setState({
      un: k.target.value.trim(),
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
  onChangeInputAPI=(k)=>{
    this.setState({
      un_api: k.target.value.trim(),
    });
    un_api = k.target.value.trim();
  }
  onChangeInputOut=(k)=>{
    this.setState({
      un_out: k.target.value.trim(),
    });
    un_out = k.target.value.trim();
  }
  changeTime=(time, timeString)=>{
    this.setState({fromTime:timeString.toString()})
  }
  changeToTime=(time, timeString)=>{
    this.setState({toTime:timeString})
  }
  refresh=()=>{
    var _dateHDH = false;
    var _todateHDH = false;
    if(this.refs.fDate.input.props.value.toString().trim() && this.refs.fDate.input.props.value.toString().trim()!==""&&
    this.refs.tDate.input.props.value.toString().trim() && this.refs.tDate.input.props.value.toString().trim()!==""){
   
      _dateHDH = this.refs.fDate.input.props.value.toString().trim().split('/').reverse().join('/')+ " 00:00";
      _todateHDH = this.refs.tDate.input.props.value.toString().trim().split('/').reverse().join('/')+ " "+ "23:59";
     
    }else{
      _dateHDH = false;
      _todateHDH = false;
        message.error('Ngày chưa được chọn !');
    }
    if(_dateHDH &&_todateHDH){
      var someDateHDH = new Date(_dateHDH).getTime();
      var toDateHDH = new Date(_todateHDH).getTime();
      
      this.props.get_money_by_hdh(someDateHDH,toDateHDH);
    }
  }
  render() {
    var table = false;
    var tableInput = false;
    var tableOut =false;
    var search = false;
    var tableHDH = false;
    var total_item_hdh = 0;
    var itemsPerPage = 10;
    var page = false;
    if(this.props.isLoadHDH){
      tableHDH=(
        <center>
          <img src={require('images/loading.gif')} style={{width:100,height:100}}/>
        </center>  
      )
    }else{
      
      if(this.props.data_hdh && this.props.data_hdh.length>0){
        var item_hdh = false;
        total_item_hdh = this.props.data_hdh.length;
        page=(
          <div style={{margin: '2% 0%'}}>
            <div style={{display: 'inline-block'}}>
              <Pagination
                style={{display: 'inline-block'}}
                total={total_item_hdh?total_item_hdh:0}
                pageSize={itemsPerPage}
                defaultCurrent={1}
                current={this.state.activePage}
                onChange={this.onChange}
              />
              <div style={{display:total_item_hdh?"inline-block":'none',float:'right',border:'1px solid #c4c4c4',borderRadius:'3px',padding:'4px 10px',marginLeft:'10px',fontSize:'13px'}}>
                {this.state.activePage}/{total_item_hdh>0?(total_item_hdh%itemsPerPage==0?total_item_hdh/itemsPerPage:parseInt(total_item_hdh/itemsPerPage)+1):0}

              </div>
            </div>
          </div>
        )
        item_hdh =  this.props.data_hdh.map((rows,indexs)=>{
          if(indexs >= (this.state.activePage-1) *itemsPerPage && indexs < (this.state.activePage) *itemsPerPage ){ 

          return(
            <tr key={indexs}>
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.convertDate(rows.Date)}</td>
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.formatCurency(rows.Android)}</td>
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.formatCurency(rows.Web)}</td>
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.formatCurency(rows.Ios)}</td>
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.formatCurency(rows.Unknow)}</td>
            </tr>      
          )
        }
            
        })
          tableHDH=(
            <div style={{overflow:'auto'}}>

            <table style={{marginLeft:'0%',marginTop:'2%',width:'95%'}}>
              <tbody style={{overflow:'auto'}} >
                
                <tr style={{overflow:'auto',background:'rgb(236, 246, 253)',fontStyle:'italic'}}>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Thời gian</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Android</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Web</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>IOS</th>                  
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Unknow</th>                  
                                  
                </tr>  
                {item_hdh}
              </tbody>  
            </table>  
          </div>
          )
        }else{
          tableHDH=(
            <div style={{overflow:'auto'}}>

            <table style={{marginLeft:'0%',marginTop:'2%',width:'95%'}}>
              <tbody style={{overflow:'auto'}} >
                
                <tr style={{overflow:'auto',background:'rgb(236, 246, 253)',fontStyle:'italic'}}>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Thời gian</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Android</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Web</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>IOS</th>                  
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Unknow</th>                  
                                  
                </tr>  
                <tr>
                  <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}} colSpan={5}>Không có dữ liệu</td>
                </tr>  
              </tbody>  
            </table>  
          </div>
          )
        }
      }

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
    table=(<TabMoney st={st_print} et={et_print} loadMoney={this.props.loadMoney} dataMoney={this.props.dataMoney}/>)

    tableInput=(<TabInput st={st_print_input} et={et_print_input} loadInput={this.props.loadInput} dataInput={this.props.dataInput} _api={_api} isClick={this.state.isClick}
       suggest_user_by_nickname={this.props.suggest_user_by_nickname} suggest_data={this.props.suggest_data} />)

    tableOut=(<TabOutput st={st_print_out} et={et_print_out} loadOutput={this.props.loadOutput} dataOut={this.props.dataOut}/>)
       
      search = (
        <table style={{marginLeft:'0%'}}>
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
               ref="inputDate"
               selected={this.state.dateInput}
               onChange={this.onChangeDateInput}
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
            <td>Ngày kết thúc
            </td> 
            <td>Giờ kết thúc
            </td> 
          </tr>  
          <tr> 
           <td>
             <DatePicker
             ref="toinputDate"
             selected={this.state.todateInput}
             onChange={this.onChangeToDateInput}
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
             <TimePicker 
                defaultValue={moment('23:59', format)} 
                format={format} 
                placeholder="Nhập giờ" 
                style={{height:35,width:120}}
                onChange={this.changeToTime}
              />
           </td>
           
         </tr>
         <tr style={{height:10}}>
         <td/>
         <td/>
         <td/>
         </tr>  
         <tr>
           <td>
             <select id="apiGoogle" onChange={(e)=>this.onChangAPI(e)} 
                   style={{marginLeft:'1%',height:'35px',width:120,border:'1px solid #e2e2e2',borderRadius:'5px',background:'white'}}>
                 <option value={"sms"}>NapKingSMS</option>
                 <option value={"bank"}>BankCharging</option>
                 <option value={"card"}>NapThe</option>                  
                 <option value={"iap"}>IAPGoogle/IAPApple</option>
             </select>
           </td>
           <td>
            {manager}
             {/* <Input placeholder="Nhậ­p Nickname" style={{height:35,width:120}} 
             onChange={this.onChangeInputAPI}/> */}
           </td>
           <td style={{width:10}}>
           </td>
           <td>
             <Button icon="search" style={{height:35,width:35}}
               onClick={this.onClickAPI}
             >
             
             </Button>
           </td> 
         </tr> 
         <tr style={{height:10,borderBottom:'1px dashed #e2e2e2'}}>
           <td colSpan={2}/>
         </tr>  
         </tbody>  
       </table>
        
      )
    var searchHDH = (
      <table>
        <tr>
            <td>Ngày bắt đầu
            </td>
            <td>Ngày kết thúc
            </td> 
        </tr>
        <tr>
          <td>
             <DatePicker
               ref="fDate"
               selected={this.state.f_date}
               onChange={this.onChangeDateHDH}
               customInput={<Input  style={{width: '80%',height:'35px',border:'1px solid #e2e2e2',borderRadius:'5px',background:'white'}}/>}
               dateFormat="DD/MM/YYYY"
               showYearDropdown
               scrollableYearDropdown
               yearDropdownItemNumber={5}
               isClearable={false}
               placeholderText="Chọn ngày bắt đầu"
               withPortal
             />
           </td> 
           <td>
             <DatePicker
               ref="tDate"
               selected={this.state.t_date}
               onChange={this.onChangeToDateDHD}
               customInput={<Input  style={{width: '80%',height:'35px',border:'1px solid #e2e2e2',borderRadius:'5px',background:'white'}}/>}
               dateFormat="DD/MM/YYYY"
               showYearDropdown
               scrollableYearDropdown
               yearDropdownItemNumber={5}
               isClearable={false}
               placeholderText="Chọn ngày kết thúc"
               withPortal
             />
           </td> 
           <td>
            <Button onClick={this.refresh} type="primary" style={{height:35}}>Search</Button>
           </td>  
        </tr>   
         
      </table>  
    )
    return (
      <Tabs defaultActiveKey="1" style={{marginLeft:'3%'}}>
        <TabPane tab="Tra cứu tiền nạp" key="1">
          <div style={{width:'100%',height:'100%'}}>
          <h3 style={{marginBottom:'1%',marginTop:'1%'}}>Tiền nạp</h3>
            {search}
            <div style={{width:'96%',height:'100%'}} >
              {tableInput}
            </div>
          </div> 
        </TabPane>
        <TabPane tab="Tiền nạp theo HĐH" key="2">
          {searchHDH}
          
          {tableHDH}
          {page}
        </TabPane>
      </Tabs>
        
     
    );
  }
}

TotalMoney.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  dataMoney: selectDataMoney(),
  dataInput : selectDataInput(),
  dataOut : selectDataOut(),
  suggest_data : selectSuggestData(),

  loadMoney : selectisLoadMoney(),
  loadInput : selectisLoadInput(),
  loadOutput : selectisLoadOutput(),

  isLoadHDH :selectisLoadHDH(),
  data_hdh : selectDataHDH(),
});

function mapDispatchToProps(dispatch) {
  return {
    total_money:(date,todate,un)=> dispatch(total_money(date,todate,un)),
    input_money:(date,todate,type,un)=> dispatch(input_money(date,todate,type,un)),
    ouput_money:(date,todate,un)=> dispatch(ouput_money(date,todate,un)),
    suggest_user_by_nickname:(key)=>dispatch(suggest_user_by_nickname(key)),
    get_money_by_hdh:(st,et)=>dispatch(get_money_by_hdh(st,et)),
    dispatch,
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TotalMoney));

       