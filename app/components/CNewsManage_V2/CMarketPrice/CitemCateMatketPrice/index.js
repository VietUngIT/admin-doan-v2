
import React from 'react';
import { Row, Col, Button, Icon } from 'antd';
import styles from './styles'
import { Link, } from 'react-router';


class CitemCateMatketPrice extends React.Component {
  onClickDelete=()=>{
    if(this.props.data){
      // this.props.delCateNews(this.props.data.id)
    }
  }
  render() {
    return (
      <div style={styles.wrapItem}>
        <div style={styles.wrapInfoItem}>
          <img src={require('containers/App/maxresdefault.jpg')} id="imgstore" width='90px' height='70px' />
          <div style={styles.title}>Title</div>
        </div>
        <div style={styles.wrapAction}>
          <div>Xóa</div>
          <div>Chi tiết</div>
        </div>
      </div>
    );
  }
}

CitemCateMatketPrice.propTypes = {

};

export default CitemCateMatketPrice;
