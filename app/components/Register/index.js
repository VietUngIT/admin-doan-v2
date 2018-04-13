/**
*
* Register
*
*/

import React from 'react';
import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import { Input,Button,Icon,Row,Col,Checkbox } from 'antd';
import messages from './messages';
import styles from './styles';
import { Link } from 'react-router';
import {message,
       } from 'antd';
const SPAN = styled.span`
 color:#ff0 ;
  &:hover {
   color: #8f4c14;
  }
`;
const SPAN_ = styled.span`
 color:white ;
 &:hover {
   color: #8f4c14;
  } `;
class Register extends React.Component {
  registerEmail=()=>{

    if(this.props.email&&this.props.password&& this.props.last_name && this.props.first_name){
      this.props.registerEmail();
    }else{
      message.error('Nhập đầy đủ thông tin !');

    }
  };
  render() {

    return (
      <div style={styles.page}>
      <img src={require('./BK.jpg')}  style={styles.imgBK}/>

        <div style={styles.content}>

          <Row>
            <Col md={11}>
              <img src={require('./chat_bot.png')}  width ='350' height='340'/>

            </Col>
            <Col md={12}>
              <Row style={styles.txtLogin}>
                  <span> ĐĂNG KÝ TÀI KHOẢN </span>
              </Row>
              <Row style={styles.imgLogin}>
                  <img src={require('./login.png')}  width ='50' height='50'/>

              </Row>
              <Row>
                  <Col md={10}>
                      <Input style={styles.inputTxtN} placeholder="Họ" ref="f_name" onChange={this.props.changeFirstName}/>

                  </Col>
                  <Col md={9} style={{marginLeft:'81px'}}>
                      <Input style={styles.inputTxtN} placeholder="Tên" ref="l_name" onChange={this.props.changeLastName}/>

                  </Col>
              </Row>
              <Row>
                  <Input style={styles.inputTxt} placeholder="Email" onChange={this.props.changeEmail}/>

              </Row>
              <Row>
                  <Input type="password" style={styles.inputTxt} placeholder="Mật khẩu" onChange={this.props.changePassword}/>

              </Row>

              <Row>
                  <Button style={styles.btnLogin} onClick={this.registerEmail}> ĐĂNG KÝ </Button>
              </Row>
              <Row style={styles.rEnd}>
                <Col md={12}>
                    <Col md={12}  style={{marginTop:'7px'}}>
                      <Link to={'/'} style={{fontSize:'13px',color:'white',marginLeft:'34%'}}>
                          <SPAN_><Icon type="rollback" /> Quay về </SPAN_>
                      </Link>
                    </Col>
                </Col>
                <Col md={11} style={styles.DangKy}>
                  <Link to={'/session/login'}>
                    <span style={{color:'white'}}>Đã có tài khoản ?</span>
                    <SPAN> Đăng nhập <Icon type="arrow-right" /></SPAN>
                  </Link>
                </Col>

              </Row>

            </Col>
          </Row>


        </div>
      </div>
    );
  }
}

Register.propTypes = {

};

export default Register;
