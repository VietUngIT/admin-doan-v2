
import React from 'react';
import CitemMarketPrice from '../CitemMarketPrice';


class ClistMarketPrice extends React.Component {
  render() {
    let listcat = null;
    if(this.props.listNews && (this.props.listNews.size>0|| this.props.listNews.length>0)){
      listcat = this.props.listNews.map((item,index) => {
        return (<CitemMarketPrice key={index} index={index} data={item} deleteNewsMP={this.props.deleteNewsMP}/>);
      });
    }
    return (
      <div style={{padding: "10px 10px"}}>
        {listcat}
      </div>
    );
  }
}

ClistMarketPrice.propTypes = {

};

export default ClistMarketPrice;
