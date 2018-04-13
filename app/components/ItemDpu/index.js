/**
*
* ItemDpu
*
*/

import React from 'react';
// import styled from 'styled-components';


class ItemDpu extends React.Component { 
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
    result = date +" "+time;
    return result;
  }
  render() {
    var active_ = false;

    switch(this.props.row.active){
      case 0 :{
        active_ = "Chưa active";
        break;
      }
      case 1 :{
        active_ = "Đã active";
        break;
      }
      case 2 :{
        active_ = "Đã update";
        break;
      }
      
    }
    return (
      <tr >
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>{this.props.index}</td>
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.props.row.username}</td>
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.props.row.nickname}</td>
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.props.row.mobile}</td>
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.props.row.ip}</td>
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{active_}</td>
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.props.row.agent}</td>
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>
                {this.props.row.time>0?this.props.convertDateTime(this.props.row.time):""}
              </td>
                                  
        </tr>
    );
  }
}

ItemDpu.propTypes = {

};

export default ItemDpu;
