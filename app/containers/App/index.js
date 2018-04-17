import React from 'react';
import { browserHistory } from 'react-router';
import Helmet from 'react-helmet';
import {Icon} from 'antd';
import styled from 'styled-components';
import AppBar from 'material-ui/AppBar';
import NavigationBar from 'components/NavigationBar'
import Header from 'components/Header'
import ResizeAware from 'react-resize-aware';
import { Link, } from 'react-router';
import { message } from 'antd';
const AppWrapper = styled.div`
  min-height: 100%;
`;

message.config({
  top: 60,
});

export  class App extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        widthNavigation: 18,
      };
  }
  clickIconButton =()=>{
    if(this.state.widthNavigation === 3){
      this.setState({ widthNavigation : 18 });
    }else{
      this.setState({ widthNavigation : 3 });
    }
  }
  handleResize = ({ width, height }) => {
    if(width<980 ){
      this.setState({ 
        widthNavigation : 3,
      });
    }
    if(width>980){
      if(this.state.widthNavigation === 18){
        this.setState({ 
          widthNavigation : 18,
         });
      }
    }
  };
  render() {
    let content = null;

    let userInfo = null;
    userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if(userInfo == null){
      userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    }
    if(userInfo){
      if(location.pathname=='/login'){
        browserHistory.push('/news')
      }
      let img = false;
      if(userInfo.avatar && userInfo.avatar.length>1){
        img = userInfo.avatar;
      }else{
        img = require('./maxresdefault.jpg');
      }
      content = (
        <div style={{height:"100%"}} >
          <Header/>
          <AppWrapper>
              <div style={{ width: "220px",height: '100%',overflow: 'auto',position: 'fixed',background: '#39435C',zIndex: 10}}>
                <NavigationBar widthNavigation={220} changeNavigationBar={()=>this.clickIconButton()}/>
              </div>
              <div style={{paddingLeft: 225,paddingTop: 60,height: '100%',position: 'fixed',width: '100%',overflowY: 'auto'}}>
                <div style={{height: '100%',padding: 10,}}>
                  {React.Children.toArray(this.props.children)}
                </div>
              </div>
          </AppWrapper>
        </div>
      )
    }else{
      if(!(location.pathname==='/login')){
        browserHistory.push('/login')
      }
      content = (
        <div style={{height:'100%'}}>
          {React.Children.toArray(this.props.children)}
        </div>
      )
    }
    return (
      <div style={{height:'100%'}}>
        {content}
      </div>
    );
  }
}
App.propTypes = {
  children: React.PropTypes.node,
};
export default App;
