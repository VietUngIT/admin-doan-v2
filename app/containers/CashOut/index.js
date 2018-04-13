/*
 *
 * CashOut
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';

import {
setCash,
getCash,
} from './actions';
import {
  selectMaxCash,
  selectisLoad,
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
} from 'antd';
import {withRouter} from 'react-router' ;
import CurrencyInput from 'react-currency-input';
var m = "";
var mt = "";
export class CashOut extends React.Component { 
  constructor(props){
    super(props);
    this.state={
      m_value : "",
      mt_value : "",
    };
  }
  componentDidMount(){
    this.props.getCash();
  }
  componentWillMount(){
    this.props.getCash();
  }

  handleChange=(event, maskedvalue, floatvalue)=>{
    this.setState({m_value: maskedvalue});
  }
  handleChange_t=(event, maskedvalue, floatvalue)=>{
    this.setState({mt_value: maskedvalue});
  }
  onClick =()=>{   
    if(this.state.m_value && this.state.mt_value){    
      // if(isNaN(m) || isNaN(mt)){
      //   message.error("Giá trị tiền phải là số !")
      // }else{
        this.props.setCash(this.state.m_value.split(".").join(""),this.state.mt_value.split(".").join(""));      
      // }
      this.setState(
        {m_value: ""},
      );
      this.setState(
        {mt_value: ""}
      );
    }
    else{
      message.error("Nhập đầy đủ thông tin !")
    }
  }
  formatCard(price){
    var strPrice = price+'';
    var a = strPrice.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    return a;
  }
  render() {
    var m1 = false;
    var mt1 = false;
    var approver = false;
    var content = false;
    if(this.props.loading){
      content=(
        <center>
          <img src={require('images/loading.gif')} style={{width:100,height:100}}/>
        </center>  
      )
    }else{
      if(this.props.max_cash){
        this.props.max_cash.map((row,index)=>{
          if(index==0){
            m1= row.maxCashOut;
            mt1 = row.maxCashOutTotal;
            approver = row.approver;
          }
         return ;
        })
        content = (
          <div style={{marginLeft :'5%',marginTop:'3%',fontSize:14}}>
            <div >
              Số tiền tối đa một user được rút trong một ngày hiện tại : <b>{this.formatCard(m1)}</b>
            </div>
            <div style={{marginTop:'2%'}}>
              Số tiền tối đa tất cả các user được rút trong một ngày hiện tại : <b>{this.formatCard(mt1)}</b>
            </div>   
            <div style={{marginTop:'2%'}}>
              Người cập nhật : <b>{approver}</b>
            </div>
          </div>  
        )    
      }else{
        content= (<h3 style={{marginTop:'3%',marrginLeft:'5%'}} >Không có dữ liệu</h3>)
      }
    }
    return (
      <div>
        <table style={{marginLeft:'5%',marginTop:'3%'}}>
          <tbody>          
              <tr style={{fontSize:13}}>
                <td>Số tiền tối đa một user được rút trong một ngày : </td>
              </tr>  
              <tr style={{fontSize:13}}>
                <td>
                 <CurrencyInput 
                    style={{height:35,width:'87%',marginRight:10,border:'1px solid #e2e2e2',textAlign:'right',padding:5,borderRadius:5}}
                    value={this.state.m_value} 
                    onChangeEvent={this.handleChange} 
                    precision={0} 
                    thousandSeparator={"."} />
                </td> 
              </tr>          
              <tr style={{height:20}} />
              <tr style={{fontSize:13}}>
                <td>Số tiền tối đa tất cả các user được rút trong một ngày : </td>
              </tr>  
              <tr style={{fontSize:13}}>
                <td>
                  <CurrencyInput 
                    style={{height:35,width:'87%',marginRight:10,border:'1px solid #e2e2e2',textAlign:'right',padding:5,borderRadius:5}}
                    value={this.state.mt_value} 
                    onChangeEvent={this.handleChange_t} 
                    precision={0} 
                    thousandSeparator={"."} />
                </td>  
              </tr>  
              <tr style={{height:20}} />
              
              <tr style={{marginBottom:10}}>
                <td><Button icon="setting" style={{height:35,marginRight:20}} onClick={this.onClick}>Cài đặt</Button></td>
              </tr>
          </tbody>
        </table>        
      {content}
      </div>
    );
  }
}

CashOut.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  max_cash : selectMaxCash(),
  loading : selectisLoad(),
});

function mapDispatchToProps(dispatch) {
  return {
    getCash :()=> dispatch(getCash()),
    setCash :(m,mt)=> dispatch(setCash(m,mt)),
    
    dispatch,
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CashOut));
