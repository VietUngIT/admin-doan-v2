/**
*
* CnewsEventDetail
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

var contentNewsEventDiv = null;

class CnewsEventDetail extends React.Component {
  componentDidMount(){
    if(this.props.newsEventInfo){
      contentNewsEventDiv = document.getElementById('contentNewsEvent');
      contentNewsEventDiv.innerHTML = this.props.newsEventInfo.content;
    }
  }
  componentDidUpdate(){
    if(contentNewsEventDiv){
      if(this.props.newsEventInfo){
        contentNewsEventDiv = document.getElementById('contentNewsEvent');
        contentNewsEventDiv.innerHTML = this.props.newsEventInfo.content;
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
    let view = null;
    let like = null;
    let comment = null;
    let desc = null;
    let img = require('containers/App/maxresdefault.jpg');
    let content = null;
    let tags = null;
    let source = null;
    let author = null;
    if(this.props.newsEventInfo!==null){
      title = this.props.newsEventInfo.title;
      date = this.props.newsEventInfo.timeCreate;
      view = this.props.newsEventInfo.views;
      like = this.props.newsEventInfo.likes;
      comment = this.props.newsEventInfo.comments;
      desc = this.props.newsEventInfo.shortDescription;
      img = this.props.newsEventInfo.image;
      source = this.props.newsEventInfo.source;
      author = this.props.newsEventInfo.author;
      let temp = JSON.parse(this.props.newsEventInfo.tags);
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
          <div style={styles.date}></div>
          <div style={styles.date}>
            <Row>
              <Col span={8}>
                <Icon type="message" style={{color:'#00B0FF',marginRight: 2,fontSize: 13}}/>
                <span>{comment}</span>
              </Col>
              <Col span={8}>
                <Icon type="eye" style={{color:'#00B0FF',marginRight: 2,fontSize: 13}}/>
                <span>{view}</span>
              </Col>
              <Col span={8}>
                <Icon type="heart" style={{color:'#D81B60',marginRight: 2,fontSize: 13}}/>
                <span>{like}</span>
              </Col>
            </Row>
          </div>
        </div>
        <div style={{paddingBottom: 10}}>{desc}</div>
        <div style={{ display: img==null?'none':"",textAlign: 'center', paddingBottom: 10}}>
          <img src={img} id="imgstore" width='280px' height='220px' />
        </div>
        <div id="contentNewsEvent">
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

CnewsEventDetail.propTypes = {

};

export default CnewsEventDetail;
