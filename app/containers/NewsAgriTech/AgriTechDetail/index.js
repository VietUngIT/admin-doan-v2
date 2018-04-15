/*
 *
 * AgriTechDetail
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import messages from './messages';
import { Tooltip, Icon, Pagination } from 'antd';
import ClistNewsAgriTech from 'components/CNewsAgriTech/ClistNewsAgriTech';
import CagriTechDetail from 'components/CNewsAgriTech/CagriTechDetail'
import {
  setIdNewsAgriTech,
  getListNewsAgriTech,
  getListSubCateAgriTech,
  editNewsAgriTech,
  changeTitleNews,
  changeAuthorNews,
  changeIdSubCateNews,
  changeContentNews,
  edittagsNews,
  changeImageNews,
  editImageNews,
  deleteNews,
  submitEditNews,
  addNewsAgriTech,
} from './actions';
import {
  selectListNewsAgriTech,
  selectgetListSubCateNewsAgriTech,
  selectPageNewsAgriTech,
  selectTotalItemNewsAgritech,
  selectEditNewsAgriTech,
  selectImageEditNews,
  selectErrorCodeAdAgriTech,
} from './selectors';

export class AgriTechDetail extends React.Component {
  componentWillMount(){
    this.props.setIdNewsAgriTech(this.props.params.id_news)
    this.props.getListNewsAgriTech(this.props.params.id_sub_cate,0);
    if(!(this.props.listSubCate && (this.props.listSubCate.size>0 || this.props.listSubCate.length>0))){
      this.props.getListSubCateAgriTech(this.props.params.id_cate_news);
    }
  }
  componentWillReceiveProps(nextProps){
    if(this.props.params.id_sub_cate!==nextProps.params.id_sub_cate){
      this.props.getListNewsAgriTech(this.props.params.id_sub_cate,0);
    }
    if(this.props.params.id_news !== nextProps.params.id_news){
      if(this.props.listNews && (this.props.listNews.size>0 || this.props.listNews.length>0)){
        this.props.listNews.map((item)=>{
          if(item.id===nextProps.params.id_news){
            this.props.editNewsAgriTech(item.title,item.author,item.idSubCate,item.content)
          }
        });
      }
    }
  }
  onChange=(page)=>{
    this.props.getListNewsAgriTech(this.props.params.id_sub_cate,page-1);
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
    if(this.props.listNews && (this.props.listNews.size>0 || this.props.listNews.length>0)){
      news = this.props.listNews.filter((item)=>{
        if(item.id===this.props.params.id_news){
          return item;
        }
      });
    }
    let newsInfo = null;
    if(news && (news.size>0 || news.length>0)){
      newsInfo = <CagriTechDetail data={news} listSubCate={this.props.listSubCate} infoEditNews={this.props.infoEditNews}
      changeTitleNews={this.props.changeTitleNews} changeAuthorNews={this.props.changeAuthorNews} 
      changeIdSubCateNews={this.props.changeIdSubCateNews} changeContentNews={this.props.changeContentNews}
      edittagsNews={this.props.edittagsNews} changeImageNews={this.props.changeImageNews}
      editImageNews={this.props.editImageNews} imageEdit={this.props.imageEdit} deleteNews={this.props.deleteNews}
      submitEditNews={this.props.submitEditNews} errorCode={this.props.errorCode}
      addNewsAgriTech={this.props.addNewsAgriTech}/>;
    }
    return (
      <div style={{width: '100%',display:'flex',flexDirection:"row"}}>
        <div style={{flex:4,}}>
          <ClistNewsAgriTech back={true} idCate={this.props.params.id_cate_news} listNews={this.props.listNews}
            idSubCate={this.props.params.id_sub_cate}/>
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

AgriTechDetail.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  listSubCate: selectgetListSubCateNewsAgriTech(),
  listNews: selectListNewsAgriTech(),
  curentPage: selectPageNewsAgriTech(),
  totalItem: selectTotalItemNewsAgritech(),
  infoEditNews: selectEditNewsAgriTech(),
  imageEdit: selectImageEditNews(),
  errorCode: selectErrorCodeAdAgriTech(),
});

function mapDispatchToProps(dispatch) {
  return {
    setIdNewsAgriTech: (id) => dispatch(setIdNewsAgriTech(id)),
    getListNewsAgriTech: (id,page) => dispatch(getListNewsAgriTech(id,page)),
    getListSubCateAgriTech: (id) => dispatch(getListSubCateAgriTech(id)),
    editNewsAgriTech: (title,author,idsubcate,content) => dispatch(editNewsAgriTech(title,author,idsubcate,content)),
    changeTitleNews: (title) => dispatch(changeTitleNews(title)),
    changeAuthorNews: (author) => dispatch(changeAuthorNews(author)),
    changeIdSubCateNews: (id) => dispatch(changeIdSubCateNews(id)),
    changeContentNews: (content) => dispatch(changeContentNews(content)),
    edittagsNews: (id,tags) => dispatch(edittagsNews(id,tags)),
    changeImageNews: (image) => dispatch(changeImageNews(image)),
    editImageNews: (id) => dispatch(editImageNews(id)),
    deleteNews: (id) => dispatch(deleteNews(id)),
    submitEditNews: (id,idsubcate) => dispatch(submitEditNews(id,idsubcate)),
    addNewsAgriTech: (idSubCateLink,title,author,image,tags,idsubcate,content) => dispatch(addNewsAgriTech(idSubCateLink,title,author,image,tags,idsubcate,content)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AgriTechDetail);
