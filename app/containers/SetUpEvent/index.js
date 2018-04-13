/*
 *
 * SetUpEvent
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import {
 
  selectIsLoadEven,
  selectDataEven,
  selectXuLyEven,
  selectXuLyFund,
} from './selectors';
import {
 
  setFundValue,
  setEvenValue,
  getEvenValue,
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
  Spin,
} from 'antd';
import messages from './messages';
import CurrencyInput from 'react-currency-input';
import Cleave from 'cleave.js/react';
import ItemEvent from 'components/ItemEvent';
const TabPane = Tabs.TabPane;
var g_name =2;


export class SetUpEvent extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      key : "",
      gn : 2,
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
      gameName :  false,
      changed : false,
      gameNameE :  false,
      changedE : false,
    };
  }
  updateDimensions() {
    if(window.innerWidth < 760) {
     this.setState({isMobile: true,});
    } else {
     this.setState({isMobile: false,});
    }
  }

  componentWillMount(){
    this.props.getEvenValue();
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }
  componentDidMount(){
    this.props.getEvenValue();
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

  onChangeCurrentFund=(gname)=>{
    // console.log("onChangeNumber --> : ",id)
    this.setState({gameName : gname})
    this.setState({changed : true})
    
  }
  onChangeCurrent=(gname)=>{
    // console.log("onChangeNumber --> : ",id)
    this.setState({gameNameE : gname})
    this.setState({changedE : true})
    
  }
  render() {
    var tab2 = false;
    var option = false;
    var contentEven = false;
    var pageEven = false;
    var total_item_even = false;
    var itemEven =false;
    var itemsPerPage = 15;
    var xlEvent = false;
    var xlFund = false;
    var waiting = false;
    if(this.props.xulyEven || this.props.xulyFund){
      waiting=(
        <center>
          <div>Đang xử lý</div>
          <img src={require('images/loading1.gif')} style={{width:50,height:25}}/>
        </center>  
      )
    }
    if(this.state.gnEven == 6){
      option=(
        <select id="b" onChange={(e)=>this.onChangBEven(e)}
          value={this.state.betEven}
          style={{marginLeft:'1%',height:'35px',width:120,border:'1px solid #e2e2e2',borderRadius:'5px',background:'white'}}>                
          {option}
            <option value={1000}>1000</option>
            <option value={10000}>10000</option>
            <option value={50000}>50000</option>
            <option value={100000}>100000</option>
            <option value={500000}>500000</option>          

        </select>         
      )
    }else{
      option=(
        <select id="b" onChange={(e)=>this.onChangBEven(e)}
          value={this.state.betEven}
          style={{marginLeft:'1%',height:'35px',width:120,border:'1px solid #e2e2e2',borderRadius:'5px',background:'white'}}>                
          {option}
            <option value={100}>100</option>
            <option value={1000}>1000</option>
            <option value={10000}>10000</option>  
           
        </select>
      )
    }
    
    if(this.props.isLoadeven){
      contentEven=(
        <center>
          <img src={require('images/loading.gif')} style={{width:100,height:100}}/>
        </center>  
      )
    }else{
      if(this.props.dataEven && this.props.dataEven.length>0){
        // console.log("data_even:",this.props.dataEven)
        total_item_even = this.props.dataEven.length;
        pageEven =(
          <div style={{margin: '2% 3%'}}>
            <div style={{display: 'inline-block'}}>
              <Pagination
                style={{display: 'inline-block'}}
                total={total_item_even?total_item_even:0}
                pageSize={itemsPerPage}
                defaultCurrent={1}
                current={this.state.activePageEven}
                onChange={this.onChangeEven}
              />
              <div style={{display:total_item_even?"inline-block":'none',float:'right',border:'1px solid #c4c4c4',borderRadius:'3px',padding:'4px 10px',marginLeft:'10px',fontSize:'13px'}}>
                {this.state.activePageEven}/{total_item_even>0?(total_item_even%itemsPerPage==0?total_item_even/itemsPerPage:parseInt(total_item_even/itemsPerPage)+1):0}
  
              </div>
            </div>
          </div>
        )
        itemEven = this.props.dataEven.map((row,index)=>{          
          
          if(index >= (this.state.activePageEven-1) *itemsPerPage && index < (this.state.activePageEven) *itemsPerPage ){
            return(
             <ItemEvent 
                row={row}
                key={index}
                isMobile={this.state.isMobile}
                setEvenValue={this.props.setEvenValue}
                setFundValue={this.props.setFundValue}
                changed={this.state.changed}
                gameName={this.state.gameName} 
                changedE={this.state.changedE}
                gameNameE={this.state.gameNameE} 
                onChangeCurrentFund={(gname)=>this.onChangeCurrentFund(gname)}
                onChangeCurrent={(gname)=>this.onChangeCurrent(gname)}
             /> 
            )
          }
        })
        contentEven=(
          <table style={{width:'95%',marginLeft:'2%'}}>       
            <tbody>
              <tr  style={{background:'rgb(236, 246, 253)',fontStyle:'italic'}}>
                <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Tên game</th>
                <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Giá trị quỹ</th>
                <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>Cộng quỹ</th>
                <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Giá trị hũ</th>
                <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>Cộng hũ</th>
               
              </tr>
              {itemEven}
           </tbody>  
          </table> 
        )
      }else{
        contentEven=(
          <table style={{width:'95%',marginLeft:'2%'}}>       
            <tbody>
              <tr  style={{background:'rgb(236, 246, 253)',fontStyle:'italic'}}>
                <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Tên game</th>
                <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Giá trị quỹ</th>
                <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>Cộng quỹ</th>
                <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Giá trị hũ</th>
                <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>Cộng hũ</th>
               
              </tr>
              <tr >
                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}} colSpan={5}>Không có dữ liệu</td>
              </tr>  
           </tbody>  
          </table> 
        )
      }
    }
    tab2 = (
      <div>
        <h3 style={{marginLeft:'3%',marginTop:'1%'}}>Setup giá trị hũ và quỹ</h3>            
        <div style={{marginLeft:'5%',width:'90%',height:(this.props.xulyEven||this.props.xulyFund)?50:0}}>
          {waiting}
        </div>
        <div style={{marginLeft:'1%',marginTop:'2%',overflow:'auto'}}>
        
        {contentEven}
        </div>
        {pageEven}
      </div>
    )
    return (
      <div>
       {tab2}
      </div>
    );
  }
}

SetUpEvent.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isLoadeven :  selectIsLoadEven(),
  dataEven : selectDataEven(),
  xulyEven : selectXuLyEven(),
  xulyFund : selectXuLyFund(),
});

function mapDispatchToProps(dispatch) {
  return {
    getEvenValue:()=>dispatch(getEvenValue()),
    setEvenValue:(gid,b,v)=>dispatch(setEvenValue(gid,b,v)),
    setFundValue:(gid,b,v)=>dispatch(setFundValue(gid,b,v)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SetUpEvent);
