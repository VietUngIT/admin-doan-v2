/**
*
* SearchTk
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
  Select,
} from 'antd';
import Cleave from 'cleave.js/react';
import EditPhone from 'components/EditTaiKhoan/EditPhone';
import EditCmt from 'components/EditTaiKhoan/EditCmt';
import EditEmail from 'components/EditTaiKhoan/EditEmail';
import EditRole from 'components/EditTaiKhoan/EditRole';
import EditTotalMoney from 'components/EditTaiKhoan/EditTotalMoney';
import EditTienKet from 'components/EditTaiKhoan/EditTienKet';
import EditActive from 'components/EditTaiKhoan/EditActive';
import EditLock from 'components/EditTaiKhoan/EditLock';

var role = 0;
var lock = true;
var ac = 0;
class SearchTk extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {    
      isMobile: false,   
      
      
      cmt : false,
      em : false,
      sdt : false,
      m : 0,
      sm : 0,
      a : false,
      changeRole :  false,
      changeAC:  false,
      changeLock : false,
      hide : false,
      showPhone:false,
      showEmail:false,
      showActive:false,
      showRole:false,
      showLock:false,
      showKet:false,
      showTotal:false,
      showCMT:false,
    };
   
  }
  hide=()=>{
    this.setState({hide:!this.state.hide})
  }
  showModalPhone = () => {
    this.setState({
      showPhone: true,
    });
  }
  showModalEmail = () => {
    this.setState({
      showEmail: true,
    });
  }
  showModalActive = () => {
    this.setState({
      showActive: true,
    });
  }
  showModalRole = () => {
    this.setState({
      showRole: true,
    });
  }
  showModalKet = () => {
    this.setState({
      showKet: true,
    });
  }
  showModalCMT = () => {
    this.setState({
      showCMT: true,
    });
  }
  showModalTotal = () => {
    this.setState({
      showTotal: true,
    });
  }
  showModalLock = () => {
    this.setState({
      showLock: true,
    });
  }
  //------------
  handleOkPhone = (e) => {
    this.setState({
      showPhone: false,
    });
  }
  handleOkLock = (e) => {
    this.setState({
      showLock: false,
    });
  }
  handleOkEmail = (e) => {
    this.setState({
      showEmail: false,
    });
  }
  handleOkActive = (e) => {
    this.setState({
      showActive: false,
    });
  }
  handleOkRole = (e) => {
    this.setState({
      showRole: false,
    });
  }
  handleOkCMT = (e) => {
    this.setState({
      showCMT: false,
    });
  }
  handleOkTotal = (e) => {
    this.setState({
      showTotal: false,
    });
  }
  handleOkKet = (e) => {
    this.setState({
      showKet: false,
    });
  }
  //--------------
  handleCancelPhone = (e) => {
    this.setState({
      showPhone: false,
    });
  }
  
  handleCancelEmail = () => {
    this.setState({
      showEmail: false,
    });
  }
  handleCancelCMT = () => {
    this.setState({
      showCMT: false,
    });
  }
  handleCancelActive = () => {
    this.setState({
      showActive: false,
    });
  }
  handleCancelRole = () => {
    this.setState({
      showRole: false,
    });
  }
  handleCancelLock = () => {
    this.setState({
      showLock: false,
    });
  }
  handleCancelTotal = () => {
    this.setState({
      showTotal: false,
    });
  }
  handleCancelKet = () => {
    this.setState({
      showKet: false,
    });
  }
  //---------------

  onChangeLock(e){
    lock = (e.target.value);
    this.setState({display_button:true})
   this.setState({changeLock:true})
   
   // console.log("g_name: ",g_name)
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
  result = date +" " + time;
  return result;
}
formatCurency(price){
  var strPrice = price+'';
  var a = strPrice.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  return a;
}

  onClick =(r)=>{      
        
      this.props.setAdmin(
        r.nn,
        this.state.changeRole?role:r.role,
        this.refs.sdt.refs.input.value,
        this.refs.cmnd.refs.input.value,
        this.state.m?parseInt(this.state.m):0,
        this.state.changeAC?ac:r.ac,
        this.refs.em.refs.input.value,
        this.state.sm?parseInt(this.state.sm):0,
        this.state.changeLock?lock:r.l,
        
      );
      this.setState({display_button:false})
    
  }
  render() {
          var active = false;
          var lock_btn = false;
          var role_content = false;
          var editPhone = (
            <div>  
              <Modal
              title="Sửa thông tin sđt"
              style={{width:500,height:300}}
              width = {600}
              visible={this.state.showPhone}
              onOk={this.handleOkPhone}
              onCancel={this.handleCancelPhone}
              footer={[]}
              >
                <EditPhone 
                 info={this.props.info}
                 edit_phone={this.props.edit_phone}
                 cancel = {this.handleCancelPhone}
             
                />
              </Modal>
              
            </div>  
          )
          var editCMT  = (
            <div>  
              <Modal
              title="Sửa thông tin chứng minh thư"
              style={{width:500,height:300}}
              width = {600}
              visible={this.state.showCMT}
              onOk={this.handleOkCMT}
              onCancel={this.handleCancelCMT}
              footer={[]}
              >
                <EditCmt
                  info={this.props.info}                 
                  edit_cmt={this.props.edit_cmt}   
                  cancel = {this.handleCancelCMT}           
                />
              </Modal>
              
            </div>  
          );
        var editEmail  = (
          <div>  
            <Modal
            title="Sửa thông tin email"
            style={{width:500,height:300}}
            width = {600}
            visible={this.state.showEmail}
            onOk={this.handleOkEmail}
            onCancel={this.handleCancelEmail}
            footer={[]}
            >
              <EditEmail 
                info={this.props.info}
                cancel = {this.handleCancelEmail}
                edit_email={this.props.edit_email}
              
              />
            </Modal>
            
          </div>  
        );
        var editRole  = (
          <div>  
            <Modal
            title="Sửa thông tin vai trò"
            style={{width:500,height:300}}
            width = {600}
            visible={this.state.showRole}
            onOk={this.handleOkRole}
            onCancel={this.handleCancelRole}
            footer={[]}
            >
              <EditRole 
                info={this.props.info}               
                edit_role={this.props.edit_role}
                cancel = {this.handleCancelRole}
              />
            </Modal>
            
          </div>  
        );
        var editTotalMoney  = (
          <div>  
            <Modal
            title="Sửa thông tin tổng tiền"
            style={{width:500,height:300}}
            width = {600}
            visible={this.state.showTotal}
            onOk={this.handleOkTotal}
            onCancel={this.handleCancelTotal}
            footer={[]}
            >
              <EditTotalMoney 
                info={this.props.info}
                formatCurency={this.formatCurency}               
                edit_total={this.props.edit_total}
                cancel = {this.handleCancelTotal}
              />
            </Modal>
            
          </div>  
        );
        var editTienKet  = (
          <div>  
            <Modal
            title="Sửa thông tin lượng tiền trong két"
            style={{width:500,height:300}}
            width = {600}
            visible={this.state.showKet}
            onOk={this.handleOkKet}
            onCancel={this.handleCancelKet}
            footer={[]}
            >
              <EditTienKet 
                info={this.props.info}
                formatCurency={this.formatCurency}                
                edit_ket={this.props.edit_ket}
                cancel = {this.handleCancelKet}
              />
            </Modal>
            
          </div>  
        );
        var editActive  = (
          <div>  
            <Modal
            title="Sửa thông tin active tài khoản"
            style={{width:500,height:300}}
            width = {600}
            visible={this.state.showActive}
            onOk={this.handleOkActive}
            onCancel={this.handleCancelActive}
            footer={[]}
            >
              <EditActive 
                info={this.props.info}                
                edit_active={this.props.edit_active}
                cancel = {this.handleCancelActive}
              />
            </Modal>
            
          </div>  
        );
        var editLock  = (
          <div>  
            <Modal
            title="Sửa thông tin khoá/mở khóa tài khoản"
            style={{width:500,height:300}}
            width = {600}
            visible={this.state.showLock}
            onOk={this.handleOkLock}
            onCancel={this.handleCancelLock}
            footer={[]}
            >
              <EditLock 
                info={this.props.info}               
                edit_lock={this.props.edit_lock}
                cancel = {this.handleCancelLock}
              />
            </Modal>
            
          </div>  
        );
     
          var role = this.props.info.role;
          switch(role){
            case 5:{
              role_content=(<span style={{}}>GM</span>);
              break;
            }
            case 4:{
              role_content=(<span style={{}}>MOD</span>);
              break;
            }
            case 3:{
              role_content=(<span style={{}}>Super Admin</span>);
              break;
            }
            case 2:{
              role_content=(<span style={{}}>Admin</span>);
              break;
            }
            case 1:{
              role_content=(<span style={{}}>Đại lý</span>);
              break;
            }
            case 0:{
              role_content=(<span style={{}}>Người chơi</span>);
              break;
            }
          }
          
          let ac_content = false;
          switch(this.props.info.ac){
            case 0:{
              ac_content = "Chưa active";
              break;
            }
            case 1:{
              ac_content = "Đã update thông tin";
              break;
            }
            case 2:{
              ac_content = "Đã active";
              break;
            }
          }
        var table = false;  
        if(this.state.hide){
          table=false;
        }else{
          table =
          (
            <table style={{marginLeft:'5%',marginTop:'1%',width:'90%'}}>
              <tbody>
                <tr>
                  <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,width:'30%'}}>Username</th>
                  <td style={{height:40,border:'1px solid #e2e2e2',borderRight:'',fontSize:13,textAlign:'left',padding:5}}>
                    <i>{this.props.info.un}</i>
                  </td>      
                  <td style={{height:40,border:'1px solid #e2e2e2',borderLeft:'',fontSize:13,textAlign:'center',padding:5,width:30}}>
                    <span style={{color:'#108ee9',fontSize:12,textAlign:'center'}}></span>
                  </td>    
                </tr>
                <tr>
                  <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,width:'30%'}}>Nickname</th>
                  <td style={{height:40,border:'1px solid #e2e2e2',borderRight:'',fontSize:13,textAlign:'left',padding:5}}>
                    <i>{this.props.info.nn}</i>
                  </td>      
                  <td style={{height:40,border:'1px solid #e2e2e2',borderLeft:'',fontSize:13,textAlign:'center',padding:5,width:30}}>
                    <span style={{color:'#108ee9',fontSize:12,textAlign:'center'}}></span>
                  </td>    
                </tr>
                <tr> 
                  <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,width:'30%'}}>SĐT</th>
                  <td style={{height:40,border:'1px solid #e2e2e2',borderRight:'',fontSize:13,textAlign:'left',padding:5}}>
                    <span style={{color:this.props.info.m?"":"#e2e2e2"}}>
                      <i>{this.props.info.m?this.props.info.m:"Chưa cập nhật"}</i>
                      
                    </span>
                   
                  </td>    
                  <td style={{height:40,border:'1px solid #e2e2e2',borderLeft:'',fontSize:13,textAlign:'center',padding:5,width:30}}>
                    <span style={{color:'#108ee9',fontSize:12,textAlign:'center',display:(this.props.isSuperAdmin==2||this.props.isSuperAdmin==3)?"":"none"}}>
                    <Icon type="edit" onClick={this.showModalPhone}>Edit</Icon></span>
                  </td>     
                </tr>
                <tr>  
                  <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,width:'30%'}}>CMTND</th>
                  <td style={{height:40,border:'1px solid #e2e2e2',borderRight:'',fontSize:13,textAlign:'left',padding:5}}>
                  
                      <span style={{color:this.props.info.cmtnd?"":"#e2e2e2"}}><i>{this.props.info.cmtnd?this.props.info.cmtnd:"Chưa cập nhật"}</i>
                          
                      </span>
                  </td>  
                  <td style={{height:40,border:'1px solid #e2e2e2',borderLeft:'',fontSize:13,textAlign:'center',padding:5,width:30}}>
                    <span style={{color:'#108ee9',fontSize:12,textAlign:'center',display:(this.props.isSuperAdmin==2||this.props.isSuperAdmin==3)?"":"none"}}>
                    <Icon type="edit" onClick={this.showModalCMT}>Edit</Icon></span>
                  </td>                
                </tr>
                <tr> 
                  <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,width:'30%'}}>Email</th>
                  <td style={{height:40,border:'1px solid #e2e2e2',borderRight:'',fontSize:13,textAlign:'left',padding:5}}>
                    
                      <span style={{color:this.props.info.email?"":"#e2e2e2"}}><i>{this.props.info.email?this.props.info.email:"Chưa cập nhật"}</i>
                       
                      </span>
                  </td>  
                  <td style={{height:40,border:'1px solid #e2e2e2',borderLeft:'',fontSize:13,textAlign:'center',padding:5,width:30}}>
                    <span style={{color:'#108ee9',fontSize:12,textAlign:'center',display:(this.props.isSuperAdmin==2||this.props.isSuperAdmin==3)?"":"none"}}>
                    <Icon type="edit" onClick={this.showModalEmail}>Edit</Icon></span>
                  </td>                
                </tr>
      
                <tr>  
                  <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,width:'30%'}}>Vai trò</th>
                  <td style={{height:40,border:'1px solid #e2e2e2',borderRight:'',fontSize:13,textAlign:'left',padding:5}}>
                    <i>{role_content}</i>
                  </td>  
                  <td style={{height:40,border:'1px solid #e2e2e2',borderLeft:'',fontSize:13,textAlign:'center',padding:5,width:30}}>
                    <span style={{color:'#108ee9',fontSize:12,textAlign:'center',display:(this.props.isSuperAdmin==2||this.props.isSuperAdmin==3)?"":"none"}}>
                    <Icon type="edit" onClick={this.showModalRole}>Edit</Icon></span>
                  </td>                
                </tr>
                <tr> 
                  <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,width:'30%'}}>Tổng tiền</th>
                  <td style={{height:40,border:'1px solid #e2e2e2',borderRight:'',fontSize:13,textAlign:'left',padding:5}}>
                    <i>{this.formatCurency(this.props.info.tm)} </i>
                    
                  </td>   
                  <td style={{height:40,border:'1px solid #e2e2e2',borderLeft:'',fontSize:13,textAlign:'center',padding:5,width:30}}>
                    <span style={{color:'#108ee9',fontSize:12,textAlign:'center',display:(this.props.isSuperAdmin==2||this.props.isSuperAdmin==3)?"":"none"}}>
                    <Icon type="edit" onClick={this.showModalTotal}>Edit</Icon></span>
                  </td>               
                </tr>
      
                <tr>  
                
                   <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,width:'30%'}}>Active</th>
                  <td style={{height:40,border:'1px solid #e2e2e2',borderRight:'',fontSize:13,textAlign:'left',padding:5}}><i>{ac_content}</i></td>
                  <td style={{height:40,border:'1px solid #e2e2e2',borderLeft:'',fontSize:13,textAlign:'center',padding:5,width:30}}>
                    <span style={{color:'#108ee9',fontSize:12,textAlign:'center',display:(this.props.isSuperAdmin==2||this.props.isSuperAdmin==3)?"":"none"}}>
                    <Icon type="edit" onClick={this.showModalActive}>Edit</Icon></span>
                  </td>           
                </tr>
                <tr> 
                   <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,width:'30%'}}>Tiền trong két sắt</th>
                  <td style={{height:40,border:'1px solid #e2e2e2',borderRight:'',fontSize:13,textAlign:'left',padding:5}}><i>{this.formatCurency(this.props.info.sm)}</i>
                    
                  </td>       
                                
                <td style={{height:40,border:'1px solid #e2e2e2',borderLeft:'',fontSize:13,textAlign:'center',padding:5,width:30}}>
                    <span style={{color:'#108ee9',fontSize:12,textAlign:'center',display:(this.props.isSuperAdmin==2||this.props.isSuperAdmin==3)?"":"none"}}>
                    <Icon type="edit" onClick={this.showModalKet}>Edit</Icon></span>
                  </td>    
                </tr>  
                <tr>  
                   <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,width:'30%'}}>Lock/UnLock tài khoản</th>
                   <td style={{height:40,border:'1px solid #e2e2e2',borderRight:'',fontSize:13,textAlign:'left',padding:5}}>
                    <span ><i>{this.props.info.l==true?"Đã khóa":"Chưa khóa"}</i></span>
                   
                   </td>  
                   <td style={{height:40,border:'1px solid #e2e2e2',borderLeft:'',fontSize:13,textAlign:'center',padding:5,width:30}}>
                    <span style={{color:'#108ee9',fontSize:12,textAlign:'center',display:(this.props.isSuperAdmin==2||this.props.isSuperAdmin==3)?"":"none"}}>
                    <Icon type="edit" onClick={this.showModalLock}>Edit</Icon></span>
                  </td>    
                </tr>
                <tr>    
                   <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,width:'30%'}}>TG xác thực SMS plus</th>
                   <td style={{height:40,border:'1px solid #e2e2e2',borderRight:'',fontSize:13,textAlign:'left',padding:5,color:this.props.info.at !==0?"":"#e2e2e2"}}>
                      <i>{this.props.info.at !==0?this.convertDate(this.props.info.at):"Chưa cập nhật"}</i>
                    
                   </td>
                   <td style={{height:40,border:'1px solid #e2e2e2',borderLeft:'',fontSize:13,textAlign:'center',padding:5,width:30}}>
                    
                  </td>    
                 
                </tr> 
                <tr>    
                   <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,width:'30%'}}>
                    <Button type="primary" style={{height:35}} onClick={()=>this.props.reset_pass(this.props.info.nn)}>Reset password</Button>
                   </th>
                   <td style={{height:40,border:'1px solid #e2e2e2',borderRight:'',fontSize:13,textAlign:'left',padding:5,color:this.props.pass?"":"#e2e2e2"}}>
                      <i>{this.props.pass?this.props.pass:"Mật khẩu sau khi reset"}</i>
                    
                   </td>
                   <td style={{height:40,border:'1px solid #e2e2e2',borderLeft:'',fontSize:13,textAlign:'center',padding:5,width:30}}>
                    
                  </td>    
                 
                </tr> 
              </tbody>
            </table>
          );
        }  
  
    
    return (
      <div style={{overflow:'auto'}}>
        <div style={{display:'-webkit-box',marginLeft:'5%',marginTop:'2%'}}>
          <h3 style={{}}>Thông tin tài khoản</h3>
          <span style={{color:'',fontSize:13,textAlign:'center',marginLeft:20}}>
          <Icon type={this.state.hide?"plus-square-o":"minus-square-o"} onClick={this.hide}><span style={{fontSize:11}}></span></Icon></span>
        </div>  
          {table}
          {editPhone}
          {editCMT}
          {editEmail}
          {editRole}
          {editTotalMoney}
          {editTienKet}
          {editActive}
          {editLock}
      </div>
    );
  }
}

SearchTk.propTypes = {

};

export default SearchTk;
