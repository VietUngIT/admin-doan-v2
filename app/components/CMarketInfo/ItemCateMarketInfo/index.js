/**
*
* ItemCateMarketInfo
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import {message,} from 'antd';
import { Tooltip, Icon } from 'antd';
import { Link, } from 'react-router';

class ItemCateMarketInfo extends React.Component {
  onClickEdit=()=>{
    if(this.refs.inputdata.value==null || this.refs.inputdata.value.trim()===""){
      message.error("Nhập đầy đủ thông tin.")
    }else{
      if(this.props.data){
        this.props.editItem(this.props.data.id,this.refs.inputdata.value);
      }
    }
  }
  onClickDelete=()=>{
    if(this.props.data){
      this.props.deleteItem(this.props.data.id)
    }
  }
  viewDetail=()=>{
    if(this.props.data){
      this.props.getName(this.props.data.name)
    }
  }
  render() {
    let name = null;
    let link = null;
    if(this.props.data){
      name = this.props.data.name;
      link = this.props.link;
    }else{
      link = this.props.linkDataNull;
    }
    return (
      <tr style={{display:"flex"}}>
        <td style={{border: "1px solid #dddddd", flex: 1}}>
          <textarea rows='2' ref="inputdata" type="text" name="firstname" defaultValue={name} style={{height: "100%",padding: 3,width: "100%"}}/>
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
              <Icon onClick={()=>this.viewDetail()}  style={{fontSize: 20,fontWeight: 600,padding: 3}} type="bars" />
            </Link>
          </Tooltip>
        </td>
      </tr>
    );
  }
}

ItemCateMarketInfo.propTypes = {

};

export default ItemCateMarketInfo;
