import axios from 'axios';
import { browserHistory } from 'react-router';
import { message } from 'antd';

// const API_BASE_URL = 'http://public.vnbai.com/';
// const API_BASE_URL = 'http://171.244.27.229:8099/';
const API_BASE_URL = 'http://private.vnbai.com/';
// const API_BASE_URL = 'http://private.vnbaivip.com/';
// 
// function checkStatus(response) {
//   if (response.status >= 200 && response.status < 300) {
//     return response;
//   }

//   const error = new Error(response.statusText);
//   error.response = response;
//   throw error;
// }
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    
    if (response.data.e == 8) {        
      message.error("Phiên làm việc hết hạn ! Mời đăng nhập lại !")    
      window.localStorage.removeItem('sessionkey');
      window.localStorage.removeItem('userInfo');
      browserHistory.push('/');
    }else{
        
      return response;
      
    }
  }else{
    message.error("Không thể gọi api !" + response.status) 
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}
export function callAPILoginEmail(email,password,otp) {
  const url = `${API_BASE_URL}loginadmin?u=${email}&p=${password}&otp=${otp}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },

  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPISearchCurentCcu(nn,at) {
  const url = `${API_BASE_URL}ccu?n=${nn}&at=${at}&t=n`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },

  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPISearchHistoryCcu(nn,at,d) {
  const url = `${API_BASE_URL}ccu?n=${nn}&at=${at}&t=h&d=${d}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPISearchMoneyHT(nn,at,st,et) {
  const url = `${API_BASE_URL}totalmoney?n=${nn}&at=${at}&t=0&st=${st}&et=${et}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }).then(checkStatus)
    .catch((error) => ({ error }));
}

export function callAPIGetTotalMoney(nn,at,st,et,un) {
  const url = `${API_BASE_URL}moneyIn?n=${nn}&at=${at}&st=${st}&et=${et}&un=${un}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }).then(checkStatus)
    .catch((error) => ({ error }));
}

export function callAPIGetInputMoney(nn,at,st,et,t,un) {
  const url = `${API_BASE_URL}moneyInDetail?n=${nn}&at=${at}&st=${st}&et=${et}&t=${t}&un=${un}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPIGetOuputMoney(nn,at,st,et,un) {
  const url = `${API_BASE_URL}moneyOut?n=${nn}&at=${at}&st=${st}&et=${et}&un=${un}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPIGetDetailOuputMoney(nn,at,st,et,un) {
  const url = `${API_BASE_URL}moneyOutDetail?n=${nn}&at=${at}&st=${st}&et=${et}&un=${un}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPIGetRevenueByUser(nn,at,nick,st,et) {
  const url = `${API_BASE_URL}moneyLogUser?n=${nn}&at=${at}&nn=${nick}&st=${st}&et=${et}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPIGetRevenue(nn,at,st,et) {
  const url = `${API_BASE_URL}revenueGame?n=${nn}&at=${at}&st=${st}&et=${et}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPIGetAllMess(nn,at) {
  const url = `${API_BASE_URL}admsg?n=${nn}&at=${at}&t=getall`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPISendAllMess(nn,at,tt,mgs) {
  const url = `${API_BASE_URL}admsg?n=${nn}&at=${at}&t=sendall&tt=${tt}&msg=${mgs}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPISendSomeMess(nn,at,lu,tt,mgs) {
  const url = `${API_BASE_URL}admsg?n=${nn}&at=${at}&t=sendlist&lu=[${lu}]&tt=${tt}&msg=${mgs}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPIDelMess(nn,at,id) {
  const url = `${API_BASE_URL}admsg?n=${nn}&at=${at}&t=delete&l=[${id}]`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPIGetAllNoti(nn,at) {
  const url = `${API_BASE_URL}notification?n=${nn}&at=${at}&t=getAll`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPIAddNoti(nn,at,b,et) {
  const url = `${API_BASE_URL}notification?n=${nn}&at=${at}&t=add&b=${b}&et=${et}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPIEditNoti(nn,at,id,b) {
  const url = `${API_BASE_URL}notification?n=${nn}&at=${at}&t=update&id=${id}&b=${b}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPIDelNoti(nn,at,id) {
  const url = `${API_BASE_URL}notification?n=${nn}&at=${at}&t=delete&id=[${id}]`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPIDelAllNoti(nn,at) {
  const url = `${API_BASE_URL}notification?n=${nn}&at=${at}&t=clearAll`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPISearchGameById(nn,at,id,gn) {
  const url = `${API_BASE_URL}cardGameInfo?n=${nn}&at=${at}&id=${id}&gn=${gn}&t=info`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPISearchGameByUser(nn,at,un,gn,st,et) {
  const url = `${API_BASE_URL}cardGameInfo?n=${nn}&at=${at}&un=${un}&gn=${gn}&st=${st}&et=${et}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }).then(checkStatus)
    .catch((error) => ({ error }));
}

export function callAPITopWin(nn,at,gn,st,et) {
  const url = `${API_BASE_URL}topgame?n=${nn}&at=${at}&st=${st}&et=${et}&win=1&type=${gn}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPITopLoose(nn,at,gn,st,et) {
  const url = `${API_BASE_URL}topgame?n=${nn}&at=${at}&st=${st}&et=${et}&win=0&type=${gn}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }).then(checkStatus)
    .catch((error) => ({ error }));
}

export function callAPIDetailSlotByID(nn,at,id) {
  const url = `${API_BASE_URL}slotDetail?n=${nn}&at=${at}&id=${id}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPIDetailSlotByNickname(nn,at,st,et,un,gid) {
  const url = `${API_BASE_URL}slotDetail?n=${nn}&at=${at}&st=${st}&et=${et}&un=${un}&gId=${gid}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPIDetailMiniGame(nn,at,un,gn,st,et) {
  const url = `${API_BASE_URL}minigameDetail?n=${nn}&at=${at}&un=${un}&gn=${gn}&st=${st}&et=${et}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}

export function callAPIDetailDuyetDaiLy(nn,at,id) {
  const url = `${API_BASE_URL}admtransfer?n=${nn}&at=${at}&t=info&id=${id}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPILoadDuyetDaiLy(nn,at,page) {
  const url = `${API_BASE_URL}admtransfer?n=${nn}&at=${at}&t=all&page=${page}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPILoadDuyetDaiLyConfirm(nn,at,page) {
  const url = `${API_BASE_URL}admtransfer?n=${nn}&at=${at}&t=confirmed&page=${page}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPILoadDuyetDaiLyNotConfirm(nn,at,page) {
  const url = `${API_BASE_URL}admtransfer?n=${nn}&at=${at}&t=notconfirmed&page=${page}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}

export function callAPILoadDuyetDaiLyCancel(nn,at,page) {
  const url = `${API_BASE_URL}admtransfer?n=${nn}&at=${at}&t=reported&page=${page}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPIDuyetDaiLy(nn,at,id) {
  const url = `${API_BASE_URL}admtransfer?n=${nn}&at=${at}&t=confirm&id=${id}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPIHuyDaiLy(nn,at,id) {
  const url = `${API_BASE_URL}admtransfer?n=${nn}&at=${at}&t=report&id=${id}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPILoadManager(nn,at) {
  const url = `${API_BASE_URL}admdaily?n=${nn}&at=${at}&t=manager`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPILoadDaiLy(nn,at,page) {
  const url = `${API_BASE_URL}admdaily?n=${nn}&at=${at}&t=get&page=${page}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPIAddDaiLy(nn,at,na,p,a,f,nick) {
  const url = `${API_BASE_URL}admdaily?n=${nn}&at=${at}&t=add&na=${na}&p=${p}&a=${a}&f=${f}&nn=${nick} `;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPIDelDaiLy(nn,at,nick) {
  const url = `${API_BASE_URL}admdaily?n=${nn}&at=${at}&t=delete&nn=${nick}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPIUpdateDaiLy(nn,at,na,p,a,f,nick,ma) {
  const url = `${API_BASE_URL}admdaily?n=${nn}&at=${at}&t=edit&na=${na}&p=${p}&a=${a}&f=${f}&nn=${nick}&ma=${ma} `;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPISetPhone(nn,at,un,p,r) {
  const url = `${API_BASE_URL}setAdmin?n=${nn}&at=${at}&nn=${un}&type=mobile&p=${p}&r=${r}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPISetCMT(nn,at,un,p,r) {
  const url = `${API_BASE_URL}setAdmin?n=${nn}&at=${at}&nn=${un}&type=cmtnd&cmtnd=${p}&r=${r}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPISetEmail(nn,at,un,p,r) {
  const url = `${API_BASE_URL}setAdmin?n=${nn}&at=${at}&nn=${un}&type=email&e=${p}&r=${r}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPISetTotal(nn,at,un,p,r) {
  const url = `${API_BASE_URL}setAdmin?n=${nn}&at=${at}&nn=${un}&type=totalmoney&tm=${p}&r=${r}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPISetKet(nn,at,un,p,r) {
  const url = `${API_BASE_URL}setAdmin?n=${nn}&at=${at}&nn=${un}&type=lockmoney&lm=${p}&r=${r}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPISetLock(nn,at,un,p,r,st,et) {
  const url = `${API_BASE_URL}setAdmin?n=${nn}&at=${at}&nn=${un}&type=lock&l=${p}&r=${r}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPISetActive(nn,at,un,p,r) {
  const url = `${API_BASE_URL}setAdmin?n=${nn}&at=${at}&nn=${un}&type=active&a=${p}&r=${r}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPISetRole(nn,at,un,p,r) {
  const url = `${API_BASE_URL}setAdmin?n=${nn}&at=${at}&nn=${un}&type=role&ro=${p}&r=${r}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPISetAdmin(nn,at,un,r,sdt,cmt,m,a,em,sm,l) {
  const url = `${API_BASE_URL}setAdmin?n=${nn}&at=${at}&un=${un}&r=${r}&sdt=${sdt}&cmt=${cmt}&m=${m}&a=${a}&em=${em}&sm=${sm}&l=${l}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPIGetAdmin(nn,at,un,p,unn) {
  const url = `${API_BASE_URL}getInfoAdmin?n=${nn}&at=${at}&un=${un}&p=${p}&unn=${unn}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    //timeout: 10,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPIGetHisAdmin(nn,at) {
  const url = `${API_BASE_URL}adminHistory?n=${nn}&at=${at}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPIGetHisAdminByTime(nn,at,nick,st,et) {
  const url = `${API_BASE_URL}adminHistory?n=${nn}&at=${at}&nn=${nick}&start=${st}&end=${et}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPIGetHisGame(nn,at,gn,un,st,et) {
  const url = `${API_BASE_URL}userMoneyHistory?n=${nn}&at=${at}&st=${st}&et=${et}&gn=${gn}&un=${un}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPiGetMaxCashout(nn,at) {
  const url = `${API_BASE_URL}maxCashOut?n=${nn}&at=${at}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPiSetMaxCashout(nn,at,m,mt) {
  const url = `${API_BASE_URL}maxCashOut?n=${nn}&at=${at}&m=${m}&mt=${mt}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPiAddBot(nn,at,bu,bn,m) {
  const url = `${API_BASE_URL}Bot?n=${nn}&at=${at}&t=a&bu=${bu}&bn=${bn}&m=${m}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPiAddBotMoney(nn,at,bn,m) {
  const url = `${API_BASE_URL}Bot?n=${nn}&at=${at}&t=am&m=${m}&bn=${bn}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPiMiniId(nn,at,gn,tid) {
  const url = `${API_BASE_URL}minigameDetail?n=${nn}&at=${at}&gn=${gn}&id=${tid}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPiGetEven(nn,at) {
  const url = `${API_BASE_URL}even?n=${nn}&at=${at}&t=g`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPiGetAddEven(nn,at,gid,un,b) {
  const url = `${API_BASE_URL}even?n=${nn}&at=${at}&t=a&gid=${gid}&un=${un}&b=${b}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPiDelEven(nn,at,id) {
  const url = `${API_BASE_URL}even?n=${nn}&at=${at}&t=d&id=${id}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPiActiveEven(nn,at,t) {
  const url = `${API_BASE_URL}even?n=${nn}&at=${at}&t=${t}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}

export function callAPiSetEvenValue(nn,at,gId,b,v) {
  const url = `${API_BASE_URL}potValue?n=${nn}&at=${at}&t=s&gId=${gId}&b=${b}&v=${v}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPiSetFundValue(nn,at,gId,b,v) {
  const url = `${API_BASE_URL}potValue?n=${nn}&at=${at}&t=sf&gId=${gId}&b=${b}&v=${v}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPiGetEvenValue(nn,at) {
  const url = `${API_BASE_URL}potValue?n=${nn}&at=${at}&t=g`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}

export function callAPilLoadGittCode(nn,at) {
  const url = `${API_BASE_URL}list_giftcode?n=${nn}&at=${at}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPilSearchGittCode(nn,at,un) {
  const url = `${API_BASE_URL}list_giftcode?n=${nn}&at=${at}&un=${un}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPilDelGittCode(nn,at,dl) {
  const url = `${API_BASE_URL}list_giftcode?n=${nn}&at=${at}&dl=[${dl}]`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPilCountGittGTT(nn,at) {
  const url = `${API_BASE_URL}statistic_giftcode?n=${nn}&at=${at}&t=GTT`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPilCountGittGCD(nn,at) {
  const url = `${API_BASE_URL}statistic_giftcode?n=${nn}&at=${at}&t=GCD`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPilCountGittGHV(nn,at) {
  const url = `${API_BASE_URL}statistic_giftcode?n=${nn}&at=${at}&t=KHV`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPiGenGittCode(nn,at,t,a,st,et,c,v) {
  const url = `${API_BASE_URL}gen_giftcode?n=${nn}&at=${at}&t=${t}&a=${a}&st=${st}&et=${et}&c=${c}&v=${v}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPiSearchGitt(nn,at,date,c,t,ad,v,n) {
  const url = `${API_BASE_URL}list_giftcode?n=${nn}&at=${at}&ad=${ad}&v=${v}&st=${date}&c=${c}&t=${t}&un=${n}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPiSearchCodeGitt(nn,at,code) {
  const url = `${API_BASE_URL}searchgiftcode?n=${nn}&at=${at}&code=${code}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPiLuckyrolation(nn,at,st,et) {
  const url = `${API_BASE_URL}LuckyRotation?n=${nn}&at=${at}&st=${st}&et=${et}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPigetListTyleLuckyrolation(nn,at) {
  const url = `${API_BASE_URL}LuckyRotation?n=${nn}&at=${at}&t=g`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPiUpdateLucky(nn,at,id,v) {
  const url = `${API_BASE_URL}LuckyRotation?n=${nn}&at=${at}&t=a&id=${id}&v=${v}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}

export function callAPiLoadAllBanner(nn,at) {
  const url = `${API_BASE_URL}admbanner?n=${nn}&at=${at}&t=all`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}

export function callAPiAddBanner(nn,at,img,u) {
  const url = `${API_BASE_URL}admbanner?n=${nn}&at=${at}&t=add&img=${img}&url=${u}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}

export function callAPiUploadImageBanner(nn,at,file) {
  const url = `${API_BASE_URL}upload?n=${nn}&at=${at}`;
  return axios({
    url,
    method: 'POST',
   
    
    data:{
      file: file,
    }
    
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPiEditBanner(nn,at,id,status,u) {
  const url = `${API_BASE_URL}admbanner?n=${nn}&at=${at}&t=edit&id=${id}&st=${status}&url=${u}`;
  return axios({ 
    url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPiDelBanner(nn,at,id) {
  const url = `${API_BASE_URL}admbanner?n=${nn}&at=${at}&t=delete&id=${id}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}


export function callAPiSetSumTX(nn,at,betSum) {
  const url = `${API_BASE_URL}updateBetSumTX?n=${nn}&at=${at}&betSum=${betSum}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}

export function callAPiGetMssTX(nn,at,t) {
  const url = `${API_BASE_URL}chattx?n=${nn}&at=${at}&t=${t}`;
  
  return axios({ url,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPiAddMssTX(nn,at,msg,type) {
  const url = `${API_BASE_URL}updateMsgTX`;
  let data = JSON.stringify({
    n :nn,
      at : at,
      msg : msg,
      type : type
});
  return axios({ url,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPiSearchUserBySDT(nn,at,sdt) {
  const url = `${API_BASE_URL}searchuser?n=${nn}&at=${at}&p=${sdt}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}

export function callAPiSuggestUserByNN(nn,at,n) {
  const url = `${API_BASE_URL}searchuser?n=${nn}&at=${at}&nn=${n}&page=1`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}

export function callAPiCountHDH(nn,at,t,st,et,page) {
  const url = `${API_BASE_URL}nru?n=${nn}&at=${at}&t=${t}&st=${st}&en=${et}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPiCountDAUNow(nn,at,page) {
  const url = `${API_BASE_URL}dau?n=${nn}&at=${at}&page=${page}&t=realtime`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPiCountDAU(nn,at,st,et,page) {
  const url = `${API_BASE_URL}dau?n=${nn}&at=${at}&st=${st}&en=${et}&page=${page}&t=history`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPiCheckSeri(nn,at,s) {
  const url = `${API_BASE_URL}searchcard?n=${nn}&at=${at}&s=${s}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPiCheckCard(nn,at,c) {
  const url = `${API_BASE_URL}searchcard?n=${nn}&at=${at}&c=${c}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}

export function callAPiGetListCard(nn,at,t) {
  const url = `${API_BASE_URL}admtopup?n=${nn}&at=${at}&t=${t}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPiDuyetCard(nn,at,id) {
  const url = `${API_BASE_URL}admtopup?n=${nn}&at=${at}&t=confirm&id=${id}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPiHuyDuyetCard(nn,at,id) {
  const url = `${API_BASE_URL}admtopup?n=${nn}&at=${at}&t=report&id=${id}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPiGetTopMoney(nn,at,st,et) {
  const url = `${API_BASE_URL}topgame?n=${nn}&at=${at}&st=${st}&et=${et}&win=1&type=49`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPiGetAccountOnline(nn,at) {
  const url = `${API_BASE_URL}useronline?n=${nn}&at=${at}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPiGetAccountOnlineByNick(nn,at,gid) {
  const url = `${API_BASE_URL}useronline?n=${nn}&at=${at}&gn=${gid}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPiGetIp(nn,at) {
  const url = `${API_BASE_URL}iplock?n=${nn}&at=${at}&t=get`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPiAddIp(nn,at,ip,r) {
  const url = `${API_BASE_URL}iplock?n=${nn}&at=${at}&t=add&ip=${ip}&r=${r}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPiDelIp(nn,at,ip) {
  const url = `${API_BASE_URL}iplock?n=${nn}&at=${at}&t=delete&ip=${ip}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPiCheckIp(nn,at,nick) {
  const url = `${API_BASE_URL}iplock?n=${nn}&at=${at}&t=check&nick=${nick}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPiCountIp(nn,at,ip) {
  const url = `${API_BASE_URL}iplock?n=${nn}&at=${at}&t=count&ip=${ip}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPiGetSMSActive(nn,at,time) {
  const url = `${API_BASE_URL}smsactive?n=${nn}&at=${at}&time=${time}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPiGetEventGame(nn,at) {
  const url = `${API_BASE_URL}event?n=${nn}&at=${at}&t=get`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPiAddEventGame(nn,at,gn,ne,st,en,count) {
  const url = `${API_BASE_URL}event?n=${nn}&at=${at}&t=add&gn=${gn}&ne=${ne}&st=${st}&en=${en}&count=${count}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPiEditEventGame(nn,at,id,ne,st,en,status) {
  const url = `${API_BASE_URL}event?n=${nn}&at=${at}&t=edit&id=${id}&ne=${ne}&st=${st}&en=${en}&status=${status}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPiDelEventGame(nn,at,id) {
  const url = `${API_BASE_URL}event?n=${nn}&at=${at}&t=delete&id=${id}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
//------------------------------------------------------
export function callAPiGetPrizeGame(nn,at,ide) {
  const url = `${API_BASE_URL}prize?n=${nn}&at=${at}&t=get&idE=${ide}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPiAddPrizeGame(nn,at,ide,top,prize) {
  const url = `${API_BASE_URL}prize?n=${nn}&at=${at}&t=add&idE=${ide}&top=${top}&prize=${prize}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPiEditPrizeGame(nn,at,id,prize) {
  const url = `${API_BASE_URL}prize?n=${nn}&at=${at}&t=edit&id=${id}&prize=${prize}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPiDelPrizeGame(nn,at,id) {
  const url = `${API_BASE_URL}prize?n=${nn}&at=${at}&t=delete&id=${id}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPiResetPass(nn,at,nick) {
  const url = `${API_BASE_URL}resetpassword?n=${nn}&at=${at}&nn=${nick}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPiCountTranfer(nn,at) {
  const url = `${API_BASE_URL}consider?n=${nn}&at=${at}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPiBackUp(nn,at) {
  const url = `${API_BASE_URL}backupfile?n=${nn}&at=${at}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPiLoadListXHu(nn,at) {
  const url = `${API_BASE_URL}eventxhu?n=${nn}&at=${at}&t=if`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPiAddXHu(nn,at,ne,gn,day,hu100,hu1000,hu10000,x100,x1000,x10000,active) {
  const url = `${API_BASE_URL}eventxhu?n=${nn}&at=${at}&ne=${ne}&gn=${gn}&day=${day}&hu100=${hu100}&hu1000=${hu1000}&hu10000=${hu10000}&x100=${x100}&x1000=${x1000}&x10000=${x10000}&active=${active}&t=u`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPiDelXHu(nn,at,id) {
  const url = `${API_BASE_URL}eventxhu?n=${nn}&at=${at}&id=${id}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPiMoneyInHDH(nn,at,st,et) {
  const url = `${API_BASE_URL}moneyIn?n=${nn}&at=${at}&st=${st}&en=${et}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPiGetListNCCThe(nn,at) {
  const url = `${API_BASE_URL}admtopup?n=${nn}&at=${at}&t=gp`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}
export function callAPiChangeNCCThe(nn,at,pc) {
  const url = `${API_BASE_URL}admtopup?n=${nn}&at=${at}&t=provider&pc=${pc}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
 
  }).then(checkStatus)
    .catch((error) => ({ error }));
}