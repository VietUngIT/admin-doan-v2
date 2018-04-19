/*
 *
 * ListMarketInfo
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import messages from './messages';
import { Row, Col, Button, Icon,Pagination } from 'antd';
import ClistMarketInfo from 'components/CNewsManage_V2/CMarketInfo/ClistMarketInfo'
import CmarketInfoDetail from 'components/CNewsManage_V2/CMarketInfo/CmarketInfoDetail';
import ModalAddNewsMK from 'components/CNewsManage_V2/CMarketInfo/ModalAddNewsMK';
import styles from './styles';
import { Breadcrumb,Popconfirm } from 'antd';
import {
  getListNewsMK,
  deleteNewsMK,
  addNewsMK,
  getListCateNewsMK,
} from './actions';
import {
  selectListNewsMK,
  selectPageNews,
  selectTotalItemNews,
  selectStateDelMK,
  selectErrorCodeMK,
  selectgetListCateNewsMK,
} from './selectors';

export class ListMarketInfo extends React.Component { 
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
    this.handleShowModalAdd();
  }
  componentWillMount(){
    this.props.getListNewsMK(this.props.params.id_cate_news,0);
    this.props.getListCateNewsMK();
  }
  onChange=(page)=>{
    this.props.getListNewsMK(this.props.params.id_cate_news,page-1);
  }
  componentWillReceiveProps(nextProps){
    if(this.props.params.id_cate_news!==nextProps.params.id_cate_news){
      this.props.getListNewsMK(nextProps.params.id_cate_news,0);
    }
    if(this.props.delSuccess!==nextProps.delSuccess && nextProps.delSuccess===true){
      this.setState({
        news: false,
      });
      if(this.props.listNews && (this.props.listNews.size>0||this.props.listNews.length>0)){
        this.props.getListNewsMK(this.props.params.id_cate_news,this.props.curentPage);
      }else{
        if(this.props.curentPage>0){
          this.props.getListNewsMK(this.props.params.id_cate_news,this.props.curentPage-1);
        }
      }
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
      this.props.deleteNewsMK(this.state.news.id);
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
        <ModalAddNewsMK listCate={this.props.listCate} addNewsMK={this.props.addNewsMK} idcate={this.state.news.idCateNews}
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
          <Breadcrumb.Item><a style={{fontSize: 16}} href="/marketinfo">Tin tức thị trường</a></Breadcrumb.Item>
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
            <CmarketInfoDetail newsMKInfo={this.state.news}/>
          </div>
        </div>
      )
    }
    return (
      <div>
        <Helmet
          title="ListMarketInfo"
          meta={[
            { name: 'description', content: 'Description of ListMarketInfo' },
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
                <ClistMarketInfo idCate={this.props.params.id_cate_news} listNews={this.props.listNews}
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

ListMarketInfo.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  listNews: selectListNewsMK(),
  totalItem: selectTotalItemNews(),
  curentPage: selectPageNews(),
  listCate: selectgetListCateNewsMK(),
  delSuccess: selectStateDelMK(),
  errorCode: selectErrorCodeMK(),
});

function mapDispatchToProps(dispatch) {
  return {
    deleteNewsMK: (id) => dispatch(deleteNewsMK(id)),
    getListNewsMK: (id,page)=> dispatch(getListNewsMK(id,page)),
    getListCateNewsMK: ()=> dispatch(getListCateNewsMK()),
    addNewsMK: (idCateLink,title,author,image,source,tags,idcate,content) => dispatch(addNewsMK(idCateLink,title,author,image,source,tags,idcate,content)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListMarketInfo);
