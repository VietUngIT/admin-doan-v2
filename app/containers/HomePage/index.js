/*
 *
 * HomePage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import messages from './messages';
import { Tabs,
         Input,
       } from 'antd';
const TabPane = Tabs.TabPane;
const Search = Input.Search;
import CcuTab from 'containers/CcuTab';
import {withRouter} from 'react-router' ;
export class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  onChangeKey(txt){

  }
  render() {
    var content1 =false;
    content1=(
      <Input placeholder="Nhập từ khóa cần tìm" style={{width:'50%',height:35,marginLeft:'2%'}} onChange={(txt)=>this.onChangeKey(txt)}/>
    )
    return (
      <div>
        <Helmet
          title="HomePage"
          meta={[
            { name: 'description', content: 'Description of HomePage' },
          ]}
        />
        <div>
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage));
