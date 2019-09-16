import React,{ Component } from 'react';
import { StyleSheet,Image,Alert} from 'react-native';
import { Container,Text, Content,Header, Footer, Icon,Body,CardItem, FooterTab, Title,Button, View, Item,Card,Label,Picker,Input } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
export default class riskstatus extends Component {
    state = {
        dm_gender:'',
        dtd_type:'',
        dtd_location:'',
        auhter_type:'',
        dtd_image:'',
        dtd_date:'',
        dm_id:'',
        at_id:'',
        checkstatus: '',
    }
    componentDidMount() {
        const { navigation } = this.props;
        const dtd_date = navigation.getParam('dtd_date', '');
        const dtd_image = navigation.getParam('dtd_image', '');
        const dtd_location = navigation.getParam('dtd_location', '');
        const dtd_type = navigation.getParam('dtd_type', '');
        const dtd_status = navigation.getParam('dtd_status', '');
        const dm_id = navigation.getParam('dm_id', '');
        const at_id = navigation.getParam('at_id', '');
        this.setState({
            dm_gender: dtd_status
          });
          this.setState({
            dm_id: dm_id
          });
          this.setState({
            dtd_type: dtd_type
          });
          this.setState({
            dtd_location: dtd_location
          });
          this.setState({
            dtd_image: dtd_image
          });
          this.setState({
            dtd_date: dtd_date
          });
          this.setState({
            at_id: at_id
          });
    }
    
    changeGender(value) {
        this.setState({
          dm_gender: value
        });
      }

      comments(value) {
        this.setState({
            auhter_type: value
        });
      }
      Savedata=()=>{
        let idcheck = this.state.dtd_date ;
        const arraydata  = [];
        if(this.state.dm_id){
            const data ={
                at_id :this.state.at_id,
                dm_id : this.state.dm_id,
                dtd_status : this.state.dm_gender,
                dtd_location : this.state.dtd_location,
                dtd_type : this.state.dtd_type,
                dtd_image : this.state.dtd_image,
                dtd_date : this.state.dtd_date,
                dtd_comment : this.state.auhter_type,
            }
            arraydata.push(data);
            try {
              AsyncStorage.getItem('detailmanagement').then((value) =>{
                if(value !=null){
                      const d = JSON.parse(value);
                      const postsItems = d.filter(function(e){ return e.dtd_date != idcheck });
                      postsItems.push(data) 
                      AsyncStorage.setItem('detailmanagement', JSON.stringify(postsItems)).then(()=>{
                        this.setState({
                          checkstatus:'1'
                        })
                      })
                      
                }else{
                  AsyncStorage.setItem('detailmanagement',  JSON.stringify(arraydata)).then(()=>{
                    this.setState({
                      checkstatus:'1'
                    })
                  
                  })
                }
              })
              AsyncStorage.getItem('localdetailmanagement').then((values) =>{
                if(values !=null){
                      const ddaasa = JSON.parse(values);
                      const postsItemssasa = ddaasa.filter(function(e){ return e.dtd_date != idcheck });
                      postsItemssasa.push(data) 
                      AsyncStorage.setItem('localdetailmanagement', JSON.stringify(postsItemssasa)).then(()=>{
                      
                      })
                      
                }else{
                  AsyncStorage.setItem('localdetailmanagement',  JSON.stringify(arraydata)).then(()=>{
                      
                  })
                }
              })

            }catch(err){
              console.log(err);
            }
        }
        else{
          this.setState({
            checkstatus:'2'
          })
        }
       
    }
    render() {
        var  {navigate} = this.props.navigation;
        const { navigation } = this.props;
        const {dtd_date}=this.state;
        var day= parseInt(dtd_date.substring(0,4))
        day+=543
    const date=  dtd_date.substring(8,10)+"-"+dtd_date.substring(5,7)+"-"+day+"   เวลา : "+dtd_date.substring(11);
        return (
            <Container>
            <Header style={styles.Header}>
              <Body>
                <Title style={styles.headertext}>
                <Image style={styles.images} source={require('../image/small-logo.png')} />
                แก้ไขสถานะพฤติกรรมเสี่ยง</Title>
              </Body>
            </Header>
            <Content>
            <View style={styles.content}>
            <Image style={styles.images1} source={{ uri: `http://wangkhondaeng.prachinburi.police.go.th/img/risk-img/${this.state.dtd_image}`}} /> 
            </View>
            <View style={styles.textpanel}>
                <Card style={{width:'90%'}}>
                    <CardItem >
                         <Text>วันที่ :  {date} น.</Text>
                     </CardItem>
                </Card>
                <Card style={{width:'90%'}}>
                    <CardItem >
                         <Text >พื้นที่ที่พบเห็น :  {this.state.dtd_location}</Text>
                     </CardItem>
                </Card>
                <Card style={{width:'90%'}}>
                    <CardItem>
                    <Text >ประเภทผู้มีพฤติกรรมเสี่ยง :  {this.state.dtd_type}</Text>
                     </CardItem>
                </Card>
                <Card style={{width:'90%'}}>
                    <CardItem >
                    <Item picker>
                           <Label>สถานะ  : </Label>
                             <Picker
                               mode="dropdown"
                               iosIcon={<Icon name="arrow-down" />}
                               style={{ width: undefined}}
                               placeholder="เลือก เพศ"
                               placeholderStyle={{ color: "#bfc6ea" }}
                               placeholderIconColor="#007aff"
                               selectedValue={this.state.dm_gender}
                               onValueChange={this.changeGender.bind(this)}
                             >
                               <Picker.Item label="ผู้มีพฤติกรรมเสี่ยง" value="ผู้มีพฤติกรรมเสี่ยง" />
                               <Picker.Item label="ยกเลิกผู้มีพฤติกรรมเสี่ยง" value="ยกเลิกผู้มีพฤติกรรมเสี่ยง" />
                             </Picker>
                           </Item>
                     </CardItem>
                     <CardItem >
                     {this.state.dm_gender=='ยกเลิกผู้มีพฤติกรรมเสี่ยง' ?  
                    <Item>
              <Label>หมายเหตุ : </Label>
              <Input 
                value={this.state.auhter_type}
                onChangeText={(auhter_type) => this.comments(auhter_type)}
              />
            </Item> 
                 :  null }
                  </CardItem>
                </Card>
                {
                  (this.state.checkstatus=='1' ? <Text style={styles.checkstatus1}>แก้ไขสถานะพฤติกรรมเสี่ยงเรียบร้อย</Text> : null)
                }
                {
                    (this.state.checkstatus=='2' ? <Text style={styles.checkstatus2}>กรอกข้อมูลให้ครบ !!</Text> : null)
                }
                <Button success style={styles.ftbutton1}  onPress={this.Savedata}><Text> แก้ไขสถานะ</Text></Button>
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
    checkstatus1:{
      marginLeft: '15%',
      marginTop:10,
    },
    checkstatus2:{
      marginLeft: '28.5%',
      marginTop:10,
    },
    textpanel:{
        marginLeft:'10%',
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
        marginLeft:0,
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
    width: '40%',
    marginLeft: '28%',
    marginVertical: 30,
    textAlign: 'center',
    padding: 10,
    color: '#000',
    },
    footer: {
      backgroundColor:'rgba(150, 40, 27, 1)',
    }
  });
  