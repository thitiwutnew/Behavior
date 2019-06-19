import React,{ Component } from 'react';
import { StyleSheet,Image,BackHandler,TouchableOpacity} from 'react-native';
import { Item,Input,Label,Container,Text, Content,Header, Footer, Icon,Body, FooterTab, Title,Button, View, Form } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';
import addd from './viewww';
export default  class viewww extends Component{
    constructor(){
        super()
        this.state  ={
            list: ''
        }
        try{
            AsyncStorage.getItem('dt_managements1').then((value)=>{
                            this.setState({
                                list: value
                            })
            })
        } catch(err){

        }
    }
    render(){
        const data = this.state.list
        return(
            <Text>{data}</Text>
        )
    }

}