
import React from 'react';
import { Row, Col, Button, Icon ,Popconfirm} from 'antd';
import styles from './styles'
import { Link, } from 'react-router';
import { browserHistory } from 'react-router';

class CitemCateMatketPrice extends React.Component {
  viewDetail=()=>{
    if(this.props.data){
      browserHistory.push(`/marketprice/${this.props.data.id}`)
    }
  }
  confirm=(e)=> {
    console.log('Click on Yes');
    if(this.props.data){
      this.props.delCateMP(this.props.data.id)
    }
  }
  cancel(e) {
    console.log('Click on No');
  }
  render() {
    return (
      <div style={styles.wrapItem}>
        <div style={styles.wrapInfoItem}>
          <img src={this.props.data.image==null?require('containers/App/maxresdefault.jpg'):this.props.data.image} id="imgstore" width='90px' height='70px' />
          <div style={styles.title}>{this.props.data.name}</div>
        </div>
        <div style={styles.wrapAction}>
          
          <Popconfirm title="Bạn chắc chắn muốn xóa tin tức này?" onConfirm={this.confirm} onCancel={this.cancel} okText="Đồng ý" cancelText="Hủy">
            <div style={styles.textDeleted}>Xóa</div>
          </Popconfirm>
          <div onClick={()=>this.viewDetail()} style={styles.textViewDetail}>Chi tiết</div>
          
        </div>
      </div>
    );
  }
}

CitemCateMatketPrice.propTypes = {

};

export default CitemCateMatketPrice;
