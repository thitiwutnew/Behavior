import React,{ Component } from 'react';
import { StyleSheet,Image,BackHandler} from 'react-native';
import { Container,Text, Content,Header, Footer, Icon,Body, FooterTab, Title,Button, View } from 'native-base';
import { Actions  } from 'react-native-router-flux';
export default  class main extends Component{
 
    render(){
      var  {navigate} = this.props.navigation;
        return(
        <Container>
        <Header style={styles.Header}>
          <Body>
            <Title style={styles.headertext}>
            <Image style={styles.images} source={require('./image/logo.png')} />
            จัดการข้อมูลผู้มีพฤติกรรมการกระทำผิดกฎหมาย</Title>
          </Body>
        </Header>
        <Content>
        <View style={styles.content}>
        <Button block  success active style={styles.Buttonbody} onPress={()=>navigate("Addpage",{})}>
        <Icon name="add" />
            <Text>เพิ่มข้อมูลผู้มีพฤติกรรมเสี่ยง</Text>
          </Button>
          <Button block success style={styles.Buttonbody}>
          <Icon name="create" />
            <Text>แก้ไขข้อมูลผู้มีพฤติกรรมเสี่ยง</Text>
          </Button>
          <Button block success style={styles.Buttonbody} onPress={()=>navigate("Viewdata",{})}>
          <Icon name="contacts" />
            <Text>ดูข้อมูลผู้มีพฤติกรรมเสี่ยง</Text>
          </Button>
          <Button block success style={styles.Buttonbody} onPress={()=>navigate("update",{})}>
          <Icon name="swap" />
            <Text> ระบบอัพเดตข้อมูล </Text>
          </Button>
          <Button block success style={styles.Buttonbody} onPress={()=>navigate("setting",{})}>
          <Icon name="swap" />
            <Text> ตั่งค่า </Text>
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
    padding: 40,
    fontSize: 13,
    alignItems: 'center',
 
  },
  Buttonbody: {
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
    marginVertical: 80,
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