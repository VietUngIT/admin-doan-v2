/*
 *
 * Even
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import {
  selectisGet,
  selectData,
  selectActive,

} from './selectors';
import {
  getEven,
  addEven,
  delEven,
  activeEven,

} from './actions';
import {
  Tabs,
  Input,
  Button,
  message,
  Pagination ,
  Dropdown,
  Modal,
  Icon,
  Switch ,
  Select,
} from 'antd';
import messages from './messages';
import CurrencyInput from 'react-currency-input';
import Cleave from 'cleave.js/react';
const Option = Select.Option;
import { selectSuggestData } from '../App/selectors';
import { suggest_user_by_nickname } from '../App/actions';
const TabPane = Tabs.TabPane;
var g_name =2;
export class Even extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      key : "",
      nickname : false,
      gn : 1,
      activePage : 1,
      activePageEven : 1,
      del : false,
      id : false,
      chActive : false,
      m_value : "",
      m_valueF : "",
      bet : 100,
      v_value : "",
      gnEven : 1,
      betEven : 1000,
      isMobile: false,
      
    };
    
  }
  handleChangeNick = (value) => {
    this.setState({ key : value });
    if(value !==""){
      this.props.suggest_user_by_nickname(value);
    }
    
  }
  onSelect=(value)=>{
    this.setState({nickname : value})
  }
  updateDimensions() {
    if(window.innerWidth < 760) {
     this.setState({isMobile: true,});
    } else {
     this.setState({isMobile: false,});
    }
  }

  componentWillMount(){
    this.props.getEven();
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }
  componentDidMount(){
    this.props.getEven();
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }
  componentDidUpdate(){
    // this.setState({
    //   chActive : this.props.active})
  }
  onChangeInput=(k)=>{
    this.setState({
      key: k.target.value.trim(),
    });
  }
  handleChange=(event, maskedvalue, floatvalue)=>{
    this.setState({m_value: maskedvalue});
  }
  handleChangeF=(event, maskedvalue, floatvalue)=>{
    this.setState({m_valueF: maskedvalue});
  }
  onChangGn = (e)=>{
    g_name = (e.target.value);
   
    this.setState({
      gn: g_name,
    });
  }
  onChangGnEven = (e)=>{
   
    this.setState({
      gnEven: e.target.value,
    });
  }
  onChangB = (e)=>{
    //g_name = (e.target.value);
   
    this.setState({
      bet: e.target.value,
    });
  }
  onChangBEven = (e)=>{
    //g_name = (e.target.value);
   
    this.setState({
      betEven: e.target.value,
    });
  }
  add_even=()=>{
    if(this.state.key !=""){
      this.props.addEven(this.state.gn,this.state.key,this.state.bet);
      this.setState({activePage:1})
      
    }else{
      message.error("Nhập đầy đủ thông tin !")
    }
  }
  onChange = (page) => {
    this.setState({
      activePage: page,
    });
  }
  onChangeEven = (page) => {
    this.setState({
      activePageEven: page,
    });
  }
  convertTime (time){
    var d = new Date(time),
    yyyy = d.getFullYear(),
    mm = ('0' + (d.getMonth() + 1)).slice(-2),
    dd = ('0' + d.getDate()).slice(-2),
    hh = ('0' + d.getHours()).slice(-2),
    min = ('0' + d.getMinutes()).slice(-2),

    result, time;
    time = hh + ':' + min;
    const date =   dd+ '/' + mm + '/'+ yyyy ;
    result =date+" "+ time ;
    return result;
  }
  formatMoney(price){
    var strPrice = price+'';
    var a = strPrice.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')+ ' King';
    return a;
  }
  onChangeActive=(checked)=>{
    if(checked){
      this.setState({chActive:true});
      this.props.activeEven("activeNH")
    }else{
      this.setState({chActive:false});
      this.props.activeEven("deactiveNH") 
    }
   
  }
  showConfirm=(id)=>{
    this.setState({
      del: true,
      id : id,
    });
  }
  ok=()=>{
   if(this.state.id){
    this.props.delEven(this.state.id);    
   }    
    this.cancel();
  }
  cancel=()=>{
    this.setState({
      del: false,
    });
  }

  
  onChangeCurrent=(event)=> {
    this.setState(
      {m_value: event.target.rawValue},
    );
    // raw value
    //console.log("2",event.target.rawValue);
}
onChangeCurrentFund=(event)=> {
  // formatted pretty value
  // console.log("1",event.target.value);
  this.setState(
    {m_valueF: event.target.rawValue},
  );
  // raw value
  //console.log("2",event.target.rawValue);
}
  render() {
    var content = false;
    var itemsPerPage = 10;
    var total_item = 0; 
    var page = false;
    var item = false;
    var txtActive = false;
    var activeContent = false;
    var tab1 = false;
    var tab2 = false;
    var contentEven = false;
    var pageEven = false;
    var total_item_even = false;
    var itemEven =false;
    var option = false;
    if(this.props.suggest_data){
    
      var options_suggest = false;     
        options_suggest = this.props.suggest_data.map((r,index)=>{    
          return(          
               <Option 
                 key={r} 
                 value={r}                  
                 style={{background:'#ecf6fd'}}
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
        onSelect={this.onSelect}
        refs="selectSuggest"
      >
        {options_suggest}
      </Select>
     )
    var menu = (
      <ul style={{ border: "1px solid #e2e2e2",borderRadius: 5,width: 150,background: "#f7f7f7",color: "#404040"}} prefixCls ="">
        <li key="1" onClick={this.setEvenValue} style={{padding:10,background:'#e2e2e2'}}>Set giá trị hũ</li>
        <li key="2" onClick={this.setFundValue} style={{padding:10}}> Set giá trị quỹ</li>
      </ul>  
    )
    if(this.props.isGet){
      content=(
        <center>
          <img src={require('images/loading.gif')} style={{width:100,height:100}}/>
        </center>  
      )
    }else{
      if(this.props.active){
        
        activeContent=(
          <div style={{marginLeft:'2%',marginTop:'2%'}}>
            <h3 style={{marginBottom:'1%'}}>Hệ thống đang ở trạng thái <span style={{color:'#FF9800'}}>đã</span> active nổ hũ</h3>
            <Switch onChange={this.onChangeActive} checked={true}/>
          </div>  
        )
      }else{
        activeContent=(
          <div style={{marginLeft:'2%',marginTop:'2%'}}>
            <h3 style={{marginBottom:'1%'}}>Hệ thống đang ở trạng thái <span style={{color:'red'}}>chưa</span> active nổ hũ</h3>
            <Switch onChange={this.onChangeActive} checked={false} />
          </div>  
        )
      }
      if(this.props.data && this.props.data.length > 0){
        total_item = this.props.data.length;
        page =(
          <div style={{margin: '2% 2%'}}>
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
          var status = false;
          var noHuId = false;
          var gId = false;
          var itemDel = false;
          switch(row.gameId){
            case 1 :{
              gId ="Minipoker";
              break;
            }
            case 2 :{
              gId ="Quán ăn";
              break;
            }
            case 3 :{
              gId ="Lương sơn";
              break;
            }
            case 4 :{
              gId ="Cổ mộ";
              break;
            }
            case 5 :{
              gId ="Cao bồi";
              break;
            }
          }
          switch(row.status){
            case 0 :{
              status = (<div style={{background:'green',padding:5,borderRadius:10,color:'white',width:'max-content'}}>Chưa nổ hũ</div>);
              noHuId = "";
              itemDel = (
                  
                    <Button type="danger" ghost onClick={(id)=>this.showConfirm(row.id)} style={{width:50,height:30}}>Xóa</Button>
                  
               );
             
              break;
            }
            case 2 :{
              status = (<div style={{background:'#FF9800',padding:5,borderRadius:10,color:'white',width:'max-content'}}>Đã nổ hũ</div>)
              noHuId = row.noHuId;            
              break;
            }
            case 1 :{
              status = (<div style={{background:'red',padding:5,borderRadius:10,color:'white',width:'max-content'}}>Đã xóa</div>)
              noHuId = "";            
              break;
            }
          }      
          if(index >= (this.state.activePage-1) *itemsPerPage && index < (this.state.activePage) *itemsPerPage ){
            return(
              <tr key={index} >
                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,}}>{row.approver}</td>
                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,}}>{row.nickName}</td>
                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'-webkit-center',padding:5,}}>{status}</td>
                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>{gId}</td>
                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>{noHuId}</td>
                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>{this.formatMoney(row.betValue)}</td>
                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>{this.convertTime(row.createTime)}</td>
                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>
                {itemDel}
                </td>
               
              </tr>  
            )
          }
          
        })
        content = (
          <table style={{width:'97%',marginTop:'1%',marginLeft:'1%'}}>
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
            Bạn có muốn xóa không ?
          </Modal>
            <tbody>
              <tr style={{background:'rgb(236, 246, 253)',fontStyle:'italic'}}>
                <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Người thêm even</th>
                <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>User được nổ hũ</th>
                <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>Trạng thái</th>
                <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>Tên game</th>
                <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>ID lượt chơi</th>
                <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>Mức cược</th>
                <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Thời gian tạo</th>
                <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Action</th>
              </tr>
              {item}
            </tbody>  
          </table> 
        )
      }else{
        content =(
          <h3 style={{marginLeft:'3%',marginTop:'2%'}}>Không có dữ liệu ! </h3>        
          
        )
      }
    }
    
//---------------------------------------------------
   
    tab1 = (
      <div>
        <h3 style={{marginLeft:'3%',marginTop:'1%'}}>Thêm user nhận thưởng nổ hũ</h3>
        <table style={{marginLeft:'5%',marginTop:'2%'}}>
           <tbody>
             
            <tr>
              <td>
                <select id="gn" onChange={(e)=>this.onChangGn(e)}
                  value={this.state.gn}
                  style={{marginLeft:'1%',height:'35px',width:120,border:'1px solid #e2e2e2',borderRadius:'5px',background:'white'}}>                
                  <option value={1}>Minipoker</option>
                  <option value={2}>Quán ăn</option>
                  <option value={3}>Lương sơn</option>
                  <option value={4}>Cổ mộ</option>
                  <option value={5}>Cao bồi</option>
     
                </select>
              </td>
              <td style={{width:10}}/>
              <td>
                {/* <Input placeholder="Nhậ­p nickname" style={{height:35,width:120}} 
                onChange={this.onChangeInput}/> */}
                {manager}
              </td>
              <td style={{width:10}}/>
              <td>
                <Button icon="user-add" style={{height:35,width:35,fontSize:18}}
                    onClick={this.add_even}
                  >
                  
                </Button>
              </td>
            </tr>    
            <tr style={{height:10}}/>        
            <tr>
              <td style={{textAlign:'right'}}>
                 Mức cược : 
              </td>
              <td style={{width:10}}/>
              <td>
                <select id="b" onChange={(e)=>this.onChangB(e)}
                  value={this.state.bet}
                  style={{marginLeft:'1%',height:'35px',width:120,border:'1px solid #e2e2e2',borderRadius:'5px',background:'white'}}>                
                  <option value={100}>100</option>
                  <option value={1000}>1000</option>
                  <option value={10000}>10000</option>
     
                </select>
              </td>
              <td style={{width:10}}/>
              <td>
                
              </td>
            </tr>            
            </tbody>  
          </table>
        
        {txtActive}
        {activeContent}
          
        <div style={{marginLeft:'1%',marginTop:'2%'}}>
        <h3 style={{marginLeft:'1%'}}>Danh sách user </h3>        
        <div style={{overflow:'auto'}}>
          {content}
        </div>  
        </div>
        {page}
      </div>
    )
  
    return (
      <div>
       {tab1}
      </div>  
    );
  }
}

Even.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isGet: selectisGet(),
  data : selectData(),
  active : selectActive(),
  suggest_data : selectSuggestData(),

});

function mapDispatchToProps(dispatch) {
  return {
    getEven:()=>dispatch(getEven()),
    addEven:(gid,un,b)=>dispatch(addEven(gid,un,b)),
    delEven:(id)=>dispatch(delEven(id)),
    activeEven:(t)=>dispatch(activeEven(t)),
    suggest_user_by_nickname:(key)=>dispatch(suggest_user_by_nickname(key)),

    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Even);
