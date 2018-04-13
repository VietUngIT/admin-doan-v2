/**
*
* ItemPrize
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
import EditPrize from 'components/EditPrize';
import { Link,browserHistory } from 'react-router';

class ItemPrize extends React.Component {
  constructor(props) {
    super(props);
    this.state = {    
      del : false,
      edit : false,
      hover : false,

    }
  }
  componentDidMount=()=>{
    this.props.get_event_name(this.props.row.name)
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

    this.props.del_prize(this.props.row.id);
    this.cancel();
  }
  cancel=()=>{
    this.setState({
      del: false,
    });
  }
  showConfirmEdit=()=>{
    this.setState({
      edit: true,
    });
  }
  okEdit=()=>{

    // this.props.del_event(this.props.row._id);
    this.cancel();
  }
  cancelEdit=()=>{
    this.setState({
      edit: false,
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
        Bạn có muốn xóa giải thưởng này không ?
      </Modal>
    )
    var editContent = (
      <Modal
        title="Sửa giải thưởng"
        width = {600}
        visible={this.state.edit}
        onOk={this.okEdit}
        onCancel={this.cancelEdit}
        footer={[
         
        ]}
      >
        <EditPrize row={this.props.row} edit_prize={this.props.edit_prize} cancel={this.cancelEdit}/>
      </Modal>
    )
    return (
      <tr onMouseEnter={this.hoverOn} style={{background:this.state.hover?"#f0f0f0":"white"}}
      onMouseLeave={this.hoverOff}>
        {delConfirm}
        {editContent}
        <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>
            {this.props.index}
        </td> 
        
         <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>
         
          {this.props.row.top}
          
         </td>   
         <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>
            {this.props.row.prize}
         </td>  
         
         <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>
            <Button  
              //disabled={(this.props.changed && this.props.row.nickname== this.props.nickname)?false:true } 
               type="danger" icon = "close"
               onClick={this.showConfirm}
            >
               
            </Button>
         </td>
         <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>
         
            <Button  
              //disabled={(this.props.changed && this.props.row.nickname== this.props.nickname)?false:true } 
               type="primary" icon = "edit"
               onClick={this.showConfirmEdit}
            >
               
            </Button>
         </td>
         
      </tr>
    );
  }
}

ItemPrize.propTypes = {

};

export default ItemPrize;
