/**
*
* MenuBar
*
*/

import React from 'react';
import styled from 'styled-components';
import { Layout, Menu, Breadcrumb,Dropdown,Icon,Row,Col,Button } from 'antd';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import styles from './styles';

const MenuItem = styled.a`

  &:hover {
    color: rgba(222, 134, 5, 1) !important;
  }

  color : white !important;
`;
class MenuBar extends React.Component {
  state = {
    current: "0"
  }
  handleClick = (e) => {
    this.setState({
      current: e.key,
    });
  }

  render() {
    return (
      <div>
      <Menu
      style={styles.menuHeader}
      theme="light"
      mode="horizontal"
      onClick={this.handleClick}
      >

        <Menu.Item key="01" style={styles.itemMenu}>
          <MenuItem href={'/session/login'} ><b><Icon type="mail" />Navigation One</b></MenuItem>
        </Menu.Item>
        <Menu.Item key="02" style={styles.itemMenu}>
          <MenuItem href={'/session/login'} ><b><Icon type="appstore" />Navigation Two</b></MenuItem>
        </Menu.Item>
        <Menu.Item key="03" style={styles.itemMenu}>
          <MenuItem href={'/session/login'} ><b><Icon type="appstore" />Navigation Two</b></MenuItem>
        </Menu.Item>
        <Menu.Item key="login" style={styles.itemMenu}>
          <MenuItem href={'/session/login'} ><b><Icon type="login" />ĐĂNG NHẬP</b></MenuItem>
        </Menu.Item>
      </Menu>
      </div>
    );
  }
}

MenuBar.propTypes = {

};

export default MenuBar;
