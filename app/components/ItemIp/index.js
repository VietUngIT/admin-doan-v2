/**
*
* ItemIp
*
*/

import React from 'react';
// import styled from 'styled-components';

import {
  Tabs,
  Input,
  Button,
  message,
  Pagination ,
  Dropdown,
  Menu,
  Modal,
  Icon,
} from 'antd';
class ItemIp extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {    
      del : false,
      hover : false,

    }
  }
  convertDate (time){
    var d = new Date(time),
    yyyy = d.getFullYear(),
    mm = ('0' + (d.getMonth() + 1)).slice(-2),
    dd = ('0' + d.getDate()).slice(-2),
    hh = ('0' + d.getHours()).slice(-2),
    min = ('0' + d.getMinutes()).slice(-2),

    result, time;
    time = hh + ':' + min;
    result = time ;
    const date =   dd+ '/' + mm + '/'+ yyyy ;
    result = date +" " +time;
    return result;
  }
  showConfirm=()=>{
    this.setState({
      del: true,
    });
  }
  ok=()=>{

    this.props.del_ip(this.props.row.ip);
    this.cancel();
  }
  cancel=()=>{
    this.setState({
      del: false,
    });
  }
  hoverOn=()=>{
    this.setState({
      hover: true,
    });
  }
  hoverOff=()=>{
    this.setState({
      hover: false,
    });
  }
  render() {
    var delConfirm = (
      <Modal
      
        width = {600}
        visible={this.state.del}
        onOk={this.ok}
        onCancel={this.cancel}
        footer={[
          <div>
            <Button type="primary" onClick={this.ok} style={{marginLeft:'1%'}}>Đồng ý</Button>
            <Button type="danger" onClick={this.cancel} style={{marginLeft:'1%'}}>Hủy</Button>
          </div>  
        ]}
      >
        Bạn có muốn xóa ip này không ?
      </Modal>
    )
    return (
      <tr onMouseEnter={this.hoverOn} style={{background:this.state.hover?"#f0f0f0":"white"}}
      onMouseLeave={this.hoverOff}>
        {delConfirm}
        
        <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>
            {this.props.index}
        </td> 
        
         <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>
         
          {this.props.row.ip}
          
         </td>   
         <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>
            {this.props.row.admin}
         </td>  
         <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>
            {this.props.row.reason}
         </td> 
         <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>
            {this.convertDate(this.props.row.time)}
         </td> 
         <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>
            <Button  
              //disabled={(this.props.changed && this.props.row.nickname== this.props.nickname)?false:true } 
               type="danger" icon = "close"
               onClick={this.showConfirm}
            >
               
            </Button>
         </td>
      </tr>
    );
  }
}

ItemIp.propTypes = {

};

export default ItemIp;
