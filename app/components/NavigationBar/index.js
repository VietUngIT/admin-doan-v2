import React from 'react';
import styled from 'styled-components';
import {Menu, Icon, Switch} from 'antd';
import {  Link, } from 'react-router';
import styles from './styles';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { active } from 'glamor';
import { browserHistory } from 'react-router';
const SubMenu = Menu.SubMenu;

const SpanStyled = styled.span`
  fontSize: 18,
  marginTop: 11,
  fontWeight: 600,
`;
class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 1,
      current: '1',
    };
  }

  componentWillMount(){
    // console.log("componentWillMount")
  }
  
  changeNavigationBar=(width)=>{
    if(width===18){
      this.props.changeNavigationBar();
    }else{
      this.props.changeNavigationBar();
    }
  }
  componentDidMount(){
    if(location.pathname.toUpperCase().indexOf("/NEWS")>-1){
      this.setState({active: 2}); 
    }else if(location.pathname.toUpperCase().indexOf("/MARKETINFO")>-1){
      this.setState({active: 3}); 
    }else if(location.pathname.toUpperCase().indexOf("/AGRITECH")>-1){
      this.setState({active: 4}); 
    }else{
      this.setState({active: 1}); 
    }
  }

  logoutHandle=()=>{
    if(localStorage.getItem("userInfo")){
      localStorage.removeItem("userInfo")
    }
    if(sessionStorage.getItem("userInfo")){
      sessionStorage.removeItem("userInfo")
    }
    browserHistory.push('/login');
  }

  changeItemBar=(item)=>{
    // console.log("changeItemBar: "+item)
    this.setState({active: item}); 
  }
  handleClick = (e) => {
    switch(e.key){
      case '1':
        browserHistory.push('/news')
        break;
      case '2':
        browserHistory.push('/marketinfo')
        break;
      case '3':
        browserHistory.push('/agritech')
        break;
      case '4':
        browserHistory.push('/marketprice')
        break;
    }
    this.setState({
      current: e.key,
    });
  }
  
  render() {
    var menu = (
      <Menu
          theme="dark"
          onClick={this.handleClick}
          style={{ width: 220,background: "#39435c", }}
          defaultOpenKeys={['sub1']}
          selectedKeys={[this.state.current]}
          mode="inline"
        >
          <SubMenu style={{background: '#000'}} key="sub1" title={<span><Icon type="mail" /><span style={{fontSize: 15}}>Quản lý tin tức</span></span>}>
            <Menu.Item key="1">Tin tức-Sự kiện</Menu.Item>
            <Menu.Item key="2">Tin tức thị trường</Menu.Item>
            <Menu.Item key="3">Kỹ thuật nông nghiệp</Menu.Item>
            <Menu.Item key="4">Giá cả thị trường</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title={<span><Icon type="appstore" /><span style={{fontSize: 15}}>Quản lý người dùng</span></span>}>
            <Menu.Item key="5">Chuyên gia</Menu.Item>
            <Menu.Item key="6">Q&A</Menu.Item>
          </SubMenu>
          <SubMenu key="sub4" title={<span><Icon type="setting" /><span style={{fontSize: 15}}>Cá nhân</span></span>}>
            <Menu.Item key="7">Thông tin cá nhân</Menu.Item>
            <Menu.Item key="8">Đăng xuất</Menu.Item>
          </SubMenu>
        </Menu>
    )
    return (
      <div style={{height:'100%',paddingTop: 50}}>
        <div style={{padding:'20px 10px',borderBottom: "1px solid #d8d8d8",display: 'flex'}}>
          <img src={require('containers/App/maxresdefault.jpg')} width='55' height='55' style={styles.avatar}/>
          <div style={{display: 'flex',flexDirection: 'column',paddingTop: 10}}>
            <span style={{color:'#FFF'}}>Admin</span>
            <span style={styles.nameUser}>Đinh Viết Ưng</span>
          </div>
        </div>
        {menu}
        {/* <div style={{paddingTop: 15,paddingLeft:10,paddingRight:10,marginBottom: 7}}>
          <Link style={{textDecoration: 'none'}} to='/'>
            <div style={{background:this.state.active===1?"#00B8D4":"#1A237E", width:"100%",height: 40}} onClick={(e)=>this.changeItemBar(1)}>
              <Icon type="appstore" style={{width:this.props.widthNavigation===18?"25%":"100%",fontSize: 18,color: "#ffffff",marginTop: 11,}}/>
              <SpanStyled style={{display:this.props.widthNavigation===18?"":"none",color:"#FFF",fontSize:"16px"}}>Home</SpanStyled>
            </div>
          </Link>
        </div>
        <div style={{paddingTop: 15,paddingLeft:10,paddingRight:10,marginBottom: 7}}>
          <Link style={{textDecoration: 'none'}} to='/news'>
            <div style={{background:this.state.active===2?"#00B8D4":"#1A237E", width: "100%",height: 40}} onClick={(e)=>this.changeItemBar(2)}>
              <Icon type="copy" style={{width:this.props.widthNavigation===18?"25%":"100%",fontSize: 18,color: "#ffffff",marginTop: 11,}}/>
              <SpanStyled style={{display:this.props.widthNavigation===18?"":"none",color:"#FFF",fontSize:"16px"}}>Tin Tức</SpanStyled>
            </div>
          </Link>
        </div>
        <div style={{paddingTop: 15,paddingLeft:10,paddingRight:10,marginBottom: 7}} onClick={(e)=>this.changeItemBar(3)}>
          <Link style={{textDecoration: 'none'}} to='/marketinfo'>
            <div style={{background:this.state.active===3?"#00B8D4":"#1A237E", width: "100%",height: 40}}>
              <Icon type="line-chart" style={{width:this.props.widthNavigation===18?"25%":"100%",fontSize: 18,color: "#ffffff",marginTop: 11,}}/>
              <SpanStyled style={{display:this.props.widthNavigation===18?"":"none",color:"#FFF",fontSize:"16px"}}>Thị trường.</SpanStyled>
            </div>
          </Link>
        </div>
        <div style={{paddingTop: 15,paddingLeft:10,paddingRight:10,marginBottom: 7}} onClick={(e)=>this.changeItemBar(4)}>
          <Link style={{textDecoration: 'none'}} to='/agritech'>
            <div style={{background:this.state.active===4?"#00B8D4":"#1A237E", width: "100%",height: 40}}>
              <Icon type="edit" style={{width:this.props.widthNavigation===18?"25%":"100%",fontSize: 18,color: "#ffffff",marginTop: 11,}}/>
              <SpanStyled style={{display:this.props.widthNavigation===18?"":"none",color:"#FFF",fontSize:"16px"}}>Tin kỹ thuật</SpanStyled>
            </div>
          </Link>
        </div>
        <div style={{paddingTop: 15,paddingLeft:10,paddingRight:10,marginBottom: 7}}>
          <div style={{background:"#1A237E", width: "100%",height: 40}} onClick={this.logoutHandle}>
            <Icon type="logout" style={{width:this.props.widthNavigation===18?"25%":"100%",fontSize: 18,color: "#ffffff",marginTop: 11,}}/>
            <SpanStyled style={{display:this.props.widthNavigation===18?"":"none",color:"#FFF",fontSize:"16px"}}>Đăng xuất</SpanStyled>
          </div>
        </div> */}
      </div>
    );
  }
}

NavigationBar.propTypes = {

};

export default NavigationBar;
