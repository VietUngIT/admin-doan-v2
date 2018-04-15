import axios from 'axios';

const API_BASE_URL = 'http://localhost:8083/';

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response; 
    }else{
      message.error("Không thể gọi api !" + response.status) 
    }
  
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }

export function callAPILoginPhone(phone,password) {
  const url = `${API_BASE_URL}adminuser?ph=${phone}&p=${password}&t=login`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }
  }).then(checkStatus)
    .then((data) => ( {data}))
    .catch((error) => ({ error }));
}
export function callAPIGetUserInfo(phone,password) {
  const url = `${API_BASE_URL}manageruser?ph=${phone}&p=${password}&t=get`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }
  }).then(checkStatus)
    .then((data) => ( {data}))
    .catch((error) => ({ error }));
}
export function callAPIChangeNameUserInfo(phone,password,name) {
  const url = `${API_BASE_URL}manageruser?ph=${phone}&p=${password}&name=${name}&t=cname`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }
  }).then(checkStatus)
    .then((data) => ( {data}))
    .catch((error) => ({ error }));
}
export function callAPIChangePhoneUserInfo(phone,password,newPhone) {
  const url = `${API_BASE_URL}manageruser?ph=${phone}&p=${password}&nph=${newPhone}&t=cphone`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }
  }).then(checkStatus)
    .then((data) => ( {data}))
    .catch((error) => ({ error }));
}

export function callAPIChangeAddressUserInfo(phone,password,address) {
  const url = `${API_BASE_URL}manageruser?ph=${phone}&p=${password}&address=${address}&t=caddress`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }
  }).then(checkStatus)
    .then((data) => ( {data}))
    .catch((error) => ({ error }));
}
export function callAPIChangeAvatarUserInfo(ph,p,avatar) {
  const url = `${API_BASE_URL}upload`;
  var formData = new FormData();
  formData.append("t","cavatar")
  formData.append("ph",ph);
  formData.append("p",p);
  formData.append("avatar",avatar);
  return axios.post(url,formData)
    .then(checkStatus)
    .then((data) => ( {data}))
    .catch((error) => ({ error }));
}

export function callAPIChangePassUserInfo(phone,password,oldPass,newPass) {
  const url = `${API_BASE_URL}manageruser?ph=${phone}&p=${password}&pass=${oldPass}&np=${newPass}&t=cpass`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }
  }).then(checkStatus)
    .then((data) => ( {data}))
    .catch((error) => ({ error }));
}

export function callAPIGetListCategoryNews(phone,password) {
  const url = `${API_BASE_URL}categorynews?ph=${phone}&p=${password}&t=getall`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }
  }).then(checkStatus)
    .then((data) => ( {data}))
    .catch((error) => ({ error }));
}

export function callAPIAddCategoryNews(phone,password,name) {
  const url = `${API_BASE_URL}admincatenews?ph=${phone}&p=${password}&t=add&name=${name}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }
  }).then(checkStatus)
    .then((data) => ( {data}))
    .catch((error) => ({ error }));
}
export function callAPIDelCategoryNews(phone,password,id) {
  const url = `${API_BASE_URL}admincatenews?ph=${phone}&p=${password}&t=del&id=${id}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }
  }).then(checkStatus)
    .then((data) => ( {data}))
    .catch((error) => ({ error }));
}
export function callAPIEditCategoryNews(phone,password,id,name) {
  const url = `${API_BASE_URL}admincatenews?ph=${phone}&p=${password}&t=edit&id=${id}&name=${name}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }
  }).then(checkStatus)
    .then((data) => ( {data}))
    .catch((error) => ({ error }));
}
export function callAPIGetListNewsByCate(phone,password,id,page) {
  const url = `${API_BASE_URL}news?ph=${phone}&p=${password}&t=getbycate&idcate=${id}&ofset=4&page=${page}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }
  }).then(checkStatus)
    .then((data) => ( {data}))
    .catch((error) => ({ error }));
}

export function callAPIEditTagsNews(ph,p,id,tags) {
  const url = `${API_BASE_URL}adminnews`;
  var formData = new FormData();
  formData.append("t","edittags")
  formData.append("ph",ph);
  formData.append("p",p);
  formData.append("id",id);
  formData.append("tags",JSON.stringify(tags));
  return axios.post(url,formData)
    .then(checkStatus)
    .then((data) => ( {data}))
    .catch((error) => ({ error }));
}

export function callAPIEditImageNews(ph,p,id,image) {
  const url = `${API_BASE_URL}adminnews`;
  var formData = new FormData();
  formData.append("t","editimage")
  formData.append("ph",ph);
  formData.append("p",p);
  formData.append("id",id);
  formData.append("image",image);
  return axios.post(url,formData)
    .then(checkStatus)
    .then((data) => ( {data}))
    .catch((error) => ({ error }));
}
export function callAPIDeleteNews(ph,p,id) {
  const url = `${API_BASE_URL}adminnews`;
  var formData = new FormData();
  formData.append("t","del")
  formData.append("ph",ph);
  formData.append("p",p);
  formData.append("id",id);
  return axios.post(url,formData)
    .then(checkStatus)
    .then((data) => ( {data}))
    .catch((error) => ({ error }));
}
export function callAPISubmitEditNews(ph,p,id,title,shortdesc,author,source,idcatenews,content) {
  const url = `${API_BASE_URL}adminnews`;
  var formData = new FormData();
  formData.append("t","edit")
  formData.append("ph",ph);
  formData.append("p",p);
  formData.append("id",id);
  formData.append("title",title);
  formData.append("shortdesc",shortdesc);
  formData.append("author",author);
  formData.append("source",source);
  formData.append("idcatenews",idcatenews);
  formData.append("content",content);
  return axios.post(url,formData)
    .then(checkStatus)
    .then((data) => ( {data}))
    .catch((error) => ({ error }));
}
export function callAPIAddNews(ph,p,title,shortdesc,author,image,source,tags,idcatenews,content) {
  const url = `${API_BASE_URL}adminnews`;
  var formData = new FormData();
  formData.append("t","add")
  formData.append("ph",ph);
  formData.append("p",p);
  formData.append("title",title);
  formData.append("shortdesc",shortdesc);
  formData.append("author",author);
  formData.append("image",image);
  formData.append("source",source);
  if(tags){
    formData.append("tags",JSON.stringify(tags));
  }
  formData.append("idcatenews",idcatenews);
  formData.append("content",content);
  return axios.post(url,formData)
    .then(checkStatus)
    .then((data) => ( {data}))
    .catch((error) => ({ error }));
}

export function callAPIGetListCategoryNewsMK(phone,password) {
  const url = `${API_BASE_URL}catemarketinfo?ph=${phone}&p=${password}&t=getall`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }
  }).then(checkStatus)
    .then((data) => ( {data}))
    .catch((error) => ({ error }));
}
export function callAPIAddCategoryNewsMK(phone,password,name) {
  const url = `${API_BASE_URL}admincatemarketinfo?ph=${phone}&p=${password}&t=add&name=${name}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }
  }).then(checkStatus)
    .then((data) => ( {data}))
    .catch((error) => ({ error }));
}
export function callAPIDelCategoryNewsMK(phone,password,id) {
  const url = `${API_BASE_URL}admincatemarketinfo?ph=${phone}&p=${password}&t=del&id=${id}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }
  }).then(checkStatus)
    .then((data) => ( {data}))
    .catch((error) => ({ error }));
}
export function callAPIEditCategoryNewsMK(phone,password,id,name) {
  const url = `${API_BASE_URL}admincatemarketinfo?ph=${phone}&p=${password}&t=edit&id=${id}&name=${name}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }
  }).then(checkStatus)
    .then((data) => ( {data}))
    .catch((error) => ({ error }));
}
export function callAPIGetListNewsMKByCate(phone,password,id,page) {
  const url = `${API_BASE_URL}marketinfo?ph=${phone}&p=${password}&t=getbycate&idcate=${id}&ofset=4&page=${page}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }
  }).then(checkStatus)
    .then((data) => ( {data}))
    .catch((error) => ({ error }));
}
export function callAPIDeleteNewsMK(ph,p,id) {
  const url = `${API_BASE_URL}adminmarketinfo`;
  var formData = new FormData();
  formData.append("t","del")
  formData.append("ph",ph);
  formData.append("p",p);
  formData.append("id",id);
  return axios.post(url,formData)
    .then(checkStatus)
    .then((data) => ( {data}))
    .catch((error) => ({ error }));
}
export function callAPIEditImageNewsMK(ph,p,id,image) {
  const url = `${API_BASE_URL}adminmarketinfo`;
  var formData = new FormData();
  formData.append("t","editimage")
  formData.append("ph",ph);
  formData.append("p",p);
  formData.append("id",id);
  formData.append("image",image);
  return axios.post(url,formData)
    .then(checkStatus)
    .then((data) => ( {data}))
    .catch((error) => ({ error }));
}
export function callAPIEditTagsNewsMK(ph,p,id,tags) {
  const url = `${API_BASE_URL}adminmarketinfo`;
  var formData = new FormData();
  formData.append("t","edittags")
  formData.append("ph",ph);
  formData.append("p",p);
  formData.append("id",id);
  formData.append("tags",JSON.stringify(tags));
  return axios.post(url,formData)
    .then(checkStatus)
    .then((data) => ( {data}))
    .catch((error) => ({ error }));
}
export function callAPISubmitEditNewsMK(ph,p,id,title,author,source,idcatenews,content) {
  const url = `${API_BASE_URL}adminmarketinfo`;
  var formData = new FormData();
  formData.append("t","edit")
  formData.append("ph",ph);
  formData.append("p",p);
  formData.append("id",id);
  formData.append("title",title);
  formData.append("author",author);
  formData.append("source",source);
  formData.append("idcatenews",idcatenews);
  formData.append("content",content);
  return axios.post(url,formData)
    .then(checkStatus)
    .then((data) => ( {data}))
    .catch((error) => ({ error }));
}
export function callAPIAddNewsMK(ph,p,title,author,image,source,tags,idcatenews,content) {
  const url = `${API_BASE_URL}adminmarketinfo`;
  var formData = new FormData();
  formData.append("t","add")
  formData.append("ph",ph);
  formData.append("p",p);
  formData.append("title",title);
  formData.append("author",author);
  formData.append("image",image);
  formData.append("source",source);
  if(tags){
    formData.append("tags",JSON.stringify(tags));
  }
  formData.append("idcatenews",idcatenews);
  formData.append("content",content);
  return axios.post(url,formData)
    .then(checkStatus)
    .then((data) => ( {data}))
    .catch((error) => ({ error }));
}

export function callAPIGetListCateAgriTech(phone,password) {
  const url = `${API_BASE_URL}cateagritech?ph=${phone}&p=${password}&t=getall`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }
  }).then(checkStatus)
    .then((data) => ( {data}))
    .catch((error) => ({ error }));
}
export function callAPIAddCateAgriTech(phone,password,name) {
  const url = `${API_BASE_URL}admincateagritech?ph=${phone}&p=${password}&t=add&name=${name}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }
  }).then(checkStatus)
    .then((data) => ( {data}))
    .catch((error) => ({ error }));
}
export function callAPIDelCateAgriTech(phone,password,id) {
  const url = `${API_BASE_URL}admincateagritech?ph=${phone}&p=${password}&t=del&id=${id}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }
  }).then(checkStatus)
    .then((data) => ( {data}))
    .catch((error) => ({ error }));
}
export function callAPIEditCateAgriTech(phone,password,id,name) {
  const url = `${API_BASE_URL}admincateagritech?ph=${phone}&p=${password}&t=edit&id=${id}&name=${name}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }
  }).then(checkStatus)
    .then((data) => ( {data}))
    .catch((error) => ({ error }));
}
export function callAPIGetListSubCateAgriTech(phone,password,id) {
  const url = `${API_BASE_URL}catesubagritech?ph=${phone}&p=${password}&t=getbycate&id=${id}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }
  }).then(checkStatus)
    .then((data) => ( {data}))
    .catch((error) => ({ error }));
}
export function callAPIAddSubCateAgriTech(phone,password,id,name) {
  const url = `${API_BASE_URL}admincatesubagritech?ph=${phone}&p=${password}&t=add&idcate=${id}&name=${name}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }
  }).then(checkStatus)
    .then((data) => ( {data}))
    .catch((error) => ({ error }));
}
export function callAPIDelSubCateAgriTech(phone,password,id) {
  const url = `${API_BASE_URL}admincatesubagritech?ph=${phone}&p=${password}&t=del&id=${id}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }
  }).then(checkStatus)
    .then((data) => ( {data}))
    .catch((error) => ({ error }));
}
export function callAPIEditSubCateAgriTech(phone,password,id,name) {
  const url = `${API_BASE_URL}admincatesubagritech?ph=${phone}&p=${password}&t=edit&id=${id}&name=${name}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }
  }).then(checkStatus)
    .then((data) => ( {data}))
    .catch((error) => ({ error }));
}
export function callAPIGetListNewsAgriTech(phone,password,id,page) {
  const url = `${API_BASE_URL}agritech?ph=${phone}&p=${password}&t=getbycate&idcate=${id}&ofset=4&page=${page}`;
  return axios({ url,
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }
  }).then(checkStatus)
    .then((data) => ( {data}))
    .catch((error) => ({ error }));
}
export function callAPIEditTagsNewsAgriTech(ph,p,id,tags) {
  const url = `${API_BASE_URL}adminagritech`;
  var formData = new FormData();
  formData.append("t","edittags")
  formData.append("ph",ph);
  formData.append("p",p);
  formData.append("id",id);
  formData.append("tags",JSON.stringify(tags));
  return axios.post(url,formData)
    .then(checkStatus)
    .then((data) => ( {data}))
    .catch((error) => ({ error }));
}
export function callAPIEditImageNewsAgriTech(ph,p,id,image) {
  const url = `${API_BASE_URL}adminagritech`;
  var formData = new FormData();
  formData.append("t","editimage")
  formData.append("ph",ph);
  formData.append("p",p);
  formData.append("id",id);
  formData.append("image",image);
  return axios.post(url,formData)
    .then(checkStatus)
    .then((data) => ( {data}))
    .catch((error) => ({ error }));
}
export function callAPIDeleteNewsAgriTech(ph,p,id) {
  const url = `${API_BASE_URL}adminagritech`;
  var formData = new FormData();
  formData.append("t","del")
  formData.append("ph",ph);
  formData.append("p",p);
  formData.append("id",id);
  return axios.post(url,formData)
    .then(checkStatus)
    .then((data) => ( {data}))
    .catch((error) => ({ error }));
}
export function callAPISubmitEditNewsAgriTech(ph,p,id,title,author,idsubcate,content) {
  const url = `${API_BASE_URL}adminagritech`;
  var formData = new FormData();
  formData.append("t","edit")
  formData.append("ph",ph);
  formData.append("p",p);
  formData.append("id",id);
  formData.append("title",title);
  formData.append("author",author);
  formData.append("idsubcate",idsubcate);
  formData.append("content",content);
  return axios.post(url,formData)
    .then(checkStatus)
    .then((data) => ( {data}))
    .catch((error) => ({ error }));
}
export function callAPIAddNewsAgriTech(ph,p,title,author,image,tags,idsubcate,content) {
  const url = `${API_BASE_URL}adminagritech`;
  var formData = new FormData();
  formData.append("t","add")
  formData.append("ph",ph);
  formData.append("p",p);
  formData.append("title",title);
  formData.append("author",author);
  formData.append("image",image);
  if(tags){
    formData.append("tags",JSON.stringify(tags));
  }
  formData.append("idsubcate",idsubcate);
  formData.append("content",content);
  return axios.post(url,formData)
    .then(checkStatus)
    .then((data) => ( {data}))
    .catch((error) => ({ error }));
}