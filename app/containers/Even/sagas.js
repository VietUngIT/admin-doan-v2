
import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import { 
  GET_EVEN,
  ADD_EVEN,
  DEL_EVEN,
  ACTIVE_EVEN,

 } from './constants';
 import {
  getEvenSuccess,
  addEvenSuccess,
  delEvenSuccess,
  activeEvenSuccess,
  getActive,

       } from './actions';
import {message,
       } from 'antd';
//import {callAPILogin,callAPIResetPassStep1} from 'utils/request';
import {
  selectGId,
  selectUn,
  selectT,
  selectID,
  selectBet,

      } from './selectors';
import {  
  callAPiGetEven,
  callAPiGetAddEven,
  callAPiDelEven,
  callAPiActiveEven,

  callAPiSuggestUserByNN,
} from 'utils/request';
import { 
  SUGGEST_USER_BY_NN
}from '../App/constants';
import { selectKey } from '../App/selectors';
import { suggest_user_by_nickname_success } from '../App/actions';

export function* suggestUser() {
  
  const key =(yield select(selectKey()));

  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)
  const response = yield call(callAPiSuggestUserByNN,nn,sessionKey,key);
  
  try{
     if (response.data.e==0) {
        if(response.data.data){
          yield put(suggest_user_by_nickname_success(response.data.data));
        }       
    }else{
      yield put(suggest_user_by_nickname_success(false));
    } 
    
  } catch(error){
    yield put(suggest_user_by_nickname_success(false));
    
  }
  
}
export function* suggestWatcher() {
  
  while (yield take(SUGGEST_USER_BY_NN)) {
    yield call(suggestUser);
    
  }
}

export function* getEven() {
  
    let sessionKey = localStorage.getItem('sessionkey');
    let userInfo = localStorage.getItem('userInfo');
    let length = localStorage.getItem('userInfo').length;
    let nn = userInfo.substr(1,length-2)
  
    const response = yield call(callAPiGetEven,nn,sessionKey);
    // console.log("response-getcassh:\n",response)
    try{
       if (response.data.e==0) {         
        
            if(response.data.statusActiveNoHu==0){
              yield put(getActive(true));              
            }else{
              yield put(getActive(false));              
              
            }
          
          if(response.data.data){
            yield put(getEvenSuccess(response.data.data));
          
          }       
      } else {
        message.error(response.data.e);
        yield put(getEvenSuccess(false));
        
      }
    } catch(error){
      //yield put(showNotify(503,'error','error'));
      message.error('Lỗi ! Hãy thử lại !');
      yield put(getEvenSuccess(false));
      
    }
    
  }
  export function* getEvenWatcher() {
    
    while (yield take(GET_EVEN)) {
      yield call(getEven);
    }
  }
  
  export function* addEven() {
    const gid =(yield select(selectGId()));
    const un =(yield select(selectUn()));
    const b = (yield select(selectBet()));

    let sessionKey = localStorage.getItem('sessionkey');
    let userInfo = localStorage.getItem('userInfo');
    let length = localStorage.getItem('userInfo').length;
    let nn = userInfo.substr(1,length-2)
  
    const response = yield call(callAPiGetAddEven,nn,sessionKey,gid,un,b);
    try{
       if (response.data.e==0) {
        
          if(response.data.statusActiveNoHu==0){
            yield put(getActive(true));              
          }else{
            yield put(getActive(false));              
            
          }
        
          if(response.data.data){
            yield put(addEvenSuccess(response.data.data));
            message.success("Cập nhật thành công !")
          }       
      } else {
        switch(response.data.e ){
          case 36 :{
            message.error("User không tồn tại !");
            yield put(addEvenSuccess(false));            
            break;
          }
          case 39 :{
            message.error("User đã được thêm nổ hũ ! Không thể thêm !");
            yield put(addEvenSuccess(false));            
            break;
          }
          case 40 :{
            message.error("User đã nổ hũ trong hôm nay ! Không thể thêm !");
            yield put(addEvenSuccess(false));            
            break;
          }
          default:{
            message.error("Lỗi !");
          }
        }
       
      }
    } catch(error){
      yield put(addEvenSuccess(false));            
      message.error('Lỗi ! Hãy thử lại !');
    }
    
  }
  export function* addEvenWatcher() {
    
    while (yield take(ADD_EVEN)) {
      yield call(addEven);
    }
  }


  export function* delEven() {
    const id =(yield select(selectID()));
    
    let sessionKey = localStorage.getItem('sessionkey');
    let userInfo = localStorage.getItem('userInfo');
    let length = localStorage.getItem('userInfo').length;
    let nn = userInfo.substr(1,length-2)
  
    const response = yield call(callAPiDelEven,nn,sessionKey,id);
    try{
       if (response.data.e==0) {
        
          if(response.data.statusActiveNoHu==0){
            yield put(getActive(true));              
          }else{
            yield put(getActive(false));              
            
          }
          if(response.data.data){
            yield put(delEvenSuccess(response.data.data));
            message.success("Xóa thành công !")
          }       
      } else {
        yield put(delEvenSuccess(false));
        message.error("Xóa thất bại !")
      }
    } catch(error){
      yield put(delEvenSuccess(false));      
      message.error('Lỗi ! Hãy thử lại !');
    }
    
  }
  export function* delEvenWatcher() {
    
    while (yield take(DEL_EVEN)) {
      yield call(delEven);
    }
  }


  export function* activeEven() {
    const t =(yield select(selectT()));
    
    let sessionKey = localStorage.getItem('sessionkey');
    let userInfo = localStorage.getItem('userInfo');
    let length = localStorage.getItem('userInfo').length;
    let nn = userInfo.substr(1,length-2)
  
    const response = yield call(callAPiActiveEven,nn,sessionKey,t);
    try{
       if (response.data.e==0) {
          
            if(response.data.statusActiveNoHu==0){
              yield put(getActive(true));              
            }else{
              yield put(getActive(false));             
              
            }
          
          if(response.data.data){
            yield put(activeEvenSuccess(response.data.data));
            if(t=="deactiveNH"){
              message.success("Đã tắt trạng thái active nổ hũ !")
              
            }else{
              message.success("Đã kích hoạt trạng thái active nổ hũ !")
              
            }
          }       
      } else {
        switch(t){
          case "deactiveNH":{
            yield put(getActive(true));   
            break;
          }
          case "activeNH":{
            yield put(getActive(false));   
            break;
          }
        }
        message.error("Kích hoạt không thành công !")
      }
    } catch(error){
      message.error('Lỗi ! Hãy thử lại !');
    }
    
  }
  export function* activeEvenWatcher() {
    
    while (yield take(ACTIVE_EVEN)) {
      yield call(activeEven);
    }
  }



export function* defaultSaga() {
  const getWatcher = yield fork(getEvenWatcher);
  const addWatcher = yield fork(addEvenWatcher);
  const delWatcher = yield fork(delEvenWatcher);
  const activeWatcher = yield fork(activeEvenWatcher);
  const suggest = yield fork(suggestWatcher);

  
  if(yield take(LOCATION_CHANGE)){
    yield cancel(getWatcher);
    yield cancel(addWatcher);
    yield cancel(delWatcher);
    yield cancel(activeWatcher);
    yield cancel(suggest);
 
    
  }
}

// All sagas to be loaded
export default [
  defaultSaga,
];
