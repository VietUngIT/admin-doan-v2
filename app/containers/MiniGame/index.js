/*
 *
 * MiniGame
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import messages from './messages';

import {
  search_mini_game,
  search_mini_id,
} from './actions';
import {
  selectData,
  selectisLoad,
  selectDataId,
  selectisLoadId,
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
} from 'antd';
import {withRouter} from 'react-router' ;
import moment from 'moment';
import MiniName from 'components/MiniName';
import MiniId from 'components/MiniId';
import { selectSuggestData } from '../App/selectors';
import { suggest_user_by_nickname } from '../App/actions';
const TabPane = Tabs.TabPane;
export class MiniGame extends React.Component { 

  render() {
    
    return (
      <div style={{width:'100%',height:'100%'}}>
       
          <Tabs defaultActiveKey="1" >
            <TabPane tab="Tìm theo nick name" key="1">
              <MiniName load={this.props.load} data={this.props.data} search_mini_game={this.props.search_mini_game} suggest_data={this.props.suggest_data}
              suggest_user_by_nickname={this.props.suggest_user_by_nickname}/>
            </TabPane>
            <TabPane tab="Tìm theo ID" key="2">
              <MiniId load={this.props.loadId} data={this.props.dataId} search_mini_id={this.props.search_mini_id}/>
            </TabPane>
          </Tabs>
        </div> 
    );
  }
}

MiniGame.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  data:selectData(),
  load : selectisLoad(),
  dataId:selectDataId(),
  loadId:selectisLoadId(),
  suggest_data : selectSuggestData(),
});

function mapDispatchToProps(dispatch) {
  return {
    search_mini_game:(un,gn,st,et)=>dispatch(search_mini_game(un,gn,st,et)),
    search_mini_id:(id,gn)=>dispatch(search_mini_id(id,gn)),
    suggest_user_by_nickname:(key)=>dispatch(suggest_user_by_nickname(key)),

    dispatch,
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MiniGame));
