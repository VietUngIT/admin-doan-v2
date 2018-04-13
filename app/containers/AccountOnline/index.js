/*
 *
 * AccountOnline
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { selectData, selectIsLoading, selectDataGet, selectIsGetting, selectTotalPage } from './selectors';
import messages from './messages';
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
import { search_user_online, get_user_online, get_user_online_success, search_user_online_success } from './actions';
const TabPane = Tabs.TabPane;
import TabOnline from 'components/TabOnline';
import TabOnlineByGame from 'components/TabOnlineByGame';
export class AccountOnline extends React.Component { 

  render() {
  
    return (
      <div>
        <Tabs defaultActiveKey="1"  style={{marginLeft:'2%',marginTop:10}} type="card">
          <TabPane tab="Thống kê tài khoản online" key="1">
            <TabOnline data={this.props.data_get} isLoading={this.props.isGetting} get_user_online={this.props.get_user_online}
              get_user_online_success={this.props.get_user_online_success}
            />             
          </TabPane>
          <TabPane tab="Thống kê tài khoản online theo game" key="2" >
            <TabOnlineByGame  data={this.props.data} isLoading={this.props.isLoading} search_user_online={this.props.search_user_online} 
            total_page={this.props.total_page} search_user_online_success={this.props.search_user_online_success}
            /> 
          </TabPane>
        </Tabs>
        
      </div>
    );
  }
}

AccountOnline.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  data: selectData(),
  data_get: selectDataGet(),
  isGetting: selectIsGetting(),
  isLoading : selectIsLoading(),
  // total_page : selectTotalPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    search_user_online:(uname,nname,gid)=>dispatch(search_user_online(uname,nname,gid)),
    get_user_online:()=>dispatch(get_user_online()),
    get_user_online_success:(data)=>dispatch(get_user_online_success(data)),
    search_user_online_success:(data)=>dispatch(search_user_online_success(data)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountOnline);
