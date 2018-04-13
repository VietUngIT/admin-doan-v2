
import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
var descriptionDiv = false;
class DetailSlot extends React.Component { 
  componentDidMount(){
    descriptionDiv = document.getElementById('detailGame');        
    descriptionDiv.innerHTML = this.props.gameDetail;
    
  }
  componentWillReceiveProps(nextprops){
    if(nextprops.referenceId !== this.props.referenceId){
      if(descriptionDiv){
        descriptionDiv.innerHTML = nextprops.gameDetail;
    
      }else{
        descriptionDiv = document.getElementById('detailGame');    
        
        descriptionDiv.innerHTML = nextprops.gameDetail;
      }
    }
    
  }
  convertTime (time){
    var d = new Date(time),
    yyyy = d.getFullYear(),
    mm = ('0' + (d.getMonth() + 1)).slice(-2),
    dd = ('0' + d.getDate()).slice(-2),
    hh = ('0' + d.getHours()).slice(-2),
    min = ('0' + d.getMinutes()).slice(-2),

    result, time;
    time = hh + ':' + min;
    const date =   dd+ '/' + mm + '/'+ yyyy ;
    result =date+" "+ time ;
    return result;
  }
  render() {
    // console.log(descriptionDiv.innerHTML)
    return (
      <table style={{width:'100%'}}>
      <tbody>
       
        <tr>
          <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Phiên bài</th>
          <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.props.referenceId}</td>              
        </tr>  
        <tr>
          <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Thời gian</th>
          <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.convertTime(this.props.time)}</td>              
        </tr>  
        <tr>
          <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Chi tiết</th>
          <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}} >
            <div >
              <p id="detailGame" style={{fontFamily: 'unset'}}></p>
            </div>
          </td>              
        </tr>  
      </tbody>  
    </table> 
    );
  }
}

DetailSlot.propTypes = {

};

export default DetailSlot;
