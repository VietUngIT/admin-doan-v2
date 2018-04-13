/*
 *
 * HomePage1
 *
 */

import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import messages from './messages';
import styles from './styles';
import { Link } from 'react-router';
import MenuBar from 'components/MenuBar';
import Demo from 'components/Demo';
import { Layout, Menu,Icon,Row,Col,Button } from 'antd';

const ButtonItemBot = styled.button`
  background : #0e77ca;
  padding: 3px 5px;
  border-radius: 5px;
  font-weight: 600;
  width: 200px;
  height: 40px;
  font-size: 16px;
  &:hover {
    background: #ffa733;
  }

  color : white;
}`;
const MenuItem = styled.a`

  &:hover {
    color: rgba(222, 134, 5, 1);
  }


`;
export class HomePage1 extends React.Component {

  render() {
    //<btnHeader to={'/session/register'}>style={styles.btnLeft}>
    // <div style={{marginLeft:`${this.state.marginLeft}px`,transition: 'all 5s',overflow: 'hidden',background:"red",}}>
    //  TẠO BOT THẬT DỄ DÀNG </div>
    return (
      <div style={styles.page}>
        <Helmet
          title="Trang chủ"
          meta={[
            { name: 'description', content: 'Description of HomePage1' },
          ]}
        />

        <div style={styles.nav}>
          <MenuBar/>

          <Row style={styles.logo}>
            <Col md={1}>
              <img src={require('./iconbot.png')} width='60' height='60'/>
            </Col>
            <Col md={20} style={styles.logoTxt}>
              <span> CLOUD CHAT BOT </span>
            </Col>
          </Row>
        </div>

        <div style={styles.content}>
          <div style={styles.header}>
            <img src={require('./BK.jpg')}  style={styles.imgBK}/>
            <Col md={10} style={styles.contentLeft}>
              <Row style={styles.contentLeftTxt}>
              <Demo />

              </Row>
              <Row style={styles.contentLeftBtn}>
                <Link to={'/session/register'}>
                  <ButtonItemBot>Tạo Bot miễn phí  <Icon type="arrow-right" /></ButtonItemBot>
                </Link>
              </Row>
            </Col>
          </div>

          <Row style={styles.txtCenter}>
            <center><h2 style={styles.h2Txt}>
                        <Icon type="check-circle-o" />  VỚI CLOUD CHAT BOT, TẠO CHAT BOT CHƯA BAO GIỜ DỄ DÀNG ĐẾN VẬY
                    </h2>
            </center>
          </Row>

          <Row>
            <Menu
            style={styles.menu}
            theme="light"
            mode="horizontal"
            >

                <Menu.Item key="1" style={styles.menuItem}>
                  <Row style={styles.imgQC}>
                    <img src={require('./mess.png')} width='98' height='98'/>
                  </Row>
                  <Row style={styles.txtQC}>FB Messenger</Row>
                </Menu.Item>
                <Menu.Item key="2" style={styles.menuItem}>
                  <Row style={styles.imgQC}>
                    <img src={require('./sms.png')} width='98' height='98'/>
                  </Row>
                  <Row style={styles.txtQC,{paddingLeft:'17%',fontSize:'18px'}}>SMS</Row>
                </Menu.Item>
                <Menu.Item key="3"style={styles.menuItem}>
                  <Row style={styles.imgQC}>
                    <img src={require('./zalo.png')} width='98' height='98'/>
                  </Row>
                  <Row style={styles.txtQC,{paddingLeft:'17%',fontSize:'18px'}}>Zalo</Row>
                </Menu.Item>
                <Menu.Item key="4" style={styles.menuItem}>
                  <Row style={styles.imgQC}></Row>
                  <Row style={styles.txtQC}>Navigation One</Row>
                </Menu.Item>
            </Menu>
          </Row>


        </div>
      </div>
    );
  }
}

HomePage1.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage1);
