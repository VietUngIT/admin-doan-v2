import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import { 
  LOAD_ALL_BANNER,
  ADD_BANNER,
  EDIT_BANNER,
  DEL_BANNER,
 } from './constants';
import {
  load_all_banner_success,
  add_banner_success,
  del_banner_success,
  edit_banner_success,
} from './actions';
import {
  message,
} from 'antd';
import request from 'superagent';

//import {callAPILogin,callAPIResetPassStep1} from 'utils/request';
import {
  selectUrl,
  selectFile,
  selectFileName,
  selectIDEdit,
  selectStatus,  
  selectIDDel,
  selectU,
  selectUEdit,
  selectImg,
      } from './selectors';
import {  
  callAPiLoadAllBanner,
  callAPiAddBanner,
  callAPiUploadImageBanner,
  callAPiEditBanner,
  callAPiDelBanner,
} from 'utils/request';

export function* loadAllBanner() {
  // const date =(yield select(selectDateDetail()));
  // const todate =(yield select(selectToDateDetail()));
  
  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)  

  const response = yield call(callAPiLoadAllBanner,nn,sessionKey);
  try{
     if (response.data.e==0) {
       //yield put(total_DL(response.data.total));
        if(response.data.data){
          yield put(load_all_banner_success(response.data.data));         
          
        }       
    } else {
      message.error(response.data.e);
      yield put(load_all_banner_success(false));
      
    }
  } catch(error){
    //yield put(showNotify(503,'error','error'));
    message.error('Lỗi ! Hãy thử lại !');
    yield put(load_all_banner_success(false));
    
  }
  
}
export function* loadAllWatcher() {  
  while (yield take(LOAD_ALL_BANNER)) {
    yield call(loadAllBanner);
  }
}

export function* addBanner() {
  const file =(yield select(selectFile()));
  const fileName =(yield select(selectFileName()));
  const u =(yield select(selectU()));
  const _img =(yield select(selectImg()));
  
  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)  ;
  // const CLOUDINARY_UPLOAD_URL = `http://private.vnbaivip.com/upload?n=${nn}&at=${sessionKey}`;
  // const CLOUDINARY_ADD_BANNER = `http://private.vnbaivip.com/admbanner?n=${nn}&at=${sessionKey}&t=add`;
  const CLOUDINARY_UPLOAD_URL = `http://private.vnbai.com/upload?n=${nn}&at=${sessionKey}`;
  const CLOUDINARY_ADD_BANNER = `http://private.vnbai.com/admbanner?n=${nn}&at=${sessionKey}&t=add`;
  // console.log("img-",_img)
  var img = "";
  request
        .post(CLOUDINARY_UPLOAD_URL)        
        .field({ file : _img })
        .end(function(err, res){
          if(res){
            if(JSON.parse(res.text).e==0){
              if(JSON.parse(res.text).url && JSON.parse(res.text).url!==""){
                // console.log(res);            
                // console.log("res.text).url",JSON.parse(res.text).url.toString());
                img = JSON.parse(res.text).url.toString();
                request
                .get(CLOUDINARY_ADD_BANNER)        
                .query({ img : img ,url:u})
                .end(function(err, res){
                  if(JSON.parse(res.text).e==0){
                    message.success("Thêm thành công !")     
                    // loadAllBanner();
                  }else{
                    message.error('Thêm banner lỗi ! Hãy thử lại !');
                  }
              });  
              }else{
                img = "";
              }
              
            }else{
              message.error('Lỗi ! Hãy thử lại !');
            }
          }else{
            message.error('Lỗi ! Hãy thử lại !');
            message.error(err);
            
          }
          
      });  
      // console.log("img-res",img)
      // if(img !==""){
      //   const response = yield call(callAPiAddBanner,nn,sessionKey,img,u);
      //   try{
      //     if (response.data.e==0) {
      //       message.success("Thêm thành công !")      
      //       yield call(loadAllBanner);
      //     }else{
      //       message.error("Thêm thất bại !Thử lại sau !")  
      //     }
      //   }catch(error){
      //     message.error("Có lỗi !Thử lại sau !")      
      
      //   }
      // }else{
      //   message.error("Có lỗi trong quá trình upload ảnh ! Thử lại !")      
        
      // }
  // var img ="";
  // if(_img && _img!==""){
  //   img = _img;
  // }else{
  //   img ="http://private.vnbaivip.com/image?image=" +fileName;
  //   // img ="http://private.vnbai.com/image?image=" +fileName;
  // }
  
  // // console.log("img",img)
  // const response = yield call(callAPiAddBanner,nn,sessionKey,img,u);
  // try{
  //   if (response.data.e==0) {
  //     message.success("Thêm thành công !")      
  //     yield call(loadAllBanner);
  //   }else{
  //     message.error("Thêm thất bại !Thử lại sau !")  
  //   }
  // }catch(error){
  //   message.error("Có lỗi !Thử lại sau !")      

  // }

  
}
export function* addBannerWatcher() {  
  while (yield take(ADD_BANNER)) {
    yield call(addBanner);
  }
}

export function* editBanner() {
  const id_edit =(yield select(selectIDEdit()));
  const status =(yield select(selectStatus()));
  const u_edit =(yield select(selectUEdit()));
  
  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)  

  const response = yield call(callAPiEditBanner,nn,sessionKey,id_edit,status,u_edit);
  try{
     if (response.data.e==0) {       
      yield put(edit_banner_success());         
      message.success("Sửa thành công !") 
      yield call(loadAllBanner)  
    } else {
      message.error(response.data.e);
      
    }
  } catch(error){
    message.error('Lỗi ! Hãy thử lại !');
  }
  
}
export function* editBannerWatcher() {  
  while (yield take(EDIT_BANNER)) {
    yield call(editBanner);
  }
}

export function* delBanner() {
  const id_del =(yield select(selectIDDel()));
  
  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)  

  const response = yield call(callAPiDelBanner,nn,sessionKey,id_del);
  try{
     if (response.data.e==0) {
       
      yield put(del_banner_success(id_del));   
      message.success("Xóa thành công !")      
              
    } else {
      message.error(response.data.e);
      
    }
  } catch(error){
    message.error('Lỗi ! Hãy thử lại !');
  }
}
export function* delBannerWatcher() {  
  while (yield take(DEL_BANNER)) {
    yield call(delBanner);
  }
}
export function* defaultSaga() {
  const loadWatcher = yield fork(loadAllWatcher);
  const addWatcher = yield fork(addBannerWatcher);
  const editWatcher = yield fork(editBannerWatcher);
  const delWatcher = yield fork(delBannerWatcher);
  
  if(yield take(LOCATION_CHANGE)){    
    yield cancel(loadWatcher);
    yield cancel(addWatcher);
    yield cancel(editWatcher);
    yield cancel(delWatcher);   
    
  }
}

// All sagas to be loaded
export default [
  defaultSaga,
];
