/**
*
* NavigationBar
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';

import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import styles from './styles'
import styled from 'styled-components';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import { Link, } from 'react-router';
import { Menu, Icon ,Button,Collapse,Badge } from 'antd';
import CommunicationEmail from 'material-ui/svg-icons/communication/email';
import Chart from 'material-ui/svg-icons/editor/show-chart';
import Money from 'material-ui/svg-icons/editor/attach-money';
import Revenue from 'material-ui/svg-icons/editor/pie-chart';
import SMS from 'material-ui/svg-icons/communication/textsms';
import Notifi from 'material-ui/svg-icons/social/notifications';
import History from 'material-ui/svg-icons/action/history';
import HistoryItem from 'material-ui/svg-icons/action/query-builder';
import Star from 'material-ui/svg-icons/toggle/star';
import Setting from 'material-ui/svg-icons/action/settings';
import Event from 'material-ui/svg-icons/action/event';
import Info from 'material-ui/svg-icons/action/info';
import Search from 'material-ui/svg-icons/action/search';
import Gift from 'material-ui/svg-icons/action/card-giftcard';
import Android from 'material-ui/svg-icons/action/android';
import Reorder from 'material-ui/svg-icons/action/reorder';
import LogOut from 'material-ui/svg-icons/action/power-settings-new';
import Loop from 'material-ui/svg-icons/av/loop';
import Down from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import Banner from 'material-ui/svg-icons/Image/broken-image';
import Compare from 'material-ui/svg-icons/action/compare-arrows';
import SuperAccount from 'material-ui/svg-icons/action/supervisor-account';
import AddCircle from 'material-ui/svg-icons/content/add-circle';
import { selectCountCard } from '../../containers/App/selectors';
import ReactDOM from 'react-dom';

const SubMenu = Menu.SubMenu;
const Panel = Collapse.Panel;
const DivItemMenu = styled.div`
  &:hover {
    background: rgb(70, 34, 34);
  };
  color :white;
  height : 50px;
  padding-left : 20px;
  padding-top:10px;
`;
const DivItem= styled.a`

  color :white;
  height : 35px;
  width:100%;
  font-size:15px;
  background:none;
  &:hover {
    background: rgb(70, 34, 34);
  };
`;
const customPanelStyle = {
  background: '#585858',
  borderRadius: 0,
  marginBottom: 0,
  border: 0,
  overflow: 'hidden',
  fontSize :15,
  color:'red'
};
const customPanel = styled.div`
  background: #585858;
  borderRadius: 0;
  marginBottom: 0;
  border: 0;
  overflow: hidden;
  fontSize :15px;
  color:white;
`;
class NavigationBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      active: 2,
      uid: null,
      u_name: "Name User ",
      avatar: require('images/default-avatar.png'),
      isMobile: false,
      slotHeight : 50,
      open : false,

      hu_quy : false,
      duyet_gd : false,
      history : false,
      ql_user : false,
      money_game : false,
    };
  }
  updateDimensions() {
    if(window.innerWidth < 760) {
      this.setState({ isMobile: true});
    } else {
     this.setState({ isMobile: false});
    }
  }
  componentWillMount(){
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
    if(localStorage.getItem('userInfor') && localStorage.getItem('userInfor')!='undefined'){
      let userInfo = JSON.parse(localStorage.getItem('userInfor'));
      this.setState({
          uid: userInfo,
          u_name: userInfo.first_name+" "+userInfo.last_name,
      });
    }
    if(location.pathname.toUpperCase().indexOf("/CCULOG")>-1){
      this.setState({ql_user: true}); 
      switch(this.props.isSuperAdmin){
        case 2:{
          this.setState({active: 2});  
          break;      
        }
        case 3:{
          this.setState({active: 2});  
          break;      
        }
        case 4:{
          this.setState({active: 2});  
          break;      
        }
        default:{
          this.props.changeRoute('/not-found');
          break;
        }
      }
    }
    if(location.pathname.toUpperCase().indexOf("/MONEYIN")>-1 ){
      this.setState({money_game: true}); 
      // this.setState({active: 6});
      switch(this.props.isSuperAdmin){
        case 2:{
          this.setState({active: 6});  
          break;      
        }
        case 3:{
          this.setState({active: 6});  
          break;      
        }
        
        default:{
          this.props.changeRoute('/not-found');
          break;
        }
      }
    }
    if(location.pathname.toUpperCase().indexOf("/MONEYOUT")>-1 ){
      this.setState({money_game: true}); 
      
      switch(this.props.isSuperAdmin){
        case 2:{
          this.setState({active: 21});  
          break;      
        }
        case 3:{
          this.setState({active: 21});  
          break;      
        }
        
        default:{
          this.props.changeRoute('/not-found');
          break;
        }
      }
    }
    if(location.pathname.toUpperCase().indexOf("/REVENUE")>-1 ){
      // this.setState({active: 3});
      this.setState({money_game: true}); 
      
      switch(this.props.isSuperAdmin){
        case 2:{
          this.setState({active: 3});  
          break;      
        }
        case 3:{
          this.setState({active: 3});  
          break;      
        }
        case 5:{
          this.setState({active: 3});  
          break;      
        }
        default:{
          this.props.changeRoute('/not-found');
          break;
        }
      }
    }
    if(location.pathname.toUpperCase().indexOf("/MESSAGE")>-1  ){
      // this.setState({active: 4});
      this.setState({ql_user: true}); 
      
      switch(this.props.isSuperAdmin){
        case 2:{
          this.setState({active: 4});  
          break;      
        }
        case 3:{
          this.setState({active: 4});  
          break;      
        }
        case 4:{
          this.setState({active: 4});  
          break;      
        }
        case 5:{
          this.setState({active: 4});  
          break;      
        }
        default:{
          this.props.changeRoute('/not-found');
          break;
        }
      }
    }
    
    if(location.pathname.toUpperCase().indexOf("/TOP_WIN")>-1 ){
      // this.setState({active: 9});
      this.setState({ql_user: true}); 
      
      switch(this.props.isSuperAdmin){
        case 2:{
          this.setState({active: 9});  
          break;      
        }
        case 3:{
          this.setState({active: 9});  
          break;      
        }
        
        default:{
          this.props.changeRoute('/not-found');
          break;
        }
      }
    }
    if(location.pathname.toUpperCase().indexOf("/TOP_LOOSE")>-1 ){
      // this.setState({active: 22});
      this.setState({ql_user: true}); 
      
      switch(this.props.isSuperAdmin){
        case 2:{
          this.setState({active: 22});  
          break;      
        }
        case 3:{
          this.setState({active: 22});  
          break;      
        }
        
        default:{
          this.props.changeRoute('/not-found');
          break;
        }
      }
    }
    if(location.pathname.toUpperCase().indexOf("/NOTIFICATION")>-1 ){
      // this.setState({active: 5});
      this.setState({ql_user: true}); 
      
      switch(this.props.isSuperAdmin){
        case 2:{
          this.setState({active: 5});  
          break;      
        }
        case 3:{
          this.setState({active: 5});  
          break;      
        }
        case 4:{
          this.setState({active: 5});  
          break;      
        }
        case 5:{
          this.setState({active: 5});  
          break;      
        }
        default:{
          this.props.changeRoute('/not-found');
          break;
        }
      }
    }
    //--------------LICH SU ---------------------------------
    if(location.pathname.toUpperCase().indexOf("/SEARCH_GAME")>-1 ){
      this.setState({history: true}); 
      // this.setState({active: 8});
      switch(this.props.isSuperAdmin){
        case 2:{
          this.setState({active: 8});  
          break;      
        }
        case 3:{
          this.setState({active: 8});  
          break;      
        }
        case 5:{
          this.setState({active: 8});  
          break;      
        }
        default:{
          this.props.changeRoute('/not-found');
          break;
        }
      }
    }
    if(location.pathname.toUpperCase().indexOf("/LICH-SU-SLOT-GAME")>-1 ){
      this.setState({history: true}); 
      
      switch(this.props.isSuperAdmin){
        case 2:{
          this.setState({active: 10});  
          break;      
        }
        case 3:{
          this.setState({active: 10});  
          break;      
        }
        case 5:{
          this.setState({active: 10});  
          break;      
        }
        default:{
          this.props.changeRoute('/not-found');
          break;
        }
      }
    }
    if(location.pathname.toUpperCase().indexOf("/LICH-SU-MINI-GAME")>-1 ){
      this.setState({history: true}); 
      // this.setState({active: 11});
      switch(this.props.isSuperAdmin){
        case 2:{
          this.setState({active: 11});  
          break;      
        }
        case 3:{
          this.setState({active: 11});  
          break;      
        }
        case 5:{
          this.setState({active: 11});  
          break;      
        }
        default:{
          this.props.changeRoute('/not-found');
          break;
        }
      }
    }
    if(location.pathname.toUpperCase().indexOf("/MONEY-HISTORY")>-1 ){
      this.setState({history: true}); 
      
      switch(this.props.isSuperAdmin){
        case 2:{
          this.setState({active: 14});  
          break;      
        }
        case 3:{
          this.setState({active: 14});  
          break;      
        }
        case 5:{
          this.setState({active: 14});  
          break;      
        }
        default:{
          this.props.changeRoute('/not-found');
          break;
        }
      }
    }
    //----------------------------------------
    // if(location.pathname.toUpperCase().indexOf("/BOT")>-1 ){
    //   this.setState({active: 15});
    // }
    if(location.pathname.toUpperCase().indexOf("/BACK-UP")>-1){
      this.setState({ql_user: true}); 
      
      switch(this.props.isSuperAdmin){
        case 2:{
          this.setState({active: 39});  
          break;      
        }
        case 3:{
          this.setState({active: 39});  
          break;      
        }
       
        default:{
          this.props.changeRoute('/not-found');
          break;
        }
      }
     
    }
    if(location.pathname.toUpperCase().indexOf("/SETUP-ACCOUNT")>-1){
      this.setState({ql_user: true}); 
      
      switch(this.props.isSuperAdmin){
        case 2:{
          this.setState({active: 12});  
          break;      
        }
        case 3:{
          this.setState({active: 12});  
          break;      
        }
        case 5:{
          this.setState({active: 12});  
          break;      
        }
        default:{
          this.props.changeRoute('/not-found');
          break;
        }
      }
     
    }
    if(location.pathname.toUpperCase().indexOf("/DAILY")>-1){
      this.setState({ql_user: true}); 
      
      switch(this.props.isSuperAdmin){
        case 3:{
          this.setState({active: 23});  
          break;      
        }
        
        default:{
          this.props.changeRoute('/not-found');
          break;
        }
      }
      
    }
    //-----------------HU VA QUY GAME-----------------
    if(location.pathname.toUpperCase().indexOf("/SET-MAX-CASHOUT")>-1 ){
      this.setState({hu_quy: true});
      
      // this.setState({active: 13});
      switch(this.props.isSuperAdmin){
        case 3:{
          this.setState({active: 13});  
          break;      
        }
        
        default:{
          this.props.changeRoute('/not-found');
          break;
        }
      }
    }
    if(location.pathname.toUpperCase().indexOf("/ADD-USER-EVEN")>-1 ){
      this.setState({hu_quy: true});
      
      // this.setState({active: 16});
      switch(this.props.isSuperAdmin){
        case 3:{
          this.setState({active: 16});  
          break;      
        }
        
        default:{
          this.props.changeRoute('/not-found');
          break;
        }
      }
    }
    if(location.pathname.toUpperCase().indexOf("/SETUP-EVENT")>-1 ){
      this.setState({hu_quy: true});
      
      switch(this.props.isSuperAdmin){
        case 3:{
          this.setState({active: 20});  
          break;      
        }
        
        default:{
          this.props.changeRoute('/not-found');
          break;
        }
      }
    }
    if(location.pathname.toUpperCase().indexOf("/GEN-GITT-CODE")>-1 ){
      this.setState({hu_quy: true});
      // this.setState({active: 17});
      switch(this.props.isSuperAdmin){
        case 3:{
          this.setState({active: 17});  
          break;      
        }
        
        default:{
          this.props.changeRoute('/not-found');
          break;
        }
      }
    }
    if(location.pathname.toUpperCase().indexOf("/LUCKY-ROLATION")>-1 ){
      this.setState({hu_quy: true});
      // this.setState({active: 18});
      switch(this.props.isSuperAdmin){
        case 3:{
          this.setState({active: 18});  
          break;      
        }
        
        default:{
          this.props.changeRoute('/not-found');
          break;
        }
      }
    }
    if(location.pathname.toUpperCase().indexOf("/MESSAGE-TX")>-1 ){
      this.setState({hu_quy: true});
      this.setState({ql_user: false});
      // this.setState({active: 28});
      switch(this.props.isSuperAdmin){
        case 3:{
          this.setState({active: 28});  
          break;      
        }
        
        default:{
          this.props.changeRoute('/not-found');
          break;
        }
      }
    }
    if(location.pathname.toUpperCase().indexOf("/EVENTS")>-1 ){
      this.setState({hu_quy: true});
      // this.setState({active: 38});
      switch(this.props.isSuperAdmin){
        case 3:{
          this.setState({active: 38});  
          break;      
        }
        
        default:{
          this.props.changeRoute('/not-found');
          break;
        }
      }
    }
    if(location.pathname.toUpperCase().indexOf("/EVENT-GAME")>-1 ){
      this.setState({hu_quy: true});
      // this.setState({active: 38});
      switch(this.props.isSuperAdmin){
        case 2:{
          this.setState({active: 38});  
          break;      
        }
        case 3:{
          this.setState({active: 38});  
          break;      
        }
        
        default:{
          this.props.changeRoute('/not-found');
          break;
        }
      }
    }
    if(location.pathname.toUpperCase().indexOf("/PRIZE/")>-1 ){
      this.setState({hu_quy: true});
      // this.setState({active: 38});
      switch(this.props.isSuperAdmin){
        case 2:{
          this.setState({active: 38});  
          break;      
        }
        case 3:{
          this.setState({active: 38});  
          break;      
        }
        
        default:{
          this.props.changeRoute('/not-found');
          break;
        }
      }
    }
    if(location.pathname.toUpperCase().indexOf("/XHU")>-1 ){
      this.setState({hu_quy: true});
      switch(this.props.isSuperAdmin){
       
        case 3:{
          this.setState({active: 40});  
          break;      
        }
        
        default:{
          this.props.changeRoute('/not-found');
          break;
        }
      }
    }
    //---------------------------------------------------
    if(location.pathname.toUpperCase().indexOf("/MONEY_HT")>-1 ){
      // this.setState({active: 24});
      this.setState({money_game: true}); 
      
      switch(this.props.isSuperAdmin){
        case 2:{
          this.setState({active: 24});  
          break;      
        }
        case 3:{
          this.setState({active: 24});  
          break;      
        }
        
        default:{
          this.props.changeRoute('/not-found');
          break;
        }
      }
    }
    if(location.pathname.toUpperCase().indexOf("/BANNER")>-1 ){
      this.setState({ql_user: true}); 
      
      this.setState({active: 25});
      switch(this.props.isSuperAdmin){
        case 2:{
          this.setState({active: 25});  
          break;      
        }
        case 3:{
          this.setState({active: 25});  
          break;      
        }
        case 4:{
          this.setState({active: 25});  
          break;      
        }
        default:{
          this.props.changeRoute('/not-found');
          break;
        }
      }
    }
    if(location.pathname.toUpperCase().indexOf("/TRANSFER")>-1 ){
      // this.setState({active: 26});
      this.setState({duyet_gd: true}); 
      
      switch(this.props.isSuperAdmin){
        case 2:{
          this.setState({active: 26});  
          break;      
        }
        case 3:{
          this.setState({active: 26});  
          break;      
        }
        case 5:{
          this.setState({active: 26});  
          break;      
        }
        default:{
          this.props.changeRoute('/not-found');
          break;
        }
      }
    }
    // if(location.pathname.toUpperCase().indexOf("/BET-SUM-TX")>-1 ){
    //   this.setState({active: 27});
    // }
    
    if(location.pathname.toUpperCase().indexOf("/COUNT_HDH")>-1 ){
      // this.setState({active: 29});
      this.setState({ql_user: true}); 
      
      switch(this.props.isSuperAdmin){
        case 2:{
          this.setState({active: 29});  
          break;      
        }
        case 3:{
          this.setState({active: 29});  
          break;      
        }
        case 4:{
          this.setState({active: 29});  
          break;      
        }
        default:{
          this.props.changeRoute('/not-found');
          break;
        }
      }
    }
    if(location.pathname.toUpperCase().indexOf("/COUNT_DAU")>-1 ){
      // this.setState({active: 30});
      this.setState({ql_user: true}); 
      
      switch(this.props.isSuperAdmin){
        case 2:{
          this.setState({active: 30});  
          break;      
        }
        case 3:{
          this.setState({active: 30});  
          break;      
        }
        case 4:{
          this.setState({active: 30});  
          break;      
        }
        default:{
          this.props.changeRoute('/not-found');
          break;
        }
      }
    }
    if(location.pathname.toUpperCase().indexOf("/CHECK_SERI")>-1 ){
      // this.setState({active: 31});
      this.setState({money_game: true}); 
      
      switch(this.props.isSuperAdmin){
        case 2:{
          this.setState({active: 31});  
          break;      
        }
        case 3:{
          this.setState({active: 31});  
          break;      
        }
        case 5:{
          this.setState({active: 31});  
          break;      
        }
        default:{
          this.props.changeRoute('/not-found');
          break;
        }
      }
    }
    if(location.pathname.toUpperCase().indexOf("/CARD")>-1 ){
      // this.setState({active: 32});
      this.setState({duyet_gd: true}); 
      
      switch(this.props.isSuperAdmin){
        case 2:{
          this.setState({active: 32});  
          break;      
        }
        case 3:{
          this.setState({active: 32});  
          break;      
        }
        case 5:{
          this.setState({active: 32});  
          break;      
        }
        default:{
          this.props.changeRoute('/not-found');
          break;
        }
      }
    }
    if(location.pathname.toUpperCase().indexOf("/ONLINE-ACCOUNT")>-1 ){
      // this.setState({active: 33});
      this.setState({ql_user: true}); 
      
      switch(this.props.isSuperAdmin){
        case 2:{
          this.setState({active: 33});  
          break;      
        }
        case 3:{
          this.setState({active: 33});  
          break;      
        }
        case 4:{
          this.setState({active: 33});  
          break;      
        }
        default:{
          this.props.changeRoute('/not-found');
          break;
        }
      }
    }
    if(location.pathname.toUpperCase().indexOf("/TOP-MONEY")>-1 ){
      // this.setState({active: 34});
      this.setState({money_game: true}); 
      
      switch(this.props.isSuperAdmin){
        case 2:{
          this.setState({active: 34});  
          break;      
        }
        case 3:{
          this.setState({active: 34});  
          break;      
        }
        
        default:{
          this.props.changeRoute('/not-found');
          break;
        }
      }
    }
    if(location.pathname.toUpperCase().indexOf("/IP")>-1 ){
      // this.setState({active: 35});
      this.setState({ql_user: true}); 
      
      switch(this.props.isSuperAdmin){
        case 2:{
          this.setState({active: 35});  
          break;      
        }
        case 3:{
          this.setState({active: 35});  
          break;      
        }
        
        default:{
          this.props.changeRoute('/not-found');
          break;
        }
      }
    }
    if(location.pathname.toUpperCase().indexOf("/CHECK-IP")>-1 ){
      // this.setState({active: 36});
      this.setState({ql_user: true}); 
      
      switch(this.props.isSuperAdmin){
        case 2:{
          this.setState({active: 36});  
          break;      
        }
        case 3:{
          this.setState({active: 36});  
          break;      
        }
        
        default:{
          this.props.changeRoute('/not-found');
          break;
        }
      }
    }
    if(location.pathname.toUpperCase().indexOf("/SMS-ACTIVE")>-1 ){
      // this.setState({active: 37});
      this.setState({ql_user: true}); 
      
      switch(this.props.isSuperAdmin){
        case 2:{
          this.setState({active: 37});  
          break;      
        }
        case 3:{
          this.setState({active: 37});  
          break;      
        }
        
        default:{
          this.props.changeRoute('/not-found');
          break;
        }
      }
    }
   
  
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  componentDidMount(){
   
    
  }

  setActive(ev){
    this.setState({active: ev});
  }
  scrollTo=()=>{
    ReactDOM.findDOMNode(this).scrollIntoView();

  }
  onClickButton=()=>{
    if(this.state.isMobile){
      this.props.clickNavigationButton();
    }else{
      this.scrollTo();
      
    }
  }
  onClickShowSubmenu=()=>{
    if(this.state.slotHeight==50){
      this.setState({slotHeight: 100});    
    }else{
      this.setState({slotHeight: 50});    
      
    }
  }
  logOut = ()=>{
    let sessionKey = localStorage.getItem('sessionkey');
    let userInfo = localStorage.getItem('userInfo');
    let role = localStorage.getItem('role');
    
    if(sessionKey){
      this.props.changeRoute('/');    
      window.localStorage.removeItem('sessionkey');
      if(userInfo){
        window.localStorage.removeItem('userInfo');        
      }
      if(role){
        window.localStorage.removeItem('role');        
        
      }
      this.props.count_card(0);
      this.props.count_dl(0);
    }
    this.props.clickNavigationButton();
  };

  handleToggle = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  handleNestedListToggle = (item) => {
    this.setState({
      open: item.state.open,
    });
  };
  onScroll=(event)=>{
  }
  render() {

    let uid = false;
    let u_name = false;
    let avatar = false;
    let nn = false;
    let userInfo = localStorage.getItem('userInfo');
    var menuBar = false;
    if(localStorage.getItem('userInfo')){
      let length = localStorage.getItem('userInfo').length;
      nn = userInfo.substr(1,length-2);
    }
  
    
    if(this.props.selectGetUserInfor){
      uid = this.props.selectGetUserInfor.uid;
      u_name = this.props.selectGetUserInfor.first_name+" "+this.props.selectGetUserInfor.last_name;
    }
  switch(this.props.isSuperAdmin){
    case 2:{
      menuBar = (
        <List style={{color:'white',padding:0}}>
          
          <ListItem
            key={11}          
            primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}}  >Quản lý user</span>} 
            leftIcon={<Reorder style={{fill:'white'}} />} 
            initiallyOpen={this.state.ql_user}
            rightIcon={<Down style={{fill:'white'}}/>}
            primaryTogglesNestedList={true}
            nestedListStyle={{paddingTop:0,paddingBottom:0}}
            innerDivStyle={{borderTop:'1px dashed #e2e2e2',borderBottom:'1px dashed #e2e2e2',marginTop:1}}
            nestedItems={[
              <Link key={12.1} style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(12)} to='/setup-account'>
                <ListItem  
                  key={12.1}
                  
                  innerDivStyle={{background:this.state.active===12?"#444444":"",marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0,borderLeft:'1px dashed #ffff',paddingLeft:0}}
                  primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} >------ Tra cứu tài khoản</span>} 
                  ////leftIcon{<div style={{background:'white',width:30,height:1}} />} 
                  onClick={this.onClickButton}
                />
              </Link> ,
              <Link key={5} style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(2)} to='/cculog'>
                <ListItem 
                  key={5}
                  innerDivStyle={{background:this.state.active===2?"#444444":"",marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0,borderLeft:'1px dashed #ffff',paddingLeft:0}}
                  primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} >------ Người truy cập</span>} 
                  //leftIcon{<Chart style={{fill:'white'}} />} 
                  onClick={this.onClickButton}
                />
              </Link>,
              <Link key={25} style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(25)} to='/banner'>
                <ListItem 
                  key={25}
                  innerDivStyle={{background:this.state.active===25?"#444444":"",marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0}}
                  primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} >------ Banner</span>} 
                  //leftIcon{<Banner style={{fill:'white'}} />} 
                  onClick={this.onClickButton}
                />
              </Link>,
               <Link key={37} style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(37)} to='/sms-active'>
               <ListItem  
                 key={37}
                 
                 innerDivStyle={{background:this.state.active===37?"#444444":"",marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0,borderLeft:'1px dashed #ffff',paddingLeft:0}}
                 primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} >------ SMS Active</span>} 
                 ////leftIcon{<div style={{background:'white',width:30,height:1}} />} 
                 onClick={this.onClickButton}
               />
             </Link> ,
              <Link key={36} style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(36)} to='/check-ip'>
                <ListItem  
                  key={36}
                  
                  innerDivStyle={{background:this.state.active===36?"#444444":"",marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0,borderLeft:'1px dashed #ffff',paddingLeft:0}}
                  primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} >------ Check IP</span>} 
                  ////leftIcon{<div style={{background:'white',width:30,height:1}} />} 
                  onClick={this.onClickButton}
                />
              </Link> ,
              <Link key={35} style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(35)} to='/ip'>
                <ListItem  
                  key={35}
                  
                  innerDivStyle={{background:this.state.active===35?"#444444":"",marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0,borderLeft:'1px dashed #ffff',paddingLeft:0}}
                  primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} >------ Chặn IP</span>} 
                  ////leftIcon{<div style={{background:'white',width:30,height:1}} />} 
                  onClick={this.onClickButton}
                />
              </Link> ,
              <Link key={29} style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(29)} to='/count_hdh'>
                <ListItem
                  key={2}
                  
                  innerDivStyle={{background:this.state.active===29?"#444444":"",marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0}}
                  primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(29)} >------ Thống kê NRU</span>} 
                  //leftIcon{<Reorder style={{fill:'white'}} />}
                  onClick={this.onClickButton}
                />
              </Link>,
              <Link key={30} style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(30)} to='/count_dau'>
                <ListItem
                  key={2}
                  
                  innerDivStyle={{background:this.state.active===30?"#444444":"",marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0}}
                  primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(30)} >------ Thống kê DAU</span>} 
                  //leftIcon{<Reorder style={{fill:'white'}} />}
                  onClick={this.onClickButton}
                />
              </Link>,
              <Link key={33} style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(33)} to='/online-account'>
                <ListItem
                  key={2}
                  
                  innerDivStyle={{background:this.state.active===33?"#444444":"",marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0}}
                  primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(33)} >------ Tài khoản online</span>} 
                  //leftIcon{<Reorder style={{fill:'white'}} />}
                  onClick={this.onClickButton}
                />
              </Link>,
              
              <Link key={8} style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(4)} to='/message'>
                <ListItem  
                  key={8}        
                  // innerDivStyle={{background:this.state.active===4?"#444444":"",marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0}}
                  // primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(4)} >------ Tin nhắn</span>}      
                  innerDivStyle={{background:this.state.active===4?"#444444":"",paddingTop:'4%',paddingBottom:'4%',paddingRight:'4%',paddingLeft:0,marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0}}
                  primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}}>------ Tin nhắn</span>} 
                  //leftIcon{<Badge count={0} style={{marginRight:10}}><SMS style={{fill:'white'}} /></Badge>} 
                  onClick={this.onClickButton}
                />
              </Link>, 
              <Link key={9} style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(5)} to='/notification'>
                <ListItem  
                  key={9}
                  innerDivStyle={{background:this.state.active===5?"#444444":"",marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0}}
                  primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} >------ Thông báo</span>} 
                  //leftIcon{<Notifi style={{fill:'white'}} />} 
                  onClick={this.onClickButton}
                />
              </Link>,
              <Link key={11.1} style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(9)} to='/top_win'>
                <ListItem
                  key={11.1}
                  
                  innerDivStyle={{background:this.state.active===9?"#444444":"",marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0}}
                  primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(9)} >------ Top game</span>} 
                  //leftIcon{<Star style={{fill:'white'}} />} 
                  onClick={this.onClickButton}
                />
              </Link>,
              // <Link key={11.2} style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(22)} to='/top_loose'>
              //   <ListItem
              //     key={11.2}
                  
              //     innerDivStyle={{background:this.state.active===22?"#444444":"",marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0}}
              //     primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(22)} >------ Top thua game</span>} 
              //     //leftIcon{<Star style={{fill:'white'}} />} 
              //     onClick={this.onClickButton}
              //   />
              // </Link>,
             
            ]}
          />
          
          <ListItem
            key={6}          
            primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} >Tiền trong game</span>} 
            leftIcon={<Reorder style={{fill:'white'}} />}
            initiallyOpen={this.state.money_game}
            rightIcon={<Down style={{fill:'white'}}/>}
            primaryTogglesNestedList={true}
            nestedListStyle={{paddingTop:0,paddingBottom:0}}
            innerDivStyle={{borderTop:'1px dashed #e2e2e2',borderBottom:'1px dashed #e2e2e2'}}
            nestedItems={[
              <Link key={11.3} style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(34)} to='/top-money'>
                <ListItem
                  key={11.3}
                  
                  innerDivStyle={{background:this.state.active===34?"#444444":"",marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0}}
                  primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(34)} >------ Top nạp tiền</span>} 
                  //leftIcon{<Star style={{fill:'white'}} />} 
                  onClick={this.onClickButton}
                />
              </Link>,
              <Link key={6.4} style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(3)} to='/revenue'>
                <ListItem  
                  key={7}          
                  innerDivStyle={{background:this.state.active===3?"#444444":"",marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0}}
                  primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(3)} >------ Lợi nhuận</span>} 
                  //leftIcon{<Revenue style={{fill:'white'}} />} 
                  onClick={this.onClickButton}
                />
              </Link>  ,
              <Link key={19.1} style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(24)} to='/money_ht'>
                <ListItem
                  key={1}
                  
                  innerDivStyle={{background:this.state.active===24?"#444444":"",marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0}}
                  primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(24)} >------ Tiền hệ thống</span>} 
                  //leftIcon{<Money style={{fill:'white'}} />}
                  onClick={this.onClickButton}
                />
              </Link>,
              <Link key={6.1} style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(6)} to='/moneyIn'>
                <ListItem
                  key={1}
                  
                  innerDivStyle={{background:this.state.active===6?"#444444":"",marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0}}
                  primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(6)} >------ Tiền nạp</span>} 
                  //leftIcon{<Money style={{fill:'white'}} />}
                  onClick={this.onClickButton}
                />
              </Link>,
              <Link key={6.2} style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(21)} to='/moneyOut'>
                <ListItem
                  key={2}
                  
                  innerDivStyle={{background:this.state.active===21?"#444444":"",marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0}}
                  primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(21)} >------ Tiền rút</span>} 
                  //leftIcon{<Money style={{fill:'white'}} />}
                  onClick={this.onClickButton}
                />
              </Link>,
              <Link key={6.3} style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(31)} to='/check_seri'>
                <ListItem
                  key={3}
                  
                  innerDivStyle={{background:this.state.active===31?"#444444":"",marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0}}
                  primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(31)} >------ Check Seri/Mã thẻ</span>} 
                  //leftIcon{<Search style={{fill:'white'}} />}
                  onClick={this.onClickButton}
                />
             </Link>,
            ]}
          />
         
          <ListItem
            key={10}          
            primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(5)} >Tra cứu lịch sử</span>} 
            leftIcon={<Reorder style={{fill:'white'}} />}
            initiallyOpen={this.state.history}
            rightIcon={<Down style={{fill:'white'}}/>}
            primaryTogglesNestedList={true}
            nestedListStyle={{paddingTop:0,paddingBottom:0}}
            innerDivStyle={{borderTop:'1px dashed #e2e2e2',borderBottom:'1px dashed #e2e2e2'}}
            nestedItems={[
              <Link key={10.1} style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(8)} to='/search_game'>
                <ListItem
                  key={10.1}
                  
                  innerDivStyle={{background:this.state.active===8?"#444444":"",marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0}}
                  primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(8)} >------ Lịch sử game bài</span>} 
                  //leftIcon{<HistoryItem style={{fill:'white'}} />}
                  onClick={this.onClickButton}
                />
              </Link>,
              <Link key={10.2} style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(10)} to='/lich-su-slot-game'>
                <ListItem
                  key={10.2}
                  
                  innerDivStyle={{background:this.state.active===10?"#444444":"",marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0}}
                  primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(10)} >------ Lịch sử slot game</span>} 
                  //leftIcon{<HistoryItem style={{fill:'white'}} />}
                  onClick={this.onClickButton}
                />
              </Link>,
              <Link key={10.3} style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(11)} to='/lich-su-mini-game'>
                <ListItem
                  key={10.3}
                  
                  innerDivStyle={{background:this.state.active===11?"#444444":"",marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0}}
                  primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(11)} >------ Lịch sử mini game </span>} 
                  //leftIcon{<HistoryItem style={{fill:'white'}} />}
                  onClick={this.onClickButton}
                />
              </Link>,
              <Link key={10.4} style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(14)} to='/money-history'>
                <ListItem
                  key={10.4}
                  
                  innerDivStyle={{background:this.state.active===14?"#444444":"",marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0}}
                  primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(14)} >------ Lịch sử giao dịch chung</span>} 
                  //leftIcon{<HistoryItem style={{fill:'white'}} />}
                  onClick={this.onClickButton}
                />
              </Link>,
            ]}
          />
        
         
        <ListItem
            key={12}          
            primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} >Duyệt giao dịch
                  <Badge count={(this.props.count_c+this.props.countDL)>0?(this.props.count_c+this.props.countDL):""} 
                  style={{marginLeft:5,display:(this.props.count_c+this.props.countDL) >0?" ":"none"}}/></span>} 
            leftIcon={<Reorder style={{fill:'white'}} />}
            initiallyOpen={this.state.duyet_gd}
            rightIcon={<Down style={{fill:'white'}}/>}
            primaryTogglesNestedList={true}
            nestedListStyle={{paddingTop:0,paddingBottom:0}}
            innerDivStyle={{borderTop:'1px dashed #e2e2e2',borderBottom:'1px dashed #e2e2e2'}}
            nestedItems={[
              
              <Link key={32} style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(32)} to='/card'>
                <ListItem 
                  key={5}
                  innerDivStyle={{background:this.state.active===32?"#444444":"",marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0}}
                  primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} >------ Duyệt thẻ
                  <Badge count={this.props.count_c >0?this.props.count_c:""} style={{marginLeft:5,display:this.props.count_c >0?" ":"none"}}/></span>} 
                  //leftIcon{<Compare style={{fill:'white'}} />} 
                  onClick={this.onClickButton}
                />
              </Link>,
              <Link key={12.3} style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(26)} to='/transfer'>
                <ListItem
                  key={12.3}
                  
                  innerDivStyle={{background:this.state.active===26?"#444444":"",marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0}}
                  primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(26)} >------ Duyệt chuyển khoản
                  <Badge count={this.props.countDL >0?this.props.countDL:""} style={{marginLeft:5,display:this.props.countDL >0?" ":"none"}}/></span>} 
                  //leftIcon{<Compare style={{fill:'white'}} />} 
                  onClick={this.onClickButton}
                />
              </Link>,
            ]}
          />
    
          <Link onClick = {this.logOut} > 
           <ListItem  
            key={18}
            nestedListStyle={{paddingTop:0}}
            innerDivStyle={{borderTop:'1px dashed #e2e2e2',borderBottom:'1px dashed #e2e2e2'}}
            primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} >Log out</span>} 
            leftIcon={<LogOut style={{fill:'white'}} />} 
            onClick={this.onClickButton}
          />
          </Link>
        </List>
      )
      break;
    }
    case 3:{
      menuBar = (
        <List style={{color:'white',padding:0}} >
          <Link key={12.1} style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(39)} to='/back-up'>
        
          <ListItem
            key={39}          
            primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}}  >Backup dữ liệu</span>} 
            leftIcon={<Reorder style={{fill:'white'}} />} 
            nestedListStyle={{paddingTop:0,paddingBottom:0}}
            innerDivStyle={{background:this.state.active===39?"#444444":"",}}
            onClick={this.onClickButton}
            
            // innerDivStyle={{borderTop:'1px dashed #e2e2e2',borderBottom:'1px dashed #e2e2e2',marginTop:0}}
            nestedItems={[
            ]}/>
               
          </Link> 
          
          <ListItem
            key={11}          
            primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}}  >Quản lý user</span>} 
            leftIcon={<Reorder style={{fill:'white'}} />} 
            initiallyOpen={this.state.ql_user}
            rightIcon={<Down style={{fill:'white'}}/>}
            primaryTogglesNestedList={true}
            nestedListStyle={{paddingTop:0,paddingBottom:0}}
            innerDivStyle={{borderTop:'1px dashed #e2e2e2',borderBottom:'1px dashed #e2e2e2',marginTop:1}}
            nestedItems={[
              <Link key={12.1} style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(12)} to='/setup-account'>
                <ListItem  
                  key={12.1}
                  innerDivStyle={{background:this.state.active===12?"#444444":"",marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0,borderLeft:'1px dashed #ffff',paddingLeft:0}}
                  primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} >------ Tra cứu tài khoản</span>} 
                  ////leftIcon{<div style={{background:'white',width:30,height:1}} />} 
                  onClick={this.onClickButton}
                />
              </Link> ,
              <Link key={5} style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(2)} to='/cculog'>
                <ListItem 
                  key={5}
                  innerDivStyle={{background:this.state.active===2?"#444444":"",marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0,borderLeft:'1px dashed #ffff',paddingLeft:0}}
                  primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} >------ Người truy cập</span>} 
                  //leftIcon{<Chart style={{fill:'white'}} />} 
                  onClick={this.onClickButton}
                />
              </Link>,
              <Link key={25} style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(25)} to='/banner'>
                <ListItem 
                  key={25}
                  innerDivStyle={{background:this.state.active===25?"#444444":"",marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0}}
                  primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} >------ Banner</span>} 
                  //leftIcon{<Banner style={{fill:'white'}} />} 
                  onClick={this.onClickButton}
                />
              </Link>,
               <Link key={37} style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(37)} to='/sms-active'>
               <ListItem  
                 key={37}
                 innerDivStyle={{background:this.state.active===37?"#444444":"",marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0,borderLeft:'1px dashed #ffff',paddingLeft:0}}
                 primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} >------ SMS Active</span>} 
                 ////leftIcon{<div style={{background:'white',width:30,height:1}} />} 
                 onClick={this.onClickButton}
               />
             </Link> ,
              <Link key={36} style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(36)} to='/check-ip'>
                <ListItem  
                  key={36}
                  innerDivStyle={{background:this.state.active===36?"#444444":"",marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0,borderLeft:'1px dashed #ffff',paddingLeft:0}}
                  primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} >------ Check IP</span>} 
                  ////leftIcon{<div style={{background:'white',width:30,height:1}} />} 
                  onClick={this.onClickButton}
                />
              </Link> ,
              <Link key={35} style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(35)} to='/ip'>
                <ListItem  
                  key={35}
                  innerDivStyle={{background:this.state.active===35?"#444444":"",marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0,borderLeft:'1px dashed #ffff',paddingLeft:0}}
                  primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} >------ Chặn IP</span>} 
                  ////leftIcon{<div style={{background:'white',width:30,height:1}} />} 
                  onClick={this.onClickButton}
                />
              </Link> ,
              <Link key={29} style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(29)} to='/count_hdh'>
                <ListItem
                  key={2}
                  innerDivStyle={{background:this.state.active===29?"#444444":"",marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0}}
                  primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(29)} >------ Thống kê NRU</span>} 
                  //leftIcon{<Reorder style={{fill:'white'}} />}
                  onClick={this.onClickButton}
                />
              </Link>,
              <Link key={30} style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(30)} to='/count_dau'>
                <ListItem
                  key={2}
                  innerDivStyle={{background:this.state.active===30?"#444444":"",marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0}}
                  primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(30)} >------ Thống kê DAU</span>} 
                  //leftIcon{<Reorder style={{fill:'white'}} />}
                  onClick={this.onClickButton}
                />
              </Link>,
              <Link key={33} style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(33)} to='/online-account'>
                <ListItem
                  key={2}
                  innerDivStyle={{background:this.state.active===33?"#444444":"",marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0}}
                  primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(33)} >------ Tài khoản online</span>} 
                  //leftIcon{<Reorder style={{fill:'white'}} />}
                  onClick={this.onClickButton}
                />
              </Link>,
              <Link key={12.2} style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(23)} to='/daily'>
                <ListItem
                  key={12.2}
                  innerDivStyle={{background:this.state.active===23?"#444444":"",marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0}}
                  primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(23)} >------ Đại lý</span>} 
                  //leftIcon{<SuperAccount style={{fill:'white'}} />} 
                  onClick={this.onClickButton}
                />
              </Link>,
              <Link key={8} style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(4)} to='/message'>
                <ListItem  
                  key={8}        
                  // innerDivStyle={{background:this.state.active===4?"#444444":"",marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0}}
                  // primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(4)} >------ Tin nhắn</span>}      
                  innerDivStyle={{background:this.state.active===4?"#444444":"",paddingTop:'4%',paddingBottom:'4%',paddingRight:'4%',paddingLeft:0,marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0}}
                  primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}}>------ Tin nhắn</span>} 
                  //leftIcon{<Badge count={0} style={{marginRight:10}}><SMS style={{fill:'white'}} /></Badge>} 
                  onClick={this.onClickButton}
                />
              </Link>, 
              <Link key={9} style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(5)} to='/notification'>
                <ListItem  
                  key={9}
                  innerDivStyle={{background:this.state.active===5?"#444444":"",marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0}}
                  primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} >------ Thông báo</span>} 
                  //leftIcon{<Notifi style={{fill:'white'}} />} 
                  onClick={this.onClickButton}
                />
              </Link>,
              <Link key={11.1} style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(9)} to='/top_win'>
                <ListItem
                  key={11.1}
                  innerDivStyle={{background:this.state.active===9?"#444444":"",marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0}}
                  primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(9)} >------ Top game</span>} 
                  //leftIcon{<Star style={{fill:'white'}} />} 
                  onClick={this.onClickButton}
                />
              </Link>,
              // <Link key={11.2} style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(22)} to='/top_loose'>
              //   <ListItem
              //     key={11.2}
              //     innerDivStyle={{background:this.state.active===22?"#444444":"",marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0}}
              //     primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(22)} >------ Top thua game</span>} 
              //     //leftIcon{<Star style={{fill:'white'}} />} 
              //     onClick={this.onClickButton}
              //   />
              // </Link>,
             
            ]}
          />
          
          <ListItem
            key={6}          
            primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} >Tiền trong game</span>} 
            leftIcon={<Reorder style={{fill:'white'}} />}
            initiallyOpen={this.state.money_game}
            rightIcon={<Down style={{fill:'white'}}/>}
            primaryTogglesNestedList={true}
            nestedListStyle={{paddingTop:0,paddingBottom:0}}
            innerDivStyle={{borderTop:'1px dashed #e2e2e2',borderBottom:'1px dashed #e2e2e2'}}
            nestedItems={[
              <Link key={11.3} style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(34)} to='/top-money'>
                <ListItem
                  key={11.3}
                  innerDivStyle={{background:this.state.active===34?"#444444":"",marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0}}
                  primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(34)} >------ Top nạp tiền</span>} 
                  //leftIcon{<Star style={{fill:'white'}} />} 
                  onClick={this.onClickButton}
                />
              </Link>,
              <Link key={6.4} style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(3)} to='/revenue'>
                <ListItem  
                  key={7}          
                  innerDivStyle={{background:this.state.active===3?"#444444":"",marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0}}
                  primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(3)} >------ Lợi nhuận</span>} 
                  //leftIcon{<Revenue style={{fill:'white'}} />} 
                  onClick={this.onClickButton}
                />
              </Link>  ,
              <Link key={19.1} style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(24)} to='/money_ht'>
                <ListItem
                  key={1}
                  innerDivStyle={{background:this.state.active===24?"#444444":"",marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0}}
                  primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(24)} >------ Tiền hệ thống</span>} 
                  //leftIcon{<Money style={{fill:'white'}} />}
                  onClick={this.onClickButton}
                />
              </Link>,
              <Link key={6.1} style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(6)} to='/moneyIn'>
                <ListItem
                  key={1}
                  innerDivStyle={{background:this.state.active===6?"#444444":"",marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0}}
                  primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(6)} >------ Tiền nạp</span>} 
                  //leftIcon{<Money style={{fill:'white'}} />}
                  onClick={this.onClickButton}
                />
              </Link>,
              <Link key={6.2} style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(21)} to='/moneyOut'>
                <ListItem
                  key={2}
                  innerDivStyle={{background:this.state.active===21?"#444444":"",marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0}}
                  primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(21)} >------ Tiền rút</span>} 
                  //leftIcon{<Money style={{fill:'white'}} />}
                  onClick={this.onClickButton}
                />
              </Link>,
              <Link key={6.3} style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(31)} to='/check_seri'>
                <ListItem
                  key={3}
                  innerDivStyle={{background:this.state.active===31?"#444444":"",marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0}}
                  primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(31)} >------ Check Seri/Mã thẻ</span>} 
                  //leftIcon{<Search style={{fill:'white'}} />}
                  onClick={this.onClickButton}
                />
             </Link>,
            ]}
          />
         
          <ListItem
            key={10}          
            primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(5)} >Tra cứu lịch sử</span>} 
            leftIcon={<Reorder style={{fill:'white'}} />}
            initiallyOpen={this.state.history}
            rightIcon={<Down style={{fill:'white'}}/>}
            primaryTogglesNestedList={true}
            nestedListStyle={{paddingTop:0,paddingBottom:0}}
            innerDivStyle={{borderTop:'1px dashed #e2e2e2',borderBottom:'1px dashed #e2e2e2'}}
            nestedItems={[
              <Link key={10.1} style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(8)} to='/search_game'>
                <ListItem
                  key={10.1}
                  
                  innerDivStyle={{background:this.state.active===8?"#444444":"",marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0}}
                  primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(8)} >------ Lịch sử game bài</span>} 
                  //leftIcon{<HistoryItem style={{fill:'white'}} />}
                  onClick={this.onClickButton}
                />
              </Link>,
              <Link key={10.2} style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(10)} to='/lich-su-slot-game'>
                <ListItem
                  key={10.2}
                  
                  innerDivStyle={{background:this.state.active===10?"#444444":"",marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0}}
                  primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(10)} >------ Lịch sử slot game</span>} 
                  //leftIcon{<HistoryItem style={{fill:'white'}} />}
                  onClick={this.onClickButton}
                />
              </Link>,
              <Link key={10.3} style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(11)} to='/lich-su-mini-game'>
                <ListItem
                  key={10.3}
                  
                  innerDivStyle={{background:this.state.active===11?"#444444":"",marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0}}
                  primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(11)} >------ Lịch sử mini game </span>} 
                  //leftIcon{<HistoryItem style={{fill:'white'}} />}
                  onClick={this.onClickButton}
                />
              </Link>,
              <Link key={10.4} style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(14)} to='/money-history'>
                <ListItem
                  key={10.4}
                  
                  innerDivStyle={{background:this.state.active===14?"#444444":"",marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0}}
                  primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(14)} >------ Lịch sử giao dịch chung</span>} 
                  //leftIcon{<HistoryItem style={{fill:'white'}} />}
                  onClick={this.onClickButton}
                />
              </Link>,
            ]}
          />
        
         
          <ListItem
            key={12}          
            primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} >Duyệt giao dịch
                  <Badge count={(this.props.count_c+this.props.countDL)>0?(this.props.count_c+this.props.countDL):""}
                  style={{marginLeft:5,display:(this.props.count_c+this.props.countDL) >0?" ":"none"}}/>
                  </span>} 
            leftIcon={<Reorder style={{fill:'white'}} />}
            initiallyOpen={this.state.duyet_gd}
            rightIcon={<Down style={{fill:'white'}}/>}
            primaryTogglesNestedList={true}
            nestedListStyle={{paddingTop:0,paddingBottom:0}}
            innerDivStyle={{borderTop:'1px dashed #e2e2e2',borderBottom:'1px dashed #e2e2e2'}}
            nestedItems={[
              
              <Link key={32} style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(32)} to='/card'>
                <ListItem 
                  key={5}
                  innerDivStyle={{background:this.state.active===32?"#444444":"",marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0}}
                  primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} >------ Duyệt thẻ
                  <Badge count={this.props.count_c >0?this.props.count_c:""} style={{marginLeft:5,display:this.props.count_c >0?" ":"none"}}/></span>} 
                  //leftIcon{<Compare style={{fill:'white'}} />} 
                  onClick={this.onClickButton}
                />
              </Link>,
              <Link key={12.3} style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(26)} to='/transfer'>
                <ListItem
                  key={12.3}
                  
                  innerDivStyle={{background:this.state.active===26?"#444444":"",marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0}}
                  primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(26)} >------ Duyệt chuyển khoản
                  <Badge count={this.props.countDL >0?this.props.countDL:""} style={{marginLeft:5,display:this.props.countDL >0?" ":"none"}}/></span>} 
                  //leftIcon{<Compare style={{fill:'white'}} />} 
                  onClick={this.onClickButton}
                />
              </Link>,
            ]}
          />
    
          
     
          <ListItem
            key={14}          
            primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}}  >Hũ và quỹ game</span>} 
            leftIcon={<Reorder style={{fill:'white'}} />}
            initiallyOpen={this.state.hu_quy}
            rightIcon={<Down style={{fill:'white'}}/>}
            primaryTogglesNestedList={true}
            nestedListStyle={{paddingTop:0,paddingBottom:0}}
            innerDivStyle={{borderTop:'1px dashed #e2e2e2',borderBottom:'1px dashed #e2e2e2'}}
            nestedItems={[
              <Link key={14.1} style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(16)} to='/add-user-event'>
                <ListItem
                  key={14.1}
                  
                  innerDivStyle={{background:this.state.active===16?"#444444":"",marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0}}
                  primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(16)} >------ Thêm User nhận thưởng</span>} 
                  onClick={this.onClickButton}
                />
              </Link>,
              <Link key={14.2} style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(20)} to='/setup-event'>
                <ListItem
                  key={14.2}
                  
                  innerDivStyle={{background:this.state.active===20?"#444444":"",marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0}}
                  primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(20)} >------ Setup giá trị hũ và quỹ</span>} 
                  //leftIcon{<Setting style={{fill:'white'}} />}
                  onClick={this.onClickButton}
                />
              </Link>,
                <Link key={21} style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(17)} to='/gen-gitt-code'>
                <ListItem  
                  key={15}
                  innerDivStyle={{background:this.state.active===17?"#444444":"",marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0}}
                  primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} >------ Gen GiftCode</span>} 
                  //leftIcon{<Gift style={{fill:'white'}} />} 
                  onClick={this.onClickButton}
                />
              </Link>  ,
              <Link  key={22} style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(18)} to='/lucky-rolation'>
              <ListItem  
                  key={16}
                  innerDivStyle={{background:this.state.active===18?"#444444":"",marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0}}
                  primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} >------ Vòng quay may mắn</span>} 
                  //leftIcon{<Loop style={{fill:'white'}} />} 
                  onClick={this.onClickButton}
                />
              </Link> , 
              <Link  key={28} style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(28)} to='/message-tx'>
              <ListItem  
                  key={28}
                  innerDivStyle={{background:this.state.active===28?"#444444":"",marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0}}
                  primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} >------ Bot Tài Xỉu</span>} 
                  //leftIcon{<Android style={{fill:'white'}} />} 
                  onClick={this.onClickButton}
                />
              </Link> ,
              <Link key={20} style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(13)} to='/set-max-cashout'>
                <ListItem  
                  key={13}
                  innerDivStyle={{background:this.state.active===13?"#444444":"",marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0}}
                  primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} >------ Cài đặt đổi thưởng</span>} 
                  //leftIcon{<Setting style={{fill:'white'}} />} 
                  onClick={this.onClickButton}
                />
              </Link>, 
              <Link key={38} style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(38)} to='/events'>
                <ListItem  
                  key={38}
                  innerDivStyle={{background:this.state.active===38?"#444444":"",marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0}}
                  primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} >------ Sự kiện Game</span>} 
                  //leftIcon{<Setting style={{fill:'white'}} />} 
                  onClick={this.onClickButton}
                />
              </Link> ,
              <Link key={40} style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(40)} to='/xhu'>
                <ListItem  
                  key={40}
                  innerDivStyle={{background:this.state.active===40?"#444444":"",marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0}}
                  primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} >------ X Hũ</span>} 
                  //leftIcon{<Setting style={{fill:'white'}} />} 
                  onClick={this.onClickButton}
                />
              </Link> 
              ]}

          />
         
          <Link onClick = {this.logOut} > 
           <ListItem  
            key={18}
            nestedListStyle={{paddingTop:0}}
            innerDivStyle={{borderTop:'1px dashed #e2e2e2',borderBottom:'1px dashed #e2e2e2'}}
            primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} >Log out</span>} 
            leftIcon={<LogOut style={{fill:'white'}} />} 
            onClick={this.onClickButton}
          />
          </Link>
        </List>
      )
      break;
    }
    case 4:{
      menuBar = (
        <List style={{color:'white',padding:0}}>
          
          <ListItem
            key={11}          
            primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}}  >Quản lý user</span>} 
            leftIcon={<Reorder style={{fill:'white'}} />} 
            initiallyOpen={this.state.ql_user}
            rightIcon={<Down style={{fill:'white'}}/>}
            primaryTogglesNestedList={true}
            nestedListStyle={{paddingTop:0,paddingBottom:0}}
            innerDivStyle={{borderTop:'1px dashed #e2e2e2',borderBottom:'1px dashed #e2e2e2',marginTop:1}}
            nestedItems={[
              
              <Link key={5} style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(2)} to='/cculog'>
                <ListItem 
                  key={5}
                  innerDivStyle={{background:this.state.active===2?"#444444":"",marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0,borderLeft:'1px dashed #ffff',paddingLeft:0}}
                  primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} >------ Người truy cập</span>} 
                  //leftIcon{<Chart style={{fill:'white'}} />} 
                  onClick={this.onClickButton}
                />
              </Link>,
              <Link key={25} style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(25)} to='/banner'>
                <ListItem 
                  key={25}
                  innerDivStyle={{background:this.state.active===25?"#444444":"",marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0}}
                  primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} >------ Banner</span>} 
                  //leftIcon{<Banner style={{fill:'white'}} />} 
                  onClick={this.onClickButton}
                />
              </Link>,
             
              <Link key={29} style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(29)} to='/count_hdh'>
                <ListItem
                  key={2}
                  
                  innerDivStyle={{background:this.state.active===29?"#444444":"",marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0}}
                  primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(29)} >------ Thống kê NRU</span>} 
                  //leftIcon{<Reorder style={{fill:'white'}} />}
                  onClick={this.onClickButton}
                />
              </Link>,
              <Link key={30} style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(30)} to='/count_dau'>
                <ListItem
                  key={2}
                  
                  innerDivStyle={{background:this.state.active===30?"#444444":"",marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0}}
                  primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(30)} >------ Thống kê DAU</span>} 
                  //leftIcon{<Reorder style={{fill:'white'}} />}
                  onClick={this.onClickButton}
                />
              </Link>,
              <Link key={33} style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(33)} to='/online-account'>
                <ListItem
                  key={2}
                  
                  innerDivStyle={{background:this.state.active===33?"#444444":"",marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0}}
                  primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(33)} >------ Tài khoản online</span>} 
                  //leftIcon{<Reorder style={{fill:'white'}} />}
                  onClick={this.onClickButton}
                />
              </Link>,
              
              <Link key={8} style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(4)} to='/message'>
                <ListItem  
                  key={8}        
                  // innerDivStyle={{background:this.state.active===4?"#444444":"",marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0}}
                  // primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(4)} >------ Tin nhắn</span>}      
                  innerDivStyle={{background:this.state.active===4?"#444444":"",paddingTop:'4%',paddingBottom:'4%',paddingRight:'4%',paddingLeft:0,marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0}}
                  primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}}>------ Tin nhắn</span>} 
                  //leftIcon{<Badge count={0} style={{marginRight:10}}><SMS style={{fill:'white'}} /></Badge>} 
                  onClick={this.onClickButton}
                />
              </Link>, 
              <Link key={9} style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(5)} to='/notification'>
                <ListItem  
                  key={9}
                  innerDivStyle={{background:this.state.active===5?"#444444":"",marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0}}
                  primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} >------ Thông báo</span>} 
                  //leftIcon{<Notifi style={{fill:'white'}} />} 
                  onClick={this.onClickButton}
                />
              </Link>,
           
             
            ]}
          />
         
          <Link onClick = {this.logOut} > 
           <ListItem  
            key={18}
            nestedListStyle={{paddingTop:0}}
            innerDivStyle={{borderTop:'1px dashed #e2e2e2',borderBottom:'1px dashed #e2e2e2'}}
            primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} >Log out</span>} 
            leftIcon={<LogOut style={{fill:'white'}} />} 
            onClick={this.onClickButton}
          />
          </Link>
        </List>
      )
      break;
    }
    case 5:{
      menuBar = (
        <List style={{color:'white',padding:0}}>
          
          <ListItem
            key={11}          
            primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}}  >Quản lý user</span>} 
            leftIcon={<Reorder style={{fill:'white'}} />} 
            initiallyOpen={this.state.ql_user}
            rightIcon={<Down style={{fill:'white'}}/>}
            primaryTogglesNestedList={true}
            nestedListStyle={{paddingTop:0,paddingBottom:0}}
            innerDivStyle={{borderTop:'1px dashed #e2e2e2',borderBottom:'1px dashed #e2e2e2',marginTop:1}}
            nestedItems={[
              <Link key={12.1} style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(12)} to='/setup-account'>
                <ListItem  
                  key={12.1}
                  
                  innerDivStyle={{background:this.state.active===12?"#444444":"",marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0,borderLeft:'1px dashed #ffff',paddingLeft:0}}
                  primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} >------ Tra cứu tài khoản</span>} 
                  ////leftIcon{<div style={{background:'white',width:30,height:1}} />} 
                  onClick={this.onClickButton}
                />
              </Link> ,
        
              <Link key={8} style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(4)} to='/message'>
                <ListItem  
                  key={8}        
                  // innerDivStyle={{background:this.state.active===4?"#444444":"",marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0}}
                  // primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(4)} >------ Tin nhắn</span>}      
                  innerDivStyle={{background:this.state.active===4?"#444444":"",paddingTop:'4%',paddingBottom:'4%',paddingRight:'4%',paddingLeft:0,marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0}}
                  primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}}>------ Tin nhắn</span>} 
                  //leftIcon{<Badge count={0} style={{marginRight:10}}><SMS style={{fill:'white'}} /></Badge>} 
                  onClick={this.onClickButton}
                />
              </Link>, 
              <Link key={9} style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(5)} to='/notification'>
                <ListItem  
                  key={9}
                  innerDivStyle={{background:this.state.active===5?"#444444":"",marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0}}
                  primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} >------ Thông báo</span>} 
                  //leftIcon{<Notifi style={{fill:'white'}} />} 
                  onClick={this.onClickButton}
                />
              </Link>,
              
            ]}
          />
          
          <ListItem
            key={6}          
            primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} >Tiền trong game</span>} 
            leftIcon={<Reorder style={{fill:'white'}} />}
            initiallyOpen={this.state.money_game}
            rightIcon={<Down style={{fill:'white'}}/>}
            primaryTogglesNestedList={true}
            nestedListStyle={{paddingTop:0,paddingBottom:0}}
            innerDivStyle={{borderTop:'1px dashed #e2e2e2',borderBottom:'1px dashed #e2e2e2'}}
            nestedItems={[
              
              <Link key={6.4} style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(3)} to='/revenue'>
                <ListItem  
                  key={7}          
                  innerDivStyle={{background:this.state.active===3?"#444444":"",marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0}}
                  primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(3)} >------ Lợi nhuận</span>} 
                  //leftIcon{<Revenue style={{fill:'white'}} />} 
                  onClick={this.onClickButton}
                />
              </Link>  ,
          
              <Link key={6.3} style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(31)} to='/check_seri'>
                <ListItem
                  key={3}
                  
                  innerDivStyle={{background:this.state.active===31?"#444444":"",marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0}}
                  primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(31)} >------ Check Seri/Mã thẻ</span>} 
                  //leftIcon{<Search style={{fill:'white'}} />}
                  onClick={this.onClickButton}
                />
             </Link>,
            ]}
          />
         
          <ListItem
            key={10}          
            primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(5)} >Tra cứu lịch sử</span>} 
            leftIcon={<Reorder style={{fill:'white'}} />}
            initiallyOpen={this.state.history}
            rightIcon={<Down style={{fill:'white'}}/>}
            primaryTogglesNestedList={true}
            nestedListStyle={{paddingTop:0,paddingBottom:0}}
            innerDivStyle={{borderTop:'1px dashed #e2e2e2',borderBottom:'1px dashed #e2e2e2'}}
            nestedItems={[
              <Link key={10.1} style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(8)} to='/search_game'>
                <ListItem
                  key={10.1}
                  
                  innerDivStyle={{background:this.state.active===8?"#444444":"",marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0}}
                  primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(8)} >------ Lịch sử game bài</span>} 
                  //leftIcon{<HistoryItem style={{fill:'white'}} />}
                  onClick={this.onClickButton}
                />
              </Link>,
              <Link key={10.2} style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(10)} to='/lich-su-slot-game'>
                <ListItem
                  key={10.2}
                  
                  innerDivStyle={{background:this.state.active===10?"#444444":"",marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0}}
                  primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(10)} >------ Lịch sử slot game</span>} 
                  //leftIcon{<HistoryItem style={{fill:'white'}} />}
                  onClick={this.onClickButton}
                />
              </Link>,
              <Link key={10.3} style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(11)} to='/lich-su-mini-game'>
                <ListItem
                  key={10.3}
                  
                  innerDivStyle={{background:this.state.active===11?"#444444":"",marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0}}
                  primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(11)} >------ Lịch sử mini game </span>} 
                  //leftIcon{<HistoryItem style={{fill:'white'}} />}
                  onClick={this.onClickButton}
                />
              </Link>,
              <Link key={10.4} style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(14)} to='/money-history'>
                <ListItem
                  key={10.4}
                  
                  innerDivStyle={{background:this.state.active===14?"#444444":"",marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0}}
                  primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(14)} >------ Lịch sử giao dịch chung</span>} 
                  //leftIcon{<HistoryItem style={{fill:'white'}} />}
                  onClick={this.onClickButton}
                />
              </Link>,
            ]}
          />
        
         
        <ListItem
            key={12}          
            primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} >Duyệt giao dịch
                  <Badge count={(this.props.count_c+this.props.countDL)>0?(this.props.count_c+this.props.countDL):""} 
                  style={{marginLeft:5,display:(this.props.count_c+this.props.countDL) >0?" ":"none"}}/></span>} 
            leftIcon={<Reorder style={{fill:'white'}} />}
            initiallyOpen={this.state.duyet_gd}
            rightIcon={<Down style={{fill:'white'}}/>}
            primaryTogglesNestedList={true}
            nestedListStyle={{paddingTop:0,paddingBottom:0}}
            innerDivStyle={{borderTop:'1px dashed #e2e2e2',borderBottom:'1px dashed #e2e2e2'}}
            nestedItems={[
              
              <Link key={32} style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(32)} to='/card'>
                <ListItem 
                  key={5}
                  innerDivStyle={{background:this.state.active===32?"#444444":"",marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0}}
                  primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} >------ Duyệt thẻ
                  <Badge count={this.props.count_c >0?this.props.count_c:""} style={{marginLeft:5,display:this.props.count_c >0?" ":"none"}}/></span>} 
                  //leftIcon{<Compare style={{fill:'white'}} />} 
                  onClick={this.onClickButton}
                />
              </Link>,
              <Link key={12.3} style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(26)} to='/transfer'>
                <ListItem
                  key={12.3}
                  
                  innerDivStyle={{background:this.state.active===26?"#444444":"",marginLeft:'8%',borderLeft:'1px dashed #ffff',paddingLeft:0}}
                  primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} onClick={(active)=>this.setActive(26)} >------ Duyệt chuyển khoản
                  <Badge count={this.props.countDL >0?this.props.countDL:""} style={{marginLeft:5,display:this.props.countDL >0?" ":"none"}}/></span>} 
                  //leftIcon{<Compare style={{fill:'white'}} />} 
                  onClick={this.onClickButton}
                />
              </Link>,
            ]}
          />
    
          <Link onClick = {this.logOut} > 
           <ListItem  
            key={18}
            nestedListStyle={{paddingTop:0}}
            innerDivStyle={{borderTop:'1px dashed #e2e2e2',borderBottom:'1px dashed #e2e2e2'}}
            primaryText={<span style={{textDecoration: 'none',fontSize: '12px',color: 'white'}} >Log out</span>} 
            leftIcon={<LogOut style={{fill:'white'}} />} 
            onClick={this.onClickButton}
          />
          </Link>
        </List>
      )
      break;
    }
    default:{
      menuBar = false;
      break;
    }
  }  
   
    return (
      <div style={{display: 'flex',flexDirection: 'column', height:'100%'}} >
        
        <div style={{display:this.props.widthNavigation==0?'none':''}}>
          <div style={styles.bodyNavigation}>         
            <List style={{padding: '0'}}>
              <Link style={{display: `${this.state.isMobile?'none':""}`}}>
                <div style={styles.headNavigation}>
                 <img style={styles.imgAccount} style={{marginTop: '15px'}} height={50} width={50} src={this.state.avatar} />
                  <div style={{paddingLeft: '10px',verticalAlign: 'middle', overflow: 'hidden', display: 'inline-block',fontSize: '14px',color: '#FFF',marginTop: '15px'}}>{nn}</div>
                </div>
              </Link>
              {menuBar}
            </List>  
          </div>
        </div>
      </div>
    );
  }
}

NavigationBar.propTypes = {

};


function mapDispatchToProps(dispatch) {
  return {
    changeRoute: (url) => dispatch(push(url)),
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  // selectUser: selectUser(),
});

export default connect(mapStateToProps,mapDispatchToProps)(NavigationBar);
