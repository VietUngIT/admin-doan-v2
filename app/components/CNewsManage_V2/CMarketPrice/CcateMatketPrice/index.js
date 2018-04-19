
import React from 'react';
import CitemCateMatketPrice from '../CitemCateMatketPrice';
class CcateMatketPrice extends React.Component {
  
  render() {
    let listcat = null;
    if(this.props.listCate && (this.props.listCate.size>0|| this.props.listCate.length>0)){
      listcat = this.props.listCate.map((item,index) => {
        return (<CitemCateMatketPrice key={index} index={index} data={item} delCateMP={this.props.delCateMP}/>);
      });
    }
    return (
      <div style={{padding: "10px 20px"}}>
        {listcat}
      </div>
    );
  }
}

CcateMatketPrice.propTypes = {

};

export default CcateMatketPrice;
