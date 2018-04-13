import React from 'react';
import { FormattedMessage } from 'react-intl';

import Wrapper from './Wrapper';
import messages from './messages';

function Footer() {
  return (
    <Wrapper>
      <section>
        <FormattedMessage {...messages.licenseMessage} />
      </section>
      <section>
        <FormattedMessage
          {...messages.authorMessage}
          values={{
            author: <a href="https://twitter.com/mxstbr">Max Stoiber</a>,
          }}
        />
      </section>
    </Wrapper>
  );
}

export default Footer;
