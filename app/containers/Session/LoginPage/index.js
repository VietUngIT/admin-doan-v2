/*
 *
 * LoginPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import {withRouter} from 'react-router' ;
import {changePassword,
        changeEmail,
        loginEmail,
        rememberMe,
        noRememberMe,
        } from './actions';
import {selectLoginSuccess,
        selectEmail,
        selectPassword,
        selectIsRemember,
        selectOtp,
        } from './selectors';

import messages from './messages';
import Login from 'components/Login';
import { callAPiCountTranfer } from '../../../utils/request';

export class LoginPage extends React.Component { 
  componentWillUnmount=()=>{
    
  }
  render() {
    return (
      <div style={{height:'100%',minHeight:'100%'}}>
        <Helmet
          title="Đăng nhập"
          meta={[
            { name: 'description', content: '' },
          ]}
          link={[
            {rel: "icon",sizes: "36x36", href: "https://cdn1.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/tools-circle-blue-512.png"},
         
          ]}
        >
        </Helmet>
        <Login changeEmail={this.props.changeEmail} changePassword={this.props.changePassword}
          loginEmail={this.props.loginEmail} email={this.props.email} password={this.props.password}
            isRemember={this.props.isRemember} rememberMe={this.props.rememberMe} noRememberMe={this.props.noRememberMe}
          />

      </div>
    );
  }
}

LoginPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loginSuccess: selectLoginSuccess(),
  email: selectEmail(),
  password: selectPassword(),
  isRemember: selectIsRemember(),
  otp : selectOtp(),
});

function mapDispatchToProps(dispatch) {
  return {
    changePassword: (evt)=> dispatch(changePassword(evt.target.value.trim())),
    changeEmail: (evt)=> dispatch(changeEmail(evt.target.value.trim())),
    loginEmail: (email,password,otp)=> dispatch(loginEmail(email,password,otp)),
    rememberMe: ()=> dispatch(rememberMe()),
    noRememberMe: ()=> dispatch(noRememberMe()),
    dispatch,
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage));
