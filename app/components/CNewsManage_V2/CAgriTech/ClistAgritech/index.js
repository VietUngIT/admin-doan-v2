
import React from 'react';
import styles from './styles';
import CitemAgritech from '../CitemAgritech';


class ClistAgritech extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    let listItem = null;
    if(this.props.listNews && (this.props.listNews.size>0||this.props.listNews.length>0)){
      listItem = this.props.listNews.map((item,index) => {
        return (<CitemAgritech viewNewsDetail={this.props.viewNewsDetail} key={index} data={item}/>);
      });
    }
    return (
      <div style={styles.content}>
        {listItem}
      </div>
    );
  }
}

ClistAgritech.propTypes = {

};

export default ClistAgritech;
