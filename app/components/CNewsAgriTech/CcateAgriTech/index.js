/**
*
* CcateAgriTech
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import ItemCateAgriTech from '../../CNewsAgriTech/ItemCateAgriTech'
import { Button, Icon } from 'antd'

class CcateAgriTech extends React.Component {
  addCategory=()=>{
    if(this.refs.category.value==null || this.refs.category.value.trim()===""){
      message.error("Nhập đầy đủ thông tin.")
    }else{
      this.props.addCateAgriTech(this.refs.category.value)
      this.refs.category.value="";
    }
  }
  render() {
    let listcat = null;
    let linkDataNull = '/agritech';
    if(this.props.listCate && (this.props.listCate.size>0|| this.props.listCate.length>0)){
      listcat = this.props.listCate.map((item,index) => {
        return (<ItemCateAgriTech key={index} data={item} link={`/agritech/${item.id}`} linkDataNull={linkDataNull}
          deleteItem={this.props.delCateAgriTech} editItem={this.props.editCateAgriTech}
          getName={this.props.setNameCateGetSubCate}/>);
      });
    }
    return (
      <div style={{width:`${this.props.widthCate}%` }}>
        <div style={{paddingTop: 26, width: '95%',maxWidth: 370,margin:'auto'}}>
          <div style={{height: '36px',background: '#c5e5fb',textAlign: 'center',paddingTop: "4px"}}>
            <div style={{display: 'inline',fontSize: '18px'}}>Lĩnh vực kỹ thuật</div>
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
                  <input ref="category" type="text" name="firstname" placeholder="Nhập tên lĩnh vực ..." style={{height: "100%",padding: 3,width: "100%"}}/>
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

CcateAgriTech.propTypes = {

};

export default CcateAgriTech;
