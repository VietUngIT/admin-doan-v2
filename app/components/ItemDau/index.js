/**
*
* ItemDau
*
*/

import React from 'react';
// import styled from 'styled-components';
import { 
  Tabs,
  Input,
  Button,
  message,
  Pagination ,
  Modal,
  TimePicker,
  Icon,
} from 'antd';
import DetailDau from 'components/DetailDau';

class ItemDau extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {     
      
      showDAU : false,
      
    }
  }
  showModalDAU = () => {
    this.setState({
      showDAU: true,
    });
  }
  handleOkDAU = (e) => {
    this.setState({
      showDAU: false,
    });
  }
  handleCancelDAU = () => {
    this.setState({
      showDAU: false,
    });
  }
  convertDateTime(time){
    var d = new Date(time),
    yyyy = d.getFullYear(),
    mm = ('0' + (d.getMonth() + 1)).slice(-2),
    dd = ('0' + d.getDate()).slice(-2),
    hh = ('0' + d.getHours()).slice(-2),
    min = ('0' + d.getMinutes()).slice(-2),
    seconds = ('0' + d.getSeconds()).slice(-2),
    result, time;
    time = hh + ':' + min + ":" + seconds;
    result = time ;
    const date =   dd+ '/' + mm + '/'+ yyyy ;
    result = date;
    return result;
  }
  render() {
    
    var detailDAU = (
      
        <Modal
        title="Chi tiết DAU "
        style={{width:500,height:300}}
        width = {600}
        visible={this.state.showDAU}
        onOk={this.handleOkDAU}
        onCancel={this.handleCancelDAU}
        footer={[]}
        >
          <DetailDau row={this.props.row} />
        </Modal>
        
     
    )
    return (
      
        <tr style={{width:'100%'}} key={this.props.index}>
        {detailDAU}
          <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:15}}>{this.convertDateTime(this.props.row.date)}</td>                
          <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>{this.props.row.total}</td>
          <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}} onClick={this.showModalDAU}>
            <Icon type="plus" />
          </td>
                                    
        </tr>
    );
  }
}

ItemDau.propTypes = {

};

export default ItemDau;
