/**
*
* DetailDuyetDl
*
*/

import React from 'react';
// import styled from 'styled-components';


class DetailDuyetDl extends React.Component { 
  componentWillMount=()=>{
    this.props.detail_duyet_dl(this.props.id);
  }
  convertDate (time){
    var d = new Date(time),
    yyyy = d.getFullYear(),
    mm = ('0' + (d.getMonth() + 1)).slice(-2),
    dd = ('0' + d.getDate()).slice(-2),
    hh = ('0' + d.getHours()).slice(-2),
    min = ('0' + d.getMinutes()).slice(-2),

    result, time;
    time = hh + ':' + min;
    result = time ;
    const date =   dd+ '/' + mm + '/'+ yyyy ;
    result = date +" "+time;
    return result;
  }
  formatMoney(price){
    var strPrice = price+'';
    var a = strPrice.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')+ ' King';
    return a;
  }
  render() {
    var content = false;
    if(this.props.data_detail){
      content = (
        <table style={{width:'100%'}} >
          <tbody style={{overflow:'auto'}} >
            
            <tr style={{overflow:'auto',background:"rgb(236, 246, 253)",fontStyle:'italic'}}>
              <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Từ</th>
              <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Đến</th>
              <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Số tiền chuyển</th>
              <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}} >Thời gian</th>
              <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Chú thích</th>                                
            </tr>  
            <tr>
             
                <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>                  
                  <div>{this.props.data_detail.from}</div> 
                  <div style={{color:'rgb(107, 103, 103)',fontSize:12}}><b><i>{this.props.data_detail.fromRole}</i></b></div> 
                </td>
                <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>
                  <div> {this.props.data_detail.to}</div> 
                  <div style={{color:'rgb(107, 103, 103)',fontSize:12}}><b><i>{this.props.data_detail.toRole}</i></b></div> 
                </td>
                <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>
                  {this.formatMoney(this.props.data_detail.amount)}
                
                </td>
                <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>
                  {this.convertDate(this.props.data_detail.time)}
                
                </td>
                <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>
                  {this.props.data_detail.reaseon}
                </td>
               
            </tr>   
          </tbody>  
        </table>  
      )
    }
    return (
      <div>
        {content}
      </div>
    );
  }
}

DetailDuyetDl.propTypes = {

};

export default DetailDuyetDl;
