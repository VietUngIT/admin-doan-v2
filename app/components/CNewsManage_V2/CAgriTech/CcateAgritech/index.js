
import React from 'react';
import { Row, Col, Button, Icon } from 'antd';
import styles from './styles'
import CitemCateAgritech from '../CitemCateAgritech'
import {message,} from 'antd';


class CcateAgritech extends React.Component { 
  addCategory=()=>{
    if(this.refs.categoryAT.value==null || this.refs.categoryAT.value.trim()===""){
      message.error("Nhập đầy đủ thông tin.")
    }else{
      this.props.addCateAgriTech(this.refs.categoryAT.value)
      this.refs.categoryAT.value="";
    }
  }
  render() {
    let listcat = null;
    if(this.props.listCate && (this.props.listCate.size>0|| this.props.listCate.length>0)){
      listcat = this.props.listCate.map((item,index) => {
        return (<CitemCateAgritech key={index} index={index} data={item} delCateNews={this.props.delCateAgriTech}/>);
      });
    }
    return (
      <div style={{padding: "10px"}}>
        <Row style={styles.row}>
          <Col span={3} style={{fontWeight: 600}}>STT</Col>
          <Col span={12} style={{fontWeight: 600}}>Tên</Col>
          <Col span={5} style={{fontWeight: 600}}></Col>
          <Col span={4} style={{fontWeight: 600}}></Col>
        </Row>
        <Row style={{borderBottom: '1px solid #ffbf00'}}>
          <Col span={20}>
            <input type='text' ref="categoryAT" placeholder="Nhập tên danh mục..."  style={styles.input}/>
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

CcateAgritech.propTypes = {

};

export default CcateAgritech;
