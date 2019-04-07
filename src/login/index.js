import React,{ Component } from 'react';
import { View,StyleSheet,Text,Image,TouchableOpacity,TextInput,Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const STORAGE_KEY = 'Account'
var chkpass='';
export default class index extends Component{
  state = {inputpassword: null}
  componentWillMount() {
    this.load()
  }

  load = async () => {
    try {
      const password = await AsyncStorage.getItem(STORAGE_KEY)
      if(password !=null){
         chkpass =password;
      }
    } catch (e) {
      console.error('Failed to load name.')
    }
    
  }
  checklogin = () => {
  
      const {inputpassword} = this.state;
        if(inputpassword ==null){
          Alert.alert('กรุณา กรอกรหัสยืนยัน');
        }
        else if(inputpassword==chkpass){
        this.props.navigation.navigate("Main")
        }
        else if(inputpassword!=chkpass){
          state = {inputpassword:null}
          Alert.alert("รหัสยืนยันไม่ถูกต้อง")
        }
       
  }
  
    render(){
        return(
          <View style={styles.container}>
                <Image style={styles.images} source={require('../image/siren.png')} />
            <Text>ระบบจัดการความเสี่ยงต่อพฤติกรรมการกระทำผิดกฎหมาย</Text>
             <TextInput  style={styles.inputBox}
             autoFocus ={true}
               value={this.state.inputpassword}
               onChangeText={(text) => this.setState({ inputpassword: text })}
             underlineColorAndroid='rgba(0,0,0,0)'
             placeholder="รหัสยืนยันตัวตน"
             secureTextEntry={true}
             placeholderTextColor = "#000"
            />
            <TouchableOpacity  style={styles.submit} onPress={this.checklogin} >
                <Text> ยืนยัน</Text>
          </TouchableOpacity>
          </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginVertical: 0,
      alignItems: 'center',
      backgroundColor: 'rgba(218, 223, 225,1)',
    },
    images: {
      marginVertical: 50,
      width:100,
      height:120,
    },
    text:{
      
    },
    wraning:{
      alignItems: 'center',
      textAlign: 'center',
    },
    inputBox:{
      marginVertical: 25,
      width:300,
      backgroundColor:'rgba(255,255,255,0.3)',
      borderRadius: 25,
      fontSize:16,
      paddingHorizontal:16,
      color:'#000',
      textAlign: 'center',
    },
    submit:{
      width:  100,
      marginVertical: 10,
      alignItems: 'center',
      textAlign: 'center',
      borderRadius: 15,
      padding: 10,
      color: '#000',
      backgroundColor:'rgba(240, 255, 0, 1)',
    }
  });