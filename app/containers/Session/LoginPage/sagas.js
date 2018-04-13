import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import { LOGIN_EMAIL } from './constants';
import { loginSuccess,
         loginError,
       } from './actions';
import {message,
       } from 'antd';
//import {callAPILogin,callAPIResetPassStep1} from 'utils/request';
import {selectEmail,
        selectPassword,
        selectIsRemember,
        selectOtp,

      } from './selectors';
import {checkSuperAdmin,} from 'containers/App/actions';
import md5 from 'blueimp-md5';
import {callAPILoginEmail} from 'utils/request';
import response from 'containers/Session/user_info_api';
import { callAPiCountTranfer } from '../../../utils/request';


// Individual exports for testing

export function* loginEmail() {
  const email = yield select(selectEmail());
  const password =(yield select(selectPassword()));
  const otp =(yield select(selectOtp()));
  const isRemember =(yield select(selectIsRemember()));
  const response = yield call(callAPILoginEmail,email,password,otp);
  
  try{
    if (response.data.e==0) {

        localStorage.setItem("sessionkey",response.data.at);
        yield put(loginSuccess());
        if(response.data.uInfo.role){
          yield put(checkSuperAdmin(response.data.uInfo.role));
        }else{
          yield put(checkSuperAdmin(false));
          
        }
          localStorage.setItem('role',parseInt(JSON.stringify(response.data.uInfo.role)));
          localStorage.setItem('userInfo',(JSON.stringify(response.data.uInfo.nn)));
          
          switch(response.data.uInfo.role){
            case 3:{
              console.log("3")
              yield put(push("/cculog"));
              
              break;
            }
            case 2:{
              console.log("2")
              
              yield put(push("/cculog"));
              break;
            }
            case 4:{
              console.log("4")
              
              yield put(push("/cculog"));
              break;
            }
            case 5:{
              console.log("5")
              
              yield put(push("/setup-account"));
              break;
            }
            default:{
              break;
            }
          }
          message.info('Xin chào ' + response.data.uInfo.nn);

    } else {
      switch(response.data.e){
        case 28 :{
          message.error('Mã OTP sai !');
          break;
        }
        case 4 :{
          message.error('Không tồn tại nickname !');
          break;
        }
        case 5 :{
          message.error('Email hoặc password sai !');
          break;
        }
        default :{
          message.error(response.data.e);
          break;
        }
      }
    }
  } catch(error){
    //yield put(showNotify(503,'error','error'));
          message.error(response.data.e);
          message.error('Lỗi đăng nhập !');
  }
  
}

export function* loginWatcher() {
  while (yield take(LOGIN_EMAIL)) {
    yield call(loginEmail);
  }
}

export function* loginData() {
  const watcher = yield fork(loginWatcher);
//  const resetPassStep1Watcher = yield fork(resetPassStep1);
  if(yield take(LOCATION_CHANGE)){
    yield cancel(watcher);

  }
//  yield cancel(resetPassStep1Watcher);
}
// All sagas to be loaded
export default [
  loginData,
];
