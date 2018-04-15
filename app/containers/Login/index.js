/*
 *
 * Login
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import messages from './messages';
import LoginPage from 'components/LoginPage';
import {withRouter} from 'react-router' ;

import {
  loginPhone,
  changePhone,
  changePassword,
  changeRemember,
} from './actions';
import {
  selectLoginSuccess,
  selectPhone,
  selectPassword,
  selectIsRemember,
} from './selectors';

export class Login extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div style={{height:'100%'}}>
        <Helmet
          title="Login"
          meta={[
            { name: 'description', content: 'Description of Login' },
          ]}
        />
        <LoginPage loginPhone={this.props.loginPhone} phone={this.props.phone} remember={this.props.remember} changeRemember={this.props.changeRemember}
          password={this.props.password} changePhone={this.props.changePhone} changePassword={this.props.changePassword}/>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  phone: selectPhone(),
  password: selectPassword(),
  remember: selectIsRemember(),
});

function mapDispatchToProps(dispatch) {
  return {
    loginPhone: (phone,password)=> dispatch(loginPhone(phone,password)),
    changePhone: (phone)=> dispatch(changePhone(phone)),
    changePassword: (password)=> dispatch(changePassword(password)),
    changeRemember: (remember)=> dispatch(changeRemember(remember)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
