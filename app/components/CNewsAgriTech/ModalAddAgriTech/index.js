import React from 'react';
import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import styles from './styles';
import {Button,Modal} from 'antd'
import CKEditor from "react-ckeditor-component";
import Tags from '../../Utils/Tags';
const Button_ = styled.button`
  height: 35px;
  width: 240px;
  font-size: 15px;
  color: #FFFFFF;
  background: #0091ea;
  border : 1px solid #78909c;
  &:focus {
    border : 1px solid #01579b;
    box-shadow: 0 0 0 2px rgba(16, 142, 233, 0.2);
    outline: 0;
  },
`;

class ModalAddAgriTech extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listTags: [],
      stateContent: "",
    }
  } 
  addTags=()=>{
    if(this.refs.tagsAdd.value && this.refs.tagsAdd.value.trim()!==""){
      var temp = this.state.listTags;
      temp.push(this.refs.tagsAdd.value.trim())
      this.setState({listTags: temp})
      this.refs.tagsAdd.value="";
    }
  }
  removeTags=(idx)=>{
    this.setState({
      listTags: this.state.listTags.filter((item,index)=>{
        if(index!==idx){return item;}
      })
    })
  }
  imageHandler=(e2)=>{
    var store = document.getElementById('imgAddNewsMK');
    store.src = e2.target.result;
    var dataInBase64 = e2.target.result.toString();
  }
  loadImage(e){
    var filename = e.target.files[0];
    var fr = new FileReader();
    fr.onload = this.imageHandler;
    fr.readAsDataURL(filename);
  }
  onChangeContent=(e)=>{
    var content = e.editor.getData();
    this.setState({stateContent: content})
  }

  eventAddNews=()=>{
    if(this.refs.titleAdd.value===null || this.refs.titleAdd.value.trim()===""){
      message.error(" Không được bỏ trống tiêu đề.");
    }else if(this.state.stateContent===null || this.state.stateContent.trim()===""){
      message.error(" Nội dung tin tức không được để trống.");
    }else{
      let author = null;
      if(this.refs.authorAdd.value!=null && this.refs.authorAdd.value.trim()!==""){
        author = this.refs.authorAdd.value.trim();
      }
      if(this.refs.imageForNewsMK.src && this.refs.imageForNewsMK.src.toString().indexOf("data\:image")>-1 && this.refs.imageForNewsMK.src.toString().indexOf(";base64")>-1){
        this.props.addNewsAgriTech(this.props.idsubcate?this.props.idsubcate:this.props.params.id_sub_cate,this.refs.titleAdd.value.trim(),
          author,this.refs.imageForNewsAgriTech.src.toString(),
          this.state.listTags,this.refs.selectCateIdAdd.value,this.state.stateContent)

      }else{
        message.error("Chưa chọn ảnh.");
      }
      
    }
  }
  resetNews=()=>{
    this.refs.titleAdd.value = "";
    this.refs.authorAdd.value = "";
    this.setState({listTags: [],});
    this.refs.imageNewsAdd.value="";
    var store = document.getElementById('imgAddNewsMK');
    store.src = require('containers/App/maxresdefault.jpg');
    this.setState({stateContent: "",});
  }
  componentWillReceiveProps(nextProps){
    if(this.props.errorCode!==nextProps.errorCode && !this.props.errorCode){
      this.resetNews();
      this.props.handleCloseModalAdd();
    }
  }
  render() {
    let content = null;
    let dropDownCate = null;
    let tagsShow = null;
    if(this.props.listSubCate && (this.props.listSubCate.size>0 || this.props.listSubCate.length>0)){
      dropDownCate = this.props.listSubCate.map((item, index) => {
        return (<option value={item.id}  key={index}>{item.name}</option>)    
      })
    }
    if(this.state.listTags && (this.state.listTags.size>0 || this.state.listTags.length>0)){
      tagsShow = this.state.listTags.map((item,index)=>{
        return <Tags content={item} key={index} index={index} removeTags={this.removeTags}/>
      });
    }
    content = (
      <div style={{}}>
        <div style={{marginBottom:10}}>
          <div style={styles.label}>Tiêu đề</div>
          <div><input ref="titleAdd" type="text" placeholder="Nhập title" style={styles.inputStyle}/></div>
        </div>
        <div style={{marginBottom:10}}>
          <div style={styles.label}>Tác giả: </div>
          <div><input ref="authorAdd" type="text"placeholder="Nhập tác giả" style={styles.inputStyle}/></div>
        </div>
        <div style={{marginBottom:10}}>
          <div style={styles.label}>Danh mục tin tức: </div>
          <div>
            <select ref="selectCateIdAdd" style={styles.inputStyle}>
              {dropDownCate}
            </select>
          </div>
        </div>
        <div style={{marginBottom:10}}>
          <div style={styles.label}>Tags: </div>
          <div style={{padding :"5px 0px"}}>
            {tagsShow}
            <div style={{}}>
              <input ref="tagsAdd" type="text" placeholder="Nhập tags mới ..." style={styles.inputTagsStyle}/>
              <Button type="primary" onClick={this.addTags} ghost>Thêm</Button>
            </div>
          </div>
        </div>
        <div style={{marginBottom:10}}>
          <div style={styles.label}>Hình ảnh: </div> 
          <div>
            <div style={{width:240,height:200,margin:"auto",marginBottom:20,position: 'relative'}}>
              <img src={require('containers/App/maxresdefault.jpg')} id="imgAddNewsAgriTech" ref="imageForNewsAgriTech" width='100%' height='100%' style={{border: "1px solid #1A237E"}}/>
              <input type="file" ref="imageNewsAdd" onChange={(e)=>this.loadImage(e)} style={styles.changeImage} accept="image/*"/>
            </div>
          </div>
        </div>
        <div style={{marginBottom:10}}>
          <div style={styles.label}>Nội dung: </div>
          <div>
            <CKEditor 
              activeClass="p10" 
              content={this.state.stateContent}
              events={{
                "afterPaste": this.afterPaste,
                "change": this.onChangeContent
              }}
            />
          </div>
        </div>
        <div style={{borderTop: "1px dashed #616161",padding: "5px 0px"}}>
          <Button type="primary" style={{marginRight: 10}} onClick={this.eventAddNews}>Submit</Button>
          <Button type="danger" onClick={this.resetNews}>Reset</Button>
        </div>
      </div>
    )
    let modal = (
      <Modal
          title="Thêm tin tức"
          visible={this.props.modalAddNews}
          onCancel={this.props.handleCloseModalAdd}
          footer={null}
        >
          {content}
        </Modal>
    )
    return (
      <div>
        {modal}
      </div>
    );
  }
}

ModalAddAgriTech.propTypes = {

};

export default ModalAddAgriTech;
