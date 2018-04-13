/*
 *
 * CountDau
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import messages from './messages';
import { selectData, selectTotalPageDPU,selectTotalPageDAU, selectDPU, selectIsLoading, selectDataNow, selectTotalPageDPUNow, selectTotalPageDAUNow, selectDPUNow, selectIsLoadingNow, selectIsLoadDAU } from './selectors';
import { count_dau, count_dpu_success, count_dau_now, count_dpu_now_success, is_load_dau } from './actions';
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
} from 'antd';
const format = 'HH:mm:ss';
import moment from 'moment';
import Daunow from 'components/Daunow';
import Dauhistory from 'components/Dauhistory';
import {Bar,Line,Pie} from 'react-chartjs-2';
import { Link,browserHistory } from 'react-router';
const TabPane = Tabs.TabPane;

export class CountDau extends React.Component { 
  componentWillMount=()=>{
    // this.props.count_dau_now(1);
    setInterval(() => {
      this.props.count_dau_now(1);
      },  300000);
  }
  render() {
 
    return (
      <div>
         
        <Tabs defaultActiveKey="1"  style={{marginLeft:'2%',marginTop:10}} type="card">
          <TabPane tab="DAU hiện tại" key="1">
            <Daunow
              data={this.props.dataNow}
              isLoading={this.props.isLoadingNow} 
              count_dau={this.props.count_dau_now} 
              count_dpu_success={this.props.count_dpu_now_success}
              dpu={this.props.dpuNow} 
              is_load_dau={this.props.is_load_dau}
              total_page_dpu={this.props.total_page_dpu_now}
              total_page_dau={this.props.total_page_dau_now}
              isLoadDAU={this.props.isLoadDAU}
              
            />             
          </TabPane>
          <TabPane tab="Lịch sử DAU" key="2" >
            <Dauhistory  
              data={this.props.data}
              isLoading={this.props.isLoading} 
              count_dau={this.props.count_dau} 
              count_dpu_success={this.props.count_dpu_success}
              dpu={this.props.dpu} 
              total_page_dpu={this.props.total_page_dpu}
              total_page_dau={this.props.total_page_dau}
              is_load_dau={this.props.is_load_dau}
              isLoadDAU={this.props.isLoadDAU}
            /> 
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

CountDau.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  data: selectData(),
  total_page_dpu : selectTotalPageDPU(),
  total_page_dau : selectTotalPageDAU(),
  dpu : selectDPU(),
  isLoading : selectIsLoading(),

  dataNow: selectDataNow(),
  total_page_dpu_now : selectTotalPageDPUNow(),
  total_page_dau_now : selectTotalPageDAUNow(),
  dpuNow : selectDPUNow(),
  isLoadingNow : selectIsLoadingNow(),
  isLoadDAU : selectIsLoadDAU(),
});

function mapDispatchToProps(dispatch) {
  return {
    count_dau:(st,et,page)=>dispatch(count_dau(st,et,page)),
    count_dpu_success:(data)=>dispatch(count_dpu_success(data)),
    count_dau_now:(page)=>dispatch(count_dau_now(page)),
    count_dpu_now_success:(data)=>dispatch(count_dpu_now_success(data)),
    is_load_dau:(value)=>dispatch(is_load_dau(value)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CountDau);
