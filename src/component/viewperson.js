import React,{ Component } from 'react';
import { StyleSheet,Image,BackHandler,FlatList,ActivityIndicator,Alert } from 'react-native';
import { Container,Text, Content,Header, Footer, Icon,Body,Right, FooterTab, Title,Button, View, CardItem,Card } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
export default  class Viewdata extends Component{

      state  ={
        authorities: [],
        isLoading: true
       
    }
  
componentDidMount(){
  this.show();
}
show = async()=>{
    try{
        let data = await AsyncStorage.getItem('authorities');
        let  Account  = JSON.parse(data);
        this.setState({
            authorities: Account
          });

    }
    catch(error){
      
    }
    
}
detile =(i,a,t,m) =>{
    Alert.alert(
      'ข้อมูลรายละเอียด',
      'รหัสประจำตัว : '+i+'\n'+' ชื่อ-นามสกุล : '+a+'\n'+'ตำแหน่งงาน : '+t+'\n',
      
      );
  }
    render(){
        var  {navigate} = this.props.navigation;
        const { authorities } = this.state;
        const { navigation } = this.props;
        return(
        <Container>
        <Header style={styles.Header}>
          <Body>
            <Title style={styles.headertext}>
            <Image style={styles.images} source={require('../image/logo.png')} />
            ข้อมูลพนักงานเจ้าหน้าที่</Title>
          </Body>
        </Header>
        <Content>
        <View style={styles.content}>
           {authorities.map((item, index) =>{
                return  (
                    <Card>
                    <CardItem style={styles.carditems}>
                      <Text>ชื่อ - นามสกุล : {item.at_name}</Text>
                        <Right>
                            <Button info  onPress={() =>
                      this.props.navigation.push('viewdetilperson', {
                        id: item.at_id,
                      })}>
                        <Text>ข้อมูล</Text></Button>
                        </Right>
                     </CardItem>
                   </Card>
                )
           })}
           <Text>{ authorities.at_id }</Text>
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