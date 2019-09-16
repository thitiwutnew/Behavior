import React,{ Component } from 'react';
import { StyleSheet,Image,BackHandler, View, TouchableOpacity,Alert} from 'react-native';
import { Container,Text, Content,Header, Footer, Icon,Body, FooterTab, Title,Button, Item ,Input,CardItem,Card} from 'native-base';
import { Actions  } from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';
import md5  from 'md5';
export default  class new_password extends Component{
  
  state = {
    oldpassword:"",
    newpassword:"",
    comfirmpassword:"",
    chkstatus:"",
    
  };
    changepassword = async()=>{
      const { navigation } = this.props;
      const{oldpassword} = this.state;
      const{newpassword} = this.state;
      const{comfirmpassword} = this.state;
      const acc_id = navigation.getParam('acc_id', '');
      const acc_rank = navigation.getParam('acc_rank', '');
      const acc_name = navigation.getParam('acc_name', '');
      const acc_username = navigation.getParam('acc_username', '');
      const acc_password = navigation.getParam('acc_password', '');
      const acc_status = navigation.getParam('acc_status', '');
      const acc_chk = navigation.getParam('acc_chk', '');
      var passwordss=md5(oldpassword);
      var newpasswordss=md5(newpassword);
      if((oldpassword !="" && newpassword !="") && (comfirmpassword !=""))
      {
          if(acc_password===passwordss){
              if(newpassword==comfirmpassword){
                this.setState({
                  chkstatus:"",
                })
                    const arraydata  = [];
                    const data ={
                        acc_id :acc_id,
                        acc_rank : acc_rank,
                        acc_name : acc_name,
                        acc_username :acc_username,
                        acc_password : newpasswordss,
                        acc_status : acc_status,
                        acc_chk : 0,
                    }
                    arraydata.push(data);
                    try {
                      AsyncStorage.getItem('localaccount').then((values) =>{
                        if(values !=null){
                              const ddaasa = JSON.parse(values);
                              const postsItemssasa = ddaasa.filter(function(e){ return e.acc_id != acc_id });
                              postsItemssasa.push(data) 
                              AsyncStorage.setItem('localaccount', JSON.stringify(postsItemssasa)).then(()=>{
                                console.log("localaccount",postsItemssasa)
                              })
                              
                        }else{
                          AsyncStorage.setItem('localaccount',  JSON.stringify(arraydata)).then(()=>{
                            console.log("localaccount",arraydata)
                          })
                        }
                      })
                      AsyncStorage.getItem('account').then((value) =>{
                        if(value !=null){
                              const d = JSON.parse(value);
                              const postsItems = d.filter(function(e){ return e.acc_id != acc_id });
                              postsItems.push(data) 
                              AsyncStorage.setItem('account', JSON.stringify(postsItems)).then(()=>{
                                console.log("account",postsItems)
                                this.props.navigation.push('Login')
                              })
                              
                        }else{
                          AsyncStorage.setItem('account',  JSON.stringify(arraydata)).then(()=>{
                            console.log("account",arraydata)
                            this.props.navigation.push('Login')
                          
                          })
                        }
                      })
                    }catch(err){
                      console.log(err);
                    }
              }
              else{
                this.setState({
                  chkstatus:"  รหัสผ่านใหม่ไม่ตรงกัน.",
                })
              }
          }
          else{
            this.setState({
              chkstatus:"   รหัสผ่านเก่าไม่ถูกต้อง.",
            })
          }
      }
      else{
        this.setState({
          chkstatus:"กรุณา กรอกข้อมูลให้ครบ.",
        })
      }
    }
    render(){
      console.disableYellowBox = true;
      var  {navigate} = this.props.navigation;
      const { navigation } = this.props;
      const password = navigation.getParam('password', '');
      const username = navigation.getParam('username', '');
        return(
        <Container>
        <Header style={styles.Header}>
          <Body>
            <Title style={styles.headertext}>
            <Image source={require('../image/small-logo.png')} />
            จัดการข้อมูลผู้มีพฤติกรรมการกระทำผิดกฎหมาย</Title>
          </Body>
        </Header>
        <Content style={styles.Buttonbody}>
          <View>
            <Card style={{marginTop:20,backgroundColor:'rgba(218, 223, 225,1)'}}>
                <CardItem style={{marginTop:20,backgroundColor:'rgba(218, 223, 225,1)'}}>
                <Text>  เนื่องจากเป็นการเข้าใช้งานครั้งแรก  เพื่อความปลอดภัยของบัญชีผู้ใช้งาน กรุณาเปลี่ยนรหัสผ่านเข้าใช้งานใหม่</Text>
                </CardItem>
                <CardItem style={{backgroundColor:'rgba(218, 223, 225,1)'}}>
                <Item style={styles.inputpass}> 
                  <Text>รหัสผ่านเก่า              : </Text>  
                  <Input
                  value={this.state.oldpassword}
                  onChangeText={(text) => this.setState({ oldpassword: text })} 
                  secureTextEntry={true}/>
                </Item>
                </CardItem>
                <CardItem style={{backgroundColor:'rgba(218, 223, 225,1)'}}>
                <Item style={styles.inputpass}> 
                   <Text>รหัสผ่านใหม่            : </Text>  
                  <Input
                  value={this.state.newpassword}
                  onChangeText={(text) => this.setState({ newpassword: text })} 
                  secureTextEntry={true}/>
                </Item>
                </CardItem>
                <CardItem style={{backgroundColor:'rgba(218, 223, 225,1)'}}>
                <Item style={styles.inputpass}> 
                  <Text>ยืนยันรหัสผ่านใหม่  : </Text>  
                  <Input
                  value={this.state.comfirmpassword}
                  onChangeText={(text) => this.setState({ comfirmpassword: text })} 
                  secureTextEntry={true}/>
                </Item>
                </CardItem>
                <CardItem style={{backgroundColor:'rgba(218, 223, 225,1)',marginLeft:'19%'}}>
                <Text style={styles.status}>{this.state.chkstatus}</Text>
                </CardItem>
                <TouchableOpacity  style={styles.submit} onPress={this.changepassword} >
                <Text>เปลี่ยนรหัสผ่าน</Text>
          </TouchableOpacity>
            </Card>
            </View>
        </Content>
        <Footer>
          <FooterTab>
          <Button active style={styles.footer} onPress={()=>navigate("Login",{})}>
              <Icon name="log-in" />
              <Text>เข้าสู่ระบบ</Text>
            </Button>
            <Button active style={styles.footer} onPress={() => BackHandler.exitApp()}>
              <Icon name="exit" />
              <Text>ออกโปรแกรม</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
        );
    }
}

const styles = StyleSheet.create({
  headertext:{
    fontSize: 13,
    alignItems: 'center',
    alignContent: 'center',
    height:80,
 
  },
  status:{
    alignItems:'center',
    alignContent:'center',
  },
  Buttonbody: {
    marginLeft:'5%',
    marginTop:'10%',
    marginRight: '5%',
    width: '90%',
  },
  Header:{
    backgroundColor: 'rgba(150, 40, 27, 1)',
    padding:'5%',
    height:60,
  },
  footer: {
    backgroundColor:'rgba(150, 40, 27, 1)',
    
  },
  inputpass:{
    marginTop: 1,
    backgroundColor:'#fff',
    borderRadius: 15,
    paddingLeft:'5%',
    fontSize:16,
    color:'#fff',
    textAlign: 'center',
  },
  submit:{
    width: '45%',
    marginVertical: 10,
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: 15,
    marginLeft:"26%",
    marginBottom:20,
    padding: 10,
    color: '#fff',
    backgroundColor:'rgba(153, 51, 51, 43)',
  }
});