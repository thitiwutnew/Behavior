'use strict';
import React,{ Component } from 'react';
import { StyleSheet,Image,Alert} from 'react-native';
import { Item,Input,Label,Container,Text, Content,Header,Picker, Footer, Icon,Body, FooterTab, Title,Button, View, Form } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';
import RNFetchBlob from 'rn-fetch-blob';
export default  class add extends Component{
          state = {
            dm_prefix: 'นาย',
            dm_firstname: '',
            dm_lastname: '',
            dm_age: '',
            dm_gender: 'ชาย',
            dm_image:'',
            photofilename:'',
            photo:null,
            photos:null,
            showimg:null,
            checkstatus:'',
          };
          changeProfix(dm_prefix){
            this.setState({dm_prefix})
          }
          changeImage (dm_image) {
            this.setState({dm_image})
          }
          changefirstname (dm_firstname){
            this.setState({dm_firstname})
          }
          changelastname (dm_lastname){
            this.setState({dm_lastname})
          }
          changeAge (dm_age) {
            this.setState({dm_age})
          }

          handleChoosePhoto = () => {
        
            const options = {
              title: 'เลือกรูปภาพ',
              takePhotoButtonTitle:'กล้องถ่ายรูป',
              chooseFromLibraryButtonTitle:'เลือกรูปภาพจากโฟลเดอร์',
              storageOptions: {
                skipBackup: true,
                path: 'Risk-behavior',
              },
            };
            ImagePicker.showImagePicker(options, (response) => {
              if (response.didCancel) {
                console.log('User cancelled image picker');
              } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
              } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
              } else {
                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.setState({ photo: response.uri.substring(10) });
                this.setState({ photos: response.data });
                this.setState({ photofilename: response.fileName });
                this.setState({ showimg: response.uri });
              }
            });
          };
          onValueChange2(value) {
            this.setState({
              dm_prefix: value
            });
          }
          changeGender(value) {
            this.setState({
              dm_gender: value
            });
          }
          Savedata=()=>{
            const { navigation } = this.props;
            const idperson = navigation.getParam('idperson', '');
            const dm_id = navigation.getParam('dm_id', '');
            const arraydata  = [];
              if(this.state.dm_prefix && this.state.dm_firstname && this.state.dm_lastname && this.state.dm_age && this.state.dm_gender && idperson && this.state.photofilename){
                  const data ={
                    dm_id :dm_id,
                    dm_prefix : this.state.dm_prefix,
                    dm_name : this.state.dm_firstname+" "+this.state.dm_lastname,
                    dm_age : this.state.dm_age,
                    dm_gender : this.state.dm_gender,
                    dm_idcard : idperson,
                    dm_image : this.state.photofilename,
                    dm_imageurl :  this.state.photo
                  }
                  arraydata.push(data);
                  try {
                    AsyncStorage.getItem('dt_managements').then((value) =>{
                      if(value !==null){
                            const d = JSON.parse(value);
                            d.push(data) 
                            AsyncStorage.setItem('dt_managements', JSON.stringify(d)).then(()=>{
                              RNFetchBlob.fetch('POST', 'http://wangkhondaeng.prachinburi.police.go.th/img/uploadimg.php', {
                                Authorization : "Bearer access-token",
                                otherHeader : "foo",
                                'Content-Type' : 'multipart/form-data',
                              }, [
                                { name : 'image', filename : this.state.photofilename, data: this.state.photos}
                              ]).then((resp) =>  resp.json()) 
                              .then((resp) => {
                                this.setState({photos:null})
                              })
                              this.props.navigation.navigate('Add_behavior', {id: dm_id, });
                            })
                            
                      }else{
                        AsyncStorage.setItem('dt_managements',  JSON.stringify(arraydata)).then(()=>{
                          RNFetchBlob.fetch('POST', 'http://wangkhondaeng.prachinburi.police.go.th/img/uploadimg.php', {
                            Authorization : "Bearer access-token",
                            otherHeader : "foo",
                            'Content-Type' : 'multipart/form-data',
                          }, [
                            // element with property `filename` will be transformed into `file` in form data
                            { name : 'image', filename : this.state.photofilename, data: this.state.photos}
                          ]).then((resp) =>  resp.json()) 
                          .then((resp) => {
                            this.props.navigation.navigate('Add_behavior', {id: dm_id, });
                          })
                        })
                      }
                    })
                    AsyncStorage.getItem('localdt_managements').then((values) =>{
                      if(values !==null){
                            const dd = JSON.parse(values);
                            dd.push(data) 
                            AsyncStorage.setItem('localdt_managements', JSON.stringify(dd)).then(()=>{
                             
                            })
                            
                      }else{
                        AsyncStorage.setItem('localdt_managements',  JSON.stringify(arraydata)).then(()=>{
                            
                        })
                      }
                    })

                  }catch(err){
                    console.log(err);
                  }
              }
              else{
                this.setState({
                  checkstatus:'** กรอกข้อมูลให้ครบ'
                })
              }
             
          }
          
    render(){
      var  {navigate} = this.props.navigation;
      const { showimg } = this.state;
      const { photo } = this.state;
      const { navigation } = this.props;
      const idperson = navigation.getParam('idperson', '');
        return(
        <Container>
        <Header style={styles.Header}>
          <Body>
            <Title style={styles.headertext}>
            <Image source={require('../image/small-logo.png')} />
            เพิ่มข้อมูลผู้มีพฤติกรรมการกระทำผิดกฎหมาย</Title>
          </Body>
        </Header>
        <Content>
         <View style={styles.imgpeople}> 
         {photo && (
            <Image
              source={{ uri: showimg }}
              style={{ width: 150, height: 150,marginTop:10}}
              value={this.state.dm_image}
              onChangeText={(dm_image) => this.changeImage(dm_image)}
            />
          )}
           <Button info  style={styles.submit1} onPress={this.handleChoosePhoto}><Text>  เลือกรูปภาพ</Text></Button>
        
          </View>
        <Form>
        <Item  style={styles.formpanel}>
              <Label>รหัสบัตรประชาชน   : </Label>
              <Input  disabled 
                    keyboardType='numeric'
                    maxLength={13}
                    value={idperson}
                    onChangeText={(dm_idcard) => this.changeIdcardnumber(dm_idcard)}
              />
            </Item>
        <Item picker>
            <Label style={{marginLeft:15}}>คำนำหน้า   : </Label>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                placeholder="เลือก คำนำหน้า"
                selectedValue={this.state.dm_prefix}
                onValueChange={this.onValueChange2.bind(this)}
              >
                <Picker.Item label="นาย" value="นาย" />
                <Picker.Item label="นาง" value="นาง" />
                <Picker.Item label="นางสาว" value="นางสาว" />
                <Picker.Item label="เด็กชาย" value="เด็กชาย" />
                <Picker.Item label="เด็กหญิง" value="เด็กหญิง" />
              </Picker>
            </Item>
            <Item  style={styles.formpanel}>
              <Label>ชื่อ    : </Label>
              <Input 
                value={this.state.dm_firstname}
                onChangeText={(dm_firstname) => this.changefirstname(dm_firstname)}
              />
            </Item>
            <Item  style={styles.formpanel}>
              <Label>นามสกุล   : </Label>
              <Input 
                value={this.state.dm_lastname}
                onChangeText={(dm_lastname) => this.changelastname(dm_lastname)}
              />
            </Item>
            <Item picker>
            <Label style={{marginLeft:15}}>เพศ   : </Label>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined}}
                placeholder="เลือก เพศ"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.dm_gender}
                onValueChange={this.changeGender.bind(this)}
              >
                <Picker.Item label="ชาย" value="ชาย" />
                <Picker.Item label="หญิง" value="หญิง" />
              </Picker>
            </Item>
            <Item style={styles.formpanel}>
              <Label>อายุ   : </Label>
              <Input
              keyboardType='numeric'
              maxLength={2}
              value={this.state.dm_age}
              onChangeText={(dm_age) => this.changeAge(dm_age)}
              />
            </Item>
            {
              (this.state.checkstatus!=null ? <Text style={styles.checkstatus}>{this.state.checkstatus}</Text> : null)
            }
            <Button success style={styles.submit} onPress={this.Savedata}>
              <Text>ต่อไป</Text>
              <Icon name="arrow-forward" style={{color:'#fff'}} />
            </Button>
          </Form>
        </Content>
        <Footer>
          <FooterTab>
          <Button active style={styles.footer} onPress={()=>navigate("Main")}>
              <Icon name="home" />
              <Text>หน้าหลัก</Text>
            </Button>
            <Button style={styles.footer} onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" style={{color:'#fff'}} />
            <Text style={{color:'#fff'}}>ย้อนกลับ</Text>
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
    height:80,
  },
  checkstatus:{
    marginLeft: '32%',
    marginVertical: 10,
    color: '#000',
  },
  checkmark: {
    backgroundColor: 'rgba(0, 230, 64, 1)',
  },
  formpanel:{
    color:'#000',
    marginTop:0,
    padding:5,
  },
  Header:{
    backgroundColor: 'rgba(150, 40, 27, 1)',
    padding:'5%',
    height:60,
  },
  imgpeople:{
    flex: 1, 
    alignItems: 'center',
     justifyContent: 'center',
  },
  footer: {
    backgroundColor:'rgba(150, 40, 27, 1)',
    
  },
  submit:{
    width: '32%',
    marginLeft: '35%',
    marginVertical: 30,
    textAlign: 'center',
    borderRadius: 15,
    padding: 10,
    color: '#000',
  },
  
  submit1:{
    width:  '37%',
    marginLeft: '30%',
    marginVertical: 30,
    textAlign: 'center',
    borderRadius: 15,
    padding: 10,
    color: '#000',
  },
});