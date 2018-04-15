/*
 *
 * ListNews
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import messages from './messages';
import ListNewByCate from 'components/item/ListNewByCate'
import {selectNameCategoryGetListNews} from '../ManagerNews/selectors'
import { Tooltip, Icon, Pagination } from 'antd';
import {
  getListNewsByidCate,
} from './actions';
import {
  selectListNews,
  selectTotalItemNews,
  selectPageNews,
} from './selectors';
export class ListNews extends React.Component { 
  componentWillMount(){
    this.props.getListNewsByidCate(this.props.params.id_cate_news,0);
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.params.id_cate_news!==this.props.params.id_cate_news){
      this.props.getListNewsByidCate(nextProps.params.id_cate_news,0);
    }
  }
  onChange=(page)=>{
    this.props.getListNewsByidCate(this.props.params.id_cate_news,page-1);
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
      <div style={{width: "70%",}}>
        <ListNewByCate  back={false} nameCate={this.props.nameCate} totalItem={this.props.totalItem} curentPage={this.props.curentPage}
          listNewsByCate={this.props.listNewsByCate}/>
          <div>
            {page}
          </div>
      </div>
    );
  }
}

ListNews.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  listNewsByCate: selectListNews(),
  nameCate: selectNameCategoryGetListNews(),
  totalItem: selectTotalItemNews(),
  curentPage: selectPageNews(),
});

function mapDispatchToProps(dispatch) {
  return {
    getListNewsByidCate: (id,page)=> dispatch(getListNewsByidCate(id,page)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListNews);
