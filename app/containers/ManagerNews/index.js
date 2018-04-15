/*
 *
 * ManagerNews
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import messages from './messages';
import CmanagerNews from 'components/CmanagerNews'
import CategoryNews from 'components/item/CategoryNews'

import {
  getListCateNews,
  addCateNews,
  delCateNews,
  editCateNews,
  getListNewsByCate,
} from './actions';
import {
  selectCategoryNewsName,
  selectCategoryNewsList,
} from './selectors';

export class ManagerNews extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      widthCategoryNew: 40,
      widthListNew: 60,
    };
  }
  componentWillMount(){
    this.props.getListCateNews();
    // if(this.props.idCateGetNews && this.props.nameCateGetNews){
    //   this.props.getListNewsByCate(this.props.idCateGetNews,this.props.nameCateGetNews);
    // }
  }
  render() {
    // <CmanagerNews listCategoryNews={this.props.listCategoryNews} addCateNews={this.props.addCateNews} delCateNews={this.props.delCateNews}
    //       editCateNews={this.props.editCateNews} getListNewsByCate={this.props.getListNewsByCate} nameCateGetNews={this.props.nameCateGetNews}
    //       listNews={this.props.listNews}/>

    return (
      <div style={{height:'100%'}}>
        <Helmet
          title="ManagerNews"
          meta={[
            { name: 'description', content: 'Description of ManagerNews' },
          ]}
        />
        <div style={{display: "flex",flexDirection:"collumn",}}>
          <CategoryNews widthCategoryNew={this.state.widthCategoryNew} listCategoryNews={this.props.listCategoryNews} addCateNews={this.props.addCateNews} delCateNews={this.props.delCateNews}
            editCateNews={this.props.editCateNews} getListNewsByCate={this.props.getListNewsByCate}/>
          {React.Children.toArray(this.props.children)}
        </div>
      </div>
    );
  }
}

ManagerNews.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  listCategoryNews: selectCategoryNewsList(),
});

function mapDispatchToProps(dispatch) {
  return {
    getListCateNews: ()=> dispatch(getListCateNews()),
    addCateNews: (categoryNews)=> dispatch(addCateNews(categoryNews)),
    delCateNews: (id)=> dispatch(delCateNews(id)),
    editCateNews: (id,nameCate)=> dispatch(editCateNews(id,nameCate)),
    getListNewsByCate: (name)=>dispatch(getListNewsByCate(name)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManagerNews);
