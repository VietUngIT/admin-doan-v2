/**
*
* LoginPage
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import styles from './styles';
import styled from 'styled-components';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Input,Button,Icon,Row,Col,Checkbox,message,Form } from 'antd';
import { Link } from 'react-router';
import {
  loginPhone,
  loginError,
} from 'containers/Login/actions';
const Input_ = styled.input`
  color: black ;
  height : 35px;
  width : 100%;
  borderRadius : 5px;
  border : 1px solid #1A237E;
  fontSize : 15px;
  paddingLeft:8%;
  &:focus {
    box-shadow: 0 0 0 2px rgba(16, 142, 233, 0.2);
    outline: 0;
    color :#5c4646 ;
  },
`;

//var phone = null;
//var password = null;
//var textError = null;
class LoginPage extends React.Component { 
  loginPhone=()=>{
    if(this.refs.phone.props.value!=null && this.refs.password.props.value != null &&
      this.refs.phone.props.value.trim() !="" && this.refs.password.props.value.trim() !=""){
      this.props.loginPhone(this.refs.phone.props.value.trim(),this.refs.password.props.value.trim());
    }else{
      this.props.loginError('Không được để trống !')
      message.error("Không được để trống !")
    }
  };
  onChangeRemember=(e)=>{
    this.props.changeRemember(e.target.checked);
  }
 
  render() {
    var userInfo;
    if(JSON.parse(localStorage.getItem('userInfo'))){
      userInfo=JSON.parse(localStorage.getItem('userInfo'));
    }

    

    let phone="null";
    if(!this.props.phone){
      phone="";
    } else {
      phone = this.props.phone;
    }
    let password="null";
    if(!this.props.password){
      password="";
    } else {
      password = this.props.password;
    }

    return (
      <div style={styles.page}>
          <img src={require('./bg.jpg')} style={styles.imageBG}/>
          <div style={styles.content}>
            <div style={styles.formLogin}>
              <div style={styles.innerformLogin} >
                <div style={{padding: 10}}>
                  <div style={{textAlign: "right"}}>
                    <span style={{fontSize:30,fontWeight:"bold"}}>ADMIN LOGIN</span>
                  </div>
                  <div style={{height: 3,background:"#1A237E",marginBottom: 3}}></div>
                  <div style={{height: 6,background:"#1A237E"}}></div>
                </div>
                <div style={{padding: 10}}>
                  <div style={{marginBottom: 15,marginTop: "7%"}}>
                    <div style={{width:'20px',height:'100%'}}>
                      <Icon type="user" style={styles.icon} />
                    </div>
                    <Input_ value={phone} placeholder="Phone"  ref="phone" autoComplete = "off" 
                        onChange={(e)=>this.props.changePhone(e.target.value)}/>
                  </div>
                  <div style={{marginBottom: "4%",marginTop: "3%"}}>
                    <div style={{width:'20px',height:'100%'}}>
                      <Icon type="lock" style={styles.icon} />
                    </div>
                    <Input_ value={password} placeholder="Password" type="password"  ref="password" autoComplete = "off" 
                        onChange={(e)=>this.props.changePassword(e.target.value)}/>
                  </div>
                  <div><Checkbox onChange={this.onChangeRemember}>Remember password</Checkbox></div>
                  <div>
                    <Button style={styles.btnLogin} onClick={this.loginPhone} onKeyPress={this.handleKeyPress}> ĐĂNG NHẬP </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    );
  }
}

LoginPage.propTypes = {

};
const mapStateToProps = createStructuredSelector({

});

function mapDispatchToProps(dispatch) {
  return {
    loginPhone: (phone,password)=> dispatch(loginPhone(phone,password)),
    loginError: (error)=> dispatch(loginError(error)),
    
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
