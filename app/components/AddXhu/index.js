/**
*
* AddXhu
*
*/

import React from 'react';
import { Tabs,
  Input,
  Button,
  message,
  Pagination ,
  TimePicker ,
  Select,
  Radio,
  Checkbox
} from 'antd';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
const format = 'HH:mm';

class AddXhu extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      dateMoney : moment(),
      fromTime : "",
      event100 : false,
      cHu100: 0,
      xHu100: 1,
      cHu1000: 0,
      xHu1000: 1,
      cHu10000: 0,
      xHu10000: 1,

      gid : false,
    }
  }
  onChangeDate=(date)=>{
    this.setState({
      dateMoney: date,
    });     
  }
  changeTime=(time, timeString)=>{
    this.setState({fromTime:timeString.toString()})
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
  change100=(e)=>{
    if(e.target.checked){
      this.setState({event100 : true})
    }else{
      this.setState({event100 : false})
      this.setState({cHu100 : 0})
      this.setState({xHu100 : 1})
    }
  }
  change1000=(e)=>{
    if(e.target.checked){
      this.setState({event1000 : true})
    }else{
      this.setState({event1000 : false})
      this.setState({cHu1000 : 0})
      this.setState({xHu1000 : 1})
    }
  }
  change10000=(e)=>{
    if(e.target.checked){
      this.setState({event10000 : true})
    }else{
      this.setState({event10000 : false})
      this.setState({cHu10000 : 0})
      this.setState({xHu10000 : 1})
      
    }
  }
  onChangeCHu100=(e)=>{
    this.setState({cHu100:e.target.value})
  }
  
  onChangeCHu1000=(e)=>{
    this.setState({cHu1000:e.target.value})
  }
  onChangeXHu1000=(e)=>{
    this.setState({xHu1000:e.target.value})
  }
  onChangeXHu100=(e)=>{
    this.setState({xHu100:e.target.value})
  }
  onChangeXHu10000=(e)=>{
    this.setState({xHu10000:e.target.value})
  }
  onChangeCHu10000=(e)=>{
    this.setState({cHu10000:e.target.value})
  }
  
  add=()=>{
    
    var _date = false;
  
    if(this.refs.inputDate.input.props.value.toString().trim() && this.refs.inputDate.input.props.value.toString().trim()!=="")
    {
      _date = this.refs.inputDate.input.props.value.toString().trim().split('/').reverse().join('/')+ " 00:00";
    }else{
      _date = false;
       message.error('Ngày chưa được chọn !');
    }
    if(_date){
      var someDate = new Date(_date).getTime();
      this.props.add_xhu(
        this.state.gid,
        someDate,
        this.state.event100,this.state.cHu100,this.state.xHu100,
        this.state.event1000,this.state.cHu1000,this.state.xHu1000,
        this.state.event10000,this.state.cHu10000,this.state.xHu10000
      )

       
     
   }
    
  }
  onChangeGame=(e)=>{
    this.setState({gid : e.target.value})
  }
  componentWillReceiveProps=(nextprops)=>{
    if(this.props.isSuccess != nextprops.isSuccess){
      if(nextprops.isSuccess){
        this.props.handleCancel();
        this.reset();
      }
    }
  }
  reset=()=>{
    this.setState({event100 : false})
    this.setState({cHu100 : 0})
    this.setState({xHu100 : 1})
    this.setState({event1000 : false})
    this.setState({cHu1000 : 0})
    this.setState({xHu1000 : 1})
    this.setState({event10000 : false})
    this.setState({cHu10000 : 0})
    this.setState({xHu10000 : 1})
    this.setState({
      dateMoney: moment(),
    }); 
  }
  render() {
    return (
      <div style={{marginLeft:'3%',marginTop:'2%'}}>
        <div style={{display:'-webkit-box'}}> <div style={{fontFamily:'Arial',fontStyle:'bold',fontSize:13,height:35,lineHeight:'35px'}}>Thời gian kích hoạt :</div> 
          <DatePicker
            style={{color:'red', }}
            ref="inputDate"
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
            minDate={moment().add(0, 'days')}
          />        
        </div>
        <div style={{display:'-webkit-box',marginTop:10,}}> <div style={{fontFamily:'Arial',fontStyle:'bold',fontSize:13,height:35,lineHeight:'35px'}}>Game :</div> 
            <select 
                  style={{border:'1px solid #e2e2e2',borderRadius:5,height:35}}
                  onChange={(e)=>this.onChangeGame(e)}
                  value={this.state.gid}
                >
                
                <option value={"eCB"}>Cao bồi</option>          
                <option value={"eLS"}>Lương sơn</option>
                <option value={"eMNP"}>MiniPoker</option>
                <option value={"eQA"}>Quán ăn</option>
                <option value={"eCM"}>Cổ mộ</option>
            </select>  
        </div>
        <div style={{marginLeft:'0%',marginTop:'2%'}}>
            <Checkbox onChange={this.change100} value={this.state.event100}>
              <span style={{fontFamily:'Arial',fontStyle:'bold',fontSize:13}}>Sự kiện có áp dụng cho loại game 100 king</span>
            </Checkbox>
            <table style={{marginLeft:'5%',marginTop:'2%',display:this.state.event100?"":"none"}}>
              <tr>
                <td><img src={require('images/Dot.png')}  style={{height:15,width:15,marginRight:5}}/></td>
                <td><span style={{fontFamily:'Arial',fontStyle:'bold',fontSize:13}}>Số lượng hũ event thuộc loại 100 king</span></td>
                <td style={{width:10}}/>
                <td><input type="number" min={0} 
                      style={{height:30,border:'1px solid #ccc',borderRadius:5,padding:5,textAlign:'right'}} 
                      value={this.state.cHu100} onChange={this.onChangeCHu100}/></td>
              </tr>
              <tr style={{height:10}} />
              <tr style={{marginTop:'2%'}}>
                <td><img src={require('images/Dot.png')}  style={{height:15,width:15,marginRight:5}}/></td>
                <td><span style={{fontFamily:'Arial',fontStyle:'bold',fontSize:13}}>Giá trị x hũ event thuộc loại 100 king</span></td>
                <td style={{width:10}}/>
                
                <td><input type="number" min={0} 
                      style={{height:30,border:'1px solid #ccc',borderRadius:5,padding:5,textAlign:'right'}} 
                      value={this.state.xHu100} onChange={this.onChangeXHu100}/></td>
              </tr>
            </table>  
        </div>  
        <div style={{marginTop:'2%'}}>
            <Checkbox onChange={this.change1000} value={this.state.event1000}>
                <span style={{fontFamily:'Arial',fontStyle:'bold',fontSize:13}}>Sự kiện có áp dụng cho loại game 1000 king</span>
            </Checkbox>
            
            <table style={{marginLeft:'5%',marginTop:'2%',display:this.state.event1000?"":"none"}}>
              <tr>
                <td><img src={require('images/Dot.png')}  style={{height:15,width:15,marginRight:5}}/></td>
                <td><span style={{fontFamily:'Arial',fontStyle:'bold',fontSize:13}}>Số lượng hũ event thuộc loại 1000 king</span></td>
                <td style={{width:10}}/>
                <td><input type="number" min={0} 
                      style={{height:30,border:'1px solid #ccc',borderRadius:5,padding:5,textAlign:'right'}} 
                      value={this.state.cHu1000} onChange={this.onChangeCHu1000}/></td>
              </tr>
              <tr style={{height:10}} />
              <tr style={{marginTop:'2%'}}>
                <td><img src={require('images/Dot.png')}  style={{height:15,width:15,marginRight:5}}/></td>
                <td><span style={{fontFamily:'Arial',fontStyle:'bold',fontSize:13}}>Giá trị x hũ event thuộc loại 1000 king</span></td>
                <td style={{width:10}}/>
                
                <td><input type="number" min={0} 
                      style={{height:30,border:'1px solid #ccc',borderRadius:5,padding:5,textAlign:'right'}} 
                      value={this.state.xHu1000} onChange={this.onChangeXHu1000}/></td>
              </tr>
            </table>  
        </div>  
        <div style={{marginTop:'2%'}}>
            <Checkbox onChange={this.change10000} value={this.state.event10000}>
                <span style={{fontFamily:'Arial',fontStyle:'bold',fontSize:13}}>Sự kiện có áp dụng cho loại game 10.000 king</span>
            </Checkbox>
            <table style={{marginLeft:'5%',marginTop:'2%',display:this.state.event10000?"":"none"}}>
              <tr>
                <td><img src={require('images/Dot.png')}  style={{height:15,width:15,marginRight:5}}/></td>
                <td><span style={{fontFamily:'Arial',fontStyle:'bold',fontSize:13}}>Số lượng hũ event thuộc loại 10.000 king</span></td>
                <td style={{width:10}}/>
                <td><input type="number" min={0} 
                      style={{height:30,border:'1px solid #ccc',borderRadius:5,padding:5,textAlign:'right'}} 
                      value={this.state.cHu10000} onChange={this.onChangeCHu10000}/></td>
              </tr>
              <tr style={{height:10}} />
              <tr style={{marginTop:'2%'}}>
                <td><img src={require('images/Dot.png')}  style={{height:15,width:15,marginRight:5}}/></td>
                <td><span style={{fontFamily:'Arial',fontStyle:'bold',fontSize:13}}>Giá trị x hũ event thuộc loại 10.000 king</span></td>
                <td style={{width:10}}/>
                
                <td><input type="number" min={0} 
                      style={{height:30,border:'1px solid #ccc',borderRadius:5,padding:5,textAlign:'right'}} 
                      value={this.state.xHu10000} onChange={this.onChangeXHu10000}/></td>
              </tr>
            </table>  
        </div>  
        <div style={{marginTop:'5%'}}>
          <center><Button style={{height:35}} type="primary" onClick={this.add}>Thêm sự kiện</Button></center>
        </div>  
      </div>  
      
    );
  }
}

AddXhu.propTypes = {

};

export default AddXhu;
