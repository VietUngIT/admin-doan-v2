
import React from 'react';
import { Row, Col, Button, Icon } from 'antd';
import styles from './styles'
import CitemSubCateAgritech from '../CitemSubCateAgritech'
import {message,} from 'antd';


class CsubCateAgriTech extends React.Component {
  addCategory=()=>{
    if(this.refs.subCategoryAT.value==null || this.refs.subCategoryAT.value.trim()===""){
      message.error("Nhập đầy đủ thông tin.")
    }else{
      this.props.addSubCate(this.props.idCate,this.refs.subCategoryAT.value)
      this.refs.subCategoryAT.value="";
    }
  }
  render() {
    let listsubcat = null;
    if(this.props.listSubCate && (this.props.listSubCate.size>0|| this.props.listSubCate.length>0)){
      listsubcat = this.props.listSubCate.map((item,index) => {
        return (<CitemSubCateAgritech key={index} index={index} idCate={this.props.idCate} data={item} delSubCate={this.props.delSubCate}/>);
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
            <input type='text' ref="subCategoryAT" placeholder="Nhập tên danh mục..."  style={styles.input}/>
          </Col>
          <Col span={4}>
            <div onClick={this.addCategory} style={styles.buttonAdd}>Thêm</div>
          </Col>
        </Row>
        {listsubcat}
      </div>
    );
  }
}

CsubCateAgriTech.propTypes = {

};

export default CsubCateAgriTech;
