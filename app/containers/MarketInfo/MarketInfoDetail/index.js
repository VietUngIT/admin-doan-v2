/*
 *
 * MarketInfoDetail
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import messages from './messages';
import ListNewsMk from 'components/CMarketInfo/ListNewsMk';
import CmarketInfoDetail from 'components/CMarketInfo/CmarketInfoDetail';
import { Tooltip, Icon, Pagination } from 'antd';
import {
  getListNewsMK,
  setIdNewsMK,
  getListCateNewsMK,
  editNewsMK,
  deleteNewsMK,
  changeTitleNewsMK,
  changeAuthorNewsMK,
  changeSourceNewsMK,
  changeIdCateNewsMK,
  changeImageNewsMK,
  editImageNewsMK,
  edittagsNewsMK,
  submitEditNewsMK,
  addNewsMK,
  changeContentNewsMK,
} from './actions';
import {
  selectListNewsMK,
  selectPageNews,
  selectTotalItemNews,
  selectgetListCateNewsMK,
  selectEditNewsMK,
  selectImageEditNewsMK,
  selectErrorCodeMK,
} from './selectors';

export class MarketInfoDetail extends React.Component { 
  componentWillMount(){
    this.props.setIdNewsMK(this.props.params.id_news)
    this.props.getListNewsMK(this.props.params.id_cate_news,0);
    if(!(this.props.listCate && (this.props.listCate.size>0 || this.props.listCate.length>0))){
      this.props.getListCateNewsMK();
    }
  }
  componentWillReceiveProps(nextProps){
    if(this.props.params.id_cate_news!==nextProps.params.id_cate_news){
      this.props.getListNewsMK(this.props.params.id_cate_news,0);
    }
    if(this.props.params.id_news !== nextProps.params.id_news){
      if(this.props.litNewsMK && (this.props.litNewsMK.size>0 || this.props.litNewsMK.length>0)){
        this.props.litNewsMK.map((item)=>{
          if(item.id===nextProps.params.id_news){
            this.props.editNewsMK(item.title,item.author,item.source,item.idCateNews,item.content)
          }
        });
      }
    }
  }
  onChange=(page)=>{
    this.props.getListNewsMK(this.props.params.id_cate_news,page-1);
  }
  render() {
    let page = null;
    var news = false;
    page =(
      <div style={{margin: '2% 5%'}}>
        <div style={{display: 'inline-block',float: 'left',paddingRight: '3%'}}>
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
    if(this.props.litNewsMK && (this.props.litNewsMK.size>0 || this.props.litNewsMK.length>0)){
      news = this.props.litNewsMK.filter((item)=>{
        if(item.id===this.props.params.id_news){
          return item;
        }
      });
    }
    let newsInfo = null;
    if(news && (news.size>0 || news.length>0)){
      newsInfo = <CmarketInfoDetail data={news} listCate={this.props.listCate} infoEditNews={this.props.infoEditNews} deleteNewsMK={this.props.deleteNewsMK}
        changeTitleNewsMK={this.props.changeTitleNewsMK} changeAuthorNewsMK={this.props.changeAuthorNewsMK}
        changeSourceNewsMK={this.props.changeSourceNewsMK} changeIdCateNewsMK={this.props.changeIdCateNewsMK}
        changeContentNewsMK={this.props.changeContentNewsMK} changeImageNewsMK={this.props.changeImageNewsMK}
        imageEdit={this.props.imageEdit} editImageNewsMK={this.props.editImageNewsMK}
        edittagsNewsMK={this.props.edittagsNewsMK} submitEditNewsMK={this.props.submitEditNewsMK}
        addNewsMK={this.props.addNewsMK} errorCode={this.props.errorCode}/>;
    }
    return (
      <div style={{width: '100%',display:'flex',flexDirection:"row"}}>
        <div style={{flex:4,}}>
          <ListNewsMk back={true} idCate={this.props.params.id_cate_news} listNewsMK={this.props.litNewsMK}/>
          <div>
            {page}
          </div>
        </div>
        <div style={{flex:6}}>
          {newsInfo}
        </div>
      </div>
    );
  }
}

MarketInfoDetail.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  litNewsMK: selectListNewsMK(),
  curentPage: selectPageNews(),
  totalItem: selectTotalItemNews(),
  listCate: selectgetListCateNewsMK(),
  infoEditNews: selectEditNewsMK(),
  imageEdit: selectImageEditNewsMK(),
  errorCode: selectErrorCodeMK(),
});

function mapDispatchToProps(dispatch) {
  return {
    setIdNewsMK: (id) => dispatch(setIdNewsMK(id)),
    getListNewsMK: (idcate,page) => dispatch(getListNewsMK(idcate,page)),
    getListCateNewsMK: () => dispatch(getListCateNewsMK()),
    editNewsMK: (title,author,source,idcate,content) => dispatch(editNewsMK(title,author,source,idcate,content)),
    deleteNewsMK: (id) => dispatch(deleteNewsMK(id)),
    changeTitleNewsMK: (title) => dispatch(changeTitleNewsMK(title)),
    changeAuthorNewsMK: (author) => dispatch(changeAuthorNewsMK(author)),
    changeSourceNewsMK: (source) => dispatch(changeSourceNewsMK(source)),
    changeIdCateNewsMK: (id) => dispatch(changeIdCateNewsMK(id)),
    changeContentNewsMK: (content) => dispatch(changeContentNewsMK(content)),
    changeImageNewsMK: (image) => dispatch(changeImageNewsMK(image)),
    editImageNewsMK: (id) => dispatch(editImageNewsMK(id)),
    edittagsNewsMK: (id,tags) => dispatch(edittagsNewsMK(id,tags)),
    submitEditNewsMK: (id,idcate) => dispatch(submitEditNewsMK(id,idcate)),
    addNewsMK: (idCateLink,title,author,image,source,tags,idcate,content) => dispatch(addNewsMK(idCateLink,title,author,image,source,tags,idcate,content)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketInfoDetail);
