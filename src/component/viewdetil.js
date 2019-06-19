import React,{ Component } from 'react';
import { StyleSheet,BackHandler,Image,Alert} from 'react-native';
import { Container,Text, Content,Header, Footer, Icon,Body,Right, FooterTab, Title,Button, View, CardItem,Card } from 'native-base';
import dt_detailmanagement from '../data/dt_detailmanagement.json';
import data from '../data/Account.json';

export default  class viewdetil extends Component{
  
  detile =(i,a,t,m) =>{
    Alert.alert(
      'รายละเอียดพฤติกรรมเสี่ยง',
      'วันที่ : '+i+'\n'+' สถานที่ : '+a+'\n'+'ประเภทพฤติกรรมเสี่ยง : '+t+'\n'+ 'สถานะผู้มีพฤติกรรมเสี่ยง : '+m
      +'\n\n'+'รูปภาพประกอบ '+'\n',
      
      );
  }
 
        render(){
            const { navigation } = this.props;
            const id = navigation.getParam('id', '');
            const img = navigation.getParam('img', '');
            let imagepp = JSON.stringify(img)
            var  {navigate} = this.props.navigation;
        return(
            <Container>
            <Header style={styles.Header}>
              <Body>
                <Title style={styles.headertext}>
                <Image style={styles.images} source={require("../image/logo.png")} />
                จัดการข้อมูลผู้มีพฤติกรรมการกระทำผิดกฎหมาย</Title>
              </Body>
            </Header>
            <Content>
            <View style={styles.content}>
            
            <Text>ข้อมูลผู้มีพฤติกรรมเสี่ยง</Text>
            <Image style={styles.images1} source={{ uri: `http://192.168.1.102/Risk-behavior/image/${img}`}} />
           {data.map((items,  index) =>{
               if((id)==items.dm_id)
                return  (
                    <Card>
                    <CardItem style={styles.carditems}>
                      <Text>รหัสบัตรประชาชน : {items.dm_idcard}
                      {"\n"}
                      ชื่อ - นามสกุล          :  {items.dm_prefix} {items.dm_name} 
                      {"\n"}
                      เพศ    :    {items.dm_gender}              อายุ :  {items.dm_age}
                      </Text>
                     </CardItem>
                   </Card>
                )
           })}
        </View>
            <View style={styles.content}>
            <Text>รายละเอียดข้อมูลผู้มีพฤติกรรมเสี่ยง</Text>
           {
               dt_detailmanagement.map((item,  index) =>{
               if((id)==item.dm_id){
                return  (
                    <Card>
                    <CardItem style={styles.carditems}>
                      <Text>วันที่ : {item.dtd_date}     สถานที่ : {item.dtd_location} </Text>
                      <Right>
                      <Button info style={styles.ftbutton1} 
                      onPress={() =>
                      this.detile(item.dtd_date,
                      item.dtd_location,
                      item.dtd_type,
                      item.dtd_status)}><Text>ข้อมูล</Text></Button>
                      </Right>
                     </CardItem>
                   </Card>
                )
               }
           }
           )
           }
        </View>
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
        )
        }
    }
const styles = StyleSheet.create({
  headertext:{
    padding: 40,
    fontSize: 13,
    alignItems: 'center',
 
  },
  carditems:{
      width:400,
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
    marginVertical: 10,
  },
  images: {
    marginVertical:0,
    width:50,
    height:50,
  },
  images1: {
    marginVertical:10,
    width:150,
    height:150,
  },
  ftbutton1: {
    width: 67,
    height: 40,
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
