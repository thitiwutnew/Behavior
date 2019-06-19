import React, { Component } from 'react'
import { StyleSheet,Image,TouchableOpacity,TextInput,Alert} from 'react-native';
import { Container,Text, Content,Header, Footer, Icon,Body, FooterTab, Title,Button, View } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
class Pages extends Component {
      state = {
          authorities: [],
          aaaaaaa: ''
        }
     
    
      updateauthorities(){
        var temp ='';
        fetch("http://192.168.1.102:3000/dt_management.json", {
          method: "Get",
          headers:{
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        })
        .then((response) => response.json())
        .then((response) => {
          console.log("5555555555555555555", response);
          this.setState({
            authorities: response
          }, function(){

          });
            AsyncStorage.getItem('dt_managements1').then((value) =>{
              console.log("3333333333333333333333333333",value);
              AsyncStorage.setItem('dt_managements1', JSON.stringify(response)).then(()=>{
               Alert.alert("อัพเดตข้อมูลสำเร็จ")
              })
            })
        })
        .catch((error) => {
          
        })
      }
  render() {
    var  {navigate} = this.props.navigation;
    return (
      <Container>
      <Header style={styles.Header}>
        <Body>
          <Title style={styles.headertext}>
          <Image style={styles.images} source={require('../image/logo.png')} />
          ตั้งค่ารหัสยืนยันตัวตน</Title>
        </Body>
      </Header>
      <View style={styles.container}> 
      <Content >
          <Text style={ styles.content}> </Text>
        <Button block warning style={styles.Buttonbody} onPress={this.updateauthorities.bind(this)}>
          <Icon name="md-arrow-round-down" />
            <Text> อัพเดตข้อมูล </Text>
          </Button>
          <Button block success style={styles.Buttonbody} onPress={()=>navigate("update",{})}>
          <Icon name="md-arrow-round-up" />
            <Text> ถ่ายโอนข้อมูล </Text>
          </Button>
      </Content>
      </View>
      <Footer>
        <FooterTab>
        <Button active style={styles.footer} onPress={()=>navigate("Main",{})}>
            <Icon name="home" />
            <Text>หน้าหลัก</Text>
          </Button>
          <Button active style={styles.footer} onPress={() => BackHandler.exitApp()}>
            <Icon name="exit" />
            <Text>ออกโปรแกรม</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
    )
  }
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
      marginVertical: 0,
      alignItems: 'center',
      backgroundColor: 'rgba(218, 223, 225,1)',
    },
    content:{
        alignItems: 'center',
        marginVertical: 80,
      },
    Buttonbody: {
        margin : 80,
        marginVertical: 20,
        width: 250,
      },
headertext:{
  padding: 40,
  fontSize: 13,
  alignItems: 'center',

},
textbody: {
  margin : 80,
  marginVertical: 20,
  width: 250,
},
Header:{
  backgroundColor: 'rgba(150, 40, 27, 1)',
  padding:5,
},
content:{
  alignItems: 'center',
  marginVertical: 20,
},
images: {
  marginVertical:0,
  width:50,
  height:50,
},
ftbutton1: {
  backgroundColor:'rgba(189, 195, 199, 1)',
  width: 206,
  padding: 20,
  color: '#FFFFFF',
  alignItems: 'center',
},
ftbutton2: {
  backgroundColor:'rgba(25, 181, 254, 1)',
  width: 206,
  padding: 20,
  color: '#FFFFFF',
  alignItems: 'center',
},
footer: {
  backgroundColor:'rgba(150, 40, 27, 1)',
  
}
});
export default Pages