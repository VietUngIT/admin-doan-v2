/**
*
* CcateNewsEvent
*
*/

import React from 'react';
// import styled from 'styled-components';
import { Row, Col, Button, Icon } from 'antd';
import styles from './styles'
import ItemCateNewsEvent from '../ItemCateNewsEvent'


class CcateNewsEvent extends React.Component {
  addCategory=()=>{
    if(this.refs.category.value==null || this.refs.category.value.trim()===""){
      message.error("Nhập đầy đủ thông tin.")
    }else{
      this.props.addCateNews(this.refs.category.value)
      this.refs.category.value="";
    }
  }
  render() {
    let listcat = null;
    if(this.props.listCategoryNews && (this.props.listCategoryNews.size>0|| this.props.listCategoryNews.length>0)){
      listcat = this.props.listCategoryNews.map((item,index) => {
        return (<ItemCateNewsEvent key={index} index={index} data={item} delCateNews={this.props.delCateNews}/>);
      });
    }
    return (
      <div>
        <Row style={styles.row}>
          <Col span={3} style={{fontWeight: 600}}>STT</Col>
          <Col span={12} style={{fontWeight: 600}}>Tên</Col>
          <Col span={5} style={{fontWeight: 600}}></Col>
          <Col span={4} style={{fontWeight: 600}}></Col>
        </Row>
        <Row style={{borderBottom: '1px solid #ffbf00'}}>
          <Col span={20}>
            <input type='text' ref="category" placeholder="Nhập tên danh mục..."  style={styles.input}/>
          </Col>
          <Col span={4}>
            <div onClick={this.addCategory} style={styles.buttonAdd}>Thêm</div>
          </Col>
        </Row>
        {listcat}
      </div>
    );
  }
}

CcateNewsEvent.propTypes = {

};

export default CcateNewsEvent;
