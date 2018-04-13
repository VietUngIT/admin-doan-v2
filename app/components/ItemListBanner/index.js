/**
*
* ItemListBanner
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
import { Link, } from 'react-router';

class ItemListBanner extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {    
      isMobile: false,   
      del : false,
      edit : false,
      show_img : false,
      ac : this.props.row.status,
      u : this.props.row.url,
      hover : false,

    };
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
  showImg=()=>{
    this.setState({
      show_img: true,
    });
  }
  okImg=()=>{
    this.cancel();
  }
  cancelImg=()=>{
    this.setState({
      show_img: false,
    });
  }
  showConfirm=()=>{
    this.setState({
      del: true,
    });
  }
  ok=()=>{
    this.props.del_Banner(this.props.row._id);
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
    this.props.edit_banner(this.props.row._id,this.state.ac,this.state.u);
    this.cancelEdit();
  }
  cancelEdit=()=>{
    this.setState({
      edit: false,
    });
  }
  onChangeUrl=(e)=>{
    this.setState({u:e.target.value.trim()})
  }
  onChangeActive=(e)=>{
    this.setState({ac:e.target.value})
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
        Bạn có muốn xóa banner này không ?
      </Modal>
    )
    var showImg = (
      <Modal
        title="Banner"
        width = {600}
        visible={this.state.show_img}
        onOk={this.okImg}
        onCancel={this.cancelImg}
        footer={[
         
        ]}
      >
        <img src={this.props.row.image} width="100%" height="100%"/>
      </Modal>
    )
    var editContent = (
      <Modal
        title="Sửa banner"
        width = {600}
        visible={this.state.edit}
        onOk={this.okEdit}
        onCancel={this.cancelEdit}
        footer={[
          <div>
            <Button type="primary" onClick={this.okEdit} style={{marginLeft:'1%'}}>Lưu</Button>
            <Button type="danger" onClick={this.cancelEdit} style={{marginLeft:'1%'}}>Hủy</Button>
          </div>  
        ]}
      >
        <center style={{width:'100%',height:"50%",border:'1px solid #e2e2e2',borderRadius:'5px',padding:10}}>
          <img src={this.props.row.image} style={{width:300,height:400}}/>
        </center>
        <select id="type" onChange={(e)=>this.onChangeActive(e)}     
          defaultValue={this.props.row.status}             
          style={{height:'35px',border:'1px solid #e2e2e2',borderRadius:'5px',background:'white',marginTop:10}}>
          <option value={0} > Chưa active</option>
          <option value={1} > Đã active</option>                           
                            
        </select>  
        <textarea rows="5" onChange={(e)=>this.onChangeUrl(e)} ref="input_url" placeholder="Nhập link" defaultValue={this.props.row.url}
              style={{border: '1px solid #e2e2e2',width:'100%',borderRadius:5,marginTop:10,padding:10}}/>

      </Modal>
    )
    return (
      <tr onMouseEnter={this.hoverOn} style={{background:this.state.hover?"#f0f0f0":"white"}}
      onMouseLeave={this.hoverOff}>
        {delConfirm}
        {showImg}
        {editContent}
        <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>
            {this.props.index}
        </td> 
         <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>
          
          <img 
            src={this.props.row.image}  
            width={100} height={100} 
            alt={this.props.row.url} 
            onClick={this.showImg}/> 
         
         </td>  
         <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>
          <a href={this.props.row.url} >
          {this.props.row.url}
          </a>
         </td>   
         <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>
            {this.props.row.status==1?"Đã active":"Chưa active"}
         </td>  
         <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>
            <Button  
              //disabled={(this.props.changed && this.props.row.nickname== this.props.nickname)?false:true } 
              onClick={this.showConfirmEdit}
              
               type="primary" icon = "edit">
            
            </Button>
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

ItemListBanner.propTypes = {

};

export default ItemListBanner;
