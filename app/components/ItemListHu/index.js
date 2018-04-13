/**
*
* ItemListHu
*
*/

import React from 'react';
// import styled from 'styled-components';
import {
  Button,
  Checkbox,
  Icon,
  message,
}from 'antd';

class ItemListHu extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {    
      name : "",
      Gname : false,
      soluong : false,
      active : false,
      x : false,
      hover : false,
      date : "",
      cHu100: 0,
      cHu1000: 0,
      cHu10000: 0,
      xHu100: 1,
      xHu1000: 1,
      xHu10000: 1,

      event100 : false,
      event1000 : false,
      event10000 : false,

      isMobile : false,
      isUpdate : false,

      gEvent : false,
      onClickTime : false,

      arr_time :[],
      checked2 : false,
      checked3 : false,
      checked4 : false,
      checked5 : false,
      checked6 : false,
      checked7 : false,
      checked1 : false,
    };
  }
  updateDimensions() {
    if(window.innerWidth < 760) {
      this.setState({ isMobile: true});
    } else {
     this.setState({ isMobile: false});
    }
  }
  componentWillMount(){
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
    
  }
  componentWillMount=()=>{
    this.setState({isUpdate : false})
    
    this.setState({name : this.props.row.nameEvent})
    this.setState({Gname : this.props.row.gameName})
    this.setState({cHu100 : this.props.row.hu100})
    this.setState({cHu1000 : this.props.row.hu1000})
    this.setState({cHu10000 : this.props.row.hu10000})
    this.setState({xHu100 : this.props.row.xHu100})
    this.setState({xHu1000 : this.props.row.xHu1000})
    this.setState({xHu10000 : this.props.row.xhu10000})
    this.setState({date : this.props.row.dayOfWek})
    
    this.setState({active : this.props.row.activeEvent})
  }
  componentWillReceiveProps=(nextprops)=>{
    if(this.props.row !== nextprops.row){
      this.setState({isUpdate : false})
      
      this.setState({name : nextprops.row.nameEvent})
      this.setState({Gname : nextprops.row.gameName})
      this.setState({cHu100 : nextprops.row.hu100})
      this.setState({cHu1000 : nextprops.row.hu1000})
      this.setState({cHu10000 : nextprops.row.hu10000})
      this.setState({xHu100 : nextprops.row.xHu100})
      this.setState({xHu1000 : nextprops.row.xHu1000})
      this.setState({xHu10000 : nextprops.row.xhu10000})
      this.setState({date : nextprops.row.dayOfWek})
      this.setState({active : nextprops.row.activeEvent})
    }
  }
  save=()=>{
    this.setState({date : ""})
    if(this.state.arr_time && (this.state.arr_time.size>0 || this.state.arr_time.length>0)){
      var string = "";
      this.setState({arr_time:(this.state.arr_time.sort(function (a, b) {
        if (a < b ) return -1;
        else if (a  > b ) return 1;
        return 0;
      }))});
      this.state.arr_time.map((row,index)=>{
        if(index < this.state.arr_time.length-1){
          string += row +",";
        }else{
          string += row;
        }
      })
      this.setState({date : string});
      if(this.state.name.trim()!==""){
        this.props.add_xhu(
          this.state.name,
          this.state.Gname,
          string,
          this.state.cHu100,
          this.state.cHu1000,
          this.state.cHu10000,
          this.state.xHu100,
          this.state.xHu1000,
          this.state.xHu10000,
          this.state.active
        )
      }
      this.setState({onClickTime:false})
      this.setState({checked2:false})
      this.setState({checked3:false})
      this.setState({checked4:false})
      this.setState({checked5:false})
      this.setState({checked6:false})
      this.setState({checked7:false})
      this.setState({checked1:false})
    }else{
      message.error("Chưa chọn ngày !");
      
      // if(this.state.name.trim()!==""){
      //   this.props.add_xhu(
      //     this.state.name,
      //     this.state.Gname,
      //     this.state.date,
      //     this.state.cHu100,
      //     this.state.cHu1000,
      //     this.state.cHu10000,
      //     this.state.xHu100,
      //     this.state.xHu1000,
      //     this.state.xHu10000,
      //     this.state.active
      //   )
      // }
    }
   
  }

  hoverOn=()=>{
    this.setState({
      hover: true,
    });
  }
  hoverOff=()=>{
    this.setState({
      hover: false,
    });
  }
  convertDate = (time) => {
    var d = new Date(time),
    yyyy = d.getFullYear(),
    mm = ('0' + (d.getMonth() + 1)).slice(-2),
    dd = ('0' + d.getDate()).slice(-2),
    hh = ('0' + d.getHours()).slice(-2),
    min = ('0' + d.getMinutes()).slice(-2),

    result, time;
    time = hh + ':' + min;
    const date =   dd+ '/' + mm + '/'+ yyyy ;
    result = date ;
    return result;
  }
  onChangeName=(e)=>{
    this.setState({name : e.target.value})
    this.setState({isUpdate : true})
    this.setState({gEvent : this.props.row.gameName})

    
  }
  onChangeSL=(e)=>{
    this.setState({soluong : e.target.value})
  }
  onChangeDate=(e)=>{
    this.setState({isUpdate : true})
    this.setState({date : e.target.value})
  }
  onChangeActive=(e)=>{
    this.setState({isUpdate : true})
    this.setState({active : e.target.value})
  }
  onChangeCHu10000=(e)=>{
    this.setState({isUpdate : true})
    this.setState({cHu10000:e.target.value})
  }
  onChangeCHu100=(e)=>{
    this.setState({isUpdate : true})
    this.setState({cHu100:e.target.value})
  }
  onChangeCHu1000=(e)=>{
    this.setState({isUpdate : true})
    this.setState({cHu1000:e.target.value})
  }
  onChangeXHu1000=(e)=>{
    this.setState({isUpdate : true})
    this.setState({xHu1000:e.target.value})
  }
  onChangeXHu100=(e)=>{
    this.setState({isUpdate : true})
    this.setState({xHu100:e.target.value})
  }
  onChangeXHu10000=(e)=>{
    this.setState({isUpdate : true})
    this.setState({xHu10000:e.target.value})
  }
  onChangeTimeClick=()=>{
    this.setState({onClickTime : !this.state.onClickTime})

  }
  changeTime2=(e)=>{
    this.setState({checked2:e.target.checked})
   
    if(e.target.checked){
      this.setState({arr_time:this.state.arr_time.concat(e.target.value)})
    }else{
      this.setState({
        arr_time:this.state.arr_time.filter((item)=>{return item != e.target.value}),
      })

    }
  }
  changeTime3=(e)=>{
    this.setState({checked3:e.target.checked})
   
    if(e.target.checked){
      this.setState({arr_time:this.state.arr_time.concat(e.target.value)})
    }else{
      this.setState({
        arr_time:this.state.arr_time.filter((item)=>{return item != e.target.value}),
      })

    }
  }
  changeTime4=(e)=>{
    this.setState({checked4:e.target.checked})
   
    if(e.target.checked){
      this.setState({arr_time:this.state.arr_time.concat(e.target.value)})
    }else{
      this.setState({
        arr_time:this.state.arr_time.filter((item)=>{return item != e.target.value}),
      })

    }
  }
  changeTime5=(e)=>{
    this.setState({checked5:e.target.checked})
   
    if(e.target.checked){
      this.setState({arr_time:this.state.arr_time.concat(e.target.value)})
    }else{
      this.setState({
        arr_time:this.state.arr_time.filter((item)=>{return item != e.target.value}),
      })

    }
  }
  changeTime6=(e)=>{
    this.setState({checked6:e.target.checked})
   
    if(e.target.checked){
      this.setState({arr_time:this.state.arr_time.concat(e.target.value)})
    }else{
      this.setState({
        arr_time:this.state.arr_time.filter((item)=>{return item != e.target.value}),
      })

    }
  }
  changeTime7=(e)=>{
    this.setState({checked7:e.target.checked})
   
    if(e.target.checked){
      this.setState({arr_time:this.state.arr_time.concat(e.target.value)})
    }else{
      this.setState({
        arr_time:this.state.arr_time.filter((item)=>{return item != e.target.value}),
      })

    }
  }
  changeTime1=(e)=>{
    this.setState({checked1:e.target.checked})
   
    if(e.target.checked){
      this.setState({arr_time:this.state.arr_time.concat(e.target.value)})
    }else{
      this.setState({
        arr_time:this.state.arr_time.filter((item)=>{return item != e.target.value}),
      })

    }
  }
  render() {
    var string_time = "";
    if(this.props.row.dayOfWek){
      if(this.props.row.dayOfWek.toString().indexOf(",")>-1){
        if(this.props.row.dayOfWek.toString().split(",").length>0){
          this.props.row.dayOfWek.toString().split(",").map((r,i)=>{
            if(i==this.props.row.dayOfWek.toString().split(",").length-1){
              string_time += r!=="1"?"Thứ "+r:"CN" ;
            }else{
              string_time += r!=="1"?"Thứ "+r+",":"CN," ;
              
            }
  
          })
  
        }else{
          string_time +=this.props.row.dayOfWek.toString()!=="1"?"Thứ "+this.props.row.dayOfWek:"CN" ;
        }
      }else{
        string_time +=this.props.row.dayOfWek.toString()!=="1"?"Thứ "+this.props.row.dayOfWek:"CN" ;
      }
      
    }
    var time_change = (
      <table style={{width:'100%',padding:5}}>
        <tbody >
          <tr >
            <td style={{paddingLeft:5}}>
              <Checkbox style={{marginRight:5}} value={2} onChange={this.changeTime2} checked={this.state.checked2}/>Thứ 2
            </td>  
            <td style={{paddingLeft:5}}>
              <Checkbox style={{marginRight:5}} value={3} onChange={this.changeTime3} checked={this.state.checked3}/>Thứ 3
            </td>
            <td style={{paddingLeft:5}}>
              <Checkbox style={{marginRight:5}} value={4} onChange={this.changeTime4} checked={this.state.checked4}/>Thứ 4
            </td>
            <td style={{paddingLeft:5}}>
              <Checkbox style={{marginRight:5}} value={5} onChange={this.changeTime5} checked={this.state.checked5}/>Thứ 5
            </td>
          </tr>  
          <tr>
            <td style={{paddingLeft:5,paddingBottom:5}}>
              <Checkbox style={{marginRight:5}} value={6} onChange={this.changeTime6} checked={this.state.checked6}/>Thứ 6
            </td>  
            <td style={{paddingLeft:5,paddingBottom:5}}>
              <Checkbox style={{marginRight:5}} value={7} onChange={this.changeTime7} checked={this.state.checked7}/>Thứ 7
            </td>
            <td style={{paddingLeft:5,paddingBottom:5}}>
              <Checkbox style={{marginRight:5}} value={1} onChange={this.changeTime1} checked={this.state.checked1}/>CN
            </td>
            
          </tr>  
        </tbody>  
      </table>  
    )
    return (
      <tr 
         onMouseEnter={this.hoverOn} style={{background:this.state.hover?"#f0f0f0":"white"}}
         onMouseLeave={this.hoverOff}
         >
         <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,borderRadius :5}}>
            <div style={{border:'1px solid #ccc',fontSize:13,textAlign:'left',borderRadius :5}}>
            <table style={{width:'100%'}}>
              <tbody>
                <tr style={{borderBottom:this.state.onClickTime?'1px solid #ccc':"none",width:'100%',padding:0}} onClick={this.onChangeTimeClick}>
                  <td style={{padding:8}} onClick={this.onChangeTimeClick}>
                    {string_time}
                  </td>
                  <td style={{float:"right",padding:8,borderLeft:'1px solid #e2e2e2'}}><Icon type="caret-down" onClick={this.onChangeTimeClick}/></td>
                </tr>
                <tr style={{height:this.state.onClickTime?10:0}}/>
                <tr style={{display:this.state.onClickTime?"":"none",width:'100%',padding:5}}>
                  {time_change}
                </tr>  
              </tbody>  
            </table>  
            </div>
            {/* <div style={{display:"-webkit-box",border:'1px solid #e2e2e2',padding:5,borderRadius :5}}>
              <div>
                {string_time}
              </div>
              <div>
                <Icon type="caret-down" />
              </div>
            </div> */}
           
          </td>
          <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>   
            {this.state.Gname}    
              
          </td>
          <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>
           <textarea value={this.state.name} style={{borderRadius :5,border:'1px solid #ccc',padding:5}} onChange={this.onChangeName}/>
           
          </td>
          
              <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>  
                <input type="number" min={0}
                  value={this.state.cHu100} style={{width:70,borderRadius :5,border:'1px solid #ccc',textAlign:'right',padding:5,height:35}} onChange={this.onChangeCHu100}/>
              </td>  
              <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>  
                <input type="number" min={0}
                  value={this.state.cHu1000} style={{width:70,borderRadius :5,border:'1px solid #ccc',textAlign:'right',padding:5,height:35}} onChange={this.onChangeCHu1000}/>
              </td> 
              <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>  
                <input type="number" min={0}
                  value={this.state.cHu10000} style={{width:70,borderRadius :5,border:'1px solid #ccc',textAlign:'right',padding:5,height:35}} onChange={this.onChangeCHu10000}/>
              </td>  

              <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>  
                {this.props.row.huthuong100}
              </td>  
              <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>  
                {this.props.row.huthuong1000}
              </td> 
              <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>  
                {this.props.row.huthuong10000}
              </td>    

          {/* </td> */}
          <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>
            <input type="number" min={1}
              value={this.state.xHu100} style={{width:70,borderRadius :5,border:'1px solid #ccc',textAlign:'right',padding:5,height:35}} onChange={this.onChangeXHu100}/>    
            
          </td>
          <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>
            <input type="number" min={1}
              value={this.state.xHu1000} style={{width:70,borderRadius :5,border:'1px solid #ccc',textAlign:'right',padding:5,height:35}} onChange={this.onChangeXHu1000}/>    
            
          </td>
          <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>
            <input type="number" min={1}
              value={this.state.xHu10000} style={{width:70,borderRadius :5,border:'1px solid #ccc',textAlign:'right',padding:5,height:35}} onChange={this.onChangeXHu10000}/>    
            
          </td>
          <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>
            <select 
                  style={{border:'1px solid #e2e2e2',borderRadius:5,height:35}}
                  onChange={(e)=>this.onChangeActive(e)}
                  value={this.state.active}
                >
                
                <option value={true}>Đã active</option>          
                <option value={false}>Chưa active</option>
                
            </select>  
           
          </td>
          <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>
            <Button style={{height:35}} type="primary" onClick={this.save} >Lưu</Button>
          </td>  
         
      </tr>    
    );
  }
}

ItemListHu.propTypes = {

};

export default ItemListHu;
