/*
 *
 * CateNewsEvent
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import messages from './messages';
import styles from './style';
import CcateNewsEvent from 'components/CNewsManage_V2/CNewsEvent/CcateNewsEvent'
import {
  getListCateNews,
  addCateNews,
  delCateNews,
} from './actions';
import {
  selectListCategoryNews,
} from './selectors';

export class CateNewsEvent extends React.Component {
  componentWillMount(){
    this.props.getListCateNews();
  }
  render() {
    return (
      <div style={styles.wrapcontent}>
        <div style={styles.inlineWrapContent}>
          <div style={styles.header}>Danh mục tin tức - sự kiện</div>
          <div style={styles.content}>
            <CcateNewsEvent listCategoryNews={this.props.listCategoryNews} addCateNews={this.props.addCateNews} 
            delCateNews={this.props.delCateNews}/>
          </div>
        </div>
      </div>
    );
  }
}

CateNewsEvent.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  listCategoryNews: selectListCategoryNews(),
});

function mapDispatchToProps(dispatch) {
  return {
    getListCateNews: ()=> dispatch(getListCateNews()),
    addCateNews: (categoryNews)=> dispatch(addCateNews(categoryNews)),
    delCateNews: (id)=> dispatch(delCateNews(id)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CateNewsEvent);
