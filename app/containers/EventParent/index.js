/*
 *
 * EventParent
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import messages from './messages';
import { Link,browserHistory } from 'react-router';
import { get_even_parent } from './actions';

export class EventParent extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentWillMount(){
    if(location.pathname==`/events` || location.pathname==`/events/`){
      browserHistory.push(`/event-game`)
    }
    this.props.get_even_parent();
  }
  componentWillReceiveProps=()=>{
    if(location.pathname==`/events` || location.pathname==`/events/`){
      browserHistory.push(`/event-game`)
    }
  }
  componentWillUpdate=()=>{
    if(location.pathname==`/events` || location.pathname==`/events/`){
      browserHistory.push(`/event-game`)
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

EventParent.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
});

function mapDispatchToProps(dispatch) {
  return {
    get_even_parent:()=>dispatch(get_even_parent()),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EventParent);
