import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import { ADD_MESSAGE,SET_BET_SUM, GET_MESSAGE, EDIT_MESSAGE, DEL_MESSAGE } from "./constants";
import { selectMgs,selectBet,selectType, selectTypeGet, selectMgsEdit, selectIDEdit, selectIDDel } from "./selectors";
import { callAPiAddMssTX,callAPiSetSumTX, callAPiGetMssTX } from "../../utils/request";
import { add_message_success,set_bet_sum_success, get_message, get_message_success } from "./actions";
import {
  message,
       } from 'antd';
import request from 'superagent';

// const CLOUDINARY_UPLOAD_URL = `http://private.vnbaivip.com/updateMsgTX`;
const CLOUDINARY_UPLOAD_URL = `http://private.vnbai.com/updateMsgTX`;
export function* addMessage() {
  
  const mgs =(yield select(selectMgs()));
  const type =(yield select(selectType()));
  
  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)

  // console.log("mgs-saga",mgs)
  
  request
    .post(CLOUDINARY_UPLOAD_URL)
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .send({ msg:mgs,
      n: nn,
      at: sessionKey,
      t : "a",
      type:type })
    .end(function(err, res){
      if(JSON.parse(res.text).e==0){
        message.success("Thêm thành công !")
        
      }else{
        message.error('Lỗi ! Hãy thử lại !');
      }
  });  
  yield call(getMessage);
                   
  // const response = yield call(callAPiAddMssTX,nn,sessionKey,mgs,type);
  // console.log("response-mgs",response)
  
  // try{
  //    if (response.data.e==0) {
  
  //     yield put(add_message_success());
  //     message.success("Cập nhật thành công !")
               
  //   } else {
  //     message.error(response.data.e);
  //   }
  // } catch(error){
  //   message.error('Lỗi ! Hãy thử lại !');
  // }
  
}
export function* addMgsWatcher() {
  
  while (yield take(ADD_MESSAGE)) {
    yield call(addMessage);
  }
}
export function* setBetSum() {
  
  const bet =(yield select(selectBet()));
  
  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)
  
  const response = yield call(callAPiSetSumTX,nn,sessionKey,bet);
  try{
     if (response.data.e==0) {
  
      yield put(set_bet_sum_success());
      message.success("Cập nhật thành công !")
               
    } else {
      message.error(response.data.e);
    }
  } catch(error){
    message.error('Lỗi ! Hãy thử lại !');
  }
  
}
export function* setSumWatcher() {
  
  while (yield take(SET_BET_SUM)) {
    yield call(setBetSum);
  }
}

export function* getMessage() {
  
  const t =(yield select(selectTypeGet()));
  
  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)
  
  const response = yield call(callAPiGetMssTX,nn,sessionKey,t);
  try{
     if (response.data.e==0) {
       if(response.data.data){
        yield put(get_message_success(response.data.data));

       }else{
        yield put(get_message_success(false));
         
       }
    } else {
      message.error("Lỗi !");
      yield put(get_message_success(false));
      
    }
  } catch(error){
    message.error('Lỗi ! Hãy thử lại !');
    yield put(get_message_success(false));
    
  }
  
}
export function* getMgsWatcher() {
  
  while (yield take(GET_MESSAGE)) {
    yield call(getMessage);
  }
}
export function* editMessage() {
  
  const mgs =(yield select(selectMgsEdit()));
  const id =(yield select(selectIDEdit()));
  
  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)

  // console.log("mgs-saga",mgs)
  
  request
    .post(CLOUDINARY_UPLOAD_URL)
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .send({
      n: nn,
      at: sessionKey,
      t : "u",
      msg : mgs ,
      id : id})
    .end(function(err, res){
      if(JSON.parse(res.text).e==0){
        message.success("Sửa thành công !");
      }else{
        message.error('Lỗi ! Hãy thử lại !');
      }
  });  
  yield call(getMessage);
  
}
export function* editMgsWatcher() {
  
  while (yield take(EDIT_MESSAGE)) {
    yield call(editMessage);
  }
}

export function* delMessage() {
  
  const id =(yield select(selectIDDel()));
  
  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)

  // console.log("mgs-saga",mgs)
  // console.log("id",id)

  request
    .post(CLOUDINARY_UPLOAD_URL)
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .send({ 
      n: nn,
      at: sessionKey,
      t : "d",
      id : id})
    .end(function(err, res){
      if(JSON.parse(res.text).e==0){
        message.success("Xóa thành công !");
      }else{
        message.error('Lỗi ! Hãy thử lại !');
        
      }
  });  
  yield call(getMessage);
  
}
export function* delMgsWatcher() {
  
  while (yield take(DEL_MESSAGE)) {
    yield call(delMessage);
  }
}
export function* defaultSaga() {
  const addMgs = yield fork(addMgsWatcher);
  const setSum = yield fork(setSumWatcher);
  const editMgs = yield fork(editMgsWatcher);
  const delMgs = yield fork(delMgsWatcher);
  const getMgs = yield fork(getMgsWatcher);
  
  if(yield take(LOCATION_CHANGE)){
    yield cancel(addMgs);
    yield cancel(setSum);
    yield cancel(editMgs);
    yield cancel(delMgs);
    yield cancel(getMgs);
    
  }
}

// All sagas to be loaded
export default [
  defaultSaga,
];

