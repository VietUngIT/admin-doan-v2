/**
*
* ClistMarketInfo
*
*/

import React from 'react';
import styles from './styles';
import CitemMarketInfo from '../CitemMarketInfo';

class ClistMarketInfo extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    let listItem = null;
    if(this.props.listNews && (this.props.listNews.size>0||this.props.listNews.length>0)){
      listItem = this.props.listNews.map((item,index) => {
        return (<CitemMarketInfo viewNewsDetail={this.props.viewNewsDetail} key={index} data={item}/>);
      });
    }
    return (
      <div style={styles.content}>
        {listItem}
      </div>
    );
  }
}

ClistMarketInfo.propTypes = {

};

export default ClistMarketInfo;
