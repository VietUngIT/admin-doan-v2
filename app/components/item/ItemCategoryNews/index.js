/**
*
* ItemCategoryNews
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import {message,} from 'antd';
import { Tooltip, Icon } from 'antd';
import { Link, } from 'react-router';

class ItemCategoryNews extends React.Component {
  viewDetail=()=>{
    if(this.props.data){
      this.props.getListNewsByCate(this.props.data.name)
    }
  }
  onClickEdit=()=>{
    if(this.refs.categoryedit.value==null || this.refs.categoryedit.value.trim()===""){
      message.error("Nhập đầy đủ thông tin.")
    }else{
      if(this.props.data){
        this.props.editCateNews(this.props.data.id,this.refs.categoryedit.value);
      }
    }
    
  }
  onClickDelete=()=>{
    if(this.props.data){
      this.props.delCateNews(this.props.data.id)
    }
    
  }
  render() {
    let name = null;
    let link = null;
    if(this.props.data){
      name = this.props.data.name;
      link = `/news/${this.props.data.id}`;
    }else{
      link = "/news"
    }
    
    return (
      <tr style={{display:"flex"}}>
        <td style={{border: "1px solid #dddddd", flex: 1}}>
          <textarea rows='2' ref="categoryedit" type="text" name="firstname" defaultValue={name} style={{height: "100%",padding: 3,width: "100%"}}/>
        </td>
        <td style={{border: "1px solid #dddddd",paddingTop: 11, height: 49,flexBasis: 80}}>
          <Tooltip placement="top" title="Xóa">
            <Icon onClick={()=>this.onClickDelete()} style={{fontSize: 20,fontWeight: 600,padding: 3}} type="delete" />
          </Tooltip>
          <Tooltip placement="leftTop" title="Lưu">
            <Icon onClick={()=>this.onClickEdit()} style={{fontSize: 20,fontWeight: 600,padding: 3}} type="save" />
          </Tooltip>
          
          <Tooltip placement="rightTop" title="Xem danh sách tin tức">
            <Link style={{textDecoration: 'none'}} to={link}>
              <Icon onClick={()=>this.viewDetail()} style={{fontSize: 20,fontWeight: 600,padding: 3}} type="bars" />
            </Link>
          </Tooltip>
        </td>
      </tr>
    );
  }
}

ItemCategoryNews.propTypes = {

};

export default ItemCategoryNews;
