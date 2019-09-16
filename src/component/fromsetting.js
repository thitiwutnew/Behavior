import React, { Component } from 'react'
import { Alert,TextInput, StyleSheet ,View,TouchableOpacity,Text} from 'react-native'

export default class Input extends Component {

  state = {
    text: '',
  }

  onChangeText = (text) => this.setState({text})

  onSubmitEditing = () => {
    const {onSubmitEditing} = this.props
    const {text} = this.state

    if (!text) return // Don't submit if empty

    onSubmitEditing(text)
    this.setState({text: ''})
    Alert.alert('         เปลี่ยนรหัสยืนยันสำเร็จ');
  
  }

  render() {
    const {placeholder} = this.props
    const {text} = this.state

    return (
        <View style={styles.container}>
        <Text style={styles.textbody}>เปลี่ยนรหัสยืนยันตัวตนใหม่</Text>
     <TextInput  style={styles.inputBox}
     value={text}
     placeholder={placeholder}
     onChangeText={this.onChangeText}
     underlineColorAndroid='rgba(0,0,0,0)'
     secureTextEntry={true}
     placeholderTextColor = "#000"
    />
    <TouchableOpacity  style={styles.submit} onPress={this.onSubmitEditing} >
        <Text>เปลี่ยนรหัสยืนยันตัวตน</Text>
  </TouchableOpacity>
  </View>
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
    inputBox:{
        marginVertical: 15,
        width:300,
        backgroundColor:'rgba(255,255,255,0.3)',
        borderRadius: 25,
        fontSize:10,
        paddingHorizontal:16,
        color:'#000',
        textAlign: 'center',
      },
      submit:{
        width:  200,
        marginVertical: 10,
        alignItems: 'center',
        textAlign: 'center',
        borderRadius: 15,
        padding: 10,
        color: '#000',
        backgroundColor:'rgba(240, 255, 0, 1)',
      },
      textbody:{
        marginVertical: 25,
        fontSize:16,
        color: '#000',
        alignItems: 'center',
      }
})
