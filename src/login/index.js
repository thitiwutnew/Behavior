import React,{ Component } from 'react';
import { View,StyleSheet,Text,Image,TouchableOpacity,Alert} from 'react-native';
import { Item, Input, Icon } from 'native-base';
import md5  from 'md5';
import AsyncStorage from '@react-native-community/async-storage';
// const STORAGE_KEY = 'Account'
// var chkpass='1234';
var id="1";
export default class index extends Component{
 
    state = {
      inputpassword: null,
      inputusername:null,
      chackauth:"0",
      account:[],
      authaccount:'',
      authorities:[],
      isLoading: true
    };

  componentWillMount() {
    this.show();
    if(this.state.account==''){
      AsyncStorage.getItem('account').then((value) =>{
        let  Account  = JSON.parse(value);
        this.setState({
          account: Account
          });
      })
      this.setState({
        chackauth: "0"
        });
    }
    else if(this.state.authorities==''){
      AsyncStorage.getItem('authorities').then((value) =>{
        let  Accountssss  = JSON.parse(value);
        this.setState({
          authorities: Accountssss
          });
      })
    }
  }
  show = async()=>{
    const {account} = this.state;
    const {authorities} = this.state;
    if(account ==null && authorities==null){
      try{ 
          fetch("http://192.168.1.191/Myapp/src/component/updateaccount.php", {
            method: "GET",
            headers:{
              Accept: "application/json",
              "Content-Type": "application/json"
            }
          })
          .then((response) => response.json())
          .then((response) => {
            if(response!=null){
              this.setState({ account: response});
              AsyncStorage.setItem('account', JSON.stringify(response)).then(()=>{})
            }
          })
    
    
          fetch("http://192.168.1.191/Myapp/src/component/updateauthorities.php", {
            method: "GET",
            headers:{
              Accept: "application/json",
              "Content-Type": "application/json"
            }
          })
          .then((response) => response.json())
          .then((response) => {
            if(response!=null){
              this.setState({ authorities: response});
              AsyncStorage.setItem('authorities', JSON.stringify(response)).then(()=>{})
            }
          })
        }
    catch(error){}
    }
    else{
      try{ 
        AsyncStorage.getItem('account').then((value) =>{
          if(value !=null){
                const d = JSON.parse(value);
                this.setState({ account: d});
               
                
          }else{
            fetch("http://192.168.1.191/Myapp/src/component/updateaccount.php", {
              method: "GET",
              headers:{
                Accept: "application/json",
                "Content-Type": "application/json"
              }
            })
            .then((response) => response.json())
            .then((response) => {
                this.setState({ account: response});
                AsyncStorage.setItem('account', JSON.stringify(response)).then(()=>{})
              
            })
          }
        })
        
          fetch("http://192.168.1.191/Myapp/src/component/updateauthorities.php", {
            method: "GET",
            headers:{
              Accept: "application/json",
              "Content-Type": "application/json"
            }
          })
          .then((response) => response.json())
          .then((response) => {
              this.setState({ authorities: response});
              AsyncStorage.setItem('authorities', JSON.stringify(response)).then(()=>{})
            
          })
        
     }
    catch(error){}
      this.checklogin();
    }
}
  checklogin = () => {
      
      const {inputusername} = this.state;
      const {inputpassword} = this.state;
      const {account} = this.state;
      const {chackauth} = this.state;
        if(inputpassword ==null && inputusername==null){
          this.setState({
            chackauth: "1"
            });
        }
        else if(inputpassword ==null || inputusername==null){
          state = {inputpassword:null}
          this.setState({
            chackauth: "2"
            });
        }
        else{
                if(account==null){
                  this.setState({
                    chackauth: "10"
                    });
                }
                else{
                  account.map((item, index) =>{
                    var password=md5(inputpassword);
                    if((inputusername==item.acc_username) && (password==item.acc_password)){
                      this.setState({chackauth: "4"});
                        if(item.acc_chk==1){
                          this.props.navigation.navigate("new_password", {
                            acc_id: item.acc_id,
                            acc_rank: item.acc_rank,
                            acc_name: item.acc_name,
                            acc_username: item.acc_username,
                            acc_password: item.acc_password,
                            acc_status: item.acc_status,
                            acc_chk: item.acc_chk,
  
                          })
                        }
                        else{
                          AsyncStorage.setItem('UserAccount', item.acc_name).then(()=>{})
                          this.props.navigation.push('Main')
                          this.setState({inputusername: null});
                          this.setState({inputpassword: null});
                        }
                    }
                    else if(chackauth !="4"){
                      this.setState({
                        chackauth: "3"
                        });
                        
                    }
                    else if(chackauth ==="4"){
                      this.setState({
                        chackauth: "5"
                        });
                       
                    }
                      })
                }
        }
  }
  
    render(){
      console.disableYellowBox = true;
      const {chackauth} = this.state;
  
        return(
          <View style={styles.container}>
                <Image style={styles.images} source={require('../image/logoapp.png')} />
            <Text>ระบบจัดการความเสี่ยง</Text>
            <Text>ต่อพฤติกรรมการกระทำผิดกฎหมาย</Text>
            <Item style={styles.inputuser}> 
              <Icon active name='person' /><Text> : </Text>  
              <Input placeholder='ผู้ใช้งาน'
              value={this.state.inputusername}
              onChangeText={(text) => this.setState({ inputusername: text })} 
              />
            </Item>
            <Item style={styles.inputpass}> 
              <Icon active name='lock' /><Text> : </Text>  
              <Input placeholder='รหัสผ่าน' 
              value={this.state.inputpassword}
               onChangeText={(text) => this.setState({ inputpassword: text })} 
               secureTextEntry={true}/>
            </Item>
           { (chackauth=="1"  && id=="1" ?  <Text style={styles.auth}>กรุณากรอกข้อมูล</Text> : null)}
           { (chackauth=="2"  && id=="1"? <Text style={styles.auth}>กรุณากรอกข้อมูลให้ครบ</Text> : null)}
           { (chackauth=="3" && id=="1" ? <Text style={styles.auth}>ชื่อผู้ใช้งานหรือ รหัสผ่านไม่ถูกต้อง</Text> : null)}
           { (chackauth=="10" && id=="1" ? <Text style={styles.auth}>การใช้งานครั้งแรก ต้องเชื่อมต่อกับ WIFI ภายในเท่านั้น</Text> : null)}
            <TouchableOpacity  style={styles.submit} onPress={this.show} >
                <Text> เข้าสู่ระบบ</Text>
          </TouchableOpacity>
          </View>
        );
    }
   
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: 'rgba(218, 223, 225,1)',
    },
    images: {
      alignContent:'center',
      marginVertical: 50,
      width:'50%',
      height:'25%',
    },
    auth:{
      marginVertical: 7,
    },
    inputuser:{
      marginTop: 20,
      width:'75%',
      backgroundColor:'rgba(255,255,255,0.3)',
      paddingLeft:'5%',
      borderRadius: 25,
      fontSize:16,
      color:'#000',
      textAlign: 'center',
    },
    inputpass:{
      marginTop: 20,
      width:'75%',
      backgroundColor:'rgba(255,255,255,0.3)',
      borderRadius: 25,
      paddingLeft:'5%',
      fontSize:16,
      color:'#000',
      textAlign: 'center',
    },
    submit:{
      width: '30%',
      marginVertical: 10,
      alignItems: 'center',
      textAlign: 'center',
      borderRadius: 15,
      padding: 10,
      color: '#000',
      backgroundColor:'rgba(153, 51, 51, 43)',
    }
  });