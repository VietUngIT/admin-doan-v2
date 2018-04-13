/**
*
* AddBanner
*
*/

import React from 'react';
// import styled from 'styled-components';
import { Checkbox,Icon,Tooltip,message,Card,Button } from 'antd';
import Dropzone from 'react-dropzone';
import request from 'superagent';
let sessionKey = localStorage.getItem('sessionkey');
let userInfo = localStorage.getItem('userInfo');
let length = localStorage.getItem('userInfo').length;
let nn = userInfo.substr(1,length-2)  
import axios from 'axios';
var $ = require ('jquery')

// const CLOUDINARY_UPLOAD_PRESET = 'your_upload_preset_id';
// const CLOUDINARY_UPLOAD_URL = `http://private.vnbaivip.com/upload?n=${nn}&at=${sessionKey}`;
// const CLOUDINARY_UPLOAD_URL = `http://private.vnbai.com/upload?n=${nn}&at=${sessionKey}`;

class AddBanner extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      uploadedFileCloudinaryUrl: '',
      uploadedFile : "",
      url_ : "",
    };
  }
  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0],

    });
    this.setState({
      uploadedFileCloudinaryUrl: files[0].url,
      
    });
    this.handleImageUpload(files[0]);
  }
  handleImageUpload(file) {
    var _this = this;
    var formData = new FormData();
      formData.append('filename',  file, file.name);
      
      // $.ajax({
      //   type: "POST",
      //   dataType: 'jsonp',
      //   url: CLOUDINARY_UPLOAD_URL,
      //   file:file,
      //   crossDomain : true,
      //   xhrFields: {
      //       withCredentials: true
      //   }
      // })
      //   .done(function( data ) {
      //       console.log("data",data);
      //   })
      //   .fail( function(xhr, textStatus, errorThrown) {
      //       alert(xhr.responseText);
      //       alert(textStatus);
      //   });

      // request
      //   .post(CLOUDINARY_UPLOAD_URL)        
      //   .field({ file : file })
      //   .end(function(err, res){
      //     if(JSON.parse(res.text).e==0){
      //     if(JSON.parse(res.text).url && JSON.parse(res.text).url!==""){
      //       console.log(JSON.parse(res.text).url.toString())
            
      //       _this.props._img(JSON.parse(res.text).url.toString())
      //     }
            
      //     }else{
      //       message.error('Lỗi ! Hãy thử lại !');
      //     }
      // });  
      
      // this.props.changeImage(file,file.name,false);
      
    let fr = new FileReader();
    fr.onload = this.imageHandler;
    // console.log("file",file)
    _this.props._img(file)
    
    this.props.changeImage(file,file.name,false);
    fr.readAsDataURL(file);
   
  }
  imageHandler=(e2)=>{
    // console.log("changeimage : \n",e2.target.result)
    var store = document.getElementById('imgLocation');
    store.src = e2.target.result;
  }
  getBase64 = (file) => {
    return new Promise((resolve,reject) => {
       let reader = new FileReader();
       reader.onload = () => resolve(reader.result);
       reader.onerror = error => reject(error);
       reader.readAsDataURL(file);
    });
  }
  loadImage(e){
    // let file = e.target.files[0];
    // this.getBase64(file).then(base64 => {
    //   this.props.changeImage(base64,file.name,false);
    // });
    let file = e.target.files[0];
    let fr = new FileReader();
    fr.onload = this.imageHandler;
    this.props.changeImage(file,file.name,false);
    fr.readAsDataURL(file);
  }
  reset=()=>{
    this.refs.input_url.value = "";
    this.setState({
      uploadedFileCloudinaryUrl : "",
      uploadedFile : "",
    })
  }
  addBanner=(event)=>{
    event.preventDefault();

    if(this.props.file.size==0 && this.props.fileName==""){
      message.error("(*) Trường image không được để trống !")
      return;
    }else{
      this.props.add_banner(this.refs.input_url.value.trim());
      this.reset();
    }
    this.props.cancel();
  }
  onChangeUrl=(e)=>{
    this.setState({url_:e.target.value.trim()});
  }
  render() {
    var imgLoc = false;
    var content = false;

    if(this.props.url){
      imgLoc = this.props.url;
    }else{
      imgLoc = require('imageS/add_image1600.png');
    }
    // content = (
    //   <div style={{width: '95%', minWidth: '60px', padding: '20px'}}>
    //     <center>
    //       <div style={{display:'inline-block', marginRight: '15px'}}>
    //         <div style={{height:'250px',width:'250px',position:'relative'}}>
    //           <img  height={250} width={250} style={{border: '1px solid #dfdddd',height:'100%',width:'100%'}} id="imgLocation"
    //             src={imgLoc} />
    //           <input type="file" id="img" onChange={(e)=>this.loadImage(e)} />
    //         </div>
    //       </div>
    //     </center>
    //   </div>
    // );    
    content=(
          <form onSubmit={this.addBanner.bind(this)} encType="multipart/form-data">
            <img  height={250} width={250} style={{border: '1px solid #dfdddd',height:'100%',width:'100%'}} id="imgLocation"
                src={imgLoc} />
            <input type="file" onChange={(e)=>this.loadImage(e)} />
            <input type="submit" value="Upload" />
           
          </form>
    )
    var contentButton = (
      <center style={{marginTop:20}}>
        <Tooltip title='Save'>
          <Button
            icon = "save"
            type = "primary"
            style={{height:35,width:100}}
            onClick={this.addBanner}
          >Thêm
          </Button>
        </Tooltip>
        <Tooltip title='Reset'>
          <Button
            icon = "close"
            style={{height:35,width:100,marginLeft:20}}
            onClick={this.reset}
          >Reset
          </Button>
        </Tooltip>
      </center>  
    )
    var content1=(
      
        <center>
         
        <Dropzone
          multiple={false}
          accept="image/*"
          style={this.state.uploadedFileCloudinaryUrl !== '' ?{height:350,border:'1px dashed rgba(0, 0, 0, 0.43)',borderRadius:5}:""}
          onDrop={this.onImageDrop.bind(this)}>
           {this.state.uploadedFileCloudinaryUrl === '' ? 
           <div>
            <p style={{marginTop:10}}>Chọn ảnh</p>
            
          </div> :
          <div>
            <p style={{marginTop:10}}>{this.state.uploadedFile.name}</p>
            <img src={this.state.uploadedFileCloudinaryUrl} id="imgLocation" style={{border: '1px solid #dfdddd',height:300,width:200}}/>
          </div>}
        </Dropzone>
        <textarea ref="input_url" 
          placeholder="Nhập link" rows="3" 
          value={this.state.url_}
          style={{border: '1px solid #e2e2e2',width:'100%',borderRadius:5,padding:10,marginTop:10}}
          onChange={this.onChangeUrl}
        />
      </center>
     
     
    )
    return (
      <div>        
          {content1}
          {contentButton}
          {/* {content}
          {contentButton} */}
       
      </div>
    );
  }
}

AddBanner.propTypes = {

};

export default AddBanner;
