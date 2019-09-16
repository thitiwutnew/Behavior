import React,{ Component } from 'react';
import { StyleSheet,BackHandler,Image,Alert} from 'react-native';
import { Container,Text,Item,Label, Content,Header, Footer, Icon,Body,Right, FooterTab,Picker, Title,Button, View, CardItem,Card,Left } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';

export default  class viewdetil extends Component{
  
state  ={
  detailmanagement: [],
  isLoading: true,
  dt_managements: [],
  dtd_type:'2',
  dates: [],
  isLoading: true
 
}

  componentDidMount(){
    this.showdetailmanagement();
    var that = this;
        
    let date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    if(date==1){date="01"}
    if(date==2){date="02"}
    if(date==3){date="03"}
    if(date==4){date="04"}
    if(date==5){date="05"}
    if(date==6){date="06"}
    if(date==7){date="07"}
    if(date==8){date="08"}
    if(date==9){date="09"}
    if(month==1){month="01"}
    if(month==2){month="02"}
    if(month==3){month="03"}
    if(month==4){month="04"}
    if(month==5){month="05"}
    if(month==6){month="06"}
    if(month==7){month="07"}
    if(month==8){month="08"}
    if(month==9){month="09"}
    that.setState({
      dates: year+ '-' + month + '-' + date,
    });
  }
  
  showdetailmanagement = async()=>{
    try{
        let data1 = await AsyncStorage.getItem('detailmanagement');
        let  Account1  = JSON.parse(data1);
        this.setState({
          detailmanagement: Account1
          });
        let data = await AsyncStorage.getItem('dt_managements');
        let  Account  = JSON.parse(data);
        this.setState({
            dt_managements: Account
          });
  
    }
    catch(error){
      
    }
}
onValueChange2(value) {
  this.setState({
     auhter_type: null,
    dtd_type: value
  });
}
        render(){
            const { navigation } = this.props;
            const id = navigation.getParam('id', '');
            const img = navigation.getParam('img', '');
            let imagepp = JSON.stringify(img)
            var  {navigate} = this.props.navigation;
            const { detailmanagement } = this.state;
            const { dt_managements } = this.state;
            const { dtd_type } = this.state;
            const { dates } = this.state;
        return(
            <Container>
            <Header style={styles.Header}>
              <Body>
                <Title style={styles.headertext}>
                <Image source={require('../image/small-logo.png')} />
                รายละเอียดข้อมูลผู้มีพฤติกรรมเสี่ยง</Title>
              </Body>
            </Header>
            <Content>
            <View style={styles.content}>
            <Image style={styles.images1} source={{ uri: `http://wangkhondaeng.prachinburi.police.go.th/img/risk-img/${img}`}} />
           {dt_managements.map((items,  index) =>{
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
            <Item picker style={{color:'rgba(198, 198, 198, 1)'}}>
            <Label style={{marginLeft:'10%'}}>รายละเอียดข้อมูลพฤติกรรมเสี่ยง</Label>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                placeholder="การแสดงข้อมูล"
                selectedValue={this.state.dtd_type}
                onValueChange={this.onValueChange2.bind(this)}
              >
                <Picker.Item label="วันนี้" value="1" />
                <Picker.Item label="ทั้งหมด" value="2" />
              </Picker>
            </Item>
           {
               detailmanagement.map((item,  index) =>{
                const datevv =item.dtd_date.substring(0,10);
                 if(dtd_type=="1" &&  JSON.stringify(datevv)==JSON.stringify(dates)){
                    if((id)==item.dm_id){
                      var day= parseInt(item.dtd_date.substring(0,4))
                      day+=543
                      const date=  item.dtd_date.substring(8,10)+"-"+item.dtd_date.substring(5,7)+"-"+day+" เวลา : "+item.dtd_date.substring(10);
                      return  (
                          <Card>
                          <CardItem style={styles.carditems}>
                            <Text>วันที่ : {date}{"\n"}
                           สถานที่ : {item.dtd_location} </Text>
                            <Right>
                             <Button info style={styles.ftbutton1} 
                              onPress={() =>
                                  this.props.navigation.push('detail_risk', {
                                    dtd_date: item.dtd_date,
                                    dtd_location: item.dtd_location,
                                    dtd_type: item.dtd_type,
                                    dtd_status: item.dtd_status,
                                    dtd_image: item.dtd_image,
                                  })}
                           ><Text>ข้อมูล</Text></Button>
                            </Right>
                           </CardItem>
                         </Card>
                      )
                     }
                 }
                 else if(dtd_type=="2"){
                  if((id)==item.dm_id){
                    var day= parseInt(item.dtd_date.substring(0,4))
                    day+=543
                    const date=  item.dtd_date.substring(8,10)+"-"+item.dtd_date.substring(5,7)+"-"+day+" เวลา : "+item.dtd_date.substring(10);
                    return  (
                        <Card>
                        <CardItem style={styles.carditems}>
                          <Text>วันที่ : {date}{"\n"}
                         สถานที่ : {item.dtd_location} </Text>
                          <Right>
                           <Button info style={styles.ftbutton1} 
                            onPress={() =>
                                this.props.navigation.push('detail_risk', {
                                  dtd_date: item.dtd_date,
                                  dtd_location: item.dtd_location,
                                  dtd_type: item.dtd_type,
                                  dtd_status: item.dtd_status,
                                  dtd_image: item.dtd_image,
                                })}
                         ><Text>ข้อมูล</Text></Button>
                          </Right>
                         </CardItem>
                       </Card>
                    )
                   }
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
  carditems:{
      width:'100%',
  },
  Buttonbody: {
    margin : 80,
    marginVertical: 20,
    width: 250,
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
