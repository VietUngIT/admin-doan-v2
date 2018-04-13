/**
*
* SearchId
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
} from 'antd';
import moment from 'moment';
import {withRouter} from 'react-router' ;
// import Workbook from 'react-excel-workbook';
var st = false;
var et = false;
var g_name = "XocDia";
var descriptionDiv=null;
const format = 'HH:mm';

class SearchId extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      key : false,
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
  changeTime=(time, timeString)=>{
    this.setState({fromTime:timeString.toString()})
  }
  changeToTime=(time, timeString)=>{
    this.setState({toTime:timeString})
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
  onChangeInputID=(k)=>{
    this.setState({
      id: k.target.value.trim(),
    });
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
      this.setState({activePage:1})
      
    }else{
      message.error("Nhập đầy đủ thông tin !")
    }
  }
  render() {
    var content = false;
    var detailSlot = false;
    var detail_slot = false;
    var itemsPerPage = 10;
    var total_item = 0;
    var content_id = false;
    if(this.props.load){
      content=(
        <center>
          <img src={require('images/loading.gif')} style={{width:100,height:100}}/>
        </center> 
      )
    }else{
      if(this.props.data_id && this.props.data_id.length>0){
        content_id = this.props.data_id.map((row,index)=>{   
          
           return(
             <div style={{marginLeft:'4%',width:'90%'}}>
                <DetailSlot key={index} referenceId ={row.referenceId} time={row.updateTime} gameDetail={row.gameDetail}/>
             </div>
           ) 
          })
          
      }else{
        content_id=(<h3 style={{marginLeft:'3%',marginTop:'1%'}}>Không có dữ liệu </h3>)
      }
    }
    
    return (
      <div>
        <h3 style={{marginLeft:'3%',marginTop:'1%'}}>Tra cứu thông tin game bài</h3>
        
        <table style={{marginLeft:'5%',marginTop:'2%'}}>
           <tbody>
           
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
              <td style={{width:10}} />
              
              <td>
                <Input placeholder="Nhậ­p phiên game" style={{height:35,width:120}} 
                onChange={this.onChangeInputID}/>
              </td>
              <td style={{width:10}}>
              </td>
              <td>
                <Button icon="search" style={{height:35,width:35}}
                  onClick={this.search_by_id}
                >
                
                </Button>
              </td> 
            </tr> 
            <tr style={{height:10,borderBottom:'1px dashed #e2e2e2'}}>
              <td colSpan={5}/>
            </tr>  
            </tbody>  
          </table>
        <div style={{marginLeft:'1%',marginTop:'1%'}}>
        {content_id}
        </div>
      
      </div>
    );
  }
}

SearchId.propTypes = {

};

export default SearchId;
