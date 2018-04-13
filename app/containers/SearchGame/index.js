/*
 *
 * SearchGame
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import messages from './messages';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DetailSlot from 'components/DetailSlot'
import {
  search_by_id,
  search_by_id_name,
  search_by_user,
} from './actions';
import {
  selectDataId,
  selectDataIdName,
  selectisLoadID,
  selectDataUn,
  selectData,
  selectisLoad,
} from './selectors';
import {
  Tabs,
  Input,
  Button,
  message,
  Pagination ,
  Dropdown,
  Modal,
  Icon,
} from 'antd';
import moment from 'moment';
import {withRouter} from 'react-router' ;
import Workbook from 'react-excel-workbook';
import SearchName from 'components/SearchName';
import SearchId from 'components/SearchId';
import { selectSuggestData } from '../App/selectors';
import { suggest_user_by_nickname } from '../App/actions';

const TabPane = Tabs.TabPane;
export class SearchGame extends React.Component { 

  render() {
  
    
    
    return (
      <div>
         <Tabs defaultActiveKey="1" >
          <TabPane tab="Tìm theo nick name" key="1">
            <SearchName 
              load={this.props.load} 
              data_un={this.props.data_un} 
              data_id={this.props.data_id_name} 
              search_by_user={this.props.search_by_user} 
              search_by_id={this.props.search_by_id_name}
              suggest_data={this.props.suggest_data}
              suggest_user_by_nickname={this.props.suggest_user_by_nickname}
              />
          </TabPane>
          <TabPane tab="Tìm theo ID" key="2">
            <SearchId load={this.props.loadID} data_id={this.props.data_id} search_by_id={this.props.search_by_id}/>
          </TabPane>
        </Tabs>
        
      </div>
    );
  }
}

SearchGame.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  data_id:  selectDataId(),
  data_id_name:  selectDataIdName(),
  data_un:selectDataUn(),
  data:selectData(),
  load : selectisLoad(),
  loadID : selectisLoadID(),
  suggest_data : selectSuggestData(),
});

function mapDispatchToProps(dispatch) {
  return {
    search_by_id:(id,gn)=> dispatch(search_by_id(id,gn)),    
    search_by_id_name:(id,gn)=> dispatch(search_by_id_name(id,gn)),    
    search_by_user:(un,gn,st,et)=> dispatch(search_by_user(un,gn,st,et)),    
    suggest_user_by_nickname:(key)=>dispatch(suggest_user_by_nickname(key)),

    dispatch,
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchGame));