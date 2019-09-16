import React,{ Component } from 'react';
import { StyleSheet,Image,ScrollView } from 'react-native';
import { Item,Input,Container,Text, Content,Header, Footer, Icon,Body, FooterTab, Title,Button, View,Card,CardItem } from 'native-base';
import  { createFilter } from 'react-native-search-filter';
import AsyncStorage from '@react-native-community/async-storage';
const KEYS_TO_FILTERS = ['dm_idcard', 'dm_prefix' ,'dm_name'];
export default  class editdata extends Component{
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
                if(Account==null){
                  this.props.navigation.push('update')
                }
                else{
                  this.setState({
                    list: Account
                    });
                }
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
      const filteredEmails = list.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
        return(
        <Container>
        <Header style={styles.Header}>
          <Body>
            <Title style={styles.headertext}>
            <Image style={styles.images} source={require('../image/small-logo.png')} />
            แก้ไขข้อมูลผู้มีพฤติกรรมการกระทำผิดกฎหมาย</Title>
          </Body>
        </Header>
        <Content>
         <View style={styles.imgpeople}> 
           <Item>
             <Text style={[styles.textheaderSearch]}>ค้นหา : </Text>
            <Input style={[styles.searchInput]}  maxLength={13} onChangeText={(term) => { this.searchUpdated(term) }} keyboardType='numeric'  placeholder="กรอกเลขบัตรประชาชน" />
             </Item>
            <ScrollView>
          {}
          {filteredEmails.map(email => {
             if(filteredEmails ==''){
             }
             else  {
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
                        this.props.navigation.push('editperson', {
                          id: email.dm_id,
                          idcard:email.dm_idcard,
                          prefix:email.dm_prefix,
                          name:email.dm_name,
                          gender:email.dm_gender,
                          age:email.dm_age,
                          image:email.dm_image,
                        })}
                 >
                   <Text>แก้ไขข้อมูล</Text>
                 </Button> 
                 <Button info style={styles.ftbutton2} 
                     onPress={() =>
                      this.props.navigation.push('editrisk', {
                        id: email.dm_id,
                      })}
                 >
                   <Text>แก้ไขพฤติกรรมเสี่ยง</Text>
                 </Button>
             </CardItem>
               </Card>
             )
             }
          })}
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
    fontSize: 13,
    alignItems: 'center',
    height:80,
 
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
  Header:{
    backgroundColor: 'rgba(150, 40, 27, 1)',
    padding:'5%',
    height:60,
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
    width: '13%',
    padding: 10,
    marginRight:'1%',
    marginLeft:'2%',
    color: 'rgba(46, 49, 49, 1)',
  },
  ftbutton2: {
    backgroundColor:'rgba(247, 202, 24, 1)',
    width: '18%',
    padding: 10,
    color: 'rgba(46, 49, 49, 1)',
  },
  footer: {
    backgroundColor:'rgba(150, 40, 27, 1)',
    
  },
  carditems:{
    width:1000,
},
  searchInput:{
    padding: 0,
    borderColor: '#CCC',
    borderWidth: 1
  },
});