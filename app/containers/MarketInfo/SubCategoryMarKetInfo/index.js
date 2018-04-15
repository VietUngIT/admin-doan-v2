/*
 *
 * SubCategoryMarKetInfo
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import messages from './messages';
// import CsubCateMarketInfo from 'components/CMarketInfo/CsubCateMarketInfo'

export class SubCategoryMarKetInfo extends React.Component { 
  componentWillMount(){
    this.props.getListCateNewsMK();
  }
  render() {
    return (
      <div style={{width:`75%`,height: '100%',background: "#000", display: 'flex', flexDirection: 'collumn'}}>
        <div style={{flex:45, height: '100%', background: '#2979FF'}}>
          {/* <CsubCateMarketInfo/> */}
        </div>
        <div style={{flex:55, height: '100%', background: '#7C4DFF'}}>
          {React.Children.toArray(this.props.children)}
        </div>
      </div>
    );
  }
}

SubCategoryMarKetInfo.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SubCategoryMarKetInfo);
