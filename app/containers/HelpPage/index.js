/*
 *
 * HelpPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import makeSelectHelpPage from './selectors';
import messages from './messages';
import {Card,} from 'material-ui/Card';

export class HelpPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet
          title="HelpPage"
          meta={[
            { name: 'description', content: 'Description of HelpPage' },
          ]}
        />

        <Card >
          <div><center><h2>This is help page !!! </h2></center></div>
        </Card>

      </div>
    );
  }
}

HelpPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  HelpPage: makeSelectHelpPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HelpPage);
