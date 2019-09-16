import React,{ Component } from 'react';
import { StyleSheet,Image} from 'react-native';
import { Item,Label,Container,Text, Content,Header,Picker, Footer, Icon,Body, FooterTab, Title,Button, View ,Card,CardItem,Right} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
export default  class Viewdata extends Component{
    
  constructor(props){
      super(props);
      this.state  ={
        list: [],
        dtd_type:'2',
        dates: [],
        detailmanagement: [],
        isLoading: true
    }
  }
componentDidMount(){
  this.show();
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
        let datadetailmanagement = await AsyncStorage.getItem('localdetailmanagement');
        if(datadetailmanagement==null){
           datadetailmanagement = await AsyncStorage.getItem('detailmanagement');
          let  detailmanagement  = JSON.parse(datadetailmanagement);
          this.setState({
            detailmanagement: detailmanagement
            });
        }
        else{
          let  detailmanagement  = JSON.parse(datadetailmanagement);
        this.setState({
          detailmanagement: detailmanagement
          });
        }

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
      console.disableYellowBox = true;
        var  {navigate} = this.props.navigation;
        const { list} = this.state;
        const { dtd_type} = this.state;
        const { detailmanagement} = this.state;
        const { navigation } = this.props;
        const { dates } = this.state;
        return(
        <Container>
        <Header style={styles.Header}>
          <Body>
            <Title style={styles.headertext}>
            <Image source={require('../image/small-logo.png')} />
               ข้อมูลผู้มีพฤติกรรมการกระทำผิดกฎหมาย</Title>
          </Body>
        </Header>
        <Content>
        <Item picker style={{color:'rgba(198, 198, 198, 1)'}}>
            <Label style={{marginLeft:'30%'}}>ข้อมูลพฤติกรรมเสี่ยง</Label>
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
        <View style={styles.content}>
           {list.map((item,  index) =>{
             if(dtd_type==1){
                return (
                detailmanagement.map((item1,  index1) => {
                  const datevv = item1.dtd_date.substring(0,10);
                  if(JSON.stringify(datevv) == JSON.stringify(dates) && JSON.stringify(item.dm_id)==JSON.stringify(item1.dm_id))
                  {
                       
                        return  (
                          <Card>
                          <CardItem style={styles.carditems}>
                            <Text>{item.dm_prefix} {item.dm_name +"\n"}เพศ: {item.dm_gender}   อายุ: {item.dm_age}</Text>
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
                  }
                }))
             }
             else {
              return  (
                <Card>
                <CardItem style={styles.carditems}>
                  <Text>{item.dm_prefix} {item.dm_name +"\n"}เพศ: {item.dm_gender}   อายุ: {item.dm_age}</Text>
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
             }
           })}
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
  carditems:{
      width:'100%',
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
  ftbutton1: {
    width: 67,
    height: 40,
    marginRight:-10,
  },
  footer: {
    backgroundColor:'rgba(150, 40, 27, 1)',
    
  }
});