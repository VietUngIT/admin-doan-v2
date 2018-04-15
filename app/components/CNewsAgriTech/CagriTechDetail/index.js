import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import styles from './styles';
import CKEditor from "react-ckeditor-component";
import Tags from '../../Utils/Tags'
import {Button,Modal} from 'antd'
import ModalAddAgriTech from 'components/CNewsAgriTech/ModalAddAgriTech'

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

class CagriTechDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listTags: [],
      modalDel: false,        
      modalEdit: false,
      modalAddNews: false,
    }
  }
  
  componentWillMount(){
    if(this.props.data[0]){
      let temp = JSON.parse(this.props.data[0].tags);
      this.setState({
        listTags: temp,
      })
    }
  }

  onChangeTitle=(e)=>{
    this.props.changeTitleNews(e.target.value)
  }
  onChangeAuthor=(e)=>{
    this.props.changeAuthorNews(e.target.value)
  }
  onChangeIdCate=(e)=>{
    this.props.changeIdSubCateNews(e.target.value)
  }
  onChangeContent=(e)=>{
    var content = e.editor.getData();
    this.props.changeContentNews(content)
  }
  addTags=()=>{
    if(this.refs.tags.value && this.refs.tags.value.trim()!==""){
      var temp = this.state.listTags;
      temp.push(this.refs.tags.value.trim())
      this.setState({listTags: temp})
      this.refs.tags.value="";
    }
  }
  removeTags=(idx)=>{
    this.setState({
      listTags: this.state.listTags.filter((item,index)=>{
        if(index!==idx){return item;}
      })
    })
  }
  saveEditTags=()=>{
    this.props.edittagsNews(this.props.data[0].id,this.state.listTags)
  }
  imageHandler=(e2)=>{
    var store = document.getElementById('imgNewsMK');
    store.src = e2.target.result;
    var dataInBase64 = e2.target.result.toString();
    this.props.changeImageNews(dataInBase64);
  }
  loadImage(e){
    var filename = e.target.files[0];
    var fr = new FileReader();
    fr.onload = this.imageHandler;
    fr.readAsDataURL(filename);
  }
  changeImageHandle(){
    if(this.props.imageEdit && this.props.imageEdit.toString().indexOf("data\:image")>-1 && this.props.imageEdit.toString().indexOf(";base64")>-1){
      this.props.editImageNews(this.props.data[0].id);
    }else{
      message.error("Chưa chọn ảnh.");
    }
  }
  deleteNews=()=>{
    this.setState({modalDel: true,});
  }
  handleModalDelOk=()=>{
    this.props.deleteNews(this.props.data[0].id)
    this.setState({modalDel: false,});
  }
  handleModalDelCancel=()=>{
    this.setState({modalDel: false,});
  }
  submitEditNewsClick=()=>{
    this.setState({modalEdit: true,});
  }
  handleModalEditOk=()=>{
    this.props.submitEditNews(this.props.data[0].id,this.props.data[0].idSubCate)
    this.setState({modalEdit: false,});
  }
  handleModalEditCancel=()=>{
    this.setState({modalEdit: false,});
  }
  addNewsHandle=()=>{
    this.handleShowModalAdd();
  }
  handleShowModalAdd=()=>{
    this.setState({modalAddNews: true,});
  }
  handleCloseModalAdd=()=>{
    this.setState({modalAddNews: false,});
  }

  render() {
    let title = "";
    let author = "";
    let content = ""
    let dropDowncat = null;
    let image = null;
    let tagsShow = null;
    let modalAdd = null;

    if(this.props.data!==null){
      image = this.props.data[0].image;
      if(this.props.listSubCate && (this.props.listSubCate.size >0 || this.props.listSubCate.length>0)){
        dropDowncat = this.props.listSubCate.map((item, index) => {
          if(item.id===this.props.data[0].idSubCate){
            return (<option value={item.id} selected='selected' key={index}>{item.nameSubCate}</option>)
          }else{
            return (<option value={item.id}  key={index}>{item.nameSubCate}</option>)
          }     
        })
        modalAdd = (
          <ModalAddAgriTech modalAddNews={this.state.modalAddNews} handleCloseModalAdd={this.handleCloseModalAdd}
            listSubCate={this.props.listSubCate} errorCode={this.props.errorCode} idsubcate={this.props.data[0].idSubCate}
            addNewsAgriTech={this.props.addNewsAgriTech}/>
        )
      }
    }else{
      image = require('containers/App/maxresdefault.jpg');
    }

    if(this.props.infoEditNews!==null){
      title = this.props.infoEditNews.get("title");
      author = this.props.infoEditNews.get("author")===null?"":this.props.infoEditNews.get("author");
      content = this.props.infoEditNews.get("content");
    }
    if(this.state.listTags.size>0 || this.state.listTags.length>0){
      tagsShow = this.state.listTags.map((item,index)=>{
        return <Tags content={item} key={index} index={index} removeTags={this.removeTags}/>
      });
    }
    let modalDelNews = (
      <Modal
          title="Xóa tin tức"
          visible={this.state.modalDel}
          onOk={this.handleModalDelOk}
          onCancel={this.handleModalDelCancel}
          okText="Đồng ý"
          cancelText="Hủy"
        >
          <p>Bạn muốn xóa tin tức này?.</p>
          <h3>{title}</h3>
        </Modal>
    )
    let modalEditNews = (
      <Modal
          title="Sửa tin tức"
          visible={this.state.modalEdit}
          onOk={this.handleModalEditOk}
          onCancel={this.handleModalEditCancel}
          okText="Đồng ý"
          cancelText="Hủy"
        >
          <p>Bạn muốn sửa tin tức này?.</p>
          <h3>{title}</h3>
        </Modal>
    )
    return (
      <div style={{paddingTop: 26, }}>
        {modalDelNews}
        {modalEditNews}
        {modalAdd}
        <div style={{marginBottom:10,height: '36px',background: '#c5e5fb',padding: "5px",width:"100%",}}>
          <Button type="primary" style={{marginRight: 10}} onClick={this.addNewsHandle}>Thêm tin mới</Button>
          <Button type="danger" onClick={this.deleteNews}>Xóa tin hiện tại</Button>
        </div>
        <div style={{marginBottom:10}}>
          <div style={styles.label}>Tiêu đề</div>
          <div><input ref="title" type="text" onChange={(e)=>this.onChangeTitle(e)} value={title} style={styles.inputStyle}/></div>
        </div>
        <div style={{marginBottom:10}}>
          <div style={styles.label}>Tác giả: </div>
          <div><input ref="author" onChange={(e)=>this.onChangeAuthor(e)} type="text" value={author} style={styles.inputStyle}/></div>
        </div>
        <div style={{marginBottom:10}}>
          <div style={styles.label}>Danh mục tin tức: </div>
          <div>
            <select onChange={(e)=>this.onChangeIdCate(e)} id="selectDomain" style={styles.inputStyle}>
              {dropDowncat}
            </select>
          </div>
        </div>
        <div style={{marginBottom:10}}>
          <div style={styles.label}>Tags: </div>
          <div style={{padding :5}}>
            {tagsShow}
            <div style={{}}>
              <input ref="tags" type="text" placeholder="Nhập tags mới ..." style={styles.inputTagsStyle}/>
              <Button type="primary" onClick={this.addTags} ghost>Thêm</Button>
            </div>
            <div>
              <Button type="primary" onClick={this.saveEditTags}>Lưu</Button>
            </div>
          </div>
        </div>
        <div style={{marginBottom:10}}>
          <div style={styles.label}>Hình ảnh: </div>
          <div>
            <div style={{width:240,height:200,margin:"auto",marginBottom:20,position: 'relative'}}>
              <img src={image?image:require('containers/App/maxresdefault.jpg')} id="imgNewsMK" width='100%' height='100%' style={{border: "1px solid #1A237E"}}/>
              <input type="file" id="imageMK" onChange={(e)=>this.loadImage(e)} style={styles.changeImage} accept="image/*"/>
            </div>
            <div style={{height: 35,width: 240,margin:"auto"}}>
              <Button_ onClick={()=>this.changeImageHandle()}>Đổi ảnh</Button_>
            </div>
          </div>
        </div>
        <div style={{marginBottom:10}}>
          <div style={styles.label}>Nội dung: </div>
          <div>
            <CKEditor 
              activeClass="p10" 
              content={content} 
              events={{
                "afterPaste": this.afterPaste,
                "change": this.onChangeContent
              }}
            />
          </div>
        </div>
        <div style={{borderTop: "1px dashed #616161",padding: "5px 0px"}}>
          <Button type="primary" style={{marginRight: 10}} onClick={this.submitEditNewsClick}>Submit</Button>
        </div>
      </div>
    );
  }
}

CagriTechDetail.propTypes = {

};

export default CagriTechDetail;
