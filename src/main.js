import React,{ Component } from 'react';
import { StyleSheet,Image,BackHandler, ScrollView, RefreshControl} from 'react-native';
import { Container,Text, Content,Header, Footer, Icon,Body, FooterTab, Title,Button, View ,Card,CardItem} from 'native-base';
import { Actions  } from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';
  let chkid=0;
export default  class main extends Component{
  
  state = {
    authorities:[],
    detailmanagement:[],
    dt_managements:[],
    selected2: "",
    
  };
  componentDidMount(){
    this.show();
  }
 
  show = async()=>{
    try{

          AsyncStorage.getItem('authorities').then((value) =>{
            let  Account  = JSON.parse(value);
            this.setState({
              authorities: Account
              });
          })

        let data1 = await AsyncStorage.getItem('UserAccount');
        let  Account1  = JSON.parse(data1);
        if(data1!=null){
            this.setState({
                selected2: Account1,
              });
        }
        else{
            this.setState({
                selected2: "0"
              });
        }
  }
  catch(error){}
  chkid = 0;
    }
    render(){
      console.disableYellowBox = true;
      var  {navigate} = this.props.navigation;
      const { authorities } = this.state;
      const { selected2 } = this.state;
        return(
        <Container>
        <Header style={styles.Header}>
          <Body>
            <Title style={styles.headertext}>
            <Image source={require('./image/small-logo.png')} />
            จัดการข้อมูลผู้มีพฤติกรรมการกระทำผิดกฎหมาย</Title>
          </Body>
        </Header>
        <Content>
        <Text style={styles.textheaderdata}>ข้อมูลผู้ใช้งาน </Text>
        <View style={{flex: 1, flexDirection: 'row'}}>
              {authorities.map((item, index) =>{
                  if(selected2==item.at_id){
                    const img =item.at_image;
                    return  (
                      <Card style={{marginLeft:'7%',marginTop:5,width:'85%'}}>
                          <CardItem>
                            <Body>
                              <Text style={{marginTop:10}}>รหัสประจำตัว : {item.at_code}</Text>      
                              <Text style={{marginTop:15}}>ชื่อ - นามสกุล : {item.at_name} </Text>
                              <Text style={{marginTop:15,marginBottom:10}}>ตำแหน่งงาน : {item.at_position}</Text>
                            </Body>
                          </CardItem>
                      </Card>
                    )
                  }
                    })}
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
              <Button block  success active style={styles.Buttonbody} onPress={()=>navigate("checkpeople",{})}>
               
                <Text style={{fontSize:11,alignContent:'center',marginBottom:30}}>     <Icon  name="add" style={{fontSize: 30, color: '#fff'}} />{'\n'}เพิ่มข้อมูล</Text>
               
              </Button>
            <Button block success style={styles.Buttonbody2} onPress={()=>navigate("editdata",{})}>
              
                <Text style={{fontSize:11,alignContent:'center',marginBottom:30}}> <Icon name="create"  style={{fontSize: 30, color: '#fff'}}/>{'\n'}แก้ไข</Text>
              </Button>
            <Button block success style={styles.Buttonbody2} onPress={()=>navigate("Viewdata",{})}>
             
                <Text style={{fontSize:11,alignContent:'center',marginBottom:30}}>    <Icon name="contacts"  style={{fontSize: 30, color: '#fff'}}/>{'\n'}   ดูข้อมูล   </Text>
              </Button>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
           <Button block success style={styles.Buttonbody} onPress={()=>navigate("update",{})}>
             <Text style={{fontSize:11,alignContent:'center',marginBottom:30}}>    <Icon name="sync"  style={{fontSize: 30, color: '#fff'}}/>{'\n'} อัพเดต</Text>
           </Button>

           <Button block success style={styles.Buttonbody2} onPress={()=>navigate("Login",{idchk:'0'})}>
             <Text style={{fontSize:11,alignContent:'center',marginBottom:30}}>   <Icon name="swap"  style={{fontSize: 30, color: '#fff'}}/>{'\n'}  ล็อคเอ้า  </Text>
           </Button>
              
        </View>
        </Content>
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
        );
    }
}

const styles = StyleSheet.create({
  headertext:{
    fontSize: 13,
    alignItems: 'center',
    height:80,
 
  },
  Buttonbody: {
    marginTop:'10%',
    marginLeft: '7%',
    marginRight: '5%',
    width: '25%',
    height: '75%',
  },
  Buttonbody2: {
    marginTop:'10%',
    marginRight: '5%',
    width: '25%',
    height: '75%',
  },
  Header:{
    backgroundColor: 'rgba(150, 40, 27, 1)',
    padding:'5%',
    height:60,
  },
  footer: {
    backgroundColor:'rgba(150, 40, 27, 1)',
    
  },
  textheaderdata:{
    width:120,
    height:35,
    marginLeft: 30,
    marginTop:40,
    backgroundColor: 'rgba(150, 40, 27, 1)',
    padding:5,
    color: '#fff',
    borderRadius: 3,
  },
});