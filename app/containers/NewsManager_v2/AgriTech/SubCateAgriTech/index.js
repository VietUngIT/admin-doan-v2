/*
 *
 * SubCateAgriTech
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import styles from './styles';
import CsubCateAgriTech from 'components/CNewsManage_V2/CAgriTech/CsubCateAgriTech'
import {
  getListSubCate,
  addSubCate,
  delSubCate,
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
      <div style={styles.wrapcontent}>
        <div style={styles.inlineWrapContent}>
          <div style={styles.header}>Danh mục con</div>
          <div style={styles.content}>
            <CsubCateAgriTech listSubCate={this.props.listSubCate} addSubCate={this.props.addSubCate} 
              delSubCate={this.props.delSubCate} idCate={this.props.params.id_cate_news}/>
          </div>
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
});

function mapDispatchToProps(dispatch) {
  return {
    getListSubCate: (id) => dispatch(getListSubCate(id)),
    addSubCate: (id,name) => dispatch(addSubCate(id,name)),
    delSubCate: (id) => dispatch(delSubCate(id)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SubCateAgriTech);
