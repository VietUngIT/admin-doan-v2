/*
 *
 * ManagerAgriTech
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import CcateAgriTech from 'components/CNewsAgriTech/CcateAgriTech'
import messages from './messages';
import {
 getListCateAgriTech,
 addCateAgriTech,
 delCateAgriTech,
 editCateAgriTech,
 setNameCateGetSubCate,
} from './actions';
import {
  selectListCateAgriTech,
} from './selectors';

export class ManagerAgriTech extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      widthCate: 25,
      widthListNew: 75,
    };
  }
  componentWillMount(){
    this.props.getListCateAgriTech();
  }
  render() {
    return (
      <div style={{width: '100%',height: '100%'}}>
        <Helmet
          title="ManagerAgriTech"
          meta={[
            { name: 'description', content: 'Description of ManagerAgriTech' },
          ]}
        />
        <div style={{display: "flex",flexDirection:"collumn",height: '100%'}}>
          <CcateAgriTech widthCate={this.state.widthCate} listCate={this.props.listCate} addCateAgriTech={this.props.addCateAgriTech}
            delCateAgriTech={this.props.delCateAgriTech} editCateAgriTech={this.props.editCateAgriTech}
            setNameCateGetSubCate={this.props.setNameCateGetSubCate}/>
          {React.Children.toArray(this.props.children)}
        </div>
      </div>
    );
  }
}

ManagerAgriTech.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  listCate: selectListCateAgriTech(),
});

function mapDispatchToProps(dispatch) {
  return {
    getListCateAgriTech: () => dispatch(getListCateAgriTech()),
    addCateAgriTech: (name) => dispatch(addCateAgriTech(name)),
    delCateAgriTech: (id) => dispatch(delCateAgriTech(id)),
    editCateAgriTech: (id,name) => dispatch(editCateAgriTech(id,name)),
    setNameCateGetSubCate: (name) => dispatch(setNameCateGetSubCate(name)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManagerAgriTech);
