/*
 *
 * ListNewsAgriTech
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import messages from './messages';
import {selectNameGetSubCate} from '../ManagerAgriTech/selectors'
import ClistNewsAgriTech from 'components/CNewsAgriTech/ClistNewsAgriTech'
import { Tooltip, Icon, Pagination } from 'antd';
import {
  getListNewsAgriTech,
} from './actions';
import {
  selectListNewsAgriTech,
  selectTotalItemAgriTech,
  selectPageNewsAgriTech,
} from './selectors';

export class ListNewsAgriTech extends React.Component { 
  componentWillMount(){
    this.props.getListNewsAgriTech(this.props.params.id_sub_cate,0);
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.params.id_sub_cate!==this.props.params.id_sub_cate){
      this.props.getListNewsAgriTech(nextProps.params.id_sub_cate,0);
    }
  }
  onChange=(page)=>{
    this.props.getListNewsAgriTech(this.props.params.id_sub_cate,page-1);
  }
  render() {
    let page = null;
      page =(
        <div style={{margin: '2% 5%'}}>
          <div style={{display: 'inline-block',float: 'right',paddingRight: '3%'}}>
            <Pagination
              style={{display: 'inline-block'}}
              total={this.props.totalItem?this.props.totalItem:0}
              pageSize={4}
              defaultCurrent={1}
              current={this.props.curentPage?this.props.curentPage+1:1}
              onChange={this.onChange}
            />
            <div style={{display:this.props.curentPage?"inline-block":'none',float:'right',border:'1px solid #c4c4c4',borderRadius:'3px',padding:'4px 10px',marginLeft:'10px',fontSize:'13px'}}>
              {this.props.curentPage}/{this.props.totalItem>0?(this.props.totalItem%4==0?this.props.totalItem/4:parseInt(this.props.totalItem/4)+1):0}
            </div>
          </div>
        </div>
      )
    return (
      <div style={{width: "100%",}}>
        <ClistNewsAgriTech  back={false} nameSubCate={this.props.nameSubCate} totalItem={this.props.totalItem} curentPage={this.props.curentPage}
          listNews={this.props.listNews} idCate={this.props.params.id_cate_news}/>
          <div>
            {page}
          </div>
      </div>
    );
  }
}

ListNewsAgriTech.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  listNews: selectListNewsAgriTech(),
  totalItem: selectTotalItemAgriTech(),
  curentPage: selectPageNewsAgriTech(),
  nameSubCate: selectNameGetSubCate(),
});

function mapDispatchToProps(dispatch) {
  return {
    getListNewsAgriTech: (id,page) => dispatch(getListNewsAgriTech(id,page)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListNewsAgriTech);
