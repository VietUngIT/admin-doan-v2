
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { Row, Col, Button, Icon,Pagination } from 'antd';
import styles from './styles';
import CcateMatketPrice from 'components/CNewsManage_V2/CMarketPrice/CcateMatketPrice'
import {
  getListCateMP,
  addCateMP,
  delCateMP,
 } from './actions';
 import {
  selectListCateMP,
 } from './selectors';

export class CateMarketPrice extends React.Component {
  componentWillMount(){
    this.props.getListCateMP();
  }
  render() {
    return (
      <div style={{height: '100%'}}>
        <Helmet
          title="CateMarketPrice"
          meta={[
            { name: 'description', content: 'Description of CateMarketPrice' },
          ]}
        />
        <Row>
          <Col span={10}>
            <div style={styles.wrapcontentlistnews}>
              <div style={styles.inlineWrapContentlistnews}>
                <div style={styles.header}>Danh mục tin tức</div>
                <CcateMatketPrice listCate={this.props.listCate} delCateMP={this.props.delCateMP}/>
                <div style={styles.wrapButton}>
                  <Button type="primary" icon="plus" size='large' >Thêm mới</Button>
                </div>
              </div>
            </div>
          </Col>
          <Col span={14}>
            {React.Children.toArray(this.props.children)}
          </Col>
        </Row>
      </div>
    );
  }
}

CateMarketPrice.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  listCate: selectListCateMP(),
});

function mapDispatchToProps(dispatch) {
  return {
    getListCateMP: () => dispatch(getListCateMP()),
    addCateMP: (name,image) => dispatch(addCateMP(name,image)),
    delCateMP: (id) => dispatch(delCateMP(id)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CateMarketPrice);
