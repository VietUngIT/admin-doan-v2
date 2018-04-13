/*
 *
 * Smsactive
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { selectIsLoading,selectData } from './selectors';
import messages from './messages';
const format = 'HH:mm:ss';
import moment from 'moment';
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
  Icon,
  Select,
} from 'antd';
import { get_sms_active } from './actions';
import { selectSuggestData } from '../App/selectors';
import { suggest_user_by_nickname } from '../App/actions';
const Option = Select.Option;
var nick = "";
export class Smsactive extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {     
      activePage :1,
      dateMoney : moment(),      
      key : "",

    }
  }
  onChange = (page) => {
    this.setState({
      activePage: page,
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
    result = date +" " +time;
    return result;
  }
  onChangeDate=(date)=>{
    this.setState({
      dateMoney: date,
    });
     
  }
  onClick=()=>{
    var _date = false;
    if(this.refs.fromDate.input.props.value.toString().trim() && this.refs.fromDate.input.props.value.toString().trim()!==""){
      _date = this.refs.fromDate.input.props.value.toString().trim().split('/').reverse().join('/')+ " 00:00:00";
      var sDate = new Date(_date).getTime();
      this.props.get_sms_active(sDate);
      nick = this.state.key;
      this.setState({
        activePage: 1,
      });
    }else{
      message.error('Ngày chưa được chọn !');

    }
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
  render() {
    var contentList = false;
   
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
    var search =(
      <table style={{marginTop:'1%',marginLeft:'3%'}}>
        <tbody>
          <tr>
            <td>Chọn ngày :
            </td>  
            <td style={{width:10}}/>  
            
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
              <td style={{width:10}}/>  
              <td>
                <Button icon="search" style={{height:35,width:35}} onClick={this.onClick}/>
              </td>
          </tr>  
          <tr style={{height:10}}/>
          <tr>
            <td>Nickname:</td>
            <td style={{width:10}}/>  
            
            <td>{manager}</td>
          </tr>  
        </tbody>
      </table>  
    )
    if(this.props.isLoading){
      contentList=(
        <center>
          <img src={require('images/loading.gif')} style={{width:100,height:100}}/>
        </center>  
      )
    }else{
      if(this.props.data && this.props.data.length >0)
      {
        var item = false;
        var itemsPerPage = 10;
        var page = false;
        var total_item = 0;
        if(nick.trim() !==""){
          var temp = [];
          this.props.data.map((rows,indexs)=>{
            if(rows.nickname==nick.trim())
            temp.push(rows)
          })
          total_item = temp.length;
          
          if(total_item>0){
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
            item = temp.map((row,index)=>{
              // var content = row.content.split("+").join(" ");
              if(index >= (this.state.activePage-1) *itemsPerPage && index < (this.state.activePage) *itemsPerPage ){ 
                return(
                  <tr key={index}>
                    
                      <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>
                        {index +1}
                      
                      </td>
                      <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>
                        {row.nickname}           
                      </td>
                      <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>
                        {row.mobile}           
                      </td>
                      {/* <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>
                        {content}           
                      </td> */}
                      <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>
                        {this.convertDate(row.time)}           
                      </td>
                  </tr>    
                )
              }
            })
          }else{
            item=(
              <tr>
                <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}} colSpan={4}>Không có dữ liệu</td>
              </tr>  
            )
          }
         
        }else{
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
            // var content = row.content.split("+").join(" ");
            if(index >= (this.state.activePage-1) *itemsPerPage && index < (this.state.activePage) *itemsPerPage){ 
              return(
                <tr key={index}>
                  
                    <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>
                      {index +1}
                    
                    </td>
                    <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>
                      {row.nickname}           
                    </td>
                    <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>
                      {row.mobile}           
                    </td>
                    {/* <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>
                      {content}           
                    </td> */}
                    <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>
                      {this.convertDate(row.time)}           
                    </td>
                </tr>    
              )
            }
          })
        }
        
        contentList = (
          <div style={{overflow:'auto'}}>
            <h3  style={{marginLeft:'3%',marginTop:'2%'}}>Số lượng : {total_item}</h3>

            <table style={{marginLeft:'3%',marginTop:'2%',width:'95%'}}>
              <tbody style={{overflow:'auto'}} >
                  
                <tr style={{background:'#ecf6fd'}}>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,fontStyle:'italic'}} >STT</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,fontStyle:'italic'}} >Nickname</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,fontStyle:'italic'}} >SĐT</th>
                  {/* <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,fontStyle:'italic'}} >Nội dung</th> */}
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5,fontStyle:'italic'}} >Thời gian</th>
                </tr>  
                {item}
              </tbody>  
            </table>  
          </div>
        )
        
      }else{
        contentList = (
          <div style={{overflow:'auto'}}>

            <table style={{marginLeft:'5%',marginTop:'2%',width:'90%'}}>
              <tbody>
                <tr style={{background:'#ecf6fd'}}>
                  <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}} colSpan={4}>Không có dữ liệu</td>
                </tr>  
              </tbody>  
            </table>  
          </div>
        )
      }
    }
    return (
      <div>
        <h3  style={{marginLeft:'2%',marginTop:'2%'}}>Tra cứu SMS active theo ngày</h3>

        {search}
        {contentList}
        {page}
      </div>
    );
  }
}

Smsactive.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsLoading(),
  data: selectData(),
  suggest_data : selectSuggestData(),

});

function mapDispatchToProps(dispatch) {
  return {
    get_sms_active :(time)=>dispatch(get_sms_active(time)),
    suggest_user_by_nickname:(key)=>dispatch(suggest_user_by_nickname(key)),

    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Smsactive);
