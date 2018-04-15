/**
*
* ListNewByCate
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import ItemNews from '../../item/ItemNews'
import { Tooltip, Icon, Pagination } from 'antd';
import { browserHistory } from 'react-router';
class ListNewByCate extends React.Component {
  BackOn(){
    browserHistory.push(`/news/${this.props.idCate}`)
  } 
  render() {
    let name = null;
    let listItem = null;
    if(this.props.listNewsByCate && (this.props.listNewsByCate.size>0||this.props.listNewsByCate.length>0)){
      listItem = this.props.listNewsByCate.map((item,index) => {
        return (<ItemNews key={index} data={item}/>);
      });
    }
    if(this.props.nameCate){
      name = this.props.nameCate;
    }else{
      name = "";
    }
    
    return (
      <div style={{width: '100%',}}>
        <div style={{paddingTop: 26, width: '90%',margin:'auto',maxWidth:690}}>
          <div style={{height: '36px',background: '#c5e5fb',textAlign: 'center',paddingTop: "4px",width:"100%",display: 'flex', flexDirection:'row'}}>
            <div style={{flexBasis: 70,paddingTop: 5,display: this.props.back?"":"none"}}>
              <div style={{textDecoration: 'underline',color: '#1976D2',cursor: 'pointer'}} onClick={()=>this.BackOn()}>Quay về</div>
            </div>
            <div style={{fontSize: '18px',marginBottom:5,flex:1}}>Danh sách tin tức {name} </div>
          </div>
          <div style={{paddingTop:5,}}>
            {listItem}
          </div>
        </div>
      </div>
    );
  }
}

ListNewByCate.propTypes = {

};

export default ListNewByCate;
