
import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import { 
  LOAD_GITT,
  GEN_GITT,
  COUNT_GITT_GTT,
  COUNT_GITT_GCD,
  COUNT_GITT_GHV,
  SEARCH_NN,
  SEARCH,
  SEARCH_CODE,
  DEL,
 } from './constants';
 import {
  loadGittSuccess,
  genGittSuccess,
  countGittGTTSuccess,
  countGittGCDSuccess,
  countGittGHVSuccess,
  searchNNSuccess,
  searchSuccess,
  del_success,
  searchCodeSuccess,
       } from './actions';
import {message,
       } from 'antd';
//import {callAPILogin,callAPIResetPassStep1} from 'utils/request';
import {
  selectA,
  selectSt,
  selectEt,
  selectC,
  selectV,
  selectT,
  selectUn,
  selectTS,
  selectCS,
  selectNN,
  selectDate,
  selectVS,
  selectAd,
  selectId,
  selectCode,
      } from './selectors';
import {  
  callAPilLoadGittCode,
  callAPiGenGittCode,
  callAPilCountGittGTT,
  callAPilCountGittGCD,
  callAPilCountGittGHV,
  callAPilSearchGittCode,
  callAPiSearchGitt,
  callAPilDelGittCode,
  callAPiSearchCodeGitt,
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


export function* loadGitt() {  
  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)

  const response = yield call(callAPilLoadGittCode,nn,sessionKey);
  // console.log("response:",response)
  try{
     if (response.data.e==0) {
        if(response.data.listCode){
          yield put(loadGittSuccess(response.data.listCode));          
          // message.success("Đã thêm thành công !")            
          
        }       
    } else {
      yield put(loadGittSuccess(false));          
      message.error('Lỗi ! Hãy thử lại !');
    
    }
  } catch(error){
    message.error('Lỗi ! Hãy thử lại !');
    yield put(loadGittSuccess(false));          
    
  }
}

export function* loadGittWatcher() {
  
  while (yield take(LOAD_GITT)) {
    yield call(loadGitt);
  }
}


export function* genGitt() {
  const a =(yield select(selectA()));
  const t =(yield select(selectT()));
  const st =(yield select(selectSt()));
  const et =(yield select(selectEt()));
  const c =(yield select(selectC()));
  const v =(yield select(selectV()));
  
  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)

  const response = yield call(callAPiGenGittCode,nn,sessionKey,t,a,st,et,c,v);
  // console.log(response.data)
  
  try{
     if (response.data.e==0) {
        // console.log(response.data.listCode)
        if(response.data.listCode){
          yield put(genGittSuccess(response.data.listCode));          
          message.success("Đã thêm thành công !")   
          switch(t){
            case "GTT":{
              yield call(countGTT);  
              break;
            }
            case "GCD":{
              yield call(countGCD);  
              break;
            }
            case "KHV":{
              yield call(countGHV);  
              break;
            }
          }     
          
        }       
    } else {
      yield put(genGittSuccess(false));          
       message.error('Lỗi ! Hãy thử lại !');
    
    }
  } catch(error){
    message.error('Lỗi ! Hãy thử lại !');
    yield put(genGittSuccess(false));          
    
  }
}

export function* genGittWatcher() {
  
  while (yield take(GEN_GITT)) {
    yield call(genGitt);
  }
}

export function* countGTT() {

  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)

  const response = yield call(callAPilCountGittGTT,nn,sessionKey);
  // console.log(response.data)
  
  try{
     if (response.data.e==0) {
        // console.log(response.data.listCode)
        if(response.data.data){
          yield put(countGittGTTSuccess(response.data.data));          
          
        }       
    } else {
      message.error('Có lỗi trong quá trình xử lý!');
      yield put(countGittGTTSuccess(false));   
    }
  } catch(error){
    message.error('Lỗi ! Hãy thử lại !');
    yield put(countGittGTTSuccess(false));   
    
  }
  
}
export function* countGTTWatcher() {
  
  while (yield take(COUNT_GITT_GTT)) {
    yield call(countGTT);
  }
}

export function* countGCD() {
  
    let sessionKey = localStorage.getItem('sessionkey');
    let userInfo = localStorage.getItem('userInfo');
    let length = localStorage.getItem('userInfo').length;
    let nn = userInfo.substr(1,length-2)
  
    const response = yield call(callAPilCountGittGCD,nn,sessionKey);
    // console.log(response.data)
    
    try{
       if (response.data.e==0) {
          // console.log(response.data.listCode)
          if(response.data.data){
            yield put(countGittGCDSuccess(response.data.data));          
            
          }       
      } else {
        message.error('Có lỗi trong quá trình xử lý!');
        yield put(countGittGCDSuccess(false));          
        
      }
    } catch(error){
      message.error('Lỗi ! Hãy thử lại !');
      yield put(countGittGCDSuccess(false));          
      
    }
}
export function* countGCDWatcher() {
  
  while (yield take(COUNT_GITT_GCD)) {
    yield call(countGCD);
  }
}

export function* countGHV() {
  
    let sessionKey = localStorage.getItem('sessionkey');
    let userInfo = localStorage.getItem('userInfo');
    let length = localStorage.getItem('userInfo').length;
    let nn = userInfo.substr(1,length-2)
  
    const response = yield call(callAPilCountGittGHV,nn,sessionKey);
    // console.log(response.data)
    
    try{
       if (response.data.e==0) {
          // console.log(response.data.listCode)
          if(response.data.data){
            yield put(countGittGHVSuccess(response.data.data));          
            
          }       
      } else {
        message.error('Có lỗi trong quá trình xử lý!');
        yield put(countGittGHVSuccess(false));          
        
      }
    } catch(error){
      message.error('Lỗi ! Hãy thử lại !');
      yield put(countGittGHVSuccess(false));          
      
    }
  }
export function* countGHVWatcher() {
  
  while (yield take(COUNT_GITT_GHV)) {
    yield call(countGHV);
  }
}

export function* searchNN() {
  const un =(yield select(selectUn()));
  
  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)

  const response = yield call(callAPilSearchGittCode,nn,sessionKey,un);
  // console.log(response.data)
  
  try{
     if (response.data.e==0) {
        // console.log(response.data.listCode)
        if(response.data.listCode){
          yield put(genGittSuccess(response.data.listCode));         
            
        }else{
          yield put(genGittSuccess(false));         
          message.error('Lỗi ! Hãy thử lại !');
    
        }   
    } else {
      yield put(genGittSuccess(false));         
      message.error('Lỗi ! Hãy thử lại !');
    }
  } catch(error){
    message.error('Lỗi ! Hãy thử lại !');
  }
}

export function* searchNNWatcher() {
  
  while (yield take(SEARCH_NN)) {
    yield call(searchNN);
  }
}

export function* search() {
  const t =(yield select(selectTS()));
  const c =(yield select(selectCS()));
  const v =(yield select(selectVS()));
  const ad =(yield select(selectAd()));
  const date =(yield select(selectDate()));
  const n =(yield select(selectNN()));
  
  
  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)

  const response = yield call(callAPiSearchGitt,nn,sessionKey,date,c,t,ad,v,n);
  // console.log(response.data)
  
  try{
     if (response.data.e==0) {
        // console.log(response.data.listCode)
        if(response.data.listCode){
          yield put(searchSuccess(response.data.listCode));         
            
        }else{
          message.error('Lỗi ! Hãy thử lại !');    
          yield put(searchSuccess(false));         
          
        }   
    } else {
      message.error('Lỗi ! Hãy thử lại !');
      yield put(searchSuccess(false));         
      
    }
  } catch(error){
    message.error('Lỗi ! Hãy thử lại !');
  }
}
export function* searchGittCodeWatcher() {
  
  while (yield take(SEARCH)) {
    yield call(search);
  }
}

export function* del() {
  const id =(yield select(selectId()));
  
  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)
  
  const response = yield call(callAPilDelGittCode,nn,sessionKey,id);
  try{
     if (response.data.e==0) {
      yield put(del_success(id));
      message.success("Xóa thành công !");
      yield call(countGTT);  
      yield call(countGHV);  
      yield call(countGCD);  
    } else {
      message.error(response.data.e);
    }
  } catch(error){
    //yield put(showNotify(503,'error','error'));
    message.error('Lỗi ! Hãy thử lại !');
  }  
}
export function* delGittWatcher() {
  
  while (yield take(DEL)) {
    yield call(del);
  }
}

export function* searchCode() {
  const code =(yield select(selectCode()));
  
  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)
  // yield put(searchCodeSuccess([]));
  const response = yield call(callAPiSearchCodeGitt,nn,sessionKey,code);
  try{
     if (response.data.e==0) {
      if(response.data.listCode){
        yield put(searchCodeSuccess(response.data.listCode));         
          
      }else{
        message.error('Lỗi ! Hãy thử lại !');    
        yield put(searchCodeSuccess([]));         
        
      }   
    } else {
      message.error(response.data.e);
    }
  } catch(error){
    //yield put(showNotify(503,'error','error'));
    message.error('Lỗi ! Hãy thử lại !');
  }
  
}
export function* searchByCodeWatcher() {
  
  while (yield take(SEARCH_CODE)) {
    yield call(searchCode);
  }
}
export function* defaultSaga() {
  const loadWatcher = yield fork(loadGittWatcher);
  const genWatcher = yield fork(genGittWatcher);
  const gttWatcher = yield fork(countGTTWatcher);
  const gcdWatcher = yield fork(countGCDWatcher);
  const ghvWatcher = yield fork(countGHVWatcher);
  const searchWatcher = yield fork(searchNNWatcher);
  const searchGittWatcher = yield fork(searchGittCodeWatcher);
  const searchCodeWatcher = yield fork(searchByCodeWatcher);
  const delWatcher = yield fork(delGittWatcher);
  const suggest = yield fork(suggestWatcher);

  if(yield take(LOCATION_CHANGE)){
    yield cancel(loadWatcher);
    yield cancel(genWatcher);    
    yield cancel(gcdWatcher);    
    yield cancel(gttWatcher);    
    yield cancel(ghvWatcher);    
    yield cancel(searchWatcher);    
    yield cancel(searchGittWatcher);    
    yield cancel(delWatcher);    
    yield cancel(suggest);    
  }
}

// All sagas to be loaded
export default [
  defaultSaga,
];
