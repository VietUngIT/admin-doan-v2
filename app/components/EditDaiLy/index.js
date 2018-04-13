/**
*
* EditDaiLy
*
*/

import React from 'react';
// import styled from 'styled-components';
import {
  Tabs,
  Input,
  Button,
  message,
  Pagination ,
  Dropdown,
  Menu,
  Modal,
  Icon,
} from 'antd';
var phone1 = "";
var phone2 = "";
var phone_ = "";
class EditDaiLy extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {    
      isMobile: false,   
      del : false,
      
      manager_ : "",

      name : this.props.row.name,
      phone :false,
      phone1 :"",
      phone2 :"",
      fb :this.props.row.facebook,
      address :this.props.row.address,

      changed:false,
      isCancel:false,

      selected_manager : false,
    };
  }
  componentDidMount=()=>{
    this.props.load_manager();
  }
  componentWillReceiveProps=(nextProps)=>{
    if(this.props.isCancel !== nextProps.isCancel){
      // if(nextProps.isCancel){
        // console.log("nextProps.isCancel",nextProps.isCancel)
        this.setState({name : nextProps.row.name})
        if(nextProps.row.phone){
          if(nextProps.row.phone.split("/").length > 1){
            this.setState({phone1 :nextProps.row.phone.split("/")[0]})
            this.setState({phone2 :nextProps.row.phone.split("/")[1]?nextProps.row.phone.split("/")[1]:" "})
            phone1 = nextProps.row.phone.split("/")[0];
            phone2 = nextProps.row.phone.split("/")[1];
            
          }else{
            phone1 = nextProps.row.phone;
            phone2 = "";
            this.setState({phone1 : nextProps.row.phone})
            this.setState({phone2 : ""})
          }
        }
        this.setState({fb :nextProps.row.facebook})
        this.setState({address :nextProps.row.address})
        if(nextProps.row.manager!==""){
          if(nextProps.manager && nextProps.manager.length>0){
            nextProps.manager.map((r,index)=>{  
              if(nextProps.row.manager == r.nickname){
                this.setState({manager_:r.nickname})
              }
            })
      
          }
        }else{
          this.setState({manager_:1})
        }
       

      // }
    }

  }
  componentWillMount=()=>{
    if(this.props.row.phone){
      if(this.props.row.phone.split("/").length > 1){
        this.setState({phone1 : this.props.row.phone.split("/")[0]})
        this.setState({phone2 : this.props.row.phone.split("/")[1]})
        phone1 = this.props.row.phone.split("/")[0];
        phone2 = this.props.row.phone.split("/")[1];
        
      }else{
        phone1 = this.props.row.phone;
        phone2 = "";
        this.setState({phone1 : this.props.row.phone})
        this.setState({phone2 : ""})
      }
    }
    if(this.props.row.manager!==""){
      if(this.props.manager && this.props.manager.length>0){
        this.props.manager.map((r,index)=>{  
          if(this.props.row.manager == r.nickname){
            this.setState({manager_:r.nickname})
          }
        })
  
      }
    }else{
      this.setState({manager_:1})
      
    }
    
  }
  showConfirm=()=>{
    this.setState({
      del: true,
    });
  }
  ok=()=>{
    this.props.del_DL(this.props.row.nickname);
    this.cancel();
  }
  cancel=()=>{
    this.setState({
      del: false,
    });
  }
  onChangeName=(e)=>{
    // if(e.target.value !==""){
      this.setState({name : e.target.value})
      this.props.onChangeName(this.props.row.nickname)        
    // }else{
    //   message.error("Không được để trống tên!")
    // }
    
      
  }
  onChangePhone1=(e)=>{
    // if(e.target.value !==""){
      this.setState({phone1 : e.target.value})
      this.props.onChangePhone(this.props.row.nickname)     
    // }else{
    //  // message.error("Không được để trống sđt !")
    // }
    
       
  }
  onChangePhone2=(e)=>{
    // if(e.target.value !==""){
      this.setState({phone2 : e.target.value})
      this.props.onChangePhone(this.props.row.nickname)
    // }else{
    //   //message.error("Không được để trống sđt !")
    // }
    
       
  }
  onChangePhone=()=>{
    
    if(this.refs.phone1.value.trim()!=="" && this.refs.phone2.value.trim()!==""){
      phone_ = this.refs.phone1.value.trim()+"/"+this.refs.phone2.value.trim();
    }

    if(this.refs.phone1.value.trim()!=="" && this.refs.phone2.value.trim()==""){
      phone_ = this.refs.phone1.value.trim();
    }

    if(this.refs.phone1.value.trim()=="" && this.refs.phone2.value.trim()!==""){
      phone_ = this.refs.phone2.value.trim();
      
    }
    
    if(this.refs.phone1.value.trim()=="" && this.refs.phone2.value.trim()==""){
      message.error("Nhập ít nhất 1 sđt !")
    }
       
  }
  onChangeFB=(e)=>{
    // if(e.target.value !==""){
      this.setState({fb : e.target.value})
      this.props.onChangeFB(this.props.row.nickname)      
    // }else{
    //   message.warning("Không nên để trống fb !")
    // }    
  }
  onChangeAddress=(e)=>{
    // if(e.target.value !==""){
      this.setState({address : e.target.value})   
      this.props.onChangeAddress(this.props.row.nickname)       
    // }else{
    //   message.warning("Không nên để trống địa chỉ!")
    // }    
  }
  onClick=(id)=>{   
    this.onChangePhone();
    var nm = false;
    if(!this.state.manager_) 
    {
      nm = this.props.row.manager;
    }else{
      if(this.state.manager_ == 1){
        nm = "";
      }else{
        nm = this.state.manager_ ;
      }
    }
    
    if(this.refs.name.value.trim() !=="" & phone_ !=="" ){
      this.props.update(
        this.refs.name.value.trim(),
        phone_,
        this.refs.address.value.trim(),
        this.refs.fb.value.trim(),
        this.props.row.nickname,
        nm
      )
      this.props.cancelEdit();
    }else{
      message.error("Không được để trống !")
    }
    
  }
  onChangeManager=(e)=>{
    this.setState({manager_ : e.target.value})
    
  }
  render() {
   var item = false;
   if(this.props.manager && this.props.manager.length > 0){
     item = this.props.manager.map((r,index)=>{      

       if(r.nickname !== this.props.row.nickname){
      
          return(          
            <option 
              key={r.nickname} 
              value={r.nickname} 
              // selected={this.props.row.manager===r.nickname?"selected":""}
              style={{background:''}}
            >
              {r.name} - {r.nickname} 
            </option>
           
          )
       
       }
       
     })
   }
    var manager = (
      <select id="role" onChange={(e)=>this.onChangeManager(e)} value={this.state.manager_}                 
        style={{height:'35px',border:'1px solid #e2e2e2',width:'100%',borderRadius:'5px',background:'white'}}>
        <option value={1} >Không ai quản lý (cấp 1)</option>
        {item}                     
                          
      </select>
    )
    return (
     
      <table style={{width:'100%'}}>
         
        <tbody>
          <tr key={1}>
            <th style={{height:50,fontSize:13,textAlign:'left',padding:5}}>
              Tên
            </th>
            <td style={{height:50,fontSize:13,textAlign:'left',padding:5}}>
            {/* {this.props.row.name} */}
              <textarea rows="2"
                style={{textAlign:'left',padding:5,width:'100%',border:'1px solid #e2e2e2' ,borderRadius : 3}} 
                value={this.state.name} ref="name"  onChange={this.onChangeName}/>
            </td>
          </tr>
          <tr key={2}>
            <th style={{height:50,fontSize:13,textAlign:'left',padding:5}}>
              Nickname
            </th>
            <td style={{height:50,fontSize:13,textAlign:'left',padding:5}}>            
              {this.props.row.nickname}
            </td>
          </tr>  
          <tr>
            <th style={{height:50,fontSize:13,textAlign:'left',padding:5}}>
              Người quản lý
            </th>
            <td style={{height:50,fontSize:13,textAlign:'left',padding:5}}>            
              {manager}
            </td>
          </tr>  
          <tr key={3}>
            <th style={{height:50,fontSize:13,textAlign:'left',padding:5}}>
              SĐT thứ 1
            </th>
            <td style={{height:50,fontSize:13,textAlign:'left',padding:5}}>
              <textarea  
                style={{textAlign:'left',padding:5,width:'100%',height:35,border:'1px solid #e2e2e2' ,borderRadius : 3}}
                value={this.state.phone1} ref="phone1"  onChange={this.onChangePhone1}/>
            </td>
          </tr>  
          <tr >
            <th style={{height:50,fontSize:13,textAlign:'left',padding:5}}>
              SĐT thứ 2
            </th>
            <td style={{height:50,fontSize:13,textAlign:'left',padding:5}}>
              <textarea   
                style={{textAlign:'left',padding:5,width:'100%',height:35,border:'1px solid #e2e2e2' ,borderRadius : 3}}
                value={this.state.phone2} ref="phone2"  onChange={this.onChangePhone2}/>
            </td>
          </tr>  
          <tr key={4}>
            <th style={{height:50,fontSize:13,textAlign:'left',padding:5}}>
              Facebook
            </th>
            <td style={{height:50,fontSize:13,textAlign:'left',padding:5}}>
              <textarea rows="2"
                style={{textAlign:'left',padding:5,width:'100%',border:'1px solid #e2e2e2' ,borderRadius : 3}}
                value={this.state.fb} ref="fb"  onChange={this.onChangeFB}/>
            </td>
          </tr>  
          <tr key={5}>
            <th style={{height:50,fontSize:13,textAlign:'left',padding:5}}>
              Địa chỉ
            </th>
            <td style={{height:50,fontSize:13,textAlign:'left',padding:5}}>
            {/* {this.props.row.address} */}
              <textarea rows="4" 
                style={{textAlign:'left',padding:5,width:'100%',border:'1px solid #e2e2e2' ,borderRadius : 3}} 
                value={this.state.address} ref="address"  onChange={this.onChangeAddress}/>
            </td>
          </tr>  
         <tr>
           <td colSpan={2}>
            <center style={{height:50,fontSize:13,textAlign:'center',padding:5}}>
              <Button  
                style={{height : 35,marginRight:20}}
                onClick={this.props.cancelEdit} type="danger" icon = "close">
                Hủy
              </Button>
              <Button  
                // disabled={(this.props.changed && this.props.row.nickname== this.props.nickname)?false:true } 
                style={{height : 35}}
                onClick={(id)=>this.onClick(this.props.row.nickname)} type="primary" icon = "save">
                Lưu
              </Button>
            </center>
           </td>
         </tr>  
            
            
         
         
        </tbody>  
      </table>  
      
     
      
     
    );
  }
}

EditDaiLy.propTypes = {

};

export default EditDaiLy;
