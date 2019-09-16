import React,{ Component } from 'react';
import { StyleSheet,Image,BackHandler, ScrollView, RefreshControl} from 'react-native';
import { Container,Text, Content,Header, Footer, Icon,Body, FooterTab, Title,Button, View ,Card,CardItem} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
export default  class viewdetilperson extends Component{
  
  state = {
    authoritiessss: [],
    
  };

  componentDidMount(){
    this.show();
  }
 
  show = async()=>{
    try{
        let data1 = await AsyncStorage.getItem('authorities');
        let  Account1  = JSON.parse(data1);
     
            this.setState({
                authoritiessss: Account1,
              });
       
  }
  catch(error){}
    }
    render(){
      console.disableYellowBox = true;
      var  {navigate} = this.props.navigation;
      const { navigation } = this.props;
      const id = navigation.getParam('id', '');
      const { authoritiessss } = this.state;
        return(
        <Container>
        <Header style={styles.Header}>
          <Body>
            <Title style={styles.headertext}>
            <Image style={styles.images} source={require('./image/logo.png')} />
            ดูข้อมูลเจ้าหน้าที่พนักงาน</Title>
          </Body>
        </Header>
        <Content>
        <View style={{flex: 1, flexDirection: 'row'}}>
              {authoritiessss.map((item, index) =>{
                  if(id==item.at_id){
                    const img =item.at_image;
                    return  (
                      <Card style={{marginLeft:30,marginTop:5,width:360}}>
                          <CardItem>
                            <Body>
                              <Image  style={styles.imagesperson} source={{ uri: `http://wangkhondaeng.prachinburi.police.go.th/img/risk-img/${img}`}} />
                              <Text>รหัสประจำตัว : {item.at_code}</Text>      
                              <Text>ชื่อ - นามสกุล : {item.at_name} </Text>
                              <Text>ตำแหน่งงาน : {item.at_position}</Text>
                            </Body>
                          </CardItem>
                      </Card>
                    )
                  }
                    })}
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
    padding: 40,
    fontSize: 13,
    alignItems: 'center',
 
  },
  Fixleft:{
    paddingLeft: -10,
  },
  Buttonbody: {
    alignContent:'center',
    marginTop:20,
    marginLeft:30,
    width: 80,
    height:80,
  },
  Buttonbody2: {
    alignContent:'center',
    marginTop:20,
    marginLeft:10,
    width: 80,
    height:80,
  },
  Header:{
    backgroundColor: 'rgba(150, 40, 27, 1)',
    padding:5,
  },
  content:{
    alignItems: 'center',
    marginVertical: 80,
  },
  images: {
    marginVertical:0,
    width:50,
    height:50,
  },
  imagesperson: {
    marginLeft:90,
    marginBottom:20,
    marginVertical:0,
    width:150,
    height:170,
    borderRadius:5,
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
  textheaderdata:{
    width:120,
    height:35,
    marginLeft: 30,
    marginTop:20,
    backgroundColor: 'rgba(150, 40, 27, 1)',
    padding:5,
    color: '#fff',
    borderRadius: 3,
  },
});