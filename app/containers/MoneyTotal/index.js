/*
 *
 * MoneyTotal
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import messages from './messages';
import NapVao from 'components/Money/NapVao';
import RutTien from 'components/Money/RutTien';
import { Tabs,
  Input,
  Button,
  message,
  Pagination ,
  TimePicker ,
} from 'antd';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
const format = 'HH:mm';
var someDate = "";
var toDate ="";
var un_api = "";
var st_print_input = false;
var et_print_input = false;
export class MoneyTotal extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      dateInput : moment(),
      todateInput : moment(),
      search : false,
      type : false,
      un : "",
      un_api :"",
      un_out :"",
      un_detail:"",
      isMobile: false,
      overflow : "unset",
      fromTime : "",
      toTime : "",
    };
    this.onChangeDateInput = this.onChangeDateInput.bind(this);
    
    this.onChangeToDateInput = this.onChangeToDateInput.bind(this);
  }
  componentDidMount=()=>{
    // console.log("search",this.state.search)
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
  onChangeInputAPI=(k)=>{
    this.setState({
      un_api: k.target.value.trim(),
    });
    un_api = k.target.value.trim();
  }
  onSearch=()=>{
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
       someDate = new Date(_date).getTime();
       toDate = new Date(_todate).getTime();
       //this.props.input_money(someDate,toDate,_api,un_api);
       this.setState({search: true});
     }
     
  }
  render() {
    var search = false;
    var content = false;
    search = (
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
           <Input placeholder="Nhậ­p Nickname" style={{height:35,width:120}} 
           onChange={this.onChangeInputAPI}/>
         </td>
        
         <td>
           <Button icon="search" style={{height:35,width:35}}
             onClick={this.onSearch}
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
    if(this.state.search){
      content=(
        <div>
          <NapVao un={un_api?un_api:"all"} st={someDate} et={toDate} />
          <RutTien un={un_api?un_api:"all"} st={someDate} et={toDate} />
        </div>  
    )
      
    }else{
    content="";
    
    }
    return (
      <div>
        {search}
        {content}
      </div>
    );
  }
}

MoneyTotal.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MoneyTotal);
