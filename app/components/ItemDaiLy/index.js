/**
*
* ItemDaiLy
*
*/

import React from 'react';
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
import EditDaily from 'components/EditDaily';
import { Link, } from 'react-router';
import { push } from 'react-router-redux';
import Call from 'material-ui/svg-icons/communication/phone';

class ItemDaiLy extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {    
      isMobile: false,   
      del : false,
      edit : false,
      
      name :false,
      phone :false,
      fb :false,
      address :false,

      changed:false,

      isCancel : false,
      hover : false,
    };
  }
  componentWillMount=()=>{
    this.props.load_manager();
  }
  showConfirm=()=>{
    this.setState({
      del: true,
    });
  }
  ok=()=>{
    this.props.del_DL(this.props.row.nickname);
    this.cancel();
  }
  cancel=()=>{
    this.setState({
      del: false,
    });
  }
  showConfirmEdit=(row)=>{
    this.setState({
      edit: true,
    });
    this.setState({
      isCancel: false,
    });
  }
  okEdit=()=>{
    //this.props.del_DL(this.props.row.nickname);
    this.cancelEdit();
  }
  cancelEdit=()=>{
    this.setState({
      edit: false,
    });
    this.setState({
      isCancel: true,
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
    var manaContent = false;
    if(this.props.row.manager !==""){
      manaContent =(
        <div style={{color:'#002f18'}}><b>{this.props.row.manager}</b></div>
      )
    }else{
      manaContent =(
        <div style={{color:'#e2e2e2'}}><i>Không có</i></div>
      )
    }
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
        Bạn có muốn xóa đại lý này không ?
      </Modal>
    )
    var editContent = (
      <Modal
        title="Sửa thông tin đại lý"
        width = {800}
        visible={this.state.edit}
        onOk={this.okEdit}
        onCancel={this.cancelEdit}
        footer={[
          
        ]}
        
      >
        <EditDaily row={this.props.row} update={this.props.update} changed={this.props.changed} nickname={this.props.nickname}
            onChangeName={this.props.onChangeName} 
            onChangePhone={this.props.onChangePhone} 
            onChangeFB={this.props.onChangeFB} 
            onChangeAddress={this.props.onChangeAddress}
            cancelEdit = {this.cancelEdit} 
            manager = {this.props.manager}
            load_manager = {this.props.load_manager}
            isCancel={this.state.isCancel}
          />
      </Modal>
    )
    
    var phone = false;
    if(this.props.row.phone){
      if(this.props.row.phone.split("/").length > 1){
        phone = (
          <div>
            <div style={{marginBottom:10}}><Icon type="mobile" />{this.props.row.phone.split("/")[0]}</div>
            
            <div><Icon type="mobile" />{this.props.row.phone.split("/")[1]}</div>

          </div>  
        )
      }else{
        phone = (<span><Icon type="mobile" />{this.props.row.phone}</span>);
      }
    }
    return (
     
        
      <tr 
         onMouseEnter={this.hoverOn} style={{background:this.state.hover?"#f0f0f0":"white"}}
         onMouseLeave={this.hoverOff}
         >
          {delConfirm}
          {editContent}
          <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>
            {this.props.row.name}
           
          </td>
          <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>            
            {this.props.row.nickname}
          </td>
          <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>
           {phone}
            
          </td>
          <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>
            <a href={this.props.row.facebook}>{this.props.row.facebook}</a>
           
          </td>
          <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>
            {this.props.row.address}
           
          </td>
          <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>
            {manaContent}
           
          </td>
          <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>
            <Button  
             
              onClick={(row)=>this.showConfirmEdit(this.props.row)} type="primary" icon = "edit">
            
            </Button>
          </td>
          <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>
            <Button  
              onClick={this.showConfirm} type="danger" icon = "close">
            </Button>
          </td>
      </tr>
     
    );
  }
}

ItemDaiLy.propTypes = {

};

export default ItemDaiLy;
