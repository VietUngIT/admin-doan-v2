/*
 *
 * RegisterPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import messages from './messages';
import Register from 'components/Register';
import {changePassword,
        changeEmail,
        changeFirstName,
        changeLastName,
        registerEmail,
        } from './actions';
import {selectEmail,
        selectPassword,
        selectLastName,
        selectFirstName,
        } from './selectors';

export class RegisterPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div style={{height:'100%',minHeight:'100%'}}>
        <Helmet
          title="Đăng ký"
          meta={[
            { name: 'description', content: '' },
          ]}
        />
        <Register changeFirstName={this.props.changeFirstName} changeLastName={this.props.changeLastName}
                  changeEmail={this.props.changeEmail} changePassword={this.props.changePassword}
                  registerEmail={this.props.registerEmail} last_name={this.props.last_name}
                  first_name={this.props.first_name} email={this.props.email} password={this.props.password}/>
      </div>
    );
  }
}

RegisterPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({

  email: selectEmail(),
  password: selectPassword(),
  last_name: selectLastName(),
  first_name: selectFirstName(),
});

function mapDispatchToProps(dispatch) {
  return {
    changePassword: (evt)=> dispatch(changePassword(evt.target.value.trim())),
    changeEmail: (evt)=> dispatch(changeEmail(evt.target.value.trim())),
    changeFirstName: (evt)=> dispatch(changeFirstName(evt.target.value.trim())),
    changeLastName: (evt)=> dispatch(changeLastName(evt.target.value.trim())),
    registerEmail: ()=> dispatch(registerEmail()),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
