import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import { 
  SET_ADMIN,
  GET_ADMIN,
  GET_HIS_ADMIN,
  GET_HIS_GAME,
  GET_ADMIN_BY_PHONE,
  SUGGEST_USER_BY_NN,
  EDIT_PHONE,
  EDIT_EMAIL,
  EDIT_ACTIVE,
  EDIT_LOCK,
  EDIT_TOTAL,
  EDIT_CMT,
  EDIT_ROLE,
  EDIT_KET,
  SEARCH_BY_TIME,
  RESET_PASS,
 } from './constants';
 import {
  setAdminSuccess,
  getAdminSuccess,
  getHisAdminSuccess,
  getHisGameSuccess,
  get_admin_by_phone_succe,
  suggest_user_by_nickname_success,
  edit_phone_success,
  edit_email_success,
  edit_cmt_success,
  edit_role_success,
  edit_ket_success,
  edit_total_success,
  edit_lock_success,
  edit_active_success,
  search_by_time_success,
  reset_pass_success,
       } from './actions';
import {
  message,
       } from 'antd';
//import {callAPILogin,callAPIResetPassStep1} from 'utils/request';
import {
  selectUser,
  selectRole,
  selectSDT,
  selectCMT,
  selectM,
  selectA,
  selectEM,
  selectSM,
  selectSt,
  selectEt,
  selectUnGame,
  selectLock,
  selectP,
  selectKey,

  selectPhone,
  selectCMTND,
  selectEmail,
  selectTotal,
  selectKet,
  selectActive,
  selectLockEdit,
  selectRoleEdit,
  selectNotePhone,
  selectNoteEmail,
  selectNoteCMT,
  selectNoteRole,
  selectNoteKet,
  selectNoteTotal,
  selectNoteLock,
  selectNoteActive,
  selectStart,
  selectEnd,
  selectNick,
  selectUserName,

      } from './selectors';
import {  
  callAPISetAdmin,
  callAPIGetAdmin,
  callAPIGetHisAdmin,
  callAPIGetHisGame,
} from 'utils/request';
import { callAPiSearchUserBySDT, callAPiSuggestUserByNN, callAPISetPhone, callAPISetEmail, callAPISetCMT, callAPISetRole, callAPISetKet, callAPISetTotal, callAPISetLock, callAPISetActive, callAPIGetHisAdminByTime, callAPiResetPass } from '../../utils/request';

export function* setAdmin() {
  const un =(yield select(selectUser()));
  const r =(yield select(selectRole()));
  const sdt = (yield select(selectSDT()));
  const m =(yield select(selectM()));
  const cmt =(yield select(selectCMT()));
  const a =(yield select(selectA()));
  const em =(yield select(selectEM()));
  const sm =(yield select(selectSM()));
  const l =(yield select(selectLock()));

  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)
  
  const response = yield call(callAPISetAdmin,nn,sessionKey,un,r,sdt,cmt,m,a,em,sm,l);
  
  try{
     if (response.data.e==0) {
        if(response.data.uInfo){
          yield put(setAdminSuccess(response.data.uInfo));
          yield call(getHisAdmin);
          message.success("Sửa thành công !");
        }       
    } 
    if(response.data.e==1){
      message.error("Lỗi hệ thống !");
      yield put(setAdminSuccess(false));
    }
    if(response.data.e==35){
      message.error("Không thể set admin !");
      yield put(setAdminSuccess(false));
      
    }
  } catch(error){
    message.error('Lỗi !');
    yield put(setAdminSuccess(false));
    
  }
  
}
export function* setAdminWatcher() {
  
  while (yield take(SET_ADMIN)) {
    yield call(setAdmin);
  }
}

export function* getAdmin() {
  const un =(yield select(selectUser()));
  const unn =(yield select(selectUserName()));
  const p =(yield select(selectP()));
  
  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)
  
  const response = yield call(callAPIGetAdmin,nn,sessionKey,un,p,unn);
  
  try{
     if (response.data.e==0) {
        if(response.data.uInfo){
          yield put(getAdminSuccess(response.data.uInfo));
        }       
    } 
    if(response.data.e==1){
      message.error("Lỗi hệ thống !");
      yield put(getAdminSuccess(false));
      
    }
    if(response.data.e==36){
      message.error("Không tồn tại nickname !");
      yield put(getAdminSuccess(false));
      
    }
    if(response.data.e==4){
      message.error("Không tồn tại username !");
      yield put(getAdminSuccess(false));
      
    }
  } catch(error){
    message.error('Lỗi ! Hãy thử lại !');
    yield put(getAdminSuccess(false));
    
  }
  
}
export function* getInfoWatcher() {
  
  while (yield take(GET_ADMIN)) {
    yield call(getAdmin);
  }
}


export function* getHisAdmin() {

  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)
  
  const response = yield call(callAPIGetHisAdmin,nn,sessionKey);
  
  try{
     if (response.data.e==0) {
        if(response.data.data){
          yield put(getHisAdminSuccess(response.data.data));
        }       
    } 
    if(response.data.e==1){
      message.error("Lỗi hệ thống !");
      yield put(getHisAdminSuccess(false));
      
    }
   
  } catch(error){
    message.error('Lỗi ! Hãy thử lại !');
    yield put(getHisAdminSuccess(false));
    
  }
  
}
export function* getHisWatcher() {
  
  while (yield take(GET_HIS_ADMIN)) {
    yield call(getHisAdmin);
  }
}

export function* getByPhone() {
  const p =(yield select(selectP()));

  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)
  
  const response = yield call(callAPiSearchUserBySDT,nn,sessionKey,p);
  
  try{
     if (response.data.e==0) {
        if(response.data.data){
          yield put(get_admin_by_phone_succe(response.data.data));
        }       
    } 
    if(response.data.e==1){
      message.error("Lỗi hệ thống !");
      yield put(get_admin_by_phone_succe(false));
      
    }
    if(response.data.e==36){
      message.error("Không tồn tại nickname !");
      yield put(get_admin_by_phone_succe(false));
      
    }
  } catch(error){
    message.error('Lỗi ! Hãy thử lại !');
    yield put(get_admin_by_phone_succe(false));
    
  }
  
}
export function* getByPWatcher() {
  
  while (yield take(GET_ADMIN_BY_PHONE)) {
    yield call(getByPhone);
  }
}

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

export function* editPhone() {
  const phone =(yield select(selectPhone()));
  const note =(yield select(selectNotePhone()));
  const un =(yield select(selectUser()));

  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)
  
  const response = yield call(callAPISetPhone,nn,sessionKey,un,phone,note);
  
  try{
     if (response.data.e==0) {
        
          yield put(edit_phone_success());
          yield call(getAdmin);
          yield call(getHisAdmin);
          message.success('Sửa thành công !');
             
    }else{
      message.error('Có lỗi xảy ra ! Hãy thử lại !');
     
    } 
    
  } catch(error){
    message.error('Lỗi ! Hãy thử lại !');
   
    
  }
  
}
export function* phoneWatcher() {
  
  while (yield take(EDIT_PHONE)) {
    yield call(editPhone);
  }
}
export function* editEmail() {
  const phone =(yield select(selectEmail()));
  const note =(yield select(selectNoteEmail()));
  const un =(yield select(selectUser()));

  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)
  
  const response = yield call(callAPISetEmail,nn,sessionKey,un,phone,note);
  
  try{
     if (response.data.e==0) {
        
          yield put(edit_email_success());
          yield call(getAdmin);
          yield call(getHisAdmin);
          message.success('Sửa thành công !');
            
    }else{
      message.error('Có lỗi xảy ra ! Hãy thử lại !');
     
    } 
    
  } catch(error){
    message.error('Lỗi ! Hãy thử lại !');
   
    
  }
  
}
export function* emailWatcher() {
  
  while (yield take(EDIT_EMAIL)) {
    yield call(editEmail);
  }
}

export function* editCMT() {
  const phone =(yield select(selectCMTND()));
  const note =(yield select(selectNoteCMT()));
  const un =(yield select(selectUser()));

  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)
  
  const response = yield call(callAPISetCMT,nn,sessionKey,un,phone,note);
  
  try{
     if (response.data.e==0) {
        
          yield put(edit_cmt_success());
          yield call(getAdmin);
          yield call(getHisAdmin);
          message.success('Sửa thành công !');
            
    }else{
      message.error('Có lỗi xảy ra ! Hãy thử lại !');
     
    } 
    
  } catch(error){
    message.error('Lỗi ! Hãy thử lại !');
   
    
  }
  
}

export function* editActive() {
  const phone =(yield select(selectActive()));
  const note =(yield select(selectNoteActive()));
  const un =(yield select(selectUser()));

  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)
  
  const response = yield call(callAPISetActive,nn,sessionKey,un,phone,note);
  
  try{
     if (response.data.e==0) {
        
          yield put(edit_active_success());
          yield call(getAdmin);
          yield call(getHisAdmin);
          message.success('Sửa thành công !');
             
    }else{
      message.error('Có lỗi xảy ra ! Hãy thử lại !');
     
    } 
    
  } catch(error){
    message.error('Lỗi ! Hãy thử lại !');
   
    
  }
  
}
export function* activeWatcher() {
  
  while (yield take(EDIT_ACTIVE)) {
    yield call(editActive);
  }
}

export function* editLock() {
  const phone =(yield select(selectLockEdit()));
  const note =(yield select(selectNoteLock()));
  const un =(yield select(selectUser()));
  const st =(yield select(selectSt()));
  const et =(yield select(selectEt()));

  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)
  
  
  const response = yield call(callAPISetLock,nn,sessionKey,un,phone,note,st,et);
  
  try{
     if (response.data.e==0) {
        
          yield put(edit_lock_success());
          yield call(getAdmin);
          yield call(getHisAdmin);
          message.success('Sửa thành công !');
               
    }else{
      message.error('Có lỗi xảy ra ! Hãy thử lại !');
     
    } 
    
  } catch(error){
    message.error('Lỗi ! Hãy thử lại !');
   
    
  }
  
}
export function* lockWatcher() {
  
  while (yield take(EDIT_LOCK)) {
    yield call(editLock);
  }
}

export function* editTotal() {
  const phone =(yield select(selectTotal()));
  const note =(yield select(selectNoteTotal()));
  const un =(yield select(selectUser()));

  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)
  
  const response = yield call(callAPISetTotal,nn,sessionKey,un,phone,note);
  
  try{
     if (response.data.e==0) {
        
          yield put(edit_total_success());
          yield call(getAdmin);
          yield call(getHisAdmin);
          message.success('Sửa thành công !');
             
    }else{
      message.error('Có lỗi xảy ra ! Hãy thử lại !');
     
    } 
    
  } catch(error){
    message.error('Lỗi ! Hãy thử lại !');
   
    
  }
  
}
export function* totalWatcher() {
  
  while (yield take(EDIT_TOTAL)) {
    yield call(editTotal);
  }
}

export function* editKet() {
  const phone =(yield select(selectKet()));
  const note =(yield select(selectNoteKet()));
  const un =(yield select(selectUser()));

  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)
  
  const response = yield call(callAPISetKet,nn,sessionKey,un,phone,note);
  
  try{
     if (response.data.e==0) {
        
          yield put(edit_ket_success());
          yield call(getAdmin);
          yield call(getHisAdmin);
          message.success('Sửa thành công !');
            
    }else{
      message.error('Có lỗi xảy ra ! Hãy thử lại !');
     
    } 
    
  } catch(error){
    message.error('Lỗi ! Hãy thử lại !');
   
    
  }
  
}
export function* ketWatcher() {
  
  while (yield take(EDIT_KET)) {
    yield call(editKet);
  }
}


export function* cmtWatcher() {
  
  while (yield take(EDIT_CMT)) {
    yield call(editCMT);
  }
}

export function* editRole() {
  const phone =(yield select(selectRoleEdit()));
  const note =(yield select(selectNoteRole()));
  const un =(yield select(selectUser()));

  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)
  
  const response = yield call(callAPISetRole,nn,sessionKey,un,phone,note);
  
  try{
     if (response.data.e==0) {
        
          yield put(edit_role_success());
          yield call(getAdmin);          
          yield call(getHisAdmin);
          message.success('Sửa thành công !');
            
    }else{
      message.error('Có lỗi xảy ra ! Hãy thử lại !');
     
    } 
    
  } catch(error){
    message.error('Lỗi ! Hãy thử lại !');
   
    
  }
  
}
export function* roleWatcher() {
  
  while (yield take(EDIT_ROLE)) {
    yield call(editRole);
  }
}

export function* searchByTime() {
  const start =(yield select(selectStart()));
  const end =(yield select(selectEnd()));
  const nick = (yield select(selectNick()));

  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)
  
  const response = yield call(callAPIGetHisAdminByTime,nn,sessionKey,nick,start,end);
  try{
    if (response.data.e==0) {
      if(response.data.data){
        yield put(search_by_time_success(response.data.data));
      }       
    } 
   else{
        message.error('Có lỗi xảy ra ! Hãy thử lại !');
        yield put(search_by_time_success(false));
    } 
    
  } catch(error){
    message.error('Lỗi ! Hãy thử lại !');
    yield put(search_by_time_success(false));
    
  }
  
}
export function* searchTimeWatcher() {
  
  while (yield take(SEARCH_BY_TIME)) {
    yield call(searchByTime);
  }
}
export function* resetPass() {
  const nick = (yield select(selectUser()));

  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)
  
  const response = yield call(callAPiResetPass,nn,sessionKey,nick);
  try{
    if (response.data.e==0) {
      if(response.data.newpassword){
        yield put(reset_pass_success(response.data.newpassword));
      }       
    }else{
     if(response.data.e==36){
        message.error('Không tồn tại nickname !');
        yield put(reset_pass_success(false));
     }else{
        message.error(response.data.e);
        yield put(reset_pass_success(false));
     }
    
    } 
    
  } catch(error){
    message.error('Lỗi ! Hãy thử lại !');
    yield put(reset_pass_success(false));
    
  }
  
}
export function* resetWatcher() {
  
  while (yield take(RESET_PASS)) {
    yield call(resetPass);
  }
}
export function* defaultSaga() {
  const adminWatcher = yield fork(setAdminWatcher);
  const infoWatcher = yield fork(getInfoWatcher);
  const hisWatcher = yield fork(getHisWatcher);
  const getByP = yield fork(getByPWatcher);
  const suggest = yield fork(suggestWatcher);

  const phone = yield fork(phoneWatcher);
  const email = yield fork(emailWatcher);
  const active = yield fork(activeWatcher);
  const lock_ = yield fork(lockWatcher);
  const total = yield fork(totalWatcher);
  const ket = yield fork(ketWatcher);
  const cmt = yield fork(cmtWatcher);
  const role = yield fork(roleWatcher);

  const searchTime = yield fork(searchTimeWatcher);
  
  const reset = yield fork(resetWatcher);
  
  
  if(yield take(LOCATION_CHANGE)){
    yield cancel(searchTime);
    yield cancel(reset);

    yield cancel(adminWatcher);
    yield cancel(infoWatcher);
    yield cancel(hisWatcher);
    yield cancel(getByP);
    yield cancel(suggest);

    yield cancel(phone);
    yield cancel(email);
    yield cancel(active);
    yield cancel(lock_);
    yield cancel(total);
    yield cancel(ket);
    yield cancel(cmt);
    yield cancel(role);
    
  }
}

// All sagas to be loaded
export default [
  defaultSaga,
];
