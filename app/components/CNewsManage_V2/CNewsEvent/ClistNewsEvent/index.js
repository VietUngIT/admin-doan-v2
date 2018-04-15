/**
*
* ClistNewsEvent
*
*/

import React from 'react';
import styles from './styles';
import CitemNews from '../CitemNews';


class ClistNewsEvent extends React.Component {
  render() {
    let listItem = null;
    if(this.props.listNews && (this.props.listNews.size>0||this.props.listNews.length>0)){
      listItem = this.props.listNews.map((item,index) => {
        return (<CitemNews viewNewsDetail={this.props.viewNewsDetail} key={index} data={item}/>);
      });
    }
    return (
      <div style={styles.content}>
        {listItem}
      </div>
    );
  }
}

ClistNewsEvent.propTypes = {

};

export default ClistNewsEvent;
