/*
 *
 * ListNewsEvent
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import makeSelectListNewsEvent from './selectors';
import messages from './messages';
import { Row, Col, Button, Icon,Pagination } from 'antd';
import ClistNewsEvent from 'components/CNewsManage_V2/CNewsEvent/ClistNewsEvent'
import CnewsEventDetail from 'components/CNewsManage_V2/CNewsEvent/CnewsEventDetail';
import ModalAddNews from 'components/CNewsManage_V2/CNewsEvent/ModalAddNews'
import styles from './styles';
import { Breadcrumb,Popconfirm } from 'antd';

import {
  getListNews,
  deleteNews,
  addNews,
  getListCateNews,
} from './actions';
import {
  selectListNewsEvent,
  selectPageNewsEvent,
  selectTotalItemNewsEvent,
  selectStateDelNewsEvent,
  selectErrorCode,
  selectListCateNewsEvent,
} from './selectors';

export class ListNewsEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      news: false,
      modalAddNews: false,
    }
  }
  handleShowModalAdd=()=>{
    this.setState({
      modalAddNews: true,
    });
  }
  handleCloseModalAdd=()=>{
    this.setState({
      modalAddNews: false,
    });
  }
  addNewsHandle=()=>{
    console.log("addNewsHandle")
    this.handleShowModalAdd();
  }
  componentWillMount(){
    this.props.getListNews(this.props.params.id_cate_news,0);
    this.props.getListCateNews();
  }
  onChange=(page)=>{
    this.props.getListNews(this.props.params.id_cate_news,page-1);
  }
  componentWillReceiveProps(nextProps){
    if(this.props.params.id_cate_news!==nextProps.params.id_cate_news){
      this.props.getListNews(nextProps.params.id_cate_news,0);
    }
    if(this.props.delSuccess!==nextProps.delSuccess && nextProps.delSuccess===true){
      this.setState({
        news: false,
      });
    }
  }

  viewNewsDetail(id){
    let tempNews = this.props.listNews.filter((item,index)=>{
      if(id===item.id){
        return item;
      }
    })
    
    this.setState({
      news: tempNews[0],
    });
    
  }
  confirm=(e)=> {
    console.log('Click on Yes');
    if(this.state.news){
      this.props.deleteNews(this.state.news.id);
    }
  }
  cancel(e) {
    console.log('Click on No');
  }
  render() {
    let modalAdd = null;
    let breadCrumb = null;
    if(this.props.listCate && (this.props.listCate.size >0 || this.props.listCate.length>0)){
      modalAdd = (
        <ModalAddNews listCate={this.props.listCate} addNews={this.props.addNews} idcate={this.state.news.idCateNews}
          modalAddNews={this.state.modalAddNews} handleCloseModalAdd={this.handleCloseModalAdd}
          errorCode={this.props.errorCode}/>
      )
      let nameCate = this.props.listCate.filter((item, index) => {
        if(item.id===this.props.params.id_cate_news){
          return item;
        }     
      })
      breadCrumb = (
        <Breadcrumb>
          <Breadcrumb.Item><a style={{fontSize: 16}} href="/news">Tin tức - Sự kiện</a></Breadcrumb.Item>
          <Breadcrumb.Item style={{fontSize: 15}}>{nameCate[0].name}</Breadcrumb.Item>
        </Breadcrumb>
      )
    }

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
    let contentNews = null;
    if(this.state.news){
      contentNews = (
        <div style={styles.inlineWrapContent}>
          
          <div style={{display: 'flex', flexDirection: 'collumn',borderBottom: '1px solid #616161',}}>
            <div style={styles.header}>
              Nội dung
            </div>
            
            <div style={{flex: 2,minWidth:96,textAlign: 'center',paddingTop: 8}}>
              <Popconfirm title="Bạn chắc chắn muốn xóa tin tức này?" onConfirm={this.confirm} onCancel={this.cancel} okText="Đồng ý" cancelText="Hủy">
                <Button type="danger" icon="close-square-o">Xóa</Button>
              </Popconfirm>
            </div>
          </div>
          <div style={styles.content}>
            <CnewsEventDetail newsEventInfo={this.state.news} addNews={this.props.addNews}/>
          </div>
        </div>
      )
    }
    

    return (
      <div style={{height: '100%'}}>
        <Helmet
          title="ListNewsEvent"
          meta={[
            { name: 'description', content: 'Description of ListNewsEvent' },
          ]}
        />
        {modalAdd}
        <Row>
          <Col span={24}>
            <div style={styles.wrapBreadCrum}>
              {breadCrumb}
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={10} style={{fontWeight: 600}}>
            <div style={styles.wrapcontentlistnews}>
              <div style={styles.inlineWrapContentlistnews}>
                <div style={{display: 'flex', flexDirection: 'collumn',borderBottom: '1px solid #616161',}}>
                  <div style={styles.header}>Danh sách tin tức</div>
                  <div style={{flex: 2,minWidth:96,textAlign: 'center',paddingTop: 8}}>
                    <Button onClick={this.addNewsHandle} type="primary" icon="plus-square-o" >Thêm mới</Button>
                  </div>
                </div>
                <ClistNewsEvent idCate={this.props.params.id_cate_news} listNews={this.props.listNews}
                  viewNewsDetail={(id)=>this.viewNewsDetail(id)}/>
                {page}
              </div>
            </div>
          </Col>
          <Col span={14} style={{fontWeight: 600}}>
            <div style={styles.wrapcontent}>
              {contentNews}
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

ListNewsEvent.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  listNews: selectListNewsEvent(),
  totalItem: selectTotalItemNewsEvent(),
  curentPage: selectPageNewsEvent(),
  delSuccess: selectStateDelNewsEvent(),
  errorCode: selectErrorCode(),
  listCate: selectListCateNewsEvent(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getListNews: (id,page)=> dispatch(getListNews(id,page)),
    deleteNews: (id)=> dispatch(deleteNews(id)),
    getListCateNews:()=>dispatch(getListCateNews()),
    addNews: (idCateLink,title,shortDesc,author,image,source,tags,idcate,content)=>dispatch(addNews(idCateLink,title,shortDesc,author,image,source,tags,idcate,content)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListNewsEvent);
