/*
 *
 * MoneyDetail
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import {
  selectisLoadInput,
  selectDataInput,
} from './selectors';
import {
  input_money,
} from './actions';
import messages from './messages';
import MoneySms from 'components/Money/MoneySms';
import MoneyCard from 'components/Money/MoneyCard';
import MoneyApi from 'components/Money/MoneyApi';
import MoneyBanking from 'components/Money/MoneyBanking';

export class MoneyDetail extends React.Component { 
  componentWillMount=()=>{
    this.props.input_money(this.props.params.st,this.props.params.et,this.props.params.itype,(this.props.params.un!=="all")?this.props.params.un:"");
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
    if(this.props.loadInput){
      tableInput=(
        <center>
          <img src={require('images/loading.gif')} style={{width:100,height:100}}/>
        </center>  
      )
    }else{
      if(this.props.dataInput && this.props.dataInput.length > 0){
        
          if(this.props.params.itype==="sms"){
            tableInput=(<MoneySms dataInput={this.props.dataInput} convertDate={this.convertDate} formatCurency={this.formatCurency} st={this.props.st} et={this.props.et}/>)
          }
          if(this.props.params.itype==="bank"){          
            tableInput=(<MoneyBanking dataInput={this.props.dataInput} convertDate={this.convertDate} formatCurency={this.formatCurency} st={this.props.st} et={this.props.et}/>)
          }
          if(this.props.params.itype==="card"){          
            tableInput=(<MoneyCard dataInput={this.props.dataInput} convertDate={this.convertDate} formatCurency={this.formatCurency} st={this.props.st} et={this.props.et}/>)
          }
          if(this.props.params.itype==="iap"){         
            tableInput=(<MoneyApi dataInput={this.props.dataInput} convertDate={this.convertDate} formatCurency={this.formatCurency} st={this.props.st} et={this.props.et}/>)
          }
        
          
          
      }else{
        tableInput=(<h3 style={{marginLeft:'5%',marginTop:'5%'}}>Không có dữ liệu !</h3>)
      }
    }
    return (
      <div>
        {tableInput}
      </div>
    );
  }
}

MoneyDetail.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  dataInput : selectDataInput(),
  loadInput : selectisLoadInput(),
});

function mapDispatchToProps(dispatch) {
  return {
    input_money:(date,todate,type,un)=> dispatch(input_money(date,todate,type,un)),    
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MoneyDetail);
