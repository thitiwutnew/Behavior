import React,{ Component } from 'react';
import { StyleSheet,Image,BackHandler,Alert} from 'react-native';
import { Item,Input,Label,Container,Text, Content,Header, Footer, Icon,Body, FooterTab, Title,Button, View, Form } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';
export default  class add extends Component{
 
   state = {
      idcardnumber: '',
      image: '',
      fullname: '',
      gender: '',
      age: ''
    }
          onChangeidcardnumber(idcardnumber) {
            this.setState({idcardnumber})
          } 
          onChangeimage (image){
            this.setState({image})
          }
          onChangefullname (fullname){
            this.setState({fullname})
          }
          onChangegender(gender){
            this.setState({gender})
          }
          onChangeage (age){
            this.setState({age})
          }

          handleChoosePhoto = () => {
            const options = {
              noData: true,
            };
            ImagePicker.launchImageLibrary(options, response => {
              if (response.uri) {
                this.setState({ photo: response });
              }
            });
          };

          Savedata(){
            const arraydata  =[];
              if(this.state.idcardnumber && this.state.fullname && this.state.age && this.state.gender && this.state.image){
                  const data ={
                    idcardnumber: this.state.idcardnumber,
                    fullname: this.state.fullname,
                    age: this.state.age,
                    image: this.state.image,
                    gender: this.state.gender
                  }
                  arraydata.push(data);
                  try {
                    AsyncStorage.getItem('dt_management').then((value) =>{
                      if(value !==null){
                            const d = JSON.parse(value);
                            d.push(data) 
                            AsyncStorage.setItem('dt_management', JSON.stringify(d)).then(()=>{
                              this.props.navigator.push({
                                Component: Lists
                            })
                            })
                      }else{
                        AsyncStorage.setItem('dt_management',  JSON.stringify(arraydata)).then(()=>{
                            this.props.navigator.push({
                                Component: Lists
                            })
                        })
                      }
                    })

                  }catch(err){
                    console.log(err);
                  }
              }
              else{
                Alert.alert("เพิ่มข้อมูลไม่สำเร็จ");
              }
          }

    render(){
        
      const { photo } = this.state;
      const {idcardnumber} = this.state
      const {fullname} = this.state
      const {age} = this.state
      const {gender} = this.state
      const {image} = this.state
      
        return(
         <View style={styles.imgpeople}> 
         <Text style={styles.textheader}>เพิ่มข้อมูลผู้มีพฤติกรรมการกระทำผิดกฎหมาย</Text>
         {photo && (
            <Image
              source={{ uri: photo.uri }}
              style={{ width: 150, height: 150 }}
              value={this.state.image}
            />
          )}
           <Button info  style={styles.submit1} onPress={this.handleChoosePhoto}><Text>เลือกรูปภาพ</Text></Button>
          </View>
            <Form>
            <Item floatingLabel style={styles.formpanel}>
              <Label>รหัสบัตรประชาชน   : </Label>
              <Input 
                    keyboardType='numeric'
                    maxLength={13}
                    value={this.state.idcardnumber}
                    onChangeText={(this)=>this.onChangeidcardnumber(idcardnumber)}
              />
            </Item>
            <Item floatingLabel style={styles.formpanel}>
              <Label>ชื่อ - นามสกุล   : </Label>
              <Input 
                value={this.state.fullname}
                onChangeText={(this)=>this.onChangefullname(fullname)}
              />
            </Item>
            <Item floatingLabel style={styles.formpanel}>
              <Label>เพศ   : </Label>
              <Input
              value={this.state.gender}
              onChangeText={(this)=>this.onChangegender(gender)}
              />
            </Item>
            <Item floatingLabel style={styles.formpanel}>
              <Label>อายุ   : </Label>
              <Input
              keyboardType='numeric'
              maxLength={3}
              value={this.state.age}
              onChangeText={(this)=>this.onChangeage(age)}
              />
            </Item>
            <Button success style={styles.submit} onPress={() => this.Savedata()}>
              <Text>เพิ่มข้อมูล</Text>
            </Button>
          </Form>
        );
    }
}

const styles = StyleSheet.create({
  headertext:{
    padding: 40,
    fontSize: 13,
    alignItems: 'center',
 
  },
  textheader:{
    marginVertical: 20,
    width:323,
    backgroundColor: 'rgba(150, 40, 27, 1)',
    padding:10,
    color: '#fff',
    borderRadius: 15,
  },
  Buttonbody: {
    margin : 80,
    marginVertical: 20,
    width: 250,
  },
  textpanel:{
    padding:7,
  },
  formpanel:{
    color:'#000',
  },
  Header:{
    backgroundColor: 'rgba(150, 40, 27, 1)',
    padding:5,
  },
  contents:{
    alignItems: 'center',
    marginVertical: 80,
  },
  imgpeople:{
    flex: 1, 
    alignItems: 'center',
     justifyContent: 'center',
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
    
  },
  submit:{
    width:  110,
    marginLeft: 150,
    marginVertical: 30,
    textAlign: 'center',
    borderRadius: 15,
    padding: 10,
    color: '#000',
  },
  
  submit1:{
    width:  125,
    marginLeft: 150,
    marginVertical: 30,
    textAlign: 'center',
    borderRadius: 15,
    padding: 10,
    color: '#000',
  },
});