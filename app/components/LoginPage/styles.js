import { colors } from "material-ui/styles";

const styles = {
    page : {
      width : '100%',
      height : '100%',
      
    },
    imageBG : {
      width : '100%',
      height : '100%',
      position: "absolute",
    },
    content : {
      width : '100%',
      height : '100%',
      minHeight : "100%",
      position: "relative",
    },
    formLogin : {
      
      width : '26%',
      height : '33%',
      minHeight : 300,
      minWidth : 420,
      background:"#156ab5eb",
      position: "absolute",
      top: "32%",
      left: "40%",
      borderTopLeftRadius: 15,
      borderBottomRightRadius: 15,
      boxShadow: "#054574 10px 10px 5px",
    },
    innerformLogin : {
      width : '80%',
      height : '100%',
      minHeight : 300,
      minWidth : 360,
      margin: "auto",
      background:"#81D4FA",
      borderTop: "4px solid #3D5AFE",
      borderLeft: "5px solid #3D5AFE",
    },
    icon : {
      fontSize: '15px',
      position: 'absolute',
      marginTop: '2.5%',
      fontWeight: "bold",
      zIndex: '1000',
      paddingLeft:'2%',
    },
    btnLogin : {
      width : '100%',
      height: 35,
      background : '#156ab5eb',
      marginLeft : '130px',
      color : 'white',
      fontSize : '16px',
      marginLeft :'0px',
      marginTop:'3%'
    }
}
export default styles ;