import { GET_CARD_LIST, DUYET_CARD, HUY_DUYET_CARD, GET_LIST_NCC_CARD, CHANGE_NCC_CARD } from "./constants";
import { callAPiGetListCard, callAPiDuyetCard, callAPiHuyDuyetCard, callAPiGetListNCCThe, callAPiChangeNCCThe } from "../../utils/request";
import { get_card_list_success, duyet_card_success, huy_duyet_card_success, get_list_ncc_card_success, change_ncc_card_success } from "./actions";
import { selectID, selectIDHuy, selectT, selectPc } from "./selectors";
import {
  message,
} from 'antd';
import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import { load_duyet_card_success, count_card } from "../App/actions";
var 
    data= [
        {
            "_id": "5a4efc3a52628d2694c0562b",
            "requestId": "vnbaitopup_20180105111658277_761550",
            "nickname": "cuong_nguyen",
            "amount": 20000,
            "provider": "VTT",
            "quantity": 1,
            "admin": "baphuDZ",
            "reason": "Thẻ duyệt",
            "status": 0,
            "createTime": 1515127017444
        },
        {
            "_id": "5a4efc3b52628d2694c0562f",
            "requestId": "vnbaitopup_20180105111659308_261527",
            "nickname": "cuong_nguyen",
            "amount": 20000,
            "provider": "VTT",
            "quantity": 1,
            "admin": "baphuDZ",
            "status": 0,
            "createTime": 1515127017445
        },
        {
            "_id": "5a4efef752628d2e3c9ee56a",
            "requestId": "vnbaitopup_20180105112838611_742005",
            "nickname": "cuong_nguyen",
            "amount": 20000,
            "provider": "VTT",
            "quantity": 1,
            "admin": "baphuDZ",
            "reason": "Đéo hỗ trợ nhé",
            "status": 0,
            "createTime": 1515127017445
        }
    ]
 

export function* getList() {
  const t =(yield select(selectT()));
  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)  
  // yield put(get_card_list_success(data));   
  
  const response = yield call(callAPiGetListCard,nn,sessionKey,t);    
  try{
     if (response.data.e==0) {
        if(response.data.data){
          yield put(get_card_list_success(response.data.data));    
          if(t=="unconfirmed"){
            yield put(load_duyet_card_success(response.data.data));    
            if(response.data.data.length>0){
              yield put(count_card(response.data.data.length));         
              // console.log("saga-countcarrd")
            }else{
              yield put(count_card(0));         
              
            }  
            
          }  
          
        }       
    } else {
      message.error(response.data.e);
      yield put(get_card_list_success(false));
      yield put(load_duyet_card_success(false));         
      
    }
  } catch(error){
    message.error('Lỗi ! Hãy thử lại !');
    yield put(get_card_list_success(false));
    yield put(load_duyet_card_success(false));         
    
  }
}
export function* loadDuyetWatcher() {  
  while (yield take(GET_CARD_LIST)) {
    yield call(getList);
  }
}


export function* duyet() {
  // const date =(yield select(selectDateDetail()));
  const id = (yield select(selectID()));
  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)  
  
  const response = yield call(callAPiDuyetCard,nn,sessionKey,id);    
  
  try{
     if (response.data.e==0) {
        
          yield put(duyet_card_success());         
          message.success("Duyệt thành công !")
          yield call(getList);
             
    } else {
      message.error(response.data.e);
      yield put(duyet_card_success());         
      
    }
  } catch(error){
    message.error('Lỗi ! Hãy thử lại !');
    yield put(duyet_card_success());         
    
  }
}
export function* DuyetWatcher() {  
  while (yield take(DUYET_CARD)) {
    yield call(duyet);
  }
}

export function* huy() {
  // const date =(yield select(selectDateDetail()));
  const idHuy = (yield select(selectIDHuy()));
  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)  
  
  const response = yield call(callAPiHuyDuyetCard,nn,sessionKey,idHuy);    
  
  try{
     if (response.data.e==0) {
        
          yield put(huy_duyet_card_success());         
          message.success("Hủy thành công !")
          yield call(getList);
          
             
    } else {
      message.error(response.data.e);
      yield put(huy_duyet_card_success());         
      
    }
  } catch(error){
    message.error('Lỗi ! Hãy thử lại !');
    yield put(huy_duyet_card_success());         
    
  }
}
export function* HuyWatcher() {  
  while (yield take(HUY_DUYET_CARD)) {
    yield call(huy);
  }
}

export function* getNCC() {
  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)  
  
  const response = yield call(callAPiGetListNCCThe,nn,sessionKey);    
  
  try{
     if (response.data.e==0) {
        if(response.data.nameProvider){
          yield put(get_list_ncc_card_success(response.data.nameProvider));        

        }
           
    } else {
      message.error(response.data.e);
      yield put(get_list_ncc_card_success(false));         
      
    }
  } catch(error){
    message.error('Lỗi ! Hãy thử lại !');
    yield put(get_list_ncc_card_success(false));         
    
  }
}
export function* getWatcher() {  
  while (yield take(GET_LIST_NCC_CARD)) {
    yield call(getNCC);
  }
}


export function* changeNCC() {
  // const date =(yield select(selectDateDetail()));
  const pc = (yield select(selectPc()));
  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)  
  
  const response = yield call(callAPiChangeNCCThe,nn,sessionKey,pc);    
  
  try{
     if (response.data.e==0) {
        
          yield put(change_ncc_card_success());         
          message.success("Thay đổi thành công !")
          yield call(getNCC);
          
             
    } else {
      message.error(response.data.e);
      yield put(change_ncc_card_success());         
      
    }
  } catch(error){
    message.error('Lỗi ! Hãy thử lại !');
    yield put(change_ncc_card_success());         
    
  }
}
export function* changeWatcher() {  
  while (yield take(CHANGE_NCC_CARD)) {
    yield call(changeNCC);
  }
}
export function* defaultSaga() {
  const loadWatcher = yield fork(loadDuyetWatcher);
  const duyetWatcher = yield fork(DuyetWatcher);
  const huyWatcher = yield fork(HuyWatcher);
  const getNCCWatcher = yield fork(getWatcher);
  const changeNCCWatcher = yield fork(changeWatcher);
  if(yield take(LOCATION_CHANGE)){    
    yield cancel(loadWatcher);
    yield cancel(duyetWatcher);
    yield cancel(huyWatcher);
    yield cancel(getNCCWatcher);
    yield cancel(changeNCCWatcher);
  }
}

// All sagas to be loaded
export default [
  defaultSaga,
];
