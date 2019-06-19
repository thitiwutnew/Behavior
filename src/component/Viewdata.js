import React,{ Component } from 'react';
import { StyleSheet,Image,BackHandler,FlatList,ActivityIndicator} from 'react-native';
import { Container,Text, Content,Header, Footer, Icon,Body,Right, FooterTab, Title,Button, View, CardItem,Card } from 'native-base';
import data from '../data/Account.json';
import dt_detailmanagement from '../data/dt_detailmanagement.json'
import AsyncStorage from '@react-native-community/async-storage';
import viewdetil from './viewdetil';
export default  class Viewdata extends Component{
    
  constructor(props){
      super(props);
      this.state  ={
        isLoading: true,
        list: [],
    }
  }
componentDidMount(){
  this.show();
}
show = async()=>{
 AsyncStorage.getItem('dt_managements1').then((response) => {
  this.setState({
    list: response
});
 
})
  console.log("sdfsdfsdf" , this.state.list)
  alert(JSON.this.state.list.dm_id);
}
    render(){
        var  {navigate} = this.props.navigation;
        const { list} = this.state;
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
        <View style={styles.content}>
           {data.map((item,  index) =>{
                return  (
                    <Card>
                    <CardItem style={styles.carditems}>
                      <Text>{item.dm_prefix} {item.dm_name}      เพศ: {item.dm_gender}   อายุ: {item.dm_age}</Text>
                      <Right>
                      <Button info style={styles.ftbutton1} 
                        onPress={() =>
                            this.props.navigation.push('detile', {
                              id: item.dm_id,
                              img: item.dm_image,
                            })}
                     ><Text>ข้อมูล</Text></Button>
                      </Right>
                     </CardItem>
                   </Card>
                )
           })}
           <Text>{ list}</Text>
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