/*
 *
 * SumTx
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import {} from './selectors';
import {
  set_bet_sum,
} from './actions';
import messages from './messages';
import CurrencyInput from 'react-currency-input';
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

export class SumTx extends React.Component { 
  constructor(props){
    super(props);
    this.state={
      m_value : "",
    };
  }
  handleChange=(event, maskedvalue, floatvalue)=>{
    this.setState({m_value: maskedvalue});
  }
  onClick=()=>{
    if(this.state.m_value){
      this.props.set_bet_sum(this.state.m_value.split(".").join(""));
    }else{
      message.error("Nhập đầy đủ thông tin !")
    }
  }
  render() {
    var contentAdd = (
      <div style={{marginLeft:'3%',marginTop:'2%'}}>
        <span style={{fontSize:13,marginBottom:'3%'}}>Nhập lượng tiền cược:</span><br/>
        <CurrencyInput
          style={{height:35,width:200,marginRight:10,border:'1px solid #e2e2e2',textAlign:'right',padding:5,borderRadius:5}}
          value={this.state.m_value} 
          onChangeEvent={this.handleChange} 
          precision={0} 
          thousandSeparator={"."} />
        <Button icon="plus" style={{height:35,marginRight:20,marginTop:'1%'}} onClick={this.onClick}>Cập nhật</Button>            
      </div>  
    )
    return (
      <div>
        {contentAdd}
      </div>
    );
  }
}

SumTx.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
});

function mapDispatchToProps(dispatch) {
  return {
    set_bet_sum :(bet)=>dispatch(set_bet_sum(bet)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SumTx);
