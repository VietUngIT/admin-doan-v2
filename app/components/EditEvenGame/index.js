/**
*
* EditEvenGame
*
*/

import React from 'react';
// import styled from 'styled-components';

const format = 'HH:mm';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { 
  Tabs,
  Input,
  Button,
  message,
  Pagination ,
  TimePicker ,
  Select,
  Icon,
} from 'antd';
class EditEvenGame extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      dateMoney : moment(),
      todateMoney : moment(),
    
      fromTime : "00:00",
      toTime : "23:59",
     
      count : this.props.row.countPrize,
      gn : "taixiu",

      status : this.props.row.status,

      editDate : false,
      editToDate : false,

      changeDate : false,
      changeToDate : false,

      name_event : this.props.row.name,

     
    };
    this.onChangeDate = this.onChangeDate.bind(this);
    
    this.onChangeToDate = this.onChangeToDate.bind(this);
   
  }
  onChangeNameEvent=(e)=>{
    this.setState({name_event : e.target.value})
  }
  // componentDidMount=()=>{
  //   console.log("componentDidMount")
  // }
  // componentWillMount=()=>{
  //   console.log("componentWillMount")
  // }
  onChangeCount=(e)=>{
    // console.log(e.target.value)
    this.setState({
      count: e.target.value,
    });   
  }
  onChangeDate=(date)=>{
    this.setState({
      dateMoney: date,
    });    
    this.setState({
      changeDate: true,
    });    
  }
  onChangeToDate=(date)=>{
    this.setState({
      todateMoney: date,
    });
    this.setState({
      changeToDate: true,
    });   
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
  onChangeStatus=(e)=>{
    this.setState({status : e.target.value})
  }
  reset=()=>{
    this.refs.name.value = "";
    this.setState({count : 0})
    this.setState({gn :"taixiu"})
    this.setState({dateMoney : moment()})
    this.setState({todateMoney : moment()})
    
  }
  editEvent=()=>{
    var _date = false;
    var _todate = false;
    var someDate = false;
    var toDate = false;
    if(this.refs.name.value.trim()!=="" && this.state.count >0)
    {
      if(this.state.editDate){
        // if(this.state.changeDate){
          _date = this.refs.fromDate.input.props.value.toString().trim().split('/').reverse().join('/')+ " " +"00:00";
          someDate = new Date(_date).getTime();
        // }else{
        //   someDate = this.props.row.start;
        // }
       

      }else{
        someDate = this.props.row.start;
      }
      if(this.state.editToDate){
        // if(this.state.changeToDate){
          _todate = this.refs.toDate.input.props.value.toString().trim().split('/').reverse().join('/')+ " " +"23:59";
          toDate = new Date(_todate).getTime();
        // }else{
        // toDate = this.props.row.end;
          
        // }
    

      }else{
        toDate = this.props.row.end;
      }
      
      this.props.edit_even(this.props.row._id,this.refs.name.value.trim(),someDate,toDate,this.state.status);
      this.props.cancel();
      this.setState({editDate : false})
      this.setState({editToDate : false})
    }else{
      message.error('Nhập đầy đủ thông tin !');

    }


  }
  editDate=()=>{
    this.setState({editDate : !this.state.editDate})
  }
  editToDate=()=>{
    this.setState({editToDate : !this.state.editToDate})
    
  }
  componentWillReceiveProps=(nextProps)=>{
    if(this.props.isCancel !== nextProps.isCancel){
      // if(nextProps.isCancel){
        this.setState({name_event : nextProps.row.name})
        this.setState({status : nextProps.row.status})
        
      // }
    }

  }
  render() {
    return (
       <div style={{fontSize:13}}>
          <div style={{marginBottom:10}}><span><b>Game :</b> {this.props.row.gameName}</span></div>
         
          <div><span><b>Tên sự kiện :</b></span>
        
          <textarea rows="2" 
            style={{width:'100%',border:'1px solid #e2e2e2',fontSize:13,padding:5,borderRadius:5}} 
            placeholder="Nhập tên sự kiện" ref="name" value={this.state.name_event} onChange={this.onChangeNameEvent}/>
            </div>
            
          <div >
           <span><b>Trạng thái:</b></span>
            <select style={{width:150,height:35,borderRadius:5,border:'1px solid #e2e2e2',marginLeft:10,marginTop:5,marginBottom:10}}
                 onChange={(e)=>this.onChangeStatus(e)}  value={this.state.status}
              >
                {/* <option selected={this.props.row.status==0?"selected":""} value={0}>Không chạy</option>
                <option selected={this.props.row.status==1?"selected":""} value={1}>Đang chạy</option> */}
                <option value={0}>Không chạy</option>
                <option value={1}>Đang chạy</option>
              </select>         
          </div>  
          <div style={{marginTop:10,marginBottom:10}}> 
            <span style={{marginRight:20}}><b>Bắt đầu :</b> {this.convertDate(this.props.row.start)}</span> 
            <a onClick={this.editDate}><Icon type={!this.state.editDate?"edit":"minus-square-o"} />{!this.state.editDate?"Edit":"Ẩn"}</a>
          </div>
          <div style={{display:this.state.editDate?"":"none",marginBottom:10}}>
            <span style={{marginTop:5}}>Chọn ngày bắt đầu :</span>
            <div style={{display:'-webkit-box'}}>
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
                    // maxDate={moment()}
                  />
                <TimePicker 
                  defaultValue={moment('00:00', format)} 
                  format={format} 
                  placeholder="Nhập giờ"
                  style={{height:35,width:120,display:"none"}}
                  onChange={this.changeTime}
                  // value={this.state.fromTime}
                  
              />  
            </div> 
          </div>   
            <div> 
              <span style={{marginRight:20}}><b>Kết thúc :</b> {this.convertDate(this.props.row.end)}</span>
              <a onClick={this.editToDate}><Icon type={!this.state.editToDate?"edit":"minus-square-o"} />{!this.state.editToDate?"Edit":"Ẩn"}</a>
            </div>
            <div  style={{display:this.state.editToDate?"":"none",marginBottom:10}}>
              <div style={{marginTop:10}}>Chọn ngày kết thúc :</div>
              <div style={{display:'-webkit-box'}}>
                  <DatePicker
                      style={{color:'red', }}
                      ref="toDate"
                      selected={this.state.todateMoney}
                      onChange={this.onChangeToDate}
                      customInput={<Input  style={{width:'80%',height:'35px',border:'1px solid #e2e2e2',borderRadius:'5px',background:'white',flex: 1}}/>}
                      dateFormat="DD/MM/YYYY"
                      showYearDropdown
                      scrollableYearDropdown
                      yearDropdownItemNumber={5}
                      isClearable={false}
                      placeholderText="Ngày bắt đầu"
                      withPortal
                      // maxDate={moment()}
                    />
                  <TimePicker 
                    defaultValue={moment('23:59', format)} 
                    format={format} 
                    placeholder="Nhập giờ"
                    style={{height:35,width:120,display:"none"}}
                    onChange={this.changeToTime}
                    // value={this.state.toTime}
                />  
              </div>  
          </div>  
          <div style={{marginTop:10}}><b>Số lượng :</b> {this.props.row.countPrize}</div>
          {/* <input type="number" min={0} defaultValue={this.props.row.countPrize} onChange={this.onChangeCount} 
            style={{width:'100%',border:'1px solid #e2e2e2',fontSize:13,padding:5,borderRadius:5,textAlign:'right',padding:5}}/> */}
            <center>
                <Button type="primary" style={{marginTop:'2%'}} onClick={this.editEvent}>
                  Sửa 
                </Button>
                
            </center>
            
        </div>
    );
  }
}

EditEvenGame.propTypes = {

};

export default EditEvenGame;
