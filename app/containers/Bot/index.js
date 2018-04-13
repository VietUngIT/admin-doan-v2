/*
 *
 * Bot
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
// import makeSelectBot from './selectors';
import messages from './messages';
import { Tabs } from 'antd';
import AddBot from 'components/AddBot';
import AddBotMoney from 'components/AddBotMoney';
import {
  addBot,
  addBotMoney,
}from './actions';
import {
  selectDataBot,
  selectDataMoney,
  selectIsAddMoney,
  selectIsAddBot
}from './selectors';
const TabPane = Tabs.TabPane;

export class Bot extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Tabs defaultActiveKey="1" >
          <TabPane tab="Thêm Bot" key="1">
            <AddBot addBot={this.props.addBot} dataBot={this.props.dataBot} isAdd={this.props.isAddBot}/>
          </TabPane>
          <TabPane tab="Thêm tiền cho Bot" key="2">
            <AddBotMoney addBotMoney={this.props.addBotMoney} dataMoney={this.props.dataMoney} isAdd={this.props.isAddMoney}/>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

Bot.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  dataBot: selectDataBot(),
  dataMoney: selectDataMoney(),
  isAddMoney : selectIsAddMoney(),
  isAddBot : selectIsAddBot(),
});

function mapDispatchToProps(dispatch) {
  return {
    addBot:(bu,bn,m)=>dispatch(addBot(bu,bn,m)),
    addBotMoney:(bn,m)=>dispatch(addBotMoney(bn,m)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Bot);
