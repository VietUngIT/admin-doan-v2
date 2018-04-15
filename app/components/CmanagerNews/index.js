/**
*
* CmanagerNews
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import CategoryNews from '../item/CategoryNews'
import ListNewByCate from '../item/ListNewByCate'
class CmanagerNews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      widthCategoryNew: 40,
      widthListNew: 60,
    };
  }
  render() {
    return (
      <div style={{display: "flex",flexDirection:"collumn",}}>
        <CategoryNews widthCategoryNew={this.state.widthCategoryNew} listCategoryNews={this.props.listCategoryNews} addCateNews={this.props.addCateNews} delCateNews={this.props.delCateNews}
          editCateNews={this.props.editCateNews} getListNewsByCate={this.props.getListNewsByCate}/>
        <ListNewByCate widthListNew={this.state.widthListNew} getListNewsByCate={this.props.getListNewsByCate} nameCateGetNews={this.props.nameCateGetNews}
          listNews={this.props.listNews}/>
      </div>
    );
  }
}

CmanagerNews.propTypes = {

};

export default CmanagerNews;
