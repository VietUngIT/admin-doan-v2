/**
*
* ItemDuyetCard
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

class ItemDuyetCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {    
      isMobile: false,   
      huy: false,
      duyet: false,
      detail:false,
      isDuyet:false,
      isHuy : false,
      hover : false,
      
    };
  }

  showConfirmHuy=()=>{
    this.setState({
      huy: true,
    });
  }
  okHuy=()=>{
    this.setState({
      isDuyet: true,
    });
    this.huyduyetCard();
    this.cancelHuy();
    this.props.onChangeNumber(this.props.row._id)    

  }
  cancelHuy=()=>{
    this.setState({
      huy: false,
    });
  }
  showConfirmDuyet=()=>{
    this.setState({
      duyet: true,
    });
  }
  okDuyet=()=>{
    this.setState({
      isDuyet: true,
    });
    this.duyetCard();
    this.cancelDuyet();
    this.props.onChangeNumber(this.props.row._id)    

  }
  cancelDuyet=()=>{
    this.setState({
      duyet: false,
    });
  }
  formatMoney(price){
    var strPrice = price+'';
    var a = strPrice.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')+ ' King';
    return a;
  }
  duyetCard=()=>{
    this.props.duyet_card(this.props.row._id);
    // this.props.get_card_list("unconfirmed");
  }
  huyduyetCard=()=>{
    this.props.huy_duyet_card(this.props.row._id);
    // this.props.get_card_list("unconfirmed");
  }
  showConfirmDetail=()=>{
    this.setState({
      detail: true,
    });
  }
  okDetail=()=>{
    //this.props.del_DL(this.props.row.nickname);
    this.cancelEdit();
  }
  cancelDetail=()=>{
    this.setState({
      detail: false,
    });
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
    
    var huyConfirm = (
      <Modal
        width = {600}
        visible={this.state.huy}
        onOk={this.okHuy}
        onCancel={this.cancelHuy}
        footer={[
          <div>
            <Button type="primary" onClick={this.okHuy} style={{marginLeft:'1%'}}>Đồng ý</Button>
            <Button type="danger" onClick={this.cancelHuy} style={{marginLeft:'1%'}}>Quay lại</Button>
          </div>  
        ]}
      >
         <span style={{fontSize:13}}>Bạn có muốn<i><b> hủy duyệt </b></i> giao dịch đổi thẻ này không ?</span>
      </Modal>
    )
    var duyetConfirm = (
      <Modal
      
        width = {600}
        visible={this.state.duyet}
        onOk={this.okDuyet}
        onCancel={this.cancelDuyet}
        footer={[
          <div>
            <Button type="primary" onClick={this.okDuyet} style={{marginLeft:'1%'}}>Đồng ý</Button>
            <Button type="danger" onClick={this.cancelDuyet} style={{marginLeft:'1%'}}>Quay lại</Button>
          </div>  
        ]}
      >
        <span style={{fontSize:13}}>Bạn có muốn <i><b> duyệt </b></i>  giao dịch đổi thẻ này không ?</span>
      </Modal>
    )
    var status = false;
    var cancel_btn = false;
    cancel_btn = (
      <table>        
        <tr style={{height:20,textAlign:'left',padding:5}}><Button type="primary" onClick={this.duyetCard} style={{width:80,height :35}}>Duyệt</Button></tr>
        <tr style={{height:5}}></tr>
        <tr style={{height:20,textAlign:'left',padding:5}}><Button type="danger" onClick={this.huyduyetCard} style={{width:80,height :35}} disabled={this.props.row.status==0?false:true}>Hủy</Button>   </tr>
      </table>  
           
    )
    if(this.props.row.status==0){
      status =(
        <div> 
          <div style={{textAlign:'center',padding:5}}><Button type="primary" disabled={(this.props.changed?(this.props.number.indexOf(this.props.row._id)>=0?true:false):false) }onClick={this.showConfirmDuyet} style={{width:65,height :35}}>Duyệt</Button></div>
          <div style={{textAlign:'center',padding:5}}><Button type="danger"  disabled={(this.props.changed?(this.props.number.indexOf(this.props.row._id)>=0?true:false):false) } onClick={this.showConfirmHuy}   style={{width:65,height :35}} >Hủy</Button> </div>
        </div>
      )

     
    }else{
      if(this.props.row.status==2){
        status =(
          <span style={{color:'red'}}><i>Đã hủy</i></span>
        )
      }else{
        status = "Đã duyệt";
      }
      
    }
    return (
      <tr key={this.props.index } onMouseEnter={this.hoverOn} style={{background:this.state.hover?"#f0f0f0":"white"}}
      onMouseLeave={this.hoverOff}>
        {huyConfirm}
        {duyetConfirm}
          <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'right',padding:5}}>
            {this.props.index +1}
          </td>
          <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>
            {this.props.row.admin!==""?this.props.row.admin:(<span style={{color:'#e2e2e2'}}><i>Chưa cập nhật</i></span>)}           
          </td>
          <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>
            {this.props.row.nickname}           
          </td>
          <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>
            {this.props.row.provider}
          </td>
          <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>
            {this.props.row.providerCard?(this.props.row.providerCard=="epay"?"epay":"ngân lượng"):"Chưa cập nhật"}
          </td>
          <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'right',padding:5}}>
            {this.props.row.quantity}
          </td>
          <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'right',padding:5}}>
            {this.formatMoney(this.props.row.amount)}
           
          </td>
          <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>
            {this.props.row.reason}
          </td>
          <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>
            
            {this.convertDate(this.props.row.updateTime)}
          </td>
          <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>
            {this.props.row.timeConsider>0?this.convertDate(this.props.row.timeConsider):"Chưa cập nhật"}
          </td>
          <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>
            {status}
            
          </td>
         
      </tr>    
    );
  }
}

ItemDuyetCard.propTypes = {

};

export default ItemDuyetCard;
