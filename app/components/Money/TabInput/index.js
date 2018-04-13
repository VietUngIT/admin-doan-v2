/**
*
* TabInput
*
*/

import React from 'react';
// import styled from 'styled-components';
import MoneySms from 'components/Money/MoneySms';
import MoneyCard from 'components/Money/MoneyCard';
import MoneyApi from 'components/Money/MoneyApi';
import MoneyBanking from 'components/Money/MoneyBanking';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

class TabInput extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      changed : false,
      
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
    result = date ;
    return result;
  }
  
  formatCurency(price){
    var strPrice = price+'';
    var a = strPrice.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')+ ' King';
    return a;
  }
  
  render() {
    var tableInput=false;
    var print = false;
    if(this.props.isClick){
      if(this.props.loadInput){
        tableInput=(
          <center>
            <img src={require('images/loading.gif')} style={{width:100,height:100}}/>
          </center>  
        )
      }else{
        if(this.props.dataInput && this.props.dataInput.length > 0){
            if(this.props._api==="sms"){
              tableInput=(<MoneySms dataInput={this.props.dataInput} convertDate={this.convertDate} formatCurency={this.formatCurency} st={this.props.st} et={this.props.et}/>)
            }
            if(this.props._api==="bank"){          
              tableInput=(<MoneyBanking dataInput={this.props.dataInput} convertDate={this.convertDate} formatCurency={this.formatCurency} st={this.props.st} et={this.props.et}/>)
            }
            if(this.props._api==="card"){          
              tableInput=(<MoneyCard dataInput={this.props.dataInput} convertDate={this.convertDate} formatCurency={this.formatCurency} st={this.props.st} et={this.props.et}/>)
            }
            if(this.props._api==="iap"){         
              tableInput=(<MoneyApi dataInput={this.props.dataInput} convertDate={this.convertDate} formatCurency={this.formatCurency} st={this.props.st} et={this.props.et}/>)
            }
          
            
            
        }else{
          tableInput=(<h3 style={{marginLeft:'0%',marginTop:'5%'}}>Không có dữ liệu !</h3>)
        }
      }
    }
   
    return (
      <div>
        {tableInput}
          
      </div>
    );
  }
}

TabInput.propTypes = {

};

export default TabInput;
