'use strict';
import React,{ Component } from 'react';
import { StyleSheet,Image,Alert} from 'react-native';
import { Item,Input,Label,Container,Text, Content,Header,Picker, Footer, Icon,Body, FooterTab, Title,Button, View, Form } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';
let id ;
let idcard ;
let prefix ;
let name ;
let gender ;
let age ;
let image ;

export default  class editperson extends Component{
    state = {
        dm_id: '',
        dm_prefix: 'นาย',
        dm_firstname:'',
        dm_lastname: '',
        dm_age: '',
        dm_gender: 'ชาย',
        dm_idcard: '',
        dm_image: '',
        photofilename:'',
        photo:null,
        photos:null,
        showimg:null,
        dt_managements:[],
        checkstatus:'',
      };
          componentDidMount(){
            const { navigation } = this.props;
             id = navigation.getParam('id', '');
             idcard = navigation.getParam('idcard', '');
             prefix = navigation.getParam('prefix', '');
             name = navigation.getParam('name', '');
             gender = navigation.getParam('gender', '');
             age = navigation.getParam('age', '');
             image = navigation.getParam('image', '');
             
             const  findname=name.indexOf(" ");
            this.setState({
                dm_idcard:  idcard,
            })
            this.setState({
                showimg:  image,
            })
            this.setState({
                dm_prefix:  prefix,
            })
            this.setState({
              dm_firstname:  name.substring(0,findname),
            })
            this.setState({
              dm_lastname:  name.substring(findname+1),
          })
            this.setState({
                dm_gender:  gender,
            })
            this.setState({
                dm_age:  age,
            })
            this.setState({
                dm_id:  id,
            })

            this.show();

          }
         
          show = async()=>{
            try{
                let data = await AsyncStorage.getItem('dt_managements');
                let  Account  = JSON.parse(data);
                this.setState({
                    dt_managements: Account
                  });


          }
          catch(error){}


            }
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
              let idcheck = this.state.dm_id ;
            const arraydata  = [];
              if(this.state.dm_prefix && this.state.dm_firstname && this.state.dm_lastname && this.state.dm_age && this.state.dm_gender && this.state.dm_idcard && this.state.showimg){
                  const data ={
                    dm_id :this.state.dm_id,
                    dm_prefix : this.state.dm_prefix,
                    dm_name : this.state.dm_firstname+" "+this.state.dm_lastname,
                    dm_age : this.state.dm_age,
                    dm_gender : this.state.dm_gender,
                    dm_idcard : this.state.dm_idcard,
                    dm_image : this.state.showimg
                  }
                  arraydata.push(data);
                  try {
                    AsyncStorage.getItem('dt_managements').then((value) =>{
                      if(value !==null){
                            const d = JSON.parse(value);
                            const postsItems = d.filter(function(e){ return e.dm_id != idcheck });
                            postsItems.push(data) 
                           
                            AsyncStorage.setItem('dt_managements', JSON.stringify(postsItems)).then(()=>{
                              this.setState({
                                checkstatus:'แก้ไขข้อมูลผู้มีพฤติกรรมเรียบร้อย'
                              })
                            })
                            
                      }else{
                        AsyncStorage.setItem('dt_managements',  JSON.stringify(arraydata)).then(()=>{
                          
                          this.setState({
                            checkstatus:'แก้ไขข้อมูลผู้มีพฤติกรรมเรียบร้อย'
                          })
                        })
                      }
                    })
                    AsyncStorage.getItem('localdt_managements').then((values) =>{
                      if(values !==null){
                            const ddaasa = JSON.parse(values);
                            const postsItemssasa = ddaasa.filter(function(e){ return e.dm_id != idcheck });
                            postsItemssasa.push(data) 
                            
                            AsyncStorage.setItem('localdt_managements', JSON.stringify(postsItemssasa)).then(()=>{
                             
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
                Alert.alert("กรอกข้อมูลให้ครบ!!");
              }
             
          }
          
    render(){
        var  {navigate} = this.props.navigation;
        const { navigation } = this.props;
        return(
        <Container>
        <Header style={styles.Header}>
          <Body>
            <Title style={styles.headertext}>
            <Image  source={require('../image/small-logo.png')} />
            แก้ไขข้อมูลผู้มีพฤติกรรมการกระทำผิดกฎหมาย</Title>
          </Body>
        </Header>
        <Content>
        <View style={{flex: 1, flexDirection: 'row'}}>
                       
                       <Form style={{width:400,marginTop:30}}>
                       <Image 
                             source={{ uri: `http://wangkhondaeng.prachinburi.police.go.th/img/risk-img/${this.state.showimg}` }}
                             style={styles.imgpeople}
                           />
                       <Item style={{marginTop:20}}>
                             <Label style={{marginBottom:20}}>รหัสบัตรประชาชน  : {this.state.dm_idcard}</Label>
                            
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
                               <Picker.Item label="เด็กชาย" value="เด็กชาย" />
                               <Picker.Item label="เด็กหญิง" value="เด็กหญิง" />
                             </Picker>
                           </Item>
                           <Item  style={styles.formpanel}>
                             <Label>ชื่อ   : </Label>
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
                           <Item  style={styles.formpanel}>
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
                             <Text>   แก้ไขข้อมูล</Text>
                           </Button>
                         </Form>
        </View>
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
     width: 150,
      height: 150,
      marginTop:15,
      marginLeft:'33%',
  },
  footer: {
    backgroundColor:'rgba(150, 40, 27, 1)',
    
  },
  submit:{
    width:  '35%',
    marginLeft: '33%',
    marginVertical: 30,
    borderRadius: 15,
    padding: 10,
    color: '#000',
  },
  checkstatus:{
    marginLeft: '22%',
    marginTop:10,
  }
});