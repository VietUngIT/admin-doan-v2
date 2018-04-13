import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import { 
  SEARCH_MINI_GAME,
  SEARCH_MINI_ID,
 } from './constants';
 import {
  search_mini_game_success,
  search_mini_id_success,
       } from './actions';
import {
  message,
       } from 'antd';
//import {callAPILogin,callAPIResetPassStep1} from 'utils/request';
import {
  selectUser,
  selectGName,
  selectDate,
  selectToDate,
  selectGId,
  selectId,
      } from './selectors';
import {  
  callAPIDetailMiniGame,
  callAPiMiniId,
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

export function* searchMiniGame() {
  const date = (yield select(selectDate()));
  const todate = (yield select(selectToDate()));
  const gn = (yield select(selectGName()));
  const un = (yield select(selectUser()));
  
  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)
  
  const response = yield call(callAPIDetailMiniGame,nn,sessionKey,un,gn,date,todate);
  // console.log("response-minigame:\n",response)
  try{
     if (response.data.e==0) {
        if(response.data.data){
          yield put(search_mini_game_success(response.data.data));
        
        }       
    } else {
      message.error(response.data.e);
      yield put(search_mini_game_success(false));
    
    }
  } catch(error){
    yield put(search_mini_game_success(false));
    message.error('Lỗi ! Hãy thử lại !s');
  }
  
}
export function* minigameWatcher() {
  
  while (yield take(SEARCH_MINI_GAME)) {
    yield call(searchMiniGame);
  }
}

export function* searchMiniId() {
  // const date = (yield select(selectDate()));
  // const todate = (yield select(selectToDate()));
  const gn = (yield select(selectGId()));
  const id = (yield select(selectId()));
  
  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)
  const response = yield call(callAPiMiniId,nn,sessionKey,gn,id);
  if(gn=="TaiXiu"){    
    try{    
       if (response.data.e==0) {         
          if(response.data){
            yield put(search_mini_id_success(response.data));          
          }       
      } else {
        message.error(response.data.e);
        yield put(search_mini_id_success(false));      
      }
    } catch(error){
      yield put(search_mini_id_success(false));
      message.error('Lỗi ! Hãy thử lại !s');
    }
  }else{
    if(gn=="BauCua"){
      try{    
        if (response.data.e==0) {         
           if(response.data.data){
             yield put(search_mini_id_success(response.data.data));          
           }       
       } else {
         message.error(response.data.e);
         yield put(search_mini_id_success(false));      
       }
     } catch(error){
       yield put(search_mini_id_success(false));
       message.error('Lỗi ! Hãy thử lại !s');
     }
    }
  }
  
  
}
export function* miniIdWatcher() {
  
  while (yield take(SEARCH_MINI_ID)) {
    yield call(searchMiniId);
  }
}
export function* defaultSaga() {
  const miniWatcher = yield fork(minigameWatcher);
  const idWatcher = yield fork(miniIdWatcher);
  const suggest = yield fork(suggestWatcher);

  if(yield take(LOCATION_CHANGE)){
    yield cancel(miniWatcher);
    yield cancel(idWatcher);
    yield cancel(suggest);
    
  }
}

// All sagas to be loaded
export default [
  defaultSaga,
];