import React,{ Component } from 'react';
import { StyleSheet,Image} from 'react-native';
import { Container,Text, Content,Header, Footer, Icon,Body,CardItem, FooterTab, Title,Button, View, Left,Card } from 'native-base';

export default class detail_risk extends Component {
    render() {
        const { navigation } = this.props;
        const dtd_date = navigation.getParam('dtd_date', '');
        const dtd_image = navigation.getParam('dtd_image', '');
        const dtd_location = navigation.getParam('dtd_location', '');
        const dtd_type = navigation.getParam('dtd_type', '');
        const dtd_status = navigation.getParam('dtd_status', '');
        var  {navigate} = this.props.navigation;
        var day= parseInt(dtd_date.substring(0,4))
        day+=543
        const date=  dtd_date.substring(8,10)+"-"+dtd_date.substring(5,7)+"-"+day+"   เวลา : "+dtd_date.substring(10);
        return (
            <Container>
            <Header style={styles.Header}>
              <Body>
                <Title style={styles.headertext}>
                <Image source={require('../image/small-logo.png')} />
                รายละเอียดข้อมูลพฤติกรรมเสี่ยง</Title>
              </Body>
            </Header>
            <Content>
            <View style={styles.content}>
            <Image style={styles.images1} source={{ uri: `http://wangkhondaeng.prachinburi.police.go.th/img/risk-img/${dtd_image}`}} /> 
            </View>
            <View style={styles.textpanel}>
                <Card>
                    <CardItem >
                         <Text>วันที่ :  {date} น.</Text>
                     </CardItem>
                </Card>
                <Card>
                    <CardItem >
                        <Text>สถานะ :  {dtd_status}</Text>
                     </CardItem>
                </Card>
                <Card>
                    <CardItem >
                         <Text >พื้นที่ที่พบเห็น :  {dtd_location}</Text>
                     </CardItem>
                </Card>
                <Card>
                    <CardItem>
                    <Text >ประเภทผู้มีพฤติกรรมเสี่ยง :  {dtd_type}</Text>
                     </CardItem>
                </Card>
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
        )
    }
    
}
const styles = StyleSheet.create({
    headertext:{
      fontSize: 13,
      alignItems: 'center',
      height:80,
   
    },
    textpanel:{
        marginLeft:'5%',
        width: '90%',
    },
    Header:{
      backgroundColor: 'rgba(150, 40, 27, 1)',
      padding:'5%',
      height:60,
    },
    content:{
      alignItems: 'center',
      marginVertical: 10,
    },
    images1: {
      marginVertical:10,
      width:150,
      height:150,
    },
    footer: {
      backgroundColor:'rgba(150, 40, 27, 1)',
      
    }
  });
  