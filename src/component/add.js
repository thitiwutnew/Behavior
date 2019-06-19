import React,{ Component } from 'react';
import { StyleSheet,Image,BackHandler,Alert} from 'react-native';
import { Item,Input,Label,Container,Text, Content,Header,Picker, Footer, Icon,Body, FooterTab, Title,Button, View, Form } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';
import addd from './viewww';
export default  class add extends Component{
          state = {
            dm_id: '',
            dm_prefix: 'ชาย',
            dm_name: '',
            dm_age: '',
            dm_gender: '',
            dm_idcard: '',
            dm_image:'',
            photofilename:'',
            photo:null,
          };
          changeIdcardnumber(dm_idcard){
            this.setState({dm_idcard})
          }
          changeProfix(dm_prefix){
            this.setState({dm_prefix})
          }
          changeImage (dm_image) {
            this.setState({dm_image})
          }
          changeFullname (dm_name){
            this.setState({dm_name})
          }
          changeGender(dm_gender){
            this.setState({dm_gender})
          }
          changeAge (dm_age) {
            this.setState({dm_age})
          }

          handleChoosePhoto = () => {
            const options = {
              noData: true,
            };
            ImagePicker.launchImageLibrary(options, response => {
              if (response.uri) {
                this.setState({ photo: response });
                this.setState({ photofilename: response.fileName });
              }
            });
          };
          onValueChange2(value: string) {
            this.setState({
              dm_prefix: value
            });
          }
          Savedata(){
            const arraydata  = [];
              if(this.state.dm_prefix && this.state.dm_name && this.state.dm_age && this.state.dm_gender && this.state.dm_idcard ){
                  const data ={
                    dm_id:' ',
                    dm_prefix : this.state.dm_prefix,
                    dm_name : this.state.dm_name,
                    dm_age : this.state.dm_age,
                    dm_gender : this.state.dm_gender,
                    dm_idcard : this.state.dm_idcard,
                    dm_image : this.state.photofilename
                  }
                  arraydata.push(data);
                  try {
                    AsyncStorage.getItem('dt_managements1').then((value) =>{
                      if(value !==null){
                            const d = JSON.parse(value);
                            d.push(data) 
                            AsyncStorage.setItem('dt_managements1', JSON.stringify(d)).then(()=>{
                              Alert.alert(JSON.stringify(arraydata));
                            })
                            
                      }else{
                        AsyncStorage.setItem('dt_managements1',  JSON.stringify(arraydata)).then(()=>{
                            
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
      var  {navigate} = this.props.navigation;
      const { photo } = this.state;
      
        return(
        <Container>
        <Header style={styles.Header}>
          <Body>
            <Title style={styles.headertext}>
            <Image style={styles.images} source={require('../image/logo.png')} />
            จัดการข้อมูลผู้มีพฤติกรรมการกระทำผิดกฎหมาย</Title>
          </Body>
        </Header>
        <Content>
         <View style={styles.imgpeople}> 
         <Text style={styles.textheader}>เพิ่มข้อมูลผู้มีพฤติกรรมการกระทำผิดกฎหมาย</Text>
         {photo && (
            <Image
              source={{ uri: photo.uri }}
              style={{ width: 150, height: 150 }}
              value={this.state.dm_image}
              onChangeText={(dm_image) => this.changeImage(dm_image)}
            />
          )}
           <Button info  style={styles.submit1} onPress={this.handleChoosePhoto}><Text>เลือกรูปภาพ</Text></Button>
          </View>
        <Form>
        <Item picker style={styles.formpanel}>
            <Label>    คำนำหน้า   : </Label>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder="Select your SIM"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.dm_prefix}
                onValueChange={this.onValueChange2.bind(this)}
              >
                <Picker.Item label="ชาย" value="key0" />
                <Picker.Item label="หญิง" value="key1" />
              </Picker>
            </Item>
            <Item floatingLabel style={styles.formpanel}>
              <Label>ชื่อ - นามสกุล   : </Label>
              <Input 
                value={this.state.dm_name}
                onChangeText={(dm_name) => this.changeFullname(dm_name)}
              />
            </Item>
            <Item floatingLabel style={styles.formpanel}>
              <Label>รหัสบัตรประชาชน   : </Label>
              <Input 
                    keyboardType='numeric'
                    maxLength={13}
                    value={this.state.dm_idcard}
                    onChangeText={(dm_idcard) => this.changeIdcardnumber(dm_idcard)}
              />
            </Item>
            <Item floatingLabel style={styles.formpanel}>
              <Label>เพศ   : </Label>
              <Input
              value={this.state.dm_gender}
              onChangeText={(dm_gender) => this.changeGender(dm_gender)}
              />
            </Item>
            <Item floatingLabel style={styles.formpanel}>
              <Label>อายุ   : </Label>
              <Input
              keyboardType='numeric'
              maxLength={3}
              value={this.state.dm_age}
              onChangeText={(dm_age) => this.changeAge(dm_age)}
              />
            </Item>
            <Button success style={styles.submit} onPress={() => this.Savedata()}>
              <Text>เพิ่มข้อมูล</Text>
            </Button>
            <Button active style={styles.footer} onPress={()=>navigate("viewww")}>
              <Icon name="home" />
              <Text>หน้าหลัก</Text>
            </Button>
          </Form>
        </Content>
        <Footer>
          <FooterTab>
          <Button active style={styles.footer} onPress={()=>navigate("Main")}>
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