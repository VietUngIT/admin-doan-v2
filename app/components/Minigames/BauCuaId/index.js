/**
*
* BauCuaId
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import { 
  Tabs,
  Input,
  Button,
  message,
  Pagination ,
  Modal,
} from 'antd';
import Workbook from 'react-excel-workbook';
var st = false;
var et = false;
var detail = false;

class BauCuaId extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      isMobile: false,
      visible: false,
      activePage : 1,
    };
  }
  showDetail(updateTime){
    this.setState({
      visible: true,
    });
    detail = this.props.data.filter((element)=>{
      if(element.updateTime == updateTime){
          return element;
      }
    })
  }
  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }
  updateDimensions() {
    if(window.innerWidth < 760) {
     this.setState({isMobile: true,});
    } else {
     this.setState({isMobile: false,});
    }
  }
  
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }
  
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }
  onChange = (page) => {
    this.setState({
      activePage: page,
    });
  }

  converttoHtml(str){
    var res = document.getElementById('abc')
    res.innerHTML = str;
    return res;
  }
  render() {
    var table=false;
    var detailSlot = false;
    var itemsPerPage = 10;
    var total_item = 0;
    var print = false;
    var print_data = [];
    var bet_temp = "";
    var total_bet = 0;
    var total_prize = 0;
    var prize_temp =[];
    var page = false;
    if(this.props.data && (this.props.data.length > 0 || this.props.data.size > 0)){
      this.props.data.map((t,i)=>{
        var bet_print = "";
        var dices_print = "";
        var prize_print = "";
      
        total_bet +=t.betValue;
        total_prize += t.prizeValue;
        t.bet.split(",").map((r,i)=>{               
          if(i==0) {
            bet_print += ("bầu:"+this.props.formatCurency(r)+"|")
          }
          if(i==1) {
            bet_print+=("cua:"+this.props.formatCurency(r)+"|")
          }
          if(i==2) {
            bet_print+=("tôm:"+this.props.formatCurency(r)+"|")
          }
          if(i==3) {
            bet_print+=("cá:"+this.props.formatCurency(r)+"|")
          }
          if(i==4) {
            bet_print+=("gà:"+this.props.formatCurency(r)+"|")
          }
          if(i==5) {
            bet_print+=("hươu:"+this.props.formatCurency(r)+"|")
          }
        })

        t.dices.split(",").map((r,i)=>{    
          var l = t.dices.split(",").length;   
          if(r==5){
            if(i<l-1) dices_print+=("hươu - ")
            else dices_print+=("hươu")
          } 
          if(r==4) {
            if(i<l-1) dices_print+=("gà - ")
            else dices_print+=("gà ")
          } 
          if(r==3) {
            if(i<l-1) dices_print+=("cá - ")
            else dices_print+=("cá ")
          }
          if(r==2) {
            if(i<l-1) dices_print+=("tôm - ")
            else dices_print+=("tôm ")
          }
          if(r==1) {
            if(i<l-1) dices_print+=("cua - ")
            else dices_print+=("cua ")
          }
          if(r==0) {
            if(i<l-1) dices_print+=("bầu - ")
            else dices_print+=("bầu ")
          }      
          
        })
        t.prize.split(",").map((r,i)=>{               
          if(i==0) {
            prize_print+=("bầu:"+this.props.formatCurency(r)+"|")
          }
          if(i==1) {
            prize_print+=("cua:"+this.props.formatCurency(r)+"|")
          }
          if(i==2) {
            prize_print+=("tôm:"+this.props.formatCurency(r)+"|")
          }
          if(i==3) {
            prize_print+=("cá:"+this.props.formatCurency(r)+"|")
          }
          if(i==4) {
            prize_print+=("gà:"+this.props.formatCurency(r)+"|")
          }
          if(i==5) {
            prize_print+=("hươu:"+this.props.formatCurency(r)+"|")
          }
        })
        print_data.push({id:t.id,bet:bet_print,dices:dices_print,betValue:t.betValue,prize:prize_print,exchangeMoney:t.exchangeMoney,prizeValue:t.prizeValue,updateTime:t.updateTime})

      })
      var header = (
        <div style={{marginLeft:'2%',marginTop: '2%'}}>
          <h3 style={{marginLeft:'3%',marginTop:'1%'}}>Tổng tiền cược : {this.props.formatCurency(total_bet)}</h3>
          <h3 style={{marginLeft:'3%',marginTop:'1%'}}>Tổng trả thưởng : {this.props.formatCurency(total_prize)}</h3>
        </div>  
      )
      print = (
        <div  style={{marginTop: '2%',marginLeft:'2%'}}>
          <Workbook filename={"Mini_Game_Bầu_Cua_"+this.props.key_input+".xlsx"} element={<Button type="primary">Xuất file</Button>}>
            <Workbook.Sheet data={print_data} name="Lịch sử mini game : Bầu cua">
              <Workbook.Column label="Phiên chơi" value="id"/>
              <Workbook.Column label="Chi tiết cửa đặt" value="bet"/>
              <Workbook.Column label="Kết quả" value="dices"/>             
              <Workbook.Column label="Tổng tiền cược" value={r=>this.props.formatCurency(r.betValue)}/>             
              <Workbook.Column label="Chi tiết nhận" value="prize"/>             
              <Workbook.Column label="Tổng tiền trừ" value={r=>this.props.formatCurency(r.exchangeMoney)}/>             
              <Workbook.Column label="Trả thưởng" value={r=>this.props.formatCurency(r.prizeValue)}/>             
              <Workbook.Column label="Thời gian" value={r=>this.props.convertTime(r.updateTime)}/>             
              
            </Workbook.Sheet> 
            
          </Workbook> 
        </div>
      )
      var item = false;
      total_item = this.props.data.length;
      page  =(
        <div style={{margin: '2% 3%'}}>
          <div style={{display: 'inline-block'}}>
            <Pagination
              style={{display: 'inline-block'}}
              total={total_item?total_item:0}
              pageSize={itemsPerPage}
              defaultCurrent={1}
              current={this.state.activePage}
              onChange={this.onChange}
            />
            <div style={{display:total_item?"inline-block":'none',float:'right',border:'1px solid #c4c4c4',borderRadius:'3px',padding:'4px 10px',marginLeft:'10px',fontSize:'13px'}}>
              {this.state.activePage}/{total_item>0?(total_item%itemsPerPage==0?total_item/itemsPerPage:parseInt(total_item/itemsPerPage)+1):0}

            </div>
          </div>
        </div>
      )
      if(!this.state.isMobile){
        item = this.props.data.map((row,index)=>{
          var dices_temp = [];
    
          row.dices.split(",").map((r,i)=>{       
            var l_d = row.dices.split(",").length;   
            if(r==5){
              if(i<l_d-1) dices_temp.push("hươu - ")
              else dices_temp.push("hươu")
            } 
            if(r==4) {
              if(i<l_d-1) dices_temp.push("gà - ")
              else dices_temp.push("gà ")
            } 
            if(r==3) {
              if(i<l_d-1) dices_temp.push("cá - ")
              else dices_temp.push("cá ")
            }
            if(r==2) {
              if(i<l_d-1) dices_temp.push("tôm - ")
              else dices_temp.push("tôm ")
            }
            if(r==1) {
              if(i<l_d-1) dices_temp.push("cua - ")
              else dices_temp.push("cua ")
            }
            if(r==0) {
              if(i<l_d-1) dices_temp.push("bầu - ")
              else dices_temp.push("bầu ")
            }
          })
          bet_temp=(
            <div>
              <span>bầu : {this.props.formatCurency(row.bet.split(",")[0])}</span><br/> 
              <span>cua : {this.props.formatCurency(row.bet.split(",")[1])}</span><br/>
              <span>tôm : {this.props.formatCurency(row.bet.split(",")[2])}</span><br/> 
              <span>cá : {this.props.formatCurency(row.bet.split(",")[3])}</span><br/> 
              <span>gà : {this.props.formatCurency(row.bet.split(",")[4])}</span><br/> 
              <span>hươu : {this.props.formatCurency(row.bet.split(",")[5])}</span><br/> 
            </div>  
          )
          prize_temp=(
            <div>
              <span>bầu : {this.props.formatCurency(row.prize.split(",")[0])}</span><br/> 
              <span>cua : {this.props.formatCurency(row.prize.split(",")[1])}</span><br/>
              <span>tôm : {this.props.formatCurency(row.prize.split(",")[2])}</span><br/> 
              <span>cá : {this.props.formatCurency(row.prize.split(",")[3])}</span><br/> 
              <span>gà : {this.props.formatCurency(row.prize.split(",")[4])}</span><br/> 
              <span>hươu : {this.props.formatCurency(row.prize.split(",")[5])}</span><br/> 
            </div>  
          )
          
          if(index >= (this.state.activePage-1) *itemsPerPage && index < (this.state.activePage) *itemsPerPage ){
            return (
              <tr key={index}>
                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}} id="bet">{ bet_temp}</td>
                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{dices_temp}</td>
                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.props.formatCurency(row.betValue)}</td>
                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{prize_temp}</td>
                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.props.formatCurency(row.exchangeMoney)}</td>
                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.props.formatCurency(row.prizeValue)}</td>
                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.props.convertTime(row.updateTime)}</td>
              </tr>
            )
          }
          
        })
        table=(
          <div>
            <table style={{width:'95%',marginTop:'3%',marginLeft:'2%'}}>
            <tbody>
              <tr>
                <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Chi tiết đặt cược</th>
                <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Kết quả</th>
                <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Tổng tiền cược</th>
                <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Chi tiết nhận</th>
                <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Tổng tiền trừ</th>
                <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Trả thưởng</th>
                <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Thời gian</th>
              </tr>
              {item}
              </tbody>
            </table>  
            <div style={{float: 'right',margin: '3% 5%'}}>
              <div style={{display: 'inline-block'}}>
                <Pagination
                  style={{display: 'inline-block'}}
                  total={total_item?total_item:0}
                  pageSize={itemsPerPage}
                  defaultCurrent={1}
                  current={this.state.activePage}
                  onChange={this.onChange}
                />
                <div style={{display:total_item?"inline-block":'none',float:'right',border:'1px solid #c4c4c4',borderRadius:'3px',padding:'4px 10px',marginLeft:'10px',fontSize:'13px'}}>
                  {this.state.activePage}/{total_item>0?(total_item%itemsPerPage==0?total_item/itemsPerPage:parseInt(total_item/itemsPerPage)+1):0}

                </div>
              </div>
            </div>
          </div>
        )
      }else{
        var detail_slot = false;
        
        if(detail ){
          
          detail.map((r,index)=>{
            var bet_temp_m = [];
            var dices_temp_m = [];
            var prize_temp_m =[];
            r.dices.split(",").map((r_,i)=>{       
              var l_d_m = r.dices.split(",").length;   
              if(r_==5){
                if(i<l_d_m-1) dices_temp_m.push("hươu - ")
                else dices_temp_m.push("hươu")
              } 
              if(r_==4) {
                if(i<l_d_m-1) dices_temp_m.push("gà - ")
                else dices_temp_m.push("gà ")
              } 
              if(r_==3) {
                if(i<l_d_m-1) dices_temp_m.push("cá - ")
                else dices_temp_m.push("cá ")
              }
              if(r_==2) {
                if(i<l_d_m-1) dices_temp_m.push("tôm - ")
                else dices_temp_m.push("tôm ")
              }
              if(r_==1) {
                if(i<l_d_m-1) dices_temp_m.push("cua - ")
                else dices_temp_m.push("cua ")
              }
              if(r_==0) {
                if(i<l_d_m-1) dices_temp_m.push("bầu - ")
                else dices_temp_m.push("bầu ")
              }
            })
            bet_temp_m=(
              <div>
                <span>bầu : {this.props.formatCurency(r.bet.split(",")[0])}</span><br/> 
                <span>cua : {this.props.formatCurency(r.bet.split(",")[1])}</span><br/>
                <span>tôm : {this.props.formatCurency(r.bet.split(",")[2])}</span><br/> 
                <span>cá : {this.props.formatCurency(r.bet.split(",")[3])}</span><br/> 
                <span>gà : {this.props.formatCurency(r.bet.split(",")[4])}</span><br/> 
                <span>hươu : {this.props.formatCurency(r.bet.split(",")[5])}</span><br/> 
              </div>  
            )
            prize_temp_m=(
              <div>
                <span>bầu : {this.props.formatCurency(r.prize.split(",")[0])}</span><br/> 
                <span>cua : {this.props.formatCurency(r.prize.split(",")[1])}</span><br/>
                <span>tôm : {this.props.formatCurency(r.prize.split(",")[2])}</span><br/> 
                <span>cá : {this.props.formatCurency(r.prize.split(",")[3])}</span><br/> 
                <span>gà : {this.props.formatCurency(r.prize.split(",")[4])}</span><br/> 
                <span>hươu : {this.props.formatCurency(r.prize.split(",")[5])}</span><br/> 
              </div>  
            )
            
            detail_slot = (
              <div>
                <table style={{width: '100%'}}>
                <tbody>
                
                  <tr>
                    <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Chi tiết cửa đặt</th>
                    <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{bet_temp_m}</td>                    
                  </tr>
                  <tr>
                    <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Kết quả</th>
                    <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{dices_temp_m}</td>                  
                  </tr>
                  <tr>
                    <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Tổng tiền cược</th>
                    <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.props.formatCurency(r.betValue)}</td>                  
                  </tr>
               
                  <tr>
                    <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Chi tiết nhận</th>
                    <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{prize_temp_m}</td>                  
                  </tr>
                  <tr>
                    <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Tổng tiền trừ</th>
                    <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.props.formatCurency(r.exchangeMoney)}</td>                  
                  </tr>
                  <tr>
                    <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Trả thưởng</th>
                    <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.props.formatCurency(r.prizeValue)}</td>                  
                  </tr>
                  <tr>
                    <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Thời gian</th>
                    <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.props.convertTime(r.updateTime)}</td>                  
                  </tr>
                  </tbody>
                </table>  
              </div>
            )
          })
         
        }
        detailSlot = (
          <Modal
              title="Chi tiết"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              footer={[
                <Button key="back" type="primary" onClick={this.handleCancel}>OK</Button>,
                
              ]}
            >
              {detail_slot}
              
          </Modal>
        )
        item = this.props.data.map((row,index)=>{
          var bet_temp_mobile = [];
          var dices_temp_mobile = [];
          row.dices.split(",").map((r_,i)=>{       
            var l_d_mobile = row.dices.split(",").length;   
            if(r_==5){
              if(i<l_d_mobile-1) dices_temp_mobile.push("hươu - ")
              else dices_temp_mobile.push("hươu")
            } 
            if(r_==4) {
              if(i<l_d_mobile-1) dices_temp_mobile.push("gà - ")
              else dices_temp_mobile.push("gà ")
            } 
            if(r_==3) {
              if(i<l_d_mobile-1) dices_temp_mobile.push("cá - ")
              else dices_temp_mobile.push("cá ")
            }
            if(r_==2) {
              if(i<l_d_mobile-1) dices_temp_mobile.push("tôm - ")
              else dices_temp_mobile.push("tôm ")
            }
            if(r_==1) {
              if(i<l_d_mobile-1) dices_temp_mobile.push("cua - ")
              else dices_temp_mobile.push("cua ")
            }
            if(r_==0) {
              if(i<l_d_mobile-1) dices_temp_mobile.push("bầu - ")
              else dices_temp_mobile.push("bầu ")
            }
          })
          
          bet_temp_mobile=(
            <table>
              <tr><td style={{border:'1px solid #e2e2e2',padding:5}}>bầu </td><td style={{border:'1px solid #e2e2e2',padding:5}}> {this.props.formatCurency(row.bet.split(",")[0])}</td></tr>
              <tr><td style={{border:'1px solid #e2e2e2',padding:5}}>cua </td><td style={{border:'1px solid #e2e2e2',padding:5}}> {this.props.formatCurency(row.bet.split(",")[1])}</td></tr>
              <tr><td style={{border:'1px solid #e2e2e2',padding:5}}>tôm </td><td style={{border:'1px solid #e2e2e2',padding:5}}> {this.props.formatCurency(row.bet.split(",")[2])}</td></tr> 
              <tr><td style={{border:'1px solid #e2e2e2',padding:5}}>cá </td><td style={{border:'1px solid #e2e2e2',padding:5}}> {this.props.formatCurency(row.bet.split(",")[3])}</td></tr> 
              <tr><td style={{border:'1px solid #e2e2e2',padding:5}}>gà </td><td style={{border:'1px solid #e2e2e2',padding:5}}> {this.props.formatCurency(row.bet.split(",")[4])}</td></tr>
              <tr><td style={{border:'1px solid #e2e2e2',padding:5}}>hươu</td><td style={{border:'1px solid #e2e2e2',padding:5}}>{this.props.formatCurency(row.bet.split(",")[5])}</td></tr> 
            </table>  
          )
          if(index >= (this.state.activePage-1) *itemsPerPage && index < (this.state.activePage) *itemsPerPage ){
            return (
              <tr key={index} onClick={(id)=>this.showDetail(row.updateTime)}>
                <td style={{height:40,fontSize:13,textAlign:'left'}}>{bet_temp_mobile}</td>
                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.props.formatCurency(row.exchangeMoney)}</td>
                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.props.formatCurency(row.prizeValue)}</td>
                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.props.convertTime(row.updateTime)}</td>
              </tr>
            )
          }
          
        })
        table=(
          <div>
          {detailSlot}
          <table style={{width:'95%',marginTop:'3%',marginLeft:'2%'}}>
          <tbody>
            <tr>
              <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Chi tiết cửa đặt</th>
              <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Tổng tiền trừ</th>
              <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Trả thưởng</th>
              <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Thời gian</th>
            </tr>
            {item}
            </tbody>
          </table>  
          {page}
          </div>
        )
      }
    }else{
      table=(<h3 style={{marginLeft:'5%',marginTop:'5%'}}>Không có dữ liệu</h3>)
    }
    return (
      <div>
        {header}
        {table}
        {print}
      </div>
    );
  }
}

BauCuaId.propTypes = {

};

export default BauCuaId;
