/**
*
* CategoryNews
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import {message,} from 'antd';
import ItemCategoryNews from '../../item/ItemCategoryNews'
import { Button, Icon } from 'antd'

class CategoryNews extends React.Component {
  addCategory=()=>{
    if(this.refs.category.value==null || this.refs.category.value.trim()===""){
      message.error("Nhập đầy đủ thông tin.")
    }else{
      this.props.addCateNews(this.refs.category.value)
      this.refs.category.value="";
    }
  }
  render() {
    let listcat = null;
    if(this.props.listCategoryNews && (this.props.listCategoryNews.size>0|| this.props.listCategoryNews.length>0)){
      listcat = this.props.listCategoryNews.map((item,index) => {
        return (<ItemCategoryNews key={index} data={item} delCateNews={this.props.delCateNews} editCateNews={this.props.editCateNews}
          getListNewsByCate={this.props.getListNewsByCate} idCateGetNews={this.props.idCateGetNews} getListNewsByCate={this.props.getListNewsByCate}/>);
      });
    }
    return (
      <div style={{width: `${this.props.widthCategoryNew}%`, }}>
        <div style={{paddingTop: 26, width: '100%',maxWidth: 370,margin:'auto'}}>
          <div style={{height: '36px',background: '#c5e5fb',textAlign: 'center',paddingTop: "4px"}}>
            <div style={{display: 'inline',fontSize: '18px'}}>Danh mục lĩnh vực tin tức</div>
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

CategoryNews.propTypes = {

};

export default CategoryNews;
