import React,{ Component } from 'react';
import { StyleSheet,Image} from 'react-native';
import { Container,Text, Content,Header, Footer, Icon,Body, FooterTab, Title,Button, Card, CardItem } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';
export default  class Add_behavior extends Component{
          state = {
            detailmanagement:[],
            date:'',
            dates:'',
            UserAccount:'',
           
          };

          componentDidMount() {
            var that = this;
            const { navigation } = this.props;
             DM_ID=navigation.getParam('id', '');
            var date = new Date().getDate(); //Current Date
            var month = new Date().getMonth() + 1; //Current Month
            var year = new Date().getFullYear(); //Current Year
            var hours = new Date().getHours(); //Current Hours
            var min = new Date().getMinutes(); //Current Minutes
            var sec = new Date().getSeconds(); //Current Seconds
        
            that.setState({
              //Setting the value of the date time
              date: date + '-' + month + '-' + year + ' เวลา : ' + hours + ':' + min+' น.',
              dates: year+ '-' + month + '-' + date + ' ' + hours + ':' + min,
            });
             this.show();

             AsyncStorage.getItem('UserAccount').then((value) =>{
              let  Account  = JSON.parse(value);
              this.setState({
                UserAccount: Account
                });
            })
          }
          show = async()=>{
            try{
                let data1 = await AsyncStorage.getItem('detailmanagement');
                let  Account1  = JSON.parse(data1);
                    this.setState({
                        detailmanagement: Account1,
                    });
          }
          catch(error){}
          }
      
        
          changeImage (dm_image) {
            this.setState({dm_image})
          }
          changeFullname (dtd_location){
            this.setState({dtd_location})
          }
          changeGender(dtd_type){
            this.setState({dtd_type})
          }
      
          handleChoosePhoto = () => {
            const options = {
              title: 'เลือกรูปภาพ',
              takePhotoButtonTitle:'กล้องถ่ายรูป',
              chooseFromLibraryButtonTitle:'เลือกรูปภาพจากโฟลเดอร์',
              storageOptions: {
                skipBackup: true,
                path: 'Risk-behavior',
              },
            };
            ImagePicker.showImagePicker(options, (response) => {
              if (response.didCancel) {
                console.log('User cancelled image picker');
              } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
              } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
              } else {
                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.setState({ photo: response.uri.substring(10) });
                this.setState({ photos: response.data });
                this.setState({ photofilename: response.fileName });
                this.setState({ showimg: response.uri });
              }
            });
          };
          onValueChange2(value) {
            this.setState({
               auhter_type: null,
              dtd_type: value
            });
          }
          risk_type(value){
            this.setState({
              auhter_type: value
            });
          }
          location(value){
            this.setState({
              tagItem: {
                tagId: 1,
                title: value
              }
            });
          }
    render(){
      const { navigation } = this.props;
      var  {navigate} = this.props.navigation;
      const id = navigation.getParam('id', '');
      const  {UserAccount} = this.state;
      let checkdata=0;
        return(
        <Container>
        <Header style={styles.Header}>
          <Body>
            <Title style={styles.headertext}>
            <Image style={styles.images} source={require('../image/small-logo.png')} />
            แก้ไขข้อมูลพฤติกรรมการกระทำผิดกฎหมาย</Title>
          </Body>
        </Header>
        <Content>
        {
               this.state.detailmanagement.map((item,  index) =>{
               if((id)===item.dm_id){
                 checkdata=1;
                 var day= parseInt(item.dtd_date.substring(0,4))
                    day+=543
                const date=  item.dtd_date.substring(8,10)+"-"+item.dtd_date.substring(5,7)+"-"+day+"   เวลา : "+item.dtd_date.substring(11);
                return  (
                    <Card>
                    <CardItem style={styles.carditems}>
                      <Text>วันที่ : {date}{" น.    \nประเภท : "+item.dtd_type+"\n"}สถานที่ : {item.dtd_location}</Text>
                     </CardItem>
                     <CardItem footer>
                     { UserAccount==item.at_id  ?  <Button info style={styles.ftbutton1} 
                        onPress={() =>
                            this.props.navigation.push('riskstatus', {
                                dm_id:item.dm_id,
                              dtd_date: item.dtd_date,
                              dtd_location: item.dtd_location,
                              dtd_type: item.dtd_type,
                              dtd_status: item.dtd_status,
                              dtd_image: item.dtd_image,
                              at_id: item.at_id,
                            })}
                     ><Text>แก้ไขสถานะ</Text></Button> : <Button info style={styles.ftbutton2}><Text>ไม่มีสิทธิแก้ไข</Text></Button> }
                    </CardItem>
                   </Card>
                )
               }
              })}
    {
           ( checkdata===0  ? <Text style={{ alignItems:'center',marginTop:50,marginLeft:55}}>ไม่พบข้อมูลพฤติกรรมการกระทำผิดกฎหมาย</Text> : null)
           }
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
  Header:{
    backgroundColor: 'rgba(150, 40, 27, 1)',
    padding:'5%',
    height:60,
  },
  images: {
    marginVertical:0,
    width:50,
    height:50,
  },
  ftbutton1: {
    backgroundColor:'rgba(247, 202, 24, 1)',
    width: '60%',
    padding: 20,
    color: '#000000',
    marginLeft:'21%',
    paddingLeft:'13%',
  },
  ftbutton2: {
    backgroundColor:'rgba(149, 165, 166, 1)',
    width: '60%',
    padding: 20,
    color: '#000000',
    alignContent:'center',
    paddingLeft:'12%',
    marginLeft:'21%',
    alignItems: 'center',
  },
  footer: {
    backgroundColor:'rgba(150, 40, 27, 1)',
    color:'#fff',
    alignContent: 'center',
  },
});