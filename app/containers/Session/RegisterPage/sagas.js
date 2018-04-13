import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import { REGISTER_EMAIL } from './constants';
import { registerEmailSuccess,

      } from './actions';
//import {callAPILogin,callAPIResetPassStep1} from 'utils/request';
import {selectEmail,
        selectPassword,
        selectLastName,
        selectFirstName,
        selectUserInfo,
      } from './selectors';
import md5 from 'blueimp-md5';
import {message,
       } from 'antd';
import {callAPILoginEmail} from 'utils/request';

// Individual exports for testing

export function* registerEmail() {
  const email = yield select(selectEmail());
  const password = (yield select(selectPassword()));
  const last_name = (yield select(selectLastName()));
  const first_name = (yield select(selectFirstName()));
  const user_info = yield select(selectUserInfo());
  var length = email.length;
  //Bam psasword ra md5
  // try{
  //   const response = yield call(callAPIRegisterEmail,email,password,last_name,first_name);
  //
  //   if (response.data.error.code ==200) {
  //        if (email && password && last_name && first_name){
  //             if(email.indexOf("@")==-1 || email.indexOf("@")==(length-1)){
  //               message.error('Định dạng Email không đúng !');
  //             }else{
  //               if(check){
  //                 message.error('Email đã tồn tại !');
  //               }else{
  //                 yield put(registerEmailSuccess({email:email,password:password,name:first_name +" "+last_name}));
  //                 message.success('Tạo tài khoản thành công! ,Mời đăng nhập !');
  //                 yield put(push("/login"));
  //               }
  //             }
  //
  //       }else{
  //          message.error('Mời nhập đầy đủ thông tin trước khi đăng ký !');
  //       }
  //   }else{
  //       message.error('Lỗi đăng ký !');
  //   }
  // } catch(error){
  //   yield put(showNotify(503,'error','error'));
  // }
  
  var check = false;

  try{
    user_info.map((item,index)=>{
      if(item.email==email){
        check = true;
      }
    });

    if (email && password && last_name && first_name){
      if(email.indexOf("@")==-1 || email.indexOf("@")==(length-1)){
        message.error('Định dạng Email không đúng !');
      }else{
        if(check){
          message.error('Email đã tồn tại !');
        }else{
          yield put(registerEmailSuccess({email:email,password:password,name:first_name +" "+last_name}));
          message.success('Tạo tài khoản thành công! ,Mời đăng nhập !');
          yield put(push("/login"));
        }
      }

    }else{
      message.error('Mời nhập đầy đủ thông tin trước khi đăng ký !');
    }
  }catch(error){
    message.error('Lỗi đăng ký !');

  }
}

export function* signUpWatcher() {
  while (yield take(REGISTER_EMAIL)) {
    yield call(registerEmail);
  }
}

export function* signUpData() {
  const watcher = yield fork(signUpWatcher);
//  const resetPassStep1Watcher = yield fork(resetPassStep1);
  if(yield take(LOCATION_CHANGE)){
    yield cancel(watcher);

  }
//  yield cancel(resetPassStep1Watcher);
}
// All sagas to be loaded
export default [
  signUpData,
];
