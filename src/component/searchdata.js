import React,{ Component } from 'react';
import { StyleSheet,Image,BackHandler,Alert,ScrollView,TouchableOpacity } from 'react-native';
import { Item,Input,Label,Container,Text, Content,Header,Picker, Footer, Icon,Body, FooterTab, Title,Button, View, Form,Card,CardItem,Right } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
const KEYS_TO_FILTERS = ['dm_idcard', 'dm_prefix' ,'dm_name'];
export default  class add extends Component{
          state = {
            list:[],
            searchTerm: '',
          };
          componentDidMount(){
            this.show();
          }
       
          show = async()=>{
            try{
                let data = await AsyncStorage.getItem('dt_managements');
                let  Account  = JSON.parse(data);
                this.setState({
                  list: Account
                  });
          
            }
            catch(error){
              
            }
            
          }
          searchUpdated(term) {
           this.setState({ searchTerm: term })
          }

    render(){
      console.disableYellowBox = true;
      var  {navigate} = this.props.navigation;
      const { navigation } = this.props;
      const { list } = this.state;
      const { searchTerm } = this.state;
      const filteredEmails = list.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
        return(
        <Container>
        <Header style={styles.Header}>
          <Body>
            <Title style={styles.headertext}>
            <Image style={styles.images} source={require('../image/logo.png')} />
            ค้นหาข้อมูลผู้มีพฤติกรรมการกระทำผิดกฎหมาย</Title>
          </Body>
        </Header>
        <Content>
         <View style={styles.imgpeople}> 
           <Item>
             <Text style={[styles.textheaderSearch]}>ค้นหา : </Text>
            <Input style={[styles.searchInput]} value={this.state.searchTerm}  maxLength={13} onChangeText={(term) => { this.searchUpdated(term) }} keyboardType='numeric'  placeholder="กรอกเลขบัตรประชาชน" />
             </Item>
            <ScrollView>
          {filteredEmails.map(email => {
              if(this.state.searchTerm==''){

              }
              else{
                return (
                  <Card>
                  <CardItem style={styles.carditems}>
                     <Body>
                     <Text>รหัสบัตรประชาชน : {email.dm_idcard} </Text>
                     <Text>           ชื่อ-นามสกุล : {email.dm_prefix} {email.dm_name} </Text>
                     <Text>                         เพศ : {email.dm_gender} </Text>
                     <Text>                         อายุ : {email.dm_age} </Text>
                     </Body>
                   </CardItem>
                   <CardItem footer>
                  <Button info style={styles.ftbutton1} 
                      onPress={() =>
                          this.props.navigation.push('Add_behavior', {
                            id: email.dm_id,
                          })}
                   >
                     <Text>เพิ่มข้อมูลพฤติกรรม</Text>
                   </Button>
               </CardItem>
                 </Card>
               )
               
              }
          })}
             <Button info style={styles.addftbutton1} 
                    onPress={() =>
                        this.props.navigation.push('Addpage', {idperson: searchTerm })}
                 >
                   <Text>เพิ่มข้อมูลผู้มีพฤติกรรมเสี่ยง</Text>
                 </Button>
        </ScrollView>
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
  textheader:{
    marginVertical: 20,
    width:340,
    backgroundColor: 'rgba(150, 40, 27, 1)',
    padding:10,
    color: '#fff',
    borderRadius: 15,
  },
  textheaderSearch:{
    marginVertical: 20,
    alignItems: 'center',
    width:70,
    backgroundColor: 'rgba(34, 49, 63, 1)',
    padding:11,
    height:50,
    color: '#fff',
  },
  Buttonbody: {
    margin : 80,
    marginVertical: 20,
    width: 250,
  },
  textpanel:{
    padding:7,
  },
  formpanel:{
    color:'#000',
  },
  Header:{
    backgroundColor: 'rgba(150, 40, 27, 1)',
    padding:5,
  },
  contents:{
    alignItems: 'center',
    marginVertical: 80,
  },
  imgpeople:{
    flex: 1, 
    alignItems: 'center',
     justifyContent: 'center',
  },
  images: {
    marginVertical:0,
    width:50,
    height:50,
  },
  ftbutton1: {
    backgroundColor:'rgba(25, 181, 254, 1)',
    width: 370,
    padding: 20,
    paddingLeft: 130,
    color: 'rgba(46, 49, 49, 1)',
  },
  addftbutton1: {
    marginVertical: 20,
    backgroundColor:'rgba(38, 166, 91, 1)',
    width: 420,
    padding: 20,
    paddingLeft: 130,
    color: 'rgba(46, 49, 49, 1)',
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
  submit:{
    width:  110,
    marginLeft: 150,
    marginVertical: 30,
    textAlign: 'center',
    borderRadius: 15,
    padding: 10,
    color: '#000',
  },
  
  submit1:{
    width:  125,
    marginLeft: 150,
    marginVertical: 30,
    textAlign: 'center',
    borderRadius: 15,
    padding: 10,
    color: '#000',
  },
  carditems:{
    width:1000,
},
  emailItem:{
    borderBottomWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.3)',
    padding: 10
  },
  emailSubject: {
    color: 'rgba(0,0,0,0.5)',
    width:  1000,
  },
  searchInput:{
    padding: 0,
    borderColor: '#CCC',
    borderWidth: 1
  },
});