import React from 'react';
import { FormattedMessage } from 'react-intl';

import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import Banner from './banner.jpg';
import messages from './messages';
import { Tabs,
  Input,
  Button,
  message,
  Pagination ,
  Icon,
} from 'antd';
class Header extends React.Component {

  onClickButton=()=>{
    this.props.clickNavigationButton();
  }
  onclick=()=>{
    message.info('Xin chào ' + this.props.userInfo);
  }
  render() {
    return (
      <div style={{height:this.props.heightHeader,background:"#f7f7f7", width: "100%", display: `${this.props.heightHeader>0?"":"none"}`}}>
        
        <div style={{width:'30%',paddingLeft:'2%',display: "inline-block"}}>
          <img src={require('images/default-avatar.png')} style={{width:30,height:30}} onClick={this.onclick}/>
        </div> 
        <div style={{fontSize:25,display: "inline-block",width:'55%',}}>
          <img src={require('images/tool.png')} style={{width:20,height:20,display: "inline-block"}} />
          <h6 style={{display: "inline-block",marginLeft:'5%'}}>Admin Tool</h6>
        </div> 
        <div style={{fontSize:25,display: "inline-block"}}>
          <img src={require('images/3line.svg')} onClick={this.onClickButton} style={{width:30,height:30}} />
        </div> 
      </div>
    );
  }
}

export default Header;
