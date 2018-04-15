/*
 *
 * SubCateAgriTech
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import CsubCateAgriTech from 'components/CNewsAgriTech/CsubCateAgriTech'
import messages from './messages';
import {selectNameGetSubCate} from '../../NewsAgriTech/ManagerAgriTech/selectors'
import {
  getListSubCate,
  addSubCate,
  delSubCate,
  editSubCate,
  setSubCateName,
 } from './actions';
 import {
  selectListSubCate,
 } from './selectors';

export class SubCateAgriTech extends React.Component { 
  componentWillMount(){
    this.props.getListSubCate(this.props.params.id_cate_news);
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.params.id_cate_news!==this.props.params.id_cate_news){
      this.props.getListSubCate(nextProps.params.id_cate_news);
    }
  }
  render() {
    return (
      <div style={{width:`75%`,height: '100%',display: 'flex', flexDirection: 'collumn'}}>
        <div style={{flex:40, height: '100%'}}>
          <CsubCateAgriTech idCate={this.props.params.id_cate_news} listSubCate={this.props.listSubCate} 
            nameCate={this.props.nameCate} addSubCate={this.props.addSubCate} delSubCate={this.props.delSubCate}
            editSubCate={this.props.editSubCate} setSubCateName={this.props.setSubCateName}/>
        </div>
        <div style={{flex:60, height: '100%'}}>
          {React.Children.toArray(this.props.children)}
        </div>
      </div>
    );
  }
}

SubCateAgriTech.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  listSubCate: selectListSubCate(),
  nameCate: selectNameGetSubCate(),
});

function mapDispatchToProps(dispatch) {
  return {
    getListSubCate: (id) => dispatch(getListSubCate(id)),
    addSubCate: (id,name) => dispatch(addSubCate(id,name)),
    delSubCate: (id) => dispatch(delSubCate(id)),
    editSubCate: (id,name) => dispatch(editSubCate(id,name)),
    setSubCateName: (name) => dispatch(setSubCateName(name)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SubCateAgriTech);
