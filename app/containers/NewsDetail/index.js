/*
 *
 * NewsDetail
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import messages from './messages';
import ListNewByCate from 'components/item/ListNewByCate'
import CnewsDetail from 'components/CnewsDetail'
import { Tooltip, Icon, Pagination } from 'antd';
import {
  getListNews,
  getListCateNews,
  edittagsNews,
  changeImageNews,
  editImageNews,
  changeTitleNews,
  changeShortDescNews,
  changeAuThorNews,
  changeSourceNews,
  changeIdCateNews,
  changeContentNews,
  editNews,
  setIdNews,
  deleteNews,
  submitEditNews,
  addNews,
} from './actions';
import {
  selectListNewsNews,
  selectPageNewsNews,
  selectTotalItemNewsNews,
  selectListCategoryNews,
  selectImageEditNews,
  selectTitleEditNews,
  selectEditNews,
  selectErrorCode,
} from './selectors';

export class NewsDetail extends React.Component { 
  componentWillMount(){
    this.props.setIdNews(this.props.params.id_news)
    this.props.getListNews(this.props.params.id_cate_news,0);
    
    if(!(this.props.listCate && (this.props.listCate.size>0 || this.props.listCate.length>0))){
      this.props.getListCateNews();
    }
  }
  onChange=(page)=>{
    this.props.getListNews(this.props.params.id_cate_news,page-1);
  }
  componentWillReceiveProps(nextProps){
    if(this.props.params.id_cate_news!==nextProps.params.id_cate_news){
      this.props.getListNews(this.props.params.id_cate_news,0);
    }
    if(this.props.params.id_news !== nextProps.params.id_news){
      if(this.props.listNewsByCate && (this.props.listNewsByCate.size>0 || this.props.listNewsByCate.length>0)){
        this.props.listNewsByCate.map((item)=>{
          if(item.id===nextProps.params.id_news){
            this.props.editNews(item.title,item.shortDescription,item.author,item.source,item.idCateNews,item.content)
          }
        });
      }
    }
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
    if(this.props.listNewsByCate && (this.props.listNewsByCate.size>0 || this.props.listNewsByCate.length>0)){
      news = this.props.listNewsByCate.filter((item)=>{
        if(item.id===this.props.params.id_news){
          return item;
        }
      });
    }
    let newsInfo = null;
    if(news && (news.size>0 || news.length>0)){
      newsInfo = <CnewsDetail data={news} listCate={this.props.listCate} editTagsNews={this.props.edittagsNews}
       changeImageNews={this.props.changeImageNews} editImageNews={this.props.editImageNews} imageEdit={this.props.imageEdit}
       changeShortDescNews={this.props.changeShortDescNews} changeTitleNews={this.props.changeTitleNews} infoEditNews={this.props.infoEditNews}
       changeAuThorNews={this.props.changeAuThorNews} changeSourceNews={this.props.changeSourceNews}
       changeIdCateNews={this.props.changeIdCateNews} changeContentNews={this.props.changeContentNews}
       deleteNews={this.props.deleteNews} submitEditNews={this.props.submitEditNews} addNews={this.props.addNews}
       errorCode={this.props.errorCode}/>;
    }
    return (
      <div style={{width: '100%',display:'flex',flexDirection:"row"}}>
        <div style={{flex:4,}}>
          <ListNewByCate back={true} idCate={this.props.params.id_cate_news} nameCate={this.props.nameCate} listNewsByCate={this.props.listNewsByCate}/>
          <div>
            {page}
          </div>
        </div>
        <div style={{flex:6,}}>
          {newsInfo}
        </div>
      </div>
    );
  }
}

NewsDetail.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  listNewsByCate: selectListNewsNews(),
  totalItem: selectTotalItemNewsNews(),
  curentPage: selectPageNewsNews(),
  listCate: selectListCategoryNews(),
  imageEdit: selectImageEditNews(),
  title: selectTitleEditNews(),
  infoEditNews: selectEditNews(),
  errorCode: selectErrorCode(),
});

function mapDispatchToProps(dispatch) {
  return {
    getListNews: (id,page)=> dispatch(getListNews(id,page)),
    getListCateNews:()=>dispatch(getListCateNews()),
    edittagsNews:(id,tags)=>dispatch(edittagsNews(id,tags)),
    changeImageNews: (image)=>dispatch(changeImageNews(image)),
    editImageNews: (id)=>dispatch(editImageNews(id)),
    changeTitleNews: (title)=>dispatch(changeTitleNews(title)),
    changeContentNews: (content)=>dispatch(changeContentNews(content)),
    changeShortDescNews: (shortDesc)=>dispatch(changeShortDescNews(shortDesc)),
    changeAuThorNews: (author)=>dispatch(changeAuThorNews(author)),
    changeSourceNews: (source)=>dispatch(changeSourceNews(source)),
    changeIdCateNews: (idcate)=>dispatch(changeIdCateNews(idcate)),
    setIdNews: (id)=>dispatch(setIdNews(id)),
    deleteNews: (id)=>dispatch(deleteNews(id)),
    submitEditNews: (id,idcate)=>dispatch(submitEditNews(id,idcate)),
    editNews: (title,shortDesc,author,source,idcate,content)=>dispatch(editNews(title,shortDesc,author,source,idcate,content)),
    addNews: (idCateLink,title,shortDesc,author,image,source,tags,idcate,content)=>dispatch(addNews(idCateLink,title,shortDesc,author,image,source,tags,idcate,content)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsDetail);
