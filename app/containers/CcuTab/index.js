/*
 *
 * CcuTab
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import messages from './messages';
import Ccu from 'components/Ccu';
import {onchange_stime,
        onchange_etime,
        search_current,
        search_history,
  } from './actions';
  import {
    count_card,
    count_dl,
} from '../App/actions';
import {
  selectCcuLog,
  selectCcuHis,
  } from './selectors';
import {withRouter} from 'react-router' ;
import { callAPiCountTranfer } from '../../utils/request';
export class CcuTab extends React.Component {
 
  constructor(props) {
    super(props);
    this.state={
      chartCCu:false,
      chartHis :false,
    }
  }
  
  componentDidMount(){
   
    
    
    setInterval(() => {
    this.props.search_history();
    }, 1800000);

    setInterval(() => {
      this.props.search_current();
      
      }, 5000);
  } 
  componentWillMount(){
    
   this.props.search_history();
    this.props.search_current();
    // console.log("componentWillMount",parseInt(localStorage.getItem('role')))
    let sessionKey = localStorage.getItem('sessionkey');
    let userInfo = localStorage.getItem('userInfo');
    var iconLeft = null;
    let nn = false;
    if(localStorage.getItem('userInfo')){
      let length = localStorage.getItem('userInfo').length;
      nn = userInfo.substr(1,length-2);
    }
    if(localStorage.getItem('role') && parseInt(localStorage.getItem('role'))!==4){ 
      try{
        return callAPiCountTranfer(nn,sessionKey)
        .then(function(response) {
  
            if(response.data.e==0)
            {
              if(response.data.topup){
                this.props.count_card(response.data.topup)
  
              }else{
                this.props.count_card(0)
                
              }
              if(response.data.transfer){
                this.props.count_dl(response.data.transfer)
  
              }else{
                this.props.count_dl(0)
                
              }
            }
          }.bind(this));
        }catch(err){
  
         
        }
      }
    
  }
  
  render() {
    // console.log(this.props.ccuLog)
    return (
      <div>
        <Ccu onChangeSTime={this.props.onchange_stime} 
             onChangeETime={this.props.onchange_etime}
             search_current={this.props.search_current}
             search_history={this.props.search_history}
             ccuLog = {this.props.ccuLog}
             ccuHis = {this.props.ccuHis}
             chartCCu = {this.state.chartCCu}
             chartHis = {this.state.chartHis}
        />
      </div>
    );
  }
}

CcuTab.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  ccuLog : selectCcuLog(),
  ccuHis : selectCcuHis(),
});

function mapDispatchToProps(dispatch) {
  return {
    onchange_stime:(evt)=> dispatch(onchange_stime(evt.target.value.trim())),
    onchange_etime:(evt)=> dispatch(onchange_etime(evt.target.value.trim())),
    search_current:()=> dispatch(search_current()),
    search_history:()=> dispatch(search_history()),
    count_card:(count)=>dispatch(count_card(count)),
    count_dl:(count)=>dispatch(count_dl(count)),
    dispatch,
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CcuTab));
