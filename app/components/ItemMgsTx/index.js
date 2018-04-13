/**
*
* ItemMgsTx
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
  Modal,
  TimePicker,
  Icon,
} from 'antd';

class ItemMgsTx extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {    
      isMobile: false,   
      del : false,
      edit : false,
      array_mgs : false,
      hover : false,

    };
  }
 
  showConfirm=()=>{
    this.setState({
      del: true,
    });
  }
  ok=()=>{
    this.props.del_mgs(this.props.row.id);
    this.props.get_message(this.props.type_get);
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
  onChangeMess=(e)=>{
    // if(e.charCode==13){
      
    // }
    // console.log("e.charCode",e)
    this.setState({mgs:e.target.value});
  }
  okEdit=()=>{
    if(this.refs.mess.value.trim() !==""){
      
      this.props.edit_message(this.refs.mess.value.trim(),this.props.row.id);
      this.props.get_message(this.props.type_get);
      this.setState({array_mgs:[]})
      this.cancelEdit();
      
    }else{
      message.error("Nhập đầy đủ thông tin !")
      
    }
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
        Bạn có muốn xóa tin nhắn này không ?
      </Modal>
    )
    var editContent = (
      <Modal
        title="Sửa tin nhắn"
        width = {800}
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
        <textarea  rows="15" 
          style={{textAlign:'left',padding:5,width:'100%',border:'1px solid #e2e2e2' ,borderRadius : 3}}
          ref="mess"  onChange={this.onChangeMess} placeholder="Nhập tin nhắn vào đây!"  defaultValue={this.props.row.content} />
      </Modal>
    )
    return (
        <tr style={{width:'100%'}} onMouseEnter={this.hoverOn} style={{background:this.state.hover?"#f0f0f0":"white"}}
        onMouseLeave={this.hoverOff}>
          {delConfirm}
          {editContent}
          <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>
            <input value={this.props.row.id}  onChange={(e)=>this.props.changeChecked(e)} className="chk" type="checkbox" />
          </td>
          <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:15}}>{this.props.index}</td>                
          <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.props.row.content}</td>
          <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>
            <Icon type="edit" onClick={this.showConfirmEdit}/>
          </td>
          <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>
            <Icon type="delete" onClick={this.showConfirm}/>
          </td>
                                    
        </tr>
    );
  }
}

ItemMgsTx.propTypes = {

};

export default ItemMgsTx;
