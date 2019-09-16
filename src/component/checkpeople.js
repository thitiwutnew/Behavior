import React,{ Component } from 'react';
import { StyleSheet,Image,Alert,ScrollView } from 'react-native';
import { Item,Input,Container,Text, Content,Header, Footer, Icon,Body, FooterTab, Title,Button, View,Card,CardItem } from 'native-base';
import { createFilter } from 'react-native-search-filter';
import AsyncStorage from '@react-native-community/async-storage';
const KEYS_TO_FILTERS = ['dm_idcard'];
export default  class checkpeople extends Component{
          state = {
            list:[],
            searchTerm:'0',
            checkpeople:'',
            dm_id:'',
            chk:'',
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
            if(term.length === 13) {
              let sum=0;
              let i=0;
              let numchk=0;
              let count =0;

              for( i; i<=11;i++){
                numchk=term[i];
                count=13-i;
                sum =sum+(numchk*count);
              }
            
              if((11-(sum%11))%11 == term[12]){
                this.setState({dm_id:term.substring(8,13)}) 
                this.setState({ searchTerm: term })}
              else{Alert.alert("เลขบัตรประชาชนไม่ถูกต้อง!!"); }
            }
            else{
              this.setState({ searchTerm: term })
              this.setState({ dm_id: '' })
              if(term==''){
               this.setState({ searchTerm: '0' })
              }
            }
          }

    render(){
      console.disableYellowBox = true;
      var  {navigate} = this.props.navigation;
      const { navigation } = this.props;
      const { list } = this.state;
      const { searchTerm } = this.state;
      const { dm_id } = this.state;
      const filteredEmails = list.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS,"55555"))
        let cgheck=0;
        return(
        <Container>
        <Header style={styles.Header}>
          <Body>
            <Title style={styles.headertext}>
            <Image source={require('../image/small-logo.png')} />
            ตรวจสอบข้อมูลผู้มีพฤติกรรมการกระทำผิดกฎหมาย</Title>
          </Body>
        </Header>
        <Content>
         <View style={styles.imgpeople}> 
           <Item>
             <Text style={[styles.textheaderSearch]}>ตรวจสอบ : </Text>
            <Input style={[styles.searchInput]}  maxLength={13} onChangeText={(term) => { this.searchUpdated(term) }} keyboardType='numeric'  placeholder="กรอกเลขบัตรประชาชน" />
             </Item>
            <ScrollView>
          {
        
              filteredEmails.map(email => {
            
             if(searchTerm !='0'){
             
                return (
                    cgheck=1,
                    <Card>
                    <CardItem style={styles.carditems}>
                       <Body>
                       <Text>รหัสบัตรประชาชน : {email.dm_idcard} </Text>
                       <Text>ชื่อ-นามสกุล            : {email.dm_prefix} {email.dm_name} </Text>
                       <Text>เพศ :   {email.dm_gender}                อายุ :   {email.dm_age} </Text>
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
       
          })
          }
            {  ( dm_id.length==5 && cgheck!=1 ?  <Button info style={styles.addftbutton1}   onPress={() =>this.props.navigation.push('Addpage', { idperson:  searchTerm,dm_id: dm_id })} >
                        <Text>เพิ่มข้อมูลผู้มีพฤติกรรมเสี่ยง</Text></Button> :  null )}
         
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
    width:100,
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
  ftbutton1: {
    backgroundColor:'rgba(25, 181, 254, 1)',
    width: '20%',
    padding: 20,
    marginLeft : '9%',
    alignContent: 'center',
    color: 'rgba(46, 49, 49, 1)',
  },
  addftbutton1: {
    alignItems:'center',
    backgroundColor:'rgba(38, 166, 91, 1)',
    width: '100%',
    padding: 20,
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