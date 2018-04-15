/**
*
* InfoAdminPage
*
*/

import React from 'react';
import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import {message,} from 'antd';
import {Icon,Button,Modal} from 'antd';

import styles from './styles';
import { right } from 'glamor';
import ModalEditInfo from 'components/ModalEditInfo';
import ModalChangePass from 'components/ModalChangePass';
const Button_ = styled.button`
  height: 35px;
  width: 280px;
  font-size: 15px;
  color: #FFFFFF;
  background: #0091ea;
  border : 1px solid #78909c;
  &:focus {
    border : 1px solid #01579b;
    box-shadow: 0 0 0 2px rgba(16, 142, 233, 0.2);
    outline: 0;
  },
`;

class InfoAdminPage extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {    
      showModalName:false,
      showModalPhone: false,
      showModalAddress: false,
      showModalPass: false,
      avatarTemp: false,

    };
   
  }
  imageHandler=(e2)=>{
    var store = document.getElementById('imgstore');
    store.src = e2.target.result;

    var dataInBase64 = e2.target.result.toString();
    this.props.changeAvatarAdmin(dataInBase64);
  }

  loadImage(e){
    var filename = e.target.files[0];
    var fr = new FileReader();
    fr.onload = this.imageHandler;
    fr.readAsDataURL(filename);
  }

  changeImageHandle(){
    if(this.props.avatar && this.props.avatar.toString().indexOf("data\:image")>-1 && this.props.avatar.toString().indexOf(";base64")>-1){
      this.props.submitChangeAvatarAdmin(this.props.avatar);
    }else{
      message.error("Chưa chọn ảnh.");
    }
  }

  showModalNameHandle = () => {
    this.setState({
      showModalName: true,
    });
  }
  handleCancelName = (e) => {
    this.setState({
      showModalName: false,
    });
  }
  showModalPhoneHandle = () => {
    this.setState({
      showModalPhone: true,
    });
  }
  handleCancelPhone = (e) => {
    this.setState({
      showModalPhone: false,
    });
  }
  showModalAddressHandle = () => {
    this.setState({
      showModalAddress: true,
    });
  }
  handleCancelAddress = (e) => {
    this.setState({
      showModalAddress: false,
    });
  }
  showModalPassHandle = () => {
    this.setState({
      showModalPass: true,
    });
  }
  handleCancelPass = (e) => {
    this.setState({
      showModalPass: false,
    });
  }
  render() {
    let name ="";
    let phone = "";
    let address = "";
    let avatar = false;
    var editInfoName = false;
    var editInfoPhone = false;
    var editInfoAddress = false;
    var editInfoPass = false;
    if(this.props.user){
      if(this.props.user.name!=null){
        name = this.props.user.name;
      }
      if(this.props.user.phone!=null){
        phone = this.props.user.phone;
      }
      if(this.props.user.address!=null){
        address = this.props.user.address;
      }
      if(this.props.user.avatar!=null && this.props.user.avatar.length>1){
        avatar = this.props.user.avatar;
      }else{
        avatar = require('containers/App/maxresdefault.jpg');
      }
    }
    editInfoName  = (
      <div>  
        <Modal title="Sửa thông tin" style={{width:500,height:300}} width = {600} visible={this.state.showModalName}
          onOk={this.handleCancelName} onCancel={this.handleCancelName} footer={[]}>
          <ModalEditInfo info={name} cancel = {this.handleCancelName} editInfo={this.props.changeNameAdmin} />
        </Modal>
      </div>  
    );
    editInfoPhone  = (
      <div>  
        <Modal title="Sửa thông tin" style={{width:500,height:300}} width = {600} visible={this.state.showModalPhone}
          onOk={this.handleCancelPhone} onCancel={this.handleCancelPhone} footer={[]}>
          <ModalEditInfo info={phone} cancel = {this.handleCancelPhone} editInfo={this.props.changePhoneAdmin} />
        </Modal>
      </div>  
    );
    editInfoAddress  = (
      <div>  
        <Modal title="Sửa thông tin" style={{width:500,height:300}} width = {600} visible={this.state.showModalAddress}
          onOk={this.handleCancelAddress} onCancel={this.handleCancelAddress} footer={[]}>
          <ModalEditInfo info={address} cancel = {this.handleCancelAddress} editInfo={this.props.changeAddressAdmin} />
        </Modal>
      </div>  
    );
    editInfoPass  = (
      <div>  
        <Modal title="Đổi mật khẩu" style={{width:500,height:300}} width = {600} visible={this.state.showModalPass}
          onOk={this.handleCancelPass} onCancel={this.handleCancelPass} footer={[]}>
          <ModalChangePass cancel = {this.handleCancelPass} changePassAdmin={this.props.changePassAdmin} />
        </Modal>
      </div>  
    );
    return (
      <div style={{width: "80%",height: "90%",margin:"auto", background: "#FFFFF",borderRadius: "3px",border:"1px solid",boxShadow: "#054574 10px 10px 5px",padding:40}}>
        <div style={{display:"flex",height:"100%",width:"100%"}}>
          {editInfoName}
          {editInfoPhone}
          {editInfoAddress}
          {editInfoPass}
          <div style={{display:"flex",flexDirection:"collumn",height:"100%",width: "100%"}}>
            <div style={{flex:5,height:"100%"}}>
              <div style={{padding: 10,background: "#26c6da",textAlign: "center",fontSize: 16,fontWeight: 600,marginBottom:10}}>Quản lý thông tin cá nhân.</div>
              <div style={{padding:10,marginBottom:10}}>
                <div style={{fontWeight:"bold",fontStyle:"italic",marginBottom:5}}>Tên:</div>
                <div style={{display:"flex",flexDirection:"collumn",borderBottom: "1px dotted #000000"}}>
                  <div style={{fontSize:16, flex:8}}>{name}</div>
                  <div style={{flex:2,textAlign: "center"}}>
                    <span style={{color:'#108ee9',fontSize:12,}}>
                      <Icon type="edit" onClick={this.showModalNameHandle} style={{paddingRight:3}}></Icon>
                      Edit
                    </span>
                  </div>
                </div>
              </div>
              <div style={{padding:10,marginBottom:10}}>
                <div style={{fontWeight:"bold",fontStyle:"italic",marginBottom:5}}>Số điện thoại:</div>
                <div style={{display:"flex",flexDirection:"collumn",borderBottom: "1px dotted #000000"}}>
                  <div style={{fontSize:16, flex:8}}>{phone}</div>
                  <div style={{flex:2,textAlign: "center"}}>
                    <span style={{color:'#108ee9',fontSize:12,}}>
                      <Icon type="edit" onClick={this.showModalPhoneHandle} style={{paddingRight:3}}></Icon>
                      Edit
                    </span>
                  </div>
                </div>
              </div>
              <div style={{padding:10,marginBottom:10}}>
                <div style={{fontWeight:"bold",fontStyle:"italic",marginBottom:5}}>Địa chỉ:</div>
                <div style={{display:"flex",flexDirection:"collumn",borderBottom: "1px dotted #000000"}}>
                  <div style={{fontSize:16, flex:8}}>{address}</div>
                  <div style={{flex:2,textAlign: "center"}}>
                    <span style={{color:'#108ee9',fontSize:12,}}>
                      <Icon type="edit" onClick={this.showModalAddressHandle} style={{paddingRight:3}}></Icon>
                      Edit
                    </span>
                  </div>
                </div>
              </div>
              <div style={{padding:10}}>
                <Button type="primary" onClick={this.showModalPassHandle} ghost style={{float:"right"}}>Đổi mật khẩu</Button>
              </div>
            </div>
            <div style={{flex:5,height:"100%",padding:10}}>
              <div style={{width:280,height:280,margin:"auto",marginBottom:20,position: 'relative'}}>
                <img src={avatar} id="imgstore" width='100%' height='100%' style={{borderRadius:50,border: "2px solid #1A237E"}}/>
                <input type="file" id="imageAvatar" onChange={(e)=>this.loadImage(e)} style={styles.changeImage} accept="image/*"/>
              </div>
              <div style={{height: 35,width: 280,margin:"auto"}}>
                <Button_ onClick={()=>this.changeImageHandle()}>Change avatar</Button_>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

InfoAdminPage.propTypes = {

};

export default InfoAdminPage;
