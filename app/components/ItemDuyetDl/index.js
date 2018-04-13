/**
*
* ItemDuyetDl
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
import DetailDuyetDl from 'components/DetailDuyetDl';

class ItemDuyetDl extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {    
      isMobile: false,   
      huy: false,
      duyet: false,
      detail:false,
      hover : false,

    };
  }
  showConfirmHuy=()=>{
    this.setState({
      huy: true,
    });
  }
  okHuy=()=>{
    this.huyduyetDL();
    this.cancelHuy();
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
    this.duyetDL();
    this.cancelDuyet();
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
  duyetDL=()=>{
    this.props.duyet_dl(this.props.row.id);
    // this.props.load_duyet_dl(this.props.ac_page);
  }
  huyduyetDL=()=>{
    this.props.huy_duyet_dl(this.props.row.id);
    // this.props.load_duyet_dl(this.props.ac_page);
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
    var detailContent = (
      <Modal
        title="Chi tiết duyệt chuyển khoản đại lý"
        width = {800}
        visible={this.state.detail}
        onOk={this.okDetail}
        onCancel={this.cancelDetail}
        footer={[
          
        ]}
        
      >
        <DetailDuyetDl
           id={this.props.row.id}
           detail_duyet_dl={this.props.detail_duyet_dl}
            cancelEdit = {this.cancelDetail} 
            data_detail={this.props.data_detail}
          />
      </Modal>
    )
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
         <span style={{fontSize:13}}>Bạn có muốn<i><b> hủy duyệt </b></i>  giao dịch cho đại lý này không ?</span>
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
        <span style={{fontSize:13}}>Bạn có muốn <i><b> duyệt </b></i>  giao dịch cho đại lý này không ?</span>
      </Modal>
    )
    var status = false;
    var cancel_btn = false;
    cancel_btn = (
      <table>        
        <tr style={{height:20,textAlign:'left',padding:5}}><Button type="primary" onClick={this.duyetDL} style={{width:80,height :35}}>Duyệt</Button></tr>
        <tr style={{height:5}}></tr>
        <tr style={{height:20,textAlign:'left',padding:5}}><Button type="danger" onClick={this.huyduyetDL} style={{width:80,height :35}} disabled={this.props.row.status==0?false:true}>Hủy</Button>   </tr>
      </table>  
           
    )
    if(this.props.row.status==0){
      status =(
        <div> 
          <div style={{textAlign:'center',padding:5}}><Button type="primary" onClick={this.showConfirmDuyet} style={{width:65,height :35}}>Duyệt</Button></div>
          <div style={{textAlign:'center',padding:5}}><Button type="danger" onClick={this.showConfirmHuy} style={{width:65,height :35}} >Hủy</Button>   </div>
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
      <tr  
        onMouseEnter={this.hoverOn} style={{background:this.state.hover?"#f0f0f0":"white"}}
        onMouseLeave={this.hoverOff}>
        {detailContent}
        {huyConfirm}
        {duyetConfirm}
          <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>
            {this.props.index +1+10*(this.props.ac_page-1)}
           
          </td>
          <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>
            {this.props.row.from}           
          </td>
          <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>
            {this.props.row.to}
           
          </td>
          <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>
            {this.formatMoney(this.props.row.amount)}
           
          </td>
          <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>
            {status}
          </td>
          <td style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center',padding:5,width:'5%'}}>
            <Icon type="plus-square-o" onClick={this.showConfirmDetail}/>
            
          </td>
      </tr>    
    );
  }
}

ItemDuyetDl.propTypes = {

};

export default ItemDuyetDl;
