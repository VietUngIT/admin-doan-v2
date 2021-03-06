/**
*
* CitemCateAgritech
*
*/

import React from 'react';
import { Row, Col, Button, Icon } from 'antd';
import styles from './styles'
import { Link, } from 'react-router';


class CitemCateAgritech extends React.Component { 
  onClickDelete=()=>{
    if(this.props.data){
      this.props.delCateNews(this.props.data.id)
    }
  }
  render() {
    return (
      <Row style={styles.row}>
        <Col span={3}>{this.props.index+1}</Col>
        <Col span={12}>{this.props.data.name}</Col>
        <Col span={4}>
          <div style={styles.actionDel} onClick={()=>this.onClickDelete()}>Xóa</div>
        </Col>
        <Col span={5}>
          <Link style={{textDecoration: "underline"}} to={`/agritech/${this.props.data.id}`}>
            Xem danh mục con
          </Link>
        </Col>
      </Row>
    );
  }
}

CitemCateAgritech.propTypes = {

};

export default CitemCateAgritech;
