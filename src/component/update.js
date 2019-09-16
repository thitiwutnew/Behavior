import React, { Component } from 'react'
import { StyleSheet,Image,BackHandler,TextInput,Alert} from 'react-native';
import { Container,Text, Content,Header, Footer, Icon,Body, FooterTab, Title,Button, View ,CardItem,Card} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
class Pages extends Component {
  const 
      state = {
          dt_managementss: [],
          detailmanagements:[],
          localsaccount:[],
          chknetwork:'',
          date:null,
          tranfordate:null,
        }
        componentDidMount(){
          this.show();
        }
        show = async()=>{
            try{
                let dt_managementss = await AsyncStorage.getItem('localdt_managements');
                let  datadt_managementss  = JSON.parse(dt_managementss);
                this.setState({
                  dt_managementss: datadt_managementss
                  });

                let detailmanagements = await AsyncStorage.getItem('localdetailmanagement');
                let  datadetailmanagements  = JSON.parse(detailmanagements);
                this.setState({
                    detailmanagements: datadetailmanagements
                  });

                let dataaccount = await AsyncStorage.getItem('localaccount');
                let  datalocalsaccount  = JSON.parse(dataaccount);
                this.setState({
                  localsaccount: datalocalsaccount
                  });
                  
                let datadate1 = await AsyncStorage.getItem('dateupdate');
                let  datadatesqa  = JSON.parse(datadate1);
                 
                this.setState({
                          date: datadatesqa,
                          });
                          let tranfordate111 = await AsyncStorage.getItem('tranfordate');
                          let  tranfordate2222  = JSON.parse(tranfordate111);
                       
                              this.setState({
                                tranfordate: tranfordate2222,
                                });
        
            }
            catch(error){
              
            }
            
        }
  render() {
    var  {navigate} = this.props.navigation;
    const { dt_managements } = this.state;
    const { navigation } = this.props;
    return (
      <Container>
      <Header style={styles.Header}>
        <Body>
          <Title style={styles.headertext}>
          <Image  source={require('../image/small-logo.png')} />
          ระบบอัพเดตข้อมูล</Title>
        </Body>
      </Header>
      <View style={styles.container}> 
      <Content >
          <Button block info style={styles.Buttonbody} onPress={this.checknetwork}>
            <Text>ตรวจสอบสถานะ ฐานข้อมูล</Text>
          </Button>
          <Card style={{marginTop:20,backgroundColor:'rgba(218, 223, 225,1)',width:'100%'}}>
                  <CardItem> 
                  <Text style={styles.chkdataase}>สถานะ : {this.state.chknetwork}</Text>
                  </CardItem> 
                  <CardItem> 
                  {
                              this.state.chknetwork == 'พร้อมใช้งาน'? <View style={{marginTop:'5%'}}><Button block warning style={styles.Buttonbody1} onPress={this.updateauthorities}>
                              <Icon name="download" />
                                <Text  style={{marginTop:15}}>อัพเดตข้อมูล {"\n"}</Text>
                            </Button><Text style={{fontSize:10,marginLeft:'24%',marginTop:-15}}>{this.state.date}</Text></View> : null 
                  }
                   </CardItem>
                   <CardItem>
                    {
                      ((JSON.stringify(this.state.dt_managementss)!="null"|| JSON.stringify(this.state.detailmanagements)!="null") || (JSON.stringify(this.state.localsaccount)!="null"))&& this.state.chknetwork == 'พร้อมใช้งาน'?  <View><Button block success style={styles.Buttonbody1} onPress={this.Transfer_data}>
                      <Icon name="sync" />
                        <Text> ถ่ายโอนข้อมูล </Text>
                      </Button><Text style={{fontSize:10,marginLeft:'24%',marginTop:-15,marginBottom:'10%'}}>{this.state.tranfordate}</Text></View> : null 
                    }
                  </CardItem>
            </Card>
      </Content>
      </View>
      <Footer>
        <FooterTab>
        <Button active style={styles.footer} onPress={()=>navigate("Main",{})}>
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
  updateauthorities = () =>{
    var that = this;
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    if(date==1){date="01";}
    if(date==2){date="02";}
    if(date==3){date="03";}
    if(date==4){date="04";}
    if(date==5){date="05";}
    if(date==6){date="06";}
    if(date==7){date="07";}
    if(date==8){date="08";}
    if(date==9){date="09";}
    ///////////////////////////
    if(month==1){month="01";}
    if(month==2){month="02";}
    if(month==3){month="03";}
    if(month==4){month="04";}
    if(month==5){month="05";}
    if(month==6){month="06";}
    if(month==7){month="07";}
    if(month==8){month="08";}
    if(month==9){month="09";}

    year =year+543
    var chkdt_management=0;
    fetch("http://192.168.1.191/Myapp/src/component/updatedt_management.php", {
      method: "GET",
      headers:{
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then((response) => response.json())
    .then((response) => {
      this.setState({
        dt_managements: response
      });
        AsyncStorage.getItem('dt_managements').then((value) =>{
          AsyncStorage.setItem('dt_managements', JSON.stringify(response)).then(()=>{
            chkdt_management +=1;
          })
        })
    })

    fetch("http://192.168.1.191/Myapp/src/component/updateauthorities.php", {
      method: "GET",
      headers:{
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then((response) => response.json())
    .then((response) => {
      this.setState({
        authorities: response
      });
        AsyncStorage.getItem('authorities').then((value) =>{
          AsyncStorage.setItem('authorities', JSON.stringify(response)).then(()=>{
            chkdt_management +=1;
          })
        })
    })

    fetch("http://192.168.1.191/Myapp/src/component/updateaccount.php", {
      method: "GET",
      headers:{
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then((response) => response.json())
    .then((response) => {
      this.setState({
        account: response
      });
        AsyncStorage.getItem('account').then((value) =>{
          AsyncStorage.setItem('account', JSON.stringify(response)).then(()=>{
            chkdt_management +=1;
          })
        })
    })

    fetch("http://192.168.1.191/Myapp/src/component/updatedt_detailmanagement.php", {
      method: "GET",
      headers:{
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then((response) => response.json())
    .then((response) => {
      this.setState({
        detailmanagement: response
      });
        AsyncStorage.getItem('detailmanagement').then((value) =>{
          AsyncStorage.setItem('detailmanagement', JSON.stringify(response)).then(()=>{
            chkdt_management +=1;
            if(chkdt_management==4){
              let dates ='ล่าสุด วันที่  ' + date + '-' + month + '-' + year + ' เวลา : ' + hours + ':' + min+' น.';
              that.setState({
                //Setting the value of the date time
                date: dates,
              });
              
              AsyncStorage.setItem('dateupdate', JSON.stringify(dates)).then(()=>{
                
              })

              Alert.alert("               อัพเดตข้อมูลสำเร็จ")
              
            }
            else{
              Alert.alert("                อัพเดตข้อมูลไม่สำเร็จ")
            }
            
          })
        })
    })
  }

  Transfer_data = () =>{
    var that = this;
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear()+543; //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    if(date==1){date="01";}
    if(date==2){date="02";}
    if(date==3){date="03";}
    if(date==4){date="04";}
    if(date==5){date="05";}
    if(date==6){date="06";}
    if(date==7){date="07";}
    if(date==8){date="08";}
    if(date==9){date="09";}
    ///////////////////////////
    if(month==1){month="01";}
    if(month==2){month="02";}
    if(month==3){month="03";}
    if(month==4){month="04";}
    if(month==5){month="05";}
    if(month==6){month="06";}
    if(month==7){month="07";}
    if(month==8){month="08";}
    if(month==9){month="09";}

    year =year+543
    let checkdetailmanagement="";
    let checkdt_managements="";
    let checkaccount="";
    let checkupdate=0;
    
    if((JSON.stringify(this.state.dt_managementss)!="null" || JSON.stringify(this.state.detailmanagements)!="null") || (JSON.stringify(this.state.localsaccount)!="null"))
      {
        if(JSON.stringify(this.state.dt_managementss)!="null"){
          {
            this.state.dt_managementss.map((item,  index) =>{

              return  (
                          fetch('http://192.168.1.191/Myapp/src/component/upload_dt_management.php', {
                          method: 'POST',
                          headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json"
                          },
                          body: JSON.stringify({
                      
                            dm_id : item.dm_id,
                            dm_prefix : item.dm_prefix,
                            dm_name : item.dm_name,
                            dm_age : item.dm_age,
                            dm_gender : item.dm_gender,
                            dm_idcard : item.dm_idcard,
                            dm_image : item.dm_image,
                            dm_imageurl : item.dm_imageurl
                          })
                      
                          }).then((response) => response.json())
                              .then((response) => {
                                checkdt_managements = JSON.stringify(response);
                              }).catch((error) => {
                                console.error(error);
                              })
                      )
            
          }
        )
      }
        }
        if(JSON.stringify(this.state.detailmanagements)!="null")
        {
          {
            this.state.detailmanagements.map((itemss,  index) =>{
                return  (
                            fetch('http://192.168.1.191/Myapp/src/component/upload_dt_detailmanagement.php', {
                            method: 'POST',
                            headers: {
                              Accept: "application/json",
                              "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                        
                              at_id : itemss.at_id,
                              dm_id : itemss.dm_id,
                              dtd_status : itemss.dtd_status,
                              dtd_location : itemss.dtd_location,
                              dtd_type : itemss.dtd_type,
                              dtd_image : itemss.dtd_image,
                              dtd_date : itemss.dtd_date,
                              dtd_comment : itemss.dtd_comment
                            })
                        
                            }).then((response) => response.json())
                                .then((response) => {
                                  checkdetailmanagement = JSON.stringify(response);
                                }).catch((error) => {
                                  console.error(error);
                              })
                        )
                
              })
          }
        }

        if(JSON.stringify(this.state.localsaccount)!="null")
        {
          {
            this.state.localsaccount.map((itemss,  index) =>{
                return  (
                            fetch('http://192.168.1.191/Myapp/src/component/upload_account.php', {
                            method: 'POST',
                            headers: {
                              Accept: "application/json",
                              "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                        
                              acc_id : itemss.acc_id,
                              acc_rank : itemss.acc_rank,
                              acc_name : itemss.acc_name,
                              acc_username : itemss.acc_username,
                              acc_password : itemss.acc_password,
                              acc_status : itemss.acc_status,
                              acc_chk : itemss.acc_chk
                            })
                        
                            }).then((response) => response.json())
                                .then((response) => {
                                  checkaccount = JSON.stringify(response);
                                }).catch((error) => {
                                  console.error(error);
                              })
                        )
                
              })
          }
        }
      
         
        if((checkdt_managements!=null || checkdetailmanagement!=null) || (checkaccount!=null))
          {
              AsyncStorage.setItem('localdt_managements',"").then(()=>{})
              AsyncStorage.setItem('localdetailmanagement',"").then(()=>{})
              AsyncStorage.setItem('localaccount',"").then(()=>{})
              let dates ='ล่าสุด วันที่  ' + date + '-' + month + '-' + year + ' เวลา : ' + hours + ':' + min+' น.';
              that.setState({
                //Setting the value of the date time
                tranfordate: dates,
              });
              
              AsyncStorage.setItem('tranfordate', JSON.stringify(dates)).then(()=>{
               
              })
              Alert.alert("             ถ่ายโอนข้อมูลสำเร็จ");
             
             if(checkdt_managements!=0)
             {
                AsyncStorage.setItem('localdt_managements',"").then(()=>{})
                checkupdate=1;
               
            }
              if(checkdetailmanagement!=0)
             {
              AsyncStorage.setItem('localdetailmanagement',"").then(()=>{})
              checkupdate=1;
             
            }

            if(checkaccount!=0)
            {
             AsyncStorage.setItem('localaccount',"").then(()=>{})
             checkupdate=1;
            
           }
            if(checkupdate===1){
              Alert.alert("             ถ่ายโอนข้อมูลสำเร็จ");
              Alert.alert(JSON.stringify(checkdetailmanagement));
            }
          }

         
        else
          {
                Alert.alert("ไม่สามารถถ่ายโอนข้อมูลได้");
          }
      }
    else{
      Alert.alert("ไม่มีข้อมูลต้องถ่ายโอน");
    }
  
}
checknetwork=() =>{
  fetch("http://192.168.1.191/Myapp/src/component/chkconnect.php", {
    method: "GET",
    headers:{
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
  .then((response) => response.json())
  .then((response) => {
    if(JSON.stringify(response)!=0)
    {
      this.setState({
        chknetwork: 'พร้อมใช้งาน'
      });
    }
 
  })
  .catch((error) => {
    this.setState({
      chknetwork: 'ไม่พร้อมใช้งาน'
    });
  });
}
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: 'rgba(218, 223, 225,1)',
    },
    Buttonbody: {
        marginLeft:'11%',
        marginTop:20,
        marginEnd:20,
        padding:10,
        width: '80%',
      },
      Buttonbody1:{
        marginLeft:'18%',
        marginVertical: 20,
        width: '80%',
      },
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
chkdataase:{
  backgroundColor:'rgba(189, 195, 199, 1)',
  width: '60%',
  marginTop:20,
  padding: 10,
  alignItems: 'center',
  textAlign: 'center',
  marginLeft: '16%',
  borderRadius:5,
},
footer: {
  backgroundColor:'rgba(150, 40, 27, 1)',
  
}
});
export default Pages