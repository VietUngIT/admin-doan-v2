/*
 *
 * MoneyContainer
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import messages from './messages';
import { Link,browserHistory } from 'react-router';

export class MoneyContainer extends React.Component { 
  componentWillMount(){
    if(location.pathname==`/money` || location.pathname==`/money/`){
      browserHistory.push(`/moneytotal`)
    }
  }
  render() {
    return (
      <div>
       
       {React.Children.toArray(this.props.children)}
      </div>
    );
  }
}

MoneyContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MoneyContainer);
