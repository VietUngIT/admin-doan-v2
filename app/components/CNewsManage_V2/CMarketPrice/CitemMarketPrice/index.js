/**
*
* CitemMarketPrice
*
*/

import React from 'react';
import styles from './styles';
import { Row, Col, Button, Icon,Pagination,Popconfirm } from 'antd';

class CitemMarketPrice extends React.Component { 
  confirm=(e)=> {
    console.log('Click on Yes');
    if(this.props.data){
      this.props.deleteNewsMP(this.props.data.id);
    }
  }
  cancel(e) {
    console.log('Click on No');
  }
  convertTime (time){
    var d = new Date(time),
    yyyy = d.getFullYear(),
    mm = ('0' + (d.getMonth() + 1)).slice(-2),
    dd = ('0' + d.getDate()).slice(-2),
    hh = ('0' + d.getHours()).slice(-2),
    min = ('0' + d.getMinutes()).slice(-2),

    result, time;
    time = hh + ':' + min;
    const date =   dd+ '/' + mm + '/'+ yyyy ;
    result =date;
    return result;
  }
  render() {
    return (
      <div style={styles.wrapItem}>
        <div style={styles.wrapTitle}>
          <div style={{display: 'flex'}}>
            <div style={styles.title}>{this.props.data.name}</div>
            <div style={styles.price}>{`${new Intl.NumberFormat('vi-VN', {  style: 'currency', currency: 'VND' }).format(this.props.data.price)}/${this.props.data.unit}`}</div>
          </div>
          <div style={{display: 'flex'}}>
            <div style={styles.place}>{this.props.data.place.toLowerCase()}</div>
            <div style={styles.date}>{`Cập nhât: ${this.convertTime(this.props.data.timeCreate)}`}</div>
          </div>
        </div>
        <div style={styles.note}>{this.props.data.note}</div>
        <div style={styles.action}>
          <Popconfirm title="Bạn chắc chắn muốn xóa tin tức này?" onConfirm={this.confirm} onCancel={this.cancel} okText="Đồng ý" cancelText="Hủy">
            <Button type="danger">Xóa</Button>
          </Popconfirm>
        </div>
      </div>
    );
  }
}

CitemMarketPrice.propTypes = {

};

export default CitemMarketPrice;
