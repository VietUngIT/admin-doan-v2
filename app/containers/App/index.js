/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Helmet from 'react-helmet';
import {Icon,Affix,Button} from 'antd';
import Header from 'components/Header'
import Footer from 'components/Footer'
import NavigationBar from 'components/NavigationBar'
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import AppBar from 'material-ui/AppBar';
import styled from 'styled-components';
import { browserHistory } from 'react-router';
import ResizeAware from 'react-resize-aware';
import { Link, } from 'react-router';

import {withRouter} from 'react-router' ;
import {saveMobile, duyetDLTab, load_duyet_card_success, count_card, checkSuperAdmin, count_dl} from './actions';
import {selectIsMobile,selectIsSuperAdmin, selectDataDL, selectIsDuyetDLTab, selectDataCard, selectCountCard, selectCountDL} from './selectors';
import { callAPILoadDuyetDaiLyConfirm, callAPILoadDuyetDaiLyNotConfirm, callAPiGetListCard, callAPiCountTranfer } from '../../utils/request';
import { load_duyet_dl_success } from './actions';
const AppWrapper = styled.div`
display: flex;
min-height: 100%;
height: 100%;
flex-direction: column;
`;
import { Alert ,notification} from 'antd';
import Websocket from 'react-websocket';
import Sound from 'react-sound';
import ReactDOM from 'react-dom';

var sound_content = false;
export class App extends React.Component {

  constructor(props) {
    super(props);
      this.state = {
        widthNavigation: 0,
        heightHeader: 0,
        showNavigation: false,
        showHeader: false,
        isMobile : false,
      };
  }
  
  handleResize = ({ width, height }) => {
    if(width<760 ){
      this.setState({ 
        widthNavigation : 0,
        heightHeader: 48,
      });
    }
    if(761<width && width<1034){
      this.setState({ 
        widthNavigation : 25,
        heightHeader: 0,
       });
    }
    if(width>1034){
      this.setState({ 
        widthNavigation : 18,
        heightHeader: 0,
       });
    }
  };
  updateDimensions() {
    if(window.innerWidth < 760) {
     this.setState({
       isMobile: true,
     });
     this.props.saveMobile(true);
    } else {
     this.setState({
       isMobile: false,
     });
    this.props.saveMobile(false);
    
    }
  }
 
  /**
   * Add event listener
   */
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
    
    setInterval(() => {
      if(localStorage.getItem('role') && parseInt(localStorage.getItem('role'))!==4){
        // console.log("componentDidMount")
        
          this.handleDuyet();
          
         
      }}, 63000);
  }
 
  /**
   * Remove event listener
   */
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
    
  }
  clickIconLeftButton =(e)=>{
    const showNavigation = !this.state.showNavigation;

    if(showNavigation){
      this.setState({ showNavigation: showNavigation });
      this.setState({ widthNavigation : 18});
    }else{
      this.setState({ showNavigation: showNavigation });
      this.setState({ widthNavigation : 0 });
    }
  }

  clickNavigationButton =(e)=>{

    if(this.state.widthNavigation == 0){
      this.setState({ widthNavigation : 100});
    }else{
      this.setState({ widthNavigation : 0 });
    }
  }
 
  componentDidUpdate=()=>{
    // console.log("did-update ",this.props.count_c + this.props.countDL)
    
  }
  componentWillUpdate=()=>{
    // console.log("will-update ",this.props.count_c + this.props.countDL)
    
  }
  componentWillMount(){
    // console.log("role",localStorage.getItem('role'))
    if(localStorage.getItem('role')){
      this.props.checkSuperAdmin(parseInt(localStorage.getItem('role')));
    }else{
      this.props.checkSuperAdmin(false);
      
    }
    if(localStorage.getItem('role') && parseInt(localStorage.getItem('role'))!==4){
      // console.log("componentWillMount")
      this.handleDuyet();
    }
  
  }
  
  scrollTo=()=>{
    ReactDOM.findDOMNode(this).scrollIntoView();

  }
  componentWillReceiveProps(nextProps){
    // console.log(nextProps.count_c + nextProps.countDL)
    // setInterval(() => {
      // console.log("receive ")
      if((this.props.count_c + this.props.countDL)<(nextProps.count_c + nextProps.countDL)){
        this.beep();

      }
    // }, 63000);
   
    // if(this.props.data_card != nextProps.data_card){
    //   if(nextProps.data_card.length>0){
    //     this.props.count_card(nextProps.data_card.length)
    //     sound_content=(
          
    //     <Sound
    //       url="sound/slow.mp3"
    //       playStatus={Sound.status.PLAYING}
    //       playFromPosition ={1}
    //       autoLoad={true}
    //       loop={false}
    //       volume={70}
    //     />
    //   )
    //     // notification.open({
    //     //   message: 'Thông báo duyệt thẻ ',
    //     //   description: 'Có thẻ chưa được duyệt.',
    //     //   icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
    //     // })
       
    //   }else{
    //     this.props.count_card(0)
    //     sound_content = false;
    //   }
    // }
    // if(this.props.data_dl != nextProps.data_dl){
    //   if(nextProps.countDL>0){
        
        // notification.open({
        //   message: 'Thông báo duyệt chuyển khoản đại lý ',
        //   description: 'Có chuyển khoản đại lý chưa được duyệt.',
        //   icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
        // })
       
    //   }
    // }
  
    
  }
  handleDuyet=()=> {
    let sessionKey = localStorage.getItem('sessionkey');
    let userInfo = localStorage.getItem('userInfo');
    var iconLeft = null;
    let nn = false;
    if(localStorage.getItem('userInfo')){
      let length = localStorage.getItem('userInfo').length;
      nn = userInfo.substr(1,length-2);
    }
    if(localStorage.getItem('role') && parseInt(localStorage.getItem('role'))!==4){ 
      
        try{
          return callAPiCountTranfer(nn,sessionKey)
          .then(function(response) {
    
              if(response.data.e==0)
              {
                if(response.data.topup){
                 
                  this.props.count_card(response.data.topup)
                  // console.log("count_card")
                }else{
                  // this.props.count_card(0)
                  
                }
                if(response.data.transfer){
                  
                  this.props.count_dl(response.data.transfer)

                }else{
                  // this.props.count_dl(0)
                  
                }
              }
            }.bind(this));
          }catch(err){
    
           
          }
        }
      }
      
    
  
  // handleDuyetCard=()=> {
  //   let sessionKey = localStorage.getItem('sessionkey');
  //   let userInfo = localStorage.getItem('userInfo');
  //   var iconLeft = null;
  //   let nn = false;
  //   if(localStorage.getItem('userInfo')){
  //     let length = localStorage.getItem('userInfo').length;
  //     nn = userInfo.substr(1,length-2);
  //   }
      
  //     try{
  //       return callAPiGetListCard(nn,sessionKey,"unconfirmed")
  //       .then(function(response) {
  
  //           if(response.data.e==0)
  //           {
  //             if(response.data.data){
  //               this.props.load_duyet_card_success(response.data.data)
  
  //             }else{
  //               this.props.load_duyet_card_success(false)
                
  //             }
  //           }
  //         }.bind(this));
  //       }catch(err){
  
         
  //       }
    
  // }
  // handleDuyetDL=()=> {
  //   let sessionKey = localStorage.getItem('sessionkey');
  //   let userInfo = localStorage.getItem('userInfo');
  //   var iconLeft = null;
  //   let nn = false;
  //   if(localStorage.getItem('userInfo')){
  //     let length = localStorage.getItem('userInfo').length;
  //     nn = userInfo.substr(1,length-2);
  //   }
      
  //     try{
  //       return callAPILoadDuyetDaiLyNotConfirm(nn,sessionKey,1)
  //       .then(function(response) {
  
  //           if(response.data.e==0)
  //           {
  //             if(response.data.data){
  //               this.props.load_duyet_dl_success(response.data.data)
  //               this.props.count_dl(response.data.total)
  
  //             }else{
  //               this.props.load_duyet_dl_success(false)
  //               this.props.count_dl(0)
                
  //             }
  //           }
  //         }.bind(this));
  //       }catch(err){
  
         
  //       }
    
  // }
  render(){

    let content = null;
    var isSuperAdmin = false;
    let sessionKey = localStorage.getItem('sessionkey');
    let userInfo = localStorage.getItem('userInfo');
    var iconLeft = null;
    let nn = false;
    if(localStorage.getItem('userInfo')){
      let length = localStorage.getItem('userInfo').length;
      nn = userInfo.substr(1,length-2);
    }
    if(localStorage.getItem('role')){
      isSuperAdmin = parseInt(localStorage.getItem('role'));
      // this.props.checkSuperAdmin(isSuperAdmin);
    }else{
      isSuperAdmin = false;
      // this.props.checkSuperAdmin(isSuperAdmin);
      
    }
  
    if(sessionKey){
      if(location.pathname=='/'){
        switch(isSuperAdmin){
          case 3:{
            browserHistory.push("/cculog");
            break;
          }
          case 2:{
            browserHistory.push("/cculog");

            break;
          }
          case 4:{
            
            browserHistory.push("/cculog");
            break;
          }
          case 5:{
            
            browserHistory.push("/setup-account");
            break;
          }
          default:{
            break;
          }
        }
      }else{
        content = (
          <AppWrapper style={{height:'100%',width:'100%',overflowX:'hidden'}}>
  
              <ResizeAware
                style={{height:'100%'}}
                onlyEvent
                onResize={this.handleResize}
              >
                <div>
                  <div style={{height: `${this.state.heightHeader}px`}}>
                    <Header userInfo={nn} heightHeader={this.state.heightHeader} clickNavigationButton={this.clickNavigationButton}/>
                  </div>
                  <div style={{display: 'flex',flexDirection: 'row',flex: '1',height:'auto', minHeight:'100%'}}>
                    <div style={{width: `${this.state.widthNavigation}%`,background:'#585858',height:'auto',minHeight:window.innerWidth,overflow:'auto'}}>
                      <NavigationBar
                        isSuperAdmin={isSuperAdmin} 
                        selectGetUserInfor={this.props.selectGetUserInfor}
                        widthNavigation={this.state.widthNavigation} 
                        count_c={this.props.count_c}
                        countDL={this.props.countDL}
                        count_card={this.props.count_card}
                        count_dl={this.props.count_dl}
                        clickNavigationButton={this.clickNavigationButton}
                        scrollTo={this.scrollTo}
                      />
                    </div>
                    
                    <div style={{width: `${100-this.state.widthNavigation}%`}}>
                      <Link style={{right:'3%',bottom:'5%',position:'fixed',display:((isSuperAdmin==2||isSuperAdmin==3)&& !this.state.isMobile)?"":"none"}} to="/back-up">
                        <img src={require("images/backup_1.jpg")} style={{width:80,height:80,cursor:'pointer'}}/>
                      </Link>
                      <div style={{ flex: '1',height: '100%'}}>
                        
                        {React.Children.toArray(this.props.children)}
                      </div>
                    </div>
                  </div>
                </div>
              </ResizeAware>
          </AppWrapper>
        )
      }
      
    }else{
      if(location.pathname !=='/'){
        browserHistory.push('/')
      
      }
      content = (
        <div style={{width:'100%',height:'100%'}}>
          
          <div style={{width: `100%`,height: '100%'}}>

            <div style={{ flex: '1',height: '100%'}}>
                {React.Children.toArray(this.props.children)}
            </div>
          </div>
        </div>
      )
    }
    var helmet = false;
    if((this.props.count_c + this.props.countDL) >0){
      let count = this.props.count_c + this.props.countDL;
      helmet=(
        <Helmet
          // titleTemplate="%s"
          title={"("+count+") Admin Tool "}
          // meta={[
          //   { name: 'description', content: 'Admin Tool' },
          // ]}
          link={[
            {rel: "icon",sizes: "36x36", href: "https://cdn1.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/tools-circle-blue-512.png"},
         
          ]}
        >
        
        </Helmet>
      )
    }else{
      helmet=(
        <Helmet
          titleTemplate="%s"
          defaultTitle={"Admin Tool"}
          // meta={[
          //   { name: 'description', 
          //     content: 'Admin Tool',
              
          //   }
          // ]}
          link={[
            {rel: "icon",sizes: "36x36", href: "https://cdn1.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/tools-circle-blue-512.png"},
         
          ]}
        >
        </Helmet>
       
      )
    }
    return (
      <div style={{height:'100%',minHeight:'100%'}}>
        {helmet}
        {content}
        {sound_content}
      </div>
    );
  }
}
//<img src={require('./iconT.png')} width='20' height='20' position='relative'/>
App.propTypes = {
  children: React.PropTypes.node,
};
const mapStateToProps = createStructuredSelector({
  mobile : selectIsMobile(),
  isSuperAdmin: selectIsSuperAdmin(),
  data_dl : selectDataDL(),
  data_card : selectDataCard(),
  isDuyetDLTab : selectIsDuyetDLTab(),
  count_c : selectCountCard(),
  countDL : selectCountDL(),
});

function mapDispatchToProps(dispatch) {
  return {
    saveMobile:(isMobile)=> dispatch(saveMobile(isMobile)),
    load_duyet_dl_success:(data)=>dispatch(load_duyet_dl_success(data)),
    load_duyet_card_success:(data)=>dispatch(load_duyet_card_success(data)),
    duyetDLTab:(value)=>dispatch(duyetDLTab(value)),
    count_card:(count)=>dispatch(count_card(count)),
    count_dl:(count)=>dispatch(count_dl(count)),
    checkSuperAdmin:(id)=>dispatch(checkSuperAdmin(id)),
    dispatch,
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
