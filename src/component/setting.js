import React,{ Component } from 'react';
import { StyleSheet,Image,BackHandler} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Container,Text, Content,Header, Footer, Icon,Body, List, ListItem,  FooterTab, Title,Button, View,Left, Right } from 'native-base';
import Input from './fromsetting';
const STORAGE_KEY = 'Account'

export default  class add extends Component{
  state = {name: '1234'}

  componentWillMount() {
    this.load()
  }

  load = async () => {
    try {
      const name = await AsyncStorage.getItem(STORAGE_KEY)

      if (name !== null) {
        this.setState({name})
      }
    } catch (e) {
      console.error('Failed to load name.')
    }
  }

  save = async (name) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, name)

      this.setState({name})
    } catch (e) {
      console.error('Failed to save name.')
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
            <Image style={styles.images} source={require('../image/logo.png')} />
            ตั้งค่าระบบทั่วไป</Title>
          </Body>
        </Header>
        <View style={styles.container}> 
        <Content style={styles.panelsetting}>
          <List>
          <ListItem onPress={()=>navigate("Account")}>  
             <Left>
                <Text>ตั้งค่าผู้ใช้งาน</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" style={{color:'#000'}} />
              </Right>
            </ListItem>
            <ListItem  onPress={()=>navigate("update_password")}>
             <Left>
                <Text> เปลี่ยนรหัสยืนยันตัวตน</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" style={{color:'#000'}} />
              </Right>
            </ListItem>
          </List>
        </Content>
        </View>
        <Footer>
          <FooterTab>
          <Button active style={styles.footer} onPress={()=>navigate("Main",{})}>
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
    container: {
        flex: 1,
        marginVertical: 0,
        alignItems: 'center',
        backgroundColor: 'rgba(218, 223, 225,1)',
      },
  headertext:{
    padding: 40,
    fontSize: 13,
    alignItems: 'center',
 
  },
  panelsetting:{
    width:430,
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