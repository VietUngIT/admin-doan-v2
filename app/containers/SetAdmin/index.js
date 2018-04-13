/*
 *
 * SetAdmin
 *
 */

import React from 'react';
import ReactDOM from 'react-dom';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';

import {
  setAdmin,
  getAdmin,
  getHisAdmin,
  getHisGame,
  get_admin_by_phone,
  suggest_user_by_nickname,
  edit_phone,
  edit_email,
  edit_cmt,
  edit_role,
  edit_active,
  edit_total,
  edit_ket,
  edit_lock,
  search_by_time,
  reset_pass,
  reset_pass_success,
} from './actions';
import {
  selectData,
  selectInfo,
  selectIsLoading,
  selectIsLoadingHis,
  selectHisAdmin,
  selectDataGame,
  selectIsLoadingGame,
  selectSuggestData,
  selectPass,
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
  Select,
  TimePicker,
  Card,
  Form,
  BackTop
} from 'antd';
import Cleave from 'cleave.js/react';
import SearchTk from 'components/SearchTk';
import {withRouter} from 'react-router' ;
import {selectIsMobile} from 'containers/App/selectors'; 
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import Workbook from 'react-excel-workbook';
import ItemAccount from 'components/ItemAccount';
import { selectIsSuperAdmin } from '../App/selectors';
const format = 'HH:mm';

var role = 0;
var lock = true;
const TabPane = Tabs.TabPane;
var ac = 0;
const Option = Select.Option;
export class SetAdmin extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {    
      isMobile: false,   
      display_button : false,  
      date : false,
      todate : false, 
      fromTime : "",
      toTime : "23:59",
      activePage : 1,
      cmt : false,
      em : false,
      sdt : false,
      m : 0,
      sm : 0,
      a : false,
      changeRole :  false,
      changeAC:  false,
      changeLock : false,
      hide : false,
      key : "",
      key1 : "",
      nickname : false,
      nickname1 : false,
      intervalId: 0
    };
   
  }
  updateDimensions() {
    if(window.innerWidth < 760) {
      this.setState({ isMobile: true});
    } else {
     this.setState({ isMobile: false});
    }
  }
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
    if(this.props.isSuperAdmin ==2 || this.props.isSuperAdmin ==3 ){
      this.props.getHisAdmin();

    }
  }
  componentWillMount(){
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));


  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
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
  changeTime=(time, timeString)=>{
    this.setState({fromTime:timeString.toString()})
  }
  changeToTime=(time, timeString)=>{
    this.setState({toTime:timeString.toString()})
  }
  hide=()=>{
    this.setState({
      hide: false,
    });
  }
  showHide=()=>{
    this.setState({
      hide: true,
    });
  }
  onChangeCMND=(e)=>{
    this.setState({
      cmt: e.target.value,
    });
    this.setState({
      display_button: true,
    });
  }
  onChangeEmail=(e)=>{
    this.setState({
      em: e.target.value,
    });
    this.setState({
      display_button: true,
    });
  }
  onChangeMobile=(e)=>{
    this.setState({
      sdt: e.target.value,
    });
    this.setState({
      display_button: true,
    });
  }
  onChangeM=(event)=>{
    this.setState(
      {m: event.target.rawValue},
    );
    this.setState({
      display_button: true,
    });
  }
  onChangeSM=(event)=>{
    this.setState(
      {sm: event.target.rawValue},
    );
    this.setState({
      display_button: true,
    });
  }
  onChange = (page) => {
    this.setState({
      activePage: page,
    });
  }
  updateDimensions() {
    if(window.innerWidth < 1800) {
     this.setState({
       isMobile: true,
     });
    } else {
     this.setState({
       isMobile: false,
     });
    }
  }

  onChangeRole(e){
     role = (e.target.value);
     this.setState({display_button:true})
    this.setState({changeRole:true})
    
    // console.log("g_name: ",g_name)
  } 
  onChangeLock(e){
    lock = (e.target.value);
    this.setState({display_button:true})
   this.setState({changeLock:true})
   
   // console.log("g_name: ",g_name)
 }  
  onChangeAC(e){
    ac = (e.target.value);
    this.setState({display_button:true})
    this.setState({changeAC:true})
   // console.log("g_name: ",g_name)
 }  
  onClick =(r)=>{      
        
      this.props.setAdmin(
        r.nn,
        this.state.changeRole?role:r.role,
        this.refs.sdt.refs.input.value,
        this.refs.cmnd.refs.input.value,
        this.state.m?parseInt(this.state.m):0,
        this.state.changeAC?ac:r.ac,
        this.refs.em.refs.input.value,
        this.state.sm?parseInt(this.state.sm):0,
        this.state.changeLock?lock:r.l,
        
      );
      this.setState({display_button:false})
    
  }
  onClickGet=()=>{

    if(this.state.key.trim()!=="" || this.refs.InputPhone.refs.input.value.trim()!==""|| this.refs.InputUnn.refs.input.value.trim()!==""){      
      this.props.getAdmin(this.state.key.trim(),this.refs.InputPhone.refs.input.value.trim(),this.refs.InputUnn.refs.input.value.trim());
      if(document.getElementById("role") !==null && this.props.info.role!==3){
        document.getElementById("role").value=this.props.info.role;
      }
      
      if(document.getElementById("lockid") !==null){
        document.getElementById("lockid").value=this.props.info.l;
        
      }
      this.setState({display_button:false})
      this.setState({activePage:1})
      this.setState({
        hide: true,
      });
    }
    else{
      message.error("Nhập thông tin cần tìm !")
    }
  }
  onClickGetByPhone=()=>{
    if(this.refs.InputPhone.refs.input.value.trim()!==""){      
      this.props.get_admin_by_phone(this.refs.InputPhone.refs.input.value.trim());
      if(document.getElementById("role") !==null && this.props.info.role!==3){
        document.getElementById("role").value=this.props.info.role;
      }
      
      if(document.getElementById("lockid") !==null){
        document.getElementById("lockid").value=this.props.info.l;
        
      }
      this.setState({display_button:false})
      this.setState({activePage:1})
      this.setState({
        hide: true,
      });
    }
    else{
      message.error("Nhập SĐT !")
    }
  }
  onChangeInput=(e)=>{
    this.props.suggest_user_by_nickname(e.target.value.trim());
  }
  handleChange = (value) => {
    this.setState({ key : value });
    if(value !==""){
      this.props.suggest_user_by_nickname(value);
    }
    
  }
  handleChange1 = (value) => {
    this.setState({ key1 : value });
    if(value !==""){
      this.props.suggest_user_by_nickname(value);
    }
    
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
    result = date +" " + time;
    return result;
  }
  formatCurency(price){
    var strPrice = price+'';
    var a = strPrice.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    return a;
  }

  onSelect=(value)=>{
    this.setState({nickname : value})
  }
  onSelect1=(value)=>{
    this.setState({nickname1 : value})
  }

  searchByTime=()=>{
    var someDate = 0;
    var toDate = 0;

    if(this.refs.fromDate.input.props.value.toString().trim()!="" && this.refs.toDate.input.props.value.toString().trim()!=""){
      let _date = this.refs.fromDate.input.props.value.toString().trim().split('/').reverse().join('/')+ " " +this.state.fromTime;
      let _todate = this.refs.toDate.input.props.value.toString().trim().split('/').reverse().join('/')+ " " +this.state.toTime;
      if(_date && _todate){  

        someDate = new Date(_date).getTime();
        toDate = new Date(_todate).getTime();      
      
     } else{
       message.error("Ngày lỗi !")
     } 
    }else{
      someDate = 0;
      toDate = 0;

    }
   
    this.props.search_by_time(this.state.key1.trim(),someDate,toDate);
    
  }
  
  handleKeyPress=(target) =>{
    if(target.charCode==13){
        this.onClickGet();
    }

  };
  scrollTo=()=>{
    ReactDOM.findDOMNode(this).scrollIntoView();

  }
  render() {
    // console.log("window.pageYOffset",window.innerHeight)
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
     var manager1 = (
      <Select
        mode="combobox"
        value={this.state.key1}
        placeholder="Nhập nickname"
        style={{width:120,height:'35px !important'}}
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        onChange={this.handleChange1 }
        onSelect={this.onSelect1}
        refs="selectSuggest1"
      >
        {options_suggest}
      </Select>
     )
    var search_content = false;
    var table = false;
    var role_content = false;
    var his_content = false;
    var his_item = false;
    var page = false;
    var total_item=0;
    var itemsPerPage = 15;
    if(this.props.loading_his){
      his_content=(
        <center>
          <img src={require('images/loading.gif')} style={{width:100,height:100}}/>
        </center>  
      )
    }else{
      var searchTime =(
        <Card style={{marginLeft:'5%',width:'90%',marginTop:10,border:'1px solid #e2e2e2',overflow:'auto'}} 
            title={<div style={{display:'-webkit-box'}}> <Icon type="bars" /><h4 style={{marginLeft:'1%',color:'rgb(86, 83, 83)'}}>Tìm kiếm</h4></div>}>
          <div style={{overflow:'auto'}} >
            <div style={{marginTop:0}}>Từ ngày</div>
            <div style={{display:'-webkit-box'}}>
              <DatePicker
                ref="fromDate"
                selected={this.state.date}
                onChange={this.onChangeDate}
                customInput={<Input  style={{width: '100%',height:'35px',border:'1px solid #e2e2e2',borderRadius:'5px',background:'white'}}/>}
                dateFormat="DD/MM/YYYY"
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={5}
                isClearable={true}
                placeholderText="Ngày bắt đầu"
                withPortal
                
              />
              <TimePicker 
                    
                    format={format} 
                    placeholder="Nhập giờ"
                    style={{height:35,width:120,marginLeft:10}}
                    onChange={this.changeTime}
                />
                <div style={{marginLeft:10}}>
                  
                 
                      {manager1}
                 
                </div>
            </div>    
            <div style={{marginTop:20}}>Đến ngày</div>
            <div style={{display:'-webkit-box'}}>
              <DatePicker
                ref="toDate"
                selected={this.state.todate}
                onChange={this.onChangeToDate}
                customInput={<Input  style={{width: '100%',height:'35px',border:'1px solid #e2e2e2',borderRadius:'5px',background:'white'}}/>}
                dateFormat="DD/MM/YYYY"
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={5}
                isClearable={true}
                placeholderText="Ngày kết thúc"
                withPortal
                
              />
              <TimePicker  
                style={{height:35,width:120,marginLeft:10}}  
               
                format={format} placeholder="Nhập giờ"  
                onChange={this.changeToTime}/>
    
                <div style={{marginLeft:10}}>
                  <Button icon="search" style={{height:35,width:120}} onClick={this.searchByTime}> Tìm kiếm</Button>
                </div>
            </div>
          </div>
          
            
        </Card>
      )
      if(this.props.his_ad && this.props.his_ad.length>0){
      
        total_item = this.props.his_ad.length ;
        his_item = this.props.his_ad.map((row,index)=>{
          if(index >= (this.state.activePage-1) *itemsPerPage && index < (this.state.activePage) *itemsPerPage ){   
          return(
            <ItemAccount 
              key={index}
              stt={index}
              row={row}
              getAdmin={this.props.getAdmin}
              showHide={this.showHide}
              scrollTo={this.scrollTo}
            />
          )
        }
        })
        page = (
          <div style={{margin: '2% 5%'}}>
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
        his_content=(
          <table style={{marginLeft:'5%',marginTop:'1%',width:'90%',overflow:'auto'}}>
          <tbody style={{overflow:'auto'}}>
            <tr style={{fontStyle:'italic',background:'rgb(236, 246, 253)'}}>
              <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'right',padding:5}}>STT</th>
              <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Admin</th>
              <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Nickname được update</th>
              <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Trường cập nhật</th>
              <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Giá trị cũ</th>
              <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Giá trị mới</th>
              <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Chú thích</th>              
              <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Thời gian cập nhật</th>             

            </tr>  
            {his_item}
          </tbody>
          </table>  
        )
      }else{
        his_content=(  
        <table style={{marginLeft:'5%',marginTop:'1%',width:'90%'}}>
        <tbody>
          <tr>
          <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'right',padding:5}}>STT</th>
          <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Admin</th>
          <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Nickname được update</th>
          <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Trường cập nhật</th>
          <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Giá trị cũ</th>
          <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Giá trị mới</th>
          <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Chú thích</th>          
          <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Thời gian cập nhật</th>       
          </tr>  
          <tr>
            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}} colSpan={8}>Không có dữ liệu</td>
          </tr>  
        </tbody>
        </table>  
        )
      }
    }
    if(this.props.loading){
      table=(
        <center>
          <img src={require('images/loading.gif')} style={{width:100,height:100}}/>
        </center>  
      )
    }else{
      if(!this.state.hide){
        table = false;
      }else{
        if(this.props.info){
          

          table =(
            <SearchTk 
              info={this.props.info}
              setAdmin={this.props.setAdmin}
              hide={this.props.hide}
              edit_phone={this.props.edit_phone}
              edit_email={this.props.edit_email}
              edit_cmt={this.props.edit_cmt}
              edit_role={this.props.edit_role}
              edit_active={this.props.edit_active}
              edit_total={this.props.edit_total}
              edit_ket={this.props.edit_ket}
              edit_lock={this.props.edit_lock}
              isSuperAdmin={this.props.isSuperAdmin}
              pass={this.props.pass}
              reset_pass={this.props.reset_pass}
            />
          )
  
        }
      }
      
    }
   
    if(!this.state.isMobile){
      search_content = (
        <Form onKeyPress={this.handleKeyPress}>
          <div style={{overflow:'auto'}}>
          <table style={{marginLeft:'5%',marginTop:'1%'}}>
          <tbody>
          
            <tr>
            
              <td style={{width:100}}>
                {manager}
              </td>
              <td style={{width:10,height:35}}/>
              <td>
                <Input placeholder="Nhậ­p username" style={{height:35,width:120,marginRight:10}} 
                  ref="InputUnn"
                  onChange={this.onChangeInputUnn}/>
              </td>
              <td style={{width:10,height:35}}/>
              <td>
                <Input placeholder="Nhậ­p SĐT" style={{height:35,width:120,marginRight:10}} 
                  ref="InputPhone"
                  onChange={this.onChangeInputPhone}/>
              </td>
              <td style={{width:10,height:35}}/>
              <td style={{float:'right'}}>
                <Button icon="search" style={{height:35,width:100,marginRight:20}} onClick={this.onClickGet}>Tìm kiếm</Button>
              </td>
              
            </tr>  
            
          
            <tr style={{height:10,borderBottom:'1px dashed #e2e2e2'}}>
              <td colSpan={5}/>
            </tr>
            </tbody>
          </table>    
          </div>   
        </Form>    
      )

    }else{
      search_content = (
        <Form onKeyPress={this.handleKeyPress}>
          <div style={{overflow:'auto'}}>
          <table style={{marginLeft:'5%',marginTop:'1%'}}>
          <tbody>
          
            <tr>
            
              <td style={{width:100}}>
                {manager}
              </td>
              <td style={{width:20,height:35}}/>
              <td>
                <Input placeholder="Nhậ­p username" style={{height:35,width:120,marginRight:10}} 
                  ref="InputUnn"
                  onChange={this.onChangeInputUnn}/>
              </td>
              
              
            </tr>  
            
            <tr style={{height:10}} />
            <tr style={{height:10}}>
              <td>
                <Input placeholder="Nhậ­p SĐT" style={{height:35,width:120,marginRight:10}} 
                  ref="InputPhone"
                  onChange={this.onChangeInputPhone}/>
              </td>
              <td style={{width:20,height:35}}/>
              <td style={{}}>
                <Button icon="search" style={{height:35,width:120,marginRight:20}} onClick={this.onClickGet}>Tìm kiếm</Button>
              </td>
            </tr>
            <tr style={{height:10,borderBottom:'1px dashed #e2e2e2'}} />
            
            </tbody>
          </table>    
          </div>   
        </Form>    
      )

    }
      
     
    
    return (
      <div>
     
          <h3 style={{marginLeft:'5%',marginTop:'1%'}}>Tra cứu thông tin người dùng</h3>
          {search_content}     
          {table}
          <h3 style={{marginLeft:'5%',marginTop:'2%',display:(this.props.isSuperAdmin==2||this.props.isSuperAdmin==3)?"":"none"}}>Lịch sử update thông tin</h3>
          <div style={{display:(this.props.isSuperAdmin==2||this.props.isSuperAdmin==3)?"":"none"}}>
            {searchTime}
            <div style={{overflow:'auto'}}>
              {his_content}
              {page}
            </div>
          </div>  
         
      </div>
       
     
    );
  }
}

SetAdmin.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  data: selectData(),
  info : selectInfo(),
  mobile : selectIsMobile(),
  his_ad : selectHisAdmin(),
  loading : selectIsLoading(),
  loading_his : selectIsLoadingHis(),
  suggest_data : selectSuggestData(),
  isSuperAdmin : selectIsSuperAdmin(),
  pass : selectPass(),
});

function mapDispatchToProps(dispatch) {
  return {
    setAdmin:(un,r,sdt,cmt,m,a,em,sm,l)=>dispatch(setAdmin(un,r,sdt,cmt,m,a,em,sm,l)),
    getAdmin:(un,p,unn)=>dispatch(getAdmin(un,p,unn)),
    getHisAdmin :()=>dispatch(getHisAdmin()),
    get_admin_by_phone:(p)=>dispatch(get_admin_by_phone(p)),
    suggest_user_by_nickname:(key)=>dispatch(suggest_user_by_nickname(key)),
    edit_phone:(un,p,note)=>dispatch(edit_phone(un,p,note)),
    edit_email:(un,p,note)=>dispatch(edit_email(un,p,note)),
    edit_cmt:(un,p,note)=>dispatch(edit_cmt(un,p,note)),
    edit_role:(un,p,note)=>dispatch(edit_role(un,p,note)),
    edit_active:(un,p,note)=>dispatch(edit_active(un,p,note)),
    edit_total:(un,p,note)=>dispatch(edit_total(un,p,note)),
    edit_ket:(un,p,note)=>dispatch(edit_ket(un,p,note)),
    edit_lock:(un,p,note)=>dispatch(edit_lock(un,p,note)),
    search_by_time :(nick,st,et)=>dispatch(search_by_time(nick,st,et)),
    reset_pass:(nick)=>dispatch(reset_pass(nick)),
    reset_pass_success:(pass)=>dispatch(reset_pass_success(pass)),
    dispatch,
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SetAdmin));
