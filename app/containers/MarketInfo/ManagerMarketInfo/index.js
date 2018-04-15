/*
 *
 * ManagerMarketInfo
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import messages from './messages';
import CcategoryMarketInfo from 'components/CMarketInfo/CcategoryMarketInfo'
import {
  getListCateNewsMK,
  getNameCateMK,
  addCateNewsMK,
  delCateNewsMK,
  editCateNewsMK,
} from './actions';
import {
  selectCategoryNewsMKList,
  selectNameCategoryNews,
} from './selectors';

export class ManagerMarketInfo extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      widthCategoryMarketInfo: 40,
      widthListNew: 60,
    };
  }
  componentWillMount(){
    this.props.getListCateNewsMK();
  }
  render() {
    return (
      <div style={{width: '100%',height: '100%'}}>
        <Helmet
          title="ManagerMarketInfo"
          meta={[
            { name: 'description', content: 'Description of ManagerMarketInfo' },
          ]}
        />
        <div style={{display: "flex",flexDirection:"collumn",height: '100%'}}>
          <CcategoryMarketInfo widthCategoryMarketInfo={this.state.widthCategoryMarketInfo} listCate={this.props.listCate} 
            addCateNewsMK={this.props.addCateNewsMK} delCateNewsMK={this.props.delCateNewsMK} editCateNewsMK={this.props.editCateNewsMK}
            getNameCateMK={this.props.getNameCateMK}/>
          {React.Children.toArray(this.props.children)}
        </div>
      </div>
    );
  }
}

ManagerMarketInfo.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  listCate: selectCategoryNewsMKList(),
  nameCate: selectNameCategoryNews(),
});

function mapDispatchToProps(dispatch) {
  return {
    getListCateNewsMK: () => dispatch(getListCateNewsMK()),
    getNameCateMK: (name) => dispatch(getNameCateMK(name)),
    addCateNewsMK: (name) => dispatch(addCateNewsMK(name)),
    delCateNewsMK: (id) => dispatch(delCateNewsMK(id)),
    editCateNewsMK: (id,name) => dispatch(editCateNewsMK(id,name)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManagerMarketInfo);
