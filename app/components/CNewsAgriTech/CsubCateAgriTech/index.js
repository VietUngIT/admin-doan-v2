/**
*
* CsubCateAgriTech
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import ItemSubCateAgriTech from '../../CNewsAgriTech/ItemSubCateAgriTech'
import { Button, Icon } from 'antd'

class CsubCateAgriTech extends React.Component {
  addCategory=()=>{
    if(this.refs.subcategory.value==null || this.refs.subcategory.value.trim()===""){
      message.error("Nhập đầy đủ thông tin.")
    }else{
      this.props.addSubCate(this.props.idCate,this.refs.subcategory.value)
      this.refs.subcategory.value="";
    }
  }
  render() {
    let listcat = null;
    let linkDataNull = `/agritech/${this.props.idCate}`;
    let name = null;
    if(this.props.listSubCate && (this.props.listSubCate.size>0|| this.props.listSubCate.length>0)){
      listcat = this.props.listSubCate.map((item,index) => {
        return (<ItemSubCateAgriTech key={index} data={item} link={`/agritech/${this.props.idCate}/${item.id}`} linkDataNull={linkDataNull}
          deleteItem={this.props.delSubCate} editItem={this.props.editSubCate} getName={this.props.setSubCateName}/>);
      });
    }
    if(this,this.props.nameCate){
      name = this.props.nameCate;
    }
    return (
      <div style={{width:`${this.props.widthCate}%` }}>
        <div style={{paddingTop: 26, width: '95%',maxWidth: 370,margin:'auto'}}>
          <div style={{height: '36px',background: '#c5e5fb',textAlign: 'center',paddingTop: "4px"}}>
            <div style={{display: 'inline',fontSize: '18px'}}>Lĩnh vực {name}</div>
          </div>
          <div style={{height:35, marginTop: 5}}>
            <table style={{width: '100%'}}>
            <tbody>
              <tr style={{display: "flex"}}>
                <th style={{flex: 1,border: "1px solid #dddddd"}}>Lĩnh vực</th>
                <th style={{border: "1px solid #dddddd",paddingTop: 2,height: 32,flexBasis: 80}}>action</th>
              </tr>
              <tr style={{display:"flex"}}>
                <td style={{border: "1px solid #dddddd", flex: 1}}>
                  <input ref="subcategory" type="text" name="firstname" placeholder="Nhập tên lĩnh vực ..." style={{height: "100%",padding: 3,width: "100%"}}/>
                </td>
                <td style={{border: "1px solid #dddddd",paddingTop: 2, height: 32,flexBasis: 80}}>
                  <Button onClick={this.addCategory} type="primary" icon="plus-square" ghost style={{border: 'none',width:"100%",padding: 0}} >
                    Thêm
                  </Button>
                </td>
              </tr>
              {listcat}
            </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

CsubCateAgriTech.propTypes = {

};

export default CsubCateAgriTech;
