/**
*
* CmarketInfoDetail
*
*/

import React from 'react';
import styles from './styles';
import styled from 'styled-components';
import { Row, Col, Button, Icon } from 'antd';

const Tag = styled.div`
  padding: 5px 10px;
  margin: 5px;
  border-radius: 5px;
  background: #b7ffe5;
  display: inline-block;
`;

var contentMKDiv = null;
class CmarketInfoDetail extends React.Component {
  componentDidMount(){
    if(this.props.newsMKInfo){
      contentMKDiv = document.getElementById('contentNewsMK');
      contentMKDiv.innerHTML = this.props.newsMKInfo.content;
    }
  }
  componentDidUpdate(){
    if(contentMKDiv){
      if(this.props.newsMKInfo){
        contentMKDiv = document.getElementById('contentNewsMK');
        contentMKDiv.innerHTML = this.props.newsMKInfo.content;
      }
    }
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
    let title = null;
    let date = null;
    let comment = null;
    let img = require('containers/App/maxresdefault.jpg');
    let content = null;
    let tags = null;
    let source = null;
    let author = null;
    if(this.props.newsMKInfo!==null){
      title = this.props.newsMKInfo.title;
      date = this.props.newsMKInfo.timeCreate;
      comment = this.props.newsMKInfo.comments;
      img = this.props.newsMKInfo.image;
      source = this.props.newsMKInfo.source;
      author = this.props.newsMKInfo.author;
      let temp = JSON.parse(this.props.newsMKInfo.tags);
      if(temp && (temp.size>0||temp.length>0)){
        tags = temp.map((item,index) => {
          return (<Tag key={index}>{item}</Tag>);
        });
      }
    }
    return (
      <div style={styles.wrapContent}>
        <div style={{paddingBottom: 10,fontWeight: 600,fontSize: 16}}>{title}</div>
        <div style={styles.wrapDate}>
          <div style={styles.date}>{`Ngày cập nhật: ${this.convertTime(date)}`}</div>
          <div style={styles.date}>
            <div>
              <Icon type="message" style={{color:'#00B0FF',marginRight: 2,fontSize: 13}}/>
              <span>{comment}</span>
            </div>
          </div>
        </div>
        <div style={{ display: img==null?'none':"",textAlign: 'center', paddingBottom: 10}}>
          <img src={img} id="imgstore" width='280px' height='220px' />
        </div>
        <div id="contentNewsMK">
        </div>
        <div style={{padding: 10}}>
          {tags}
        </div>
        <div style={{fontWeight: 600,textAlign: 'center'}}>{`Theo: ${author}`}</div>
        <div style={{ paddingLeft: 20, fontStyle: 'italic'}}>{`Nguồn: ${source}`}</div>
      </div>
    );
  }
}

CmarketInfoDetail.propTypes = {

};

export default CmarketInfoDetail;
