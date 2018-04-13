/**
*
* Login
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import {withRouter} from 'react-router' ;
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import { Input,Button,Icon,Row,Col,Checkbox,message,Form } from 'antd';
import messages from './messages';
import styles from './styles';
import { Link } from 'react-router';
import {
        loginEmail,
        loginError,
      } from 'containers/Session/LoginPage/actions';
import md5 from 'blueimp-md5';
// cai nay la css, ben container gọi n
const SPAN = styled.span`
color:#108ee9 ;
&:hover {
  color: red;
},

`;
const SPAN_ = styled.span`
color:#108ee9 ;
&:hover {
  color: red;
},
margin-left:5%;
`;
const Input_ = styled.input`
 color: black ;
 height : 35px;
 width : 100%;
 borderRadius : 5px;
 border : 1px solid rgb(75, 153, 201);
//  marginTop : 5px;
//  marginBottom : 5px;
 fontSize : 15px;
 paddingLeft:8%;
 &:focus {
   box-shadow: 0 0 0 2px rgba(16, 142, 233, 0.2);
  outline: 0;
  color :#5c4646 ;

 },

`;
var email = null;
var password = null;
var textError = null;

class Login extends React.Component {

  constructor(props) {
    super(props);
      this.state = {
        isMobile: false,
        otp : false,
      };
  }

 updateDimensions() {
   if(window.innerWidth < 760) {
     this.setState({ isMobile: true});
   } else {
    this.setState({ isMobile: false});
   }
 }

 componentDidMount() {
   this.updateDimensions();
   window.addEventListener("resize", this.updateDimensions.bind(this));
 }

 componentWillUnmount() {
   window.removeEventListener("resize", this.updateDimensions.bind(this));
 }
 onChangeOTP=(e)=>{
   this.setState({"otp":e.target.value})
 }
      handleKeyPress=(target) =>{
          if(target.charCode==13){
              this.loginEmail();
          }
    
      };
      onChange = (e)=>{
        if(e.target.checked==true){
          this.props.rememberMe();
        }else{
          this.props.noRememberMe();
        }
    
      };
      loginEmail=()=>{
        // console.log("email: ",this.state.otp)
        if(this.refs.email.props.value!=null && this.refs.password.props.value != null &&
          this.refs.email.props.value.trim() !="" && this.refs.password.props.value.trim() !=""&& this.state.otp.trim() !="" ){
          this.props.loginEmail(this.refs.email.props.value.trim(),(this.refs.password.props.value.trim()),this.state.otp.trim());
        }else{
          this.props.loginError('Không được để trống !')
          message.error("Không được để trống !")
        }
      };
      reset=()=>{
        if(this.refs.email.props.value && this.refs.email.props.value!=""){
          this.refs.email.props.value ="";
        }
        if(this.refs.password.props.value && this.refs.password.props.value !=""){
          this.refs.password.props.value="";
        }
      };
      closeError =()=>{
        if(this.props.error){
          this.props.loginError('')
        }
      };
      change=()=>{
        this.closeError();
        this.reset();
      }
  render() {

    var userInfo;
    if(JSON.parse(localStorage.getItem('userInfo'))){
      //console.log(JSON.parse(localStorage.getItem('userInfo')))
      userInfo=JSON.parse(localStorage.getItem('userInfo'));
    }

    if(this.props.email ||this.props.email===''){
      email = this.props.email;
    }else{
      if(userInfo){
        if(userInfo.email){
          email = userInfo.email;
        }
      }else{
        email = "";
      }
    }

    if(this.props.password ||this.props.password===''){
      password = this.props.password;
    }else{
      if(userInfo){
        if(userInfo.password){
          password = userInfo.password;
        }
      }else{
        password = "";
      }
    }

    if(this.props.error && this.props.error !=''){
      textError = (
        <div style={styles.error}>
          <Icon type="exclamation-circle-o" style={{marginRight:'15px'}}/>
           {this.props.error}
           <Button type="primary" shape="circle" icon="close"
              style={{background: 'pink',border: 'none',color: 'black',float: 'right',marginTop:'-4px'}}
              onClick={this.closeError}/>
        </div>);
    }else{
      textError="";
    }


    return (
      <div style={styles.page}>
        <div style={{background: 'white',borderRadius :'5px',paddingTop : '10px',paddingBottom : '10px',margin : 'auto',width: `${this.state.isMobile?"90%":"400px"}`,height: `${this.state.isMobile?"auto":"300px"}`}}>
        <Form onKeyPress={this.handleKeyPress}>
            <Col md={12} style={{width:'90%',marginLeft:'5%'}}>
              <Row style={styles.imgLogin}>
                  <img src={require('images/login.png')}  width ='50' height='50'/>
              </Row>
              

              <Row style={{marginBottom:'10px'}}>
                  <div style={{width:'20px',height:'100%'}}>
                    <Icon type="user" style={styles.icon} />
                  </div>
                  <Input_
                    value={email}   placeholder=" Email"  ref="email" autoComplete = "off"
                   onChange={this.props.changeEmail}
                   />
              </Row>
              <Row style={{marginBottom:'10px'}}>
                  <Icon type="lock" style={styles.icon} />
                  <Input_ value={password} type="password" placeholder="Password" ref="password" autoComplete = "off"
                   onChange={this.props.changePassword}/>
              </Row>

              <Row style={{marginBottom:'10px'}}>
                  <div style={{width:'20px',height:'100%'}}>
                    <Icon type="mobile" style={styles.icon} />
                  </div>
                  <Input_
                   placeholder=" Nhập mã OTP"  ref="otp" autoComplete = "off" onChange={this.onChangeOTP}
                   />
              </Row>
              <Row>
                  <Button style={styles.btnLogin} onClick={this.loginEmail} > ĐĂNG NHẬP </Button>
              </Row>
             
            </Col>
          </Form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {

};
const mapStateToProps = createStructuredSelector({

});

function mapDispatchToProps(dispatch) {
  return {
    loginEmail: (email,password,otp)=> dispatch(loginEmail(email,password,otp)),
    loginError: (error)=> dispatch(loginError(error)),
    
    dispatch,
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
