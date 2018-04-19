/*
 *
 * ListMarketPrice
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import styles from './styles';
import { Row, Col, Button, Icon,Pagination } from 'antd';
import ClistMarketPrice from 'components/CNewsManage_V2/CMarketPrice/ClistMarketPrice';
import {
  getListMP,
  deleteNewsMP,
} from './actions';
import {
  selectGetListMP,
  selectPageGetListMP,
  selectTotalItemListMP,
  selectStateDelMP,
} from './selectors';

export class ListMarketPrice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // modalAddNews: false,
    }
  }
  handleShowModalAdd=()=>{
    this.setState({
      // modalAddNews: true,
    });
  }
  handleCloseModalAdd=()=>{
    this.setState({
      // modalAddNews: false,
    });
  }
  addNewsHandle=()=>{
    this.handleShowModalAdd();
  }
  componentWillMount(){
    this.props.getListMP(this.props.params.id_cate_news,0);
  }
  onChange=(page)=>{
    this.props.getListMP(this.props.params.id_cate_news,page-1);
  }
  componentWillReceiveProps(nextProps){
    if(this.props.params.id_cate_news!==nextProps.params.id_cate_news){
      this.props.getListMP(nextProps.params.id_cate_news,0);
    }
    if(this.props.delSuccess!==nextProps.delSuccess && nextProps.delSuccess===true){
      if(this.props.listNews && (this.props.listNews.size>0||this.props.listNews.length>0)){
        this.props.getListMP(this.props.params.id_cate_news,this.props.curentPage);
      }else{
        if(this.props.curentPage>0){
          this.props.getListMP(this.props.params.id_cate_news,this.props.curentPage-1);
        }
      }
    }
  }
  render() {
    let page = null;
    page =(
      <div style={{paddingRight: '3%',textAlign: 'center'}}>
        <Pagination
          style={{display: 'inline-block'}}
          total={this.props.totalItem?this.props.totalItem:0}
          pageSize={4}
          defaultCurrent={1}
          current={this.props.curentPage?this.props.curentPage+1:1}
          onChange={this.onChange}
        />
        <div style={{display:"inline-block",float:'right',border:'1px solid #c4c4c4',borderRadius:'3px',padding:'4px 10px',marginLeft:'10px',fontSize:'13px'}}>
          {this.props.curentPage+1}/{this.props.totalItem>0?(this.props.totalItem%4==0?this.props.totalItem/4:parseInt(this.props.totalItem/4)+1):0}
        </div>
    </div>
    )
    return (
      <div style={styles.wrapcontent}>
        <div style={styles.inlineWrapContent}>
          <div style={styles.header}>
            <div style={{flex: 1}}>Nội dung</div>
            <div>
              <Button type="primary" icon="plus" size='large' >Thêm mới</Button>
            </div>
          </div>
          <div style={styles.content}>
            <ClistMarketPrice listNews={this.props.listNews} deleteNewsMP={this.props.deleteNewsMP}/>
          </div>
          {page}
        </div>
      </div>
    );
  }
}

ListMarketPrice.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  listNews: selectGetListMP(),
  totalItem: selectTotalItemListMP(),
  curentPage: selectPageGetListMP(),
  delSuccess: selectStateDelMP(),
});

function mapDispatchToProps(dispatch) {
  return {
    getListMP: (id,page)=> dispatch(getListMP(id,page)),
    deleteNewsMP: (id) => dispatch(deleteNewsMP(id)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListMarketPrice);
