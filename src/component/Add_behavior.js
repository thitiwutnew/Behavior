import React,{ Component } from 'react';
import { StyleSheet,Image,Alert} from 'react-native';
import { Item,Input,Label,Container,Text, Content,Header,Picker, Footer, Icon,Body, FooterTab, Title,Button, View, Form } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';
import RNFetchBlob from 'rn-fetch-blob';
import SearchableDropDown from 'react-native-dropdown-searchable';
export default  class Add_behavior extends Component{
  
          state = {
            checkstatus:'',
            dm_id: '',
            dtd_type: '',
            dtd_location: '',
            dm_age: '',
            dm_gender: '',
            dm_idcard: '',
            dm_image:'',
            photofilename:'',
            photo:null,
            date: '',
            dates: '',
            UserAccount:'',
            at_id:'',
            auhter_type:'',
            showimg:null,
            photos:null,
            comment:null,
            list: [
              {
              tagId: 1,
              title: 'วัดบ้าน กม.80',
            },
            {
              tagId: 2,
              title: 'โรงเรียนบ้าน กม.80',
            },
            {
              tagId: 3,
              title: 'น้ำตกเวฬุวัน',
            },
            {
              tagId: 4,
              title: 'สถานีอนามัยบ้าน กม.80',
            },
            {
              tagId: 5,
              title: 'สำนักสงฆ์เขาทราย',
            },
            {
              tagId: 6,
              title: 'สำนักสงฆ์คลองกางหมู่',
            },
            {
              tagId: 7,
              title: 'สำนักสงฆ์ป่าพราหมณ์มุณี',
            },
            {
              tagId: 8,
              title: 'โรงเรียนบุพราหมณ์',
            },
            {
              tagId: 9,
              title: 'สถานีอนามัยทับลาน',
            },
            {
              tagId: 10,
              title: 'แวโรน่า แอท ทับลาน',
            },
            {
              tagId: 11,
              title: 'โรงเรียนบ้านทับลาน',
            },
            {
              tagId: 12,
              title: 'น้ำตกเหวนกกก',
            },
            {
              tagId: 13,
              title: 'โรงเรียนร่มเกล้าปราจีนบุรี',
            },
            {
              tagId: 14,
              title: 'ศูนย์ชำกล้าไม้ปราจีน',
            },
            {
              tagId: 15,
              title: 'โรงเรียนบ้านบุพราหมณ์ในอรุณอนุสรณ์',
            },
            {
              tagId: 16,
              title: 'วัดบ้านบุพราหมณ์',
            },
            {
              tagId: 17,
              title: 'สำนักสงฆ์วังหิน',
            },
            {
              tagId: 18,
              title: 'วัดขุนบุพราหมณ์ชัยแก้ว',
            },
            {
              tagId: 19,
              title: 'สำนักสงฆ์อรุณอำนวยสวนาราม',
            },
            {
              tagId: 20,
              title: 'สถานีอนามัยขุนศรี',
            },
            {
              tagId: 21,
              title: 'วัดขุนศรีชัยมงคล',
            },
            {
              tagId: 22,
              title: 'โรงเรียนบ้านขุนศรี',
            },
            {
              tagId: 23,
              title: 'วัดบ้านวังขอนแดง',
            },
            {
              tagId: 24,
              title: 'สนง.อุทยานแห่งชาติทับลาน',
            },
            {
              tagId: 25,
              title: 'สำนักปฏิบัติธรรมบ้านทับลาน',
            },
            {
              tagId: 26,
              title: 'อ่างเก็บน้ำทับลาน',
            },
            {
              tagId: 27,
              title: 'อบต.บุพราหมณ์',
            },
            {
              tagId: 28,
              title: 'บ้านพักป่าไม้ ขญ.7',
            },
            ],
            tagItem: {
              tagId: 1,
              title: 'nothing'
            }
          };

          componentDidMount() {
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
            ///////////////////////////////
            if(hours==1){hours="01";}
            if(hours==2){hours="02";}
            if(hours==3){hours="03";}
            if(hours==4){hours="04";}
            if(hours==5){hours="05";}
            if(hours==6){hours="06";}
            if(hours==7){hours="07";}
            if(hours==8){hours="08";}
            if(hours==9){hours="09";}
            ////////////////////////////////
            if(min==1){min="01";}
            if(min==2){min="02";}
            if(min==3){min="03";}
            if(min==4){min="04";}
            if(min==5){min="05";}
            if(min==6){min="06";}
            if(min==7){min="07";}
            if(min==8){min="08";}
            if(min==9){min="09";}
            /////////////////////////////
            if(sec==1){sec="01";}
            if(sec==2){sec="02";}
            if(sec==3){sec="03";}
            if(sec==4){sec="04";}
            if(sec==5){sec="05";}
            if(sec==6){sec="06";}
            if(sec==7){sec="07";}
            if(sec==8){sec="08";}
            if(sec==9){sec="09";}
            let years = year+543
            that.setState({
              //Setting the value of the date time
              date: date + '-' + month + '-' + years + '  เวลา : ' + hours + ':' + min+' น.',
              dates: year+ '-' + month + '-' + date + ' ' + hours + ':' + min + ':' + sec,
            });

            AsyncStorage.getItem('UserAccount').then((value) =>{
              this.setState({ at_id: value });
              })
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
              } else if (response.error) {
              } else if (response.customButton) {
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
          Savedata(){
            const arraydata  = [];
            const { navigation } = this.props;
            var DM_ID=navigation.getParam('id', '');
              if(this.state.dtd_type && this.state.list && this.state.photofilename){
                if(this.state.auhter_type){
                  const data ={
                    at_id: this.state.at_id,
                    dm_id : DM_ID,
                    dtd_status : 'ผู้มีพฤติกรรมเสี่ยง',
                    dtd_location : this.state.tagItem.title,
                    dtd_type : this.state.auhter_type,
                    dtd_image : this.state.photofilename,
                    dtd_date : this.state.dates,
                    dtd_comment: '-',
                  }
                  arraydata.push(data);
                  try {
                    AsyncStorage.getItem('detailmanagement').then((value) =>{
                      if(value !==null){
                            const d = JSON.parse(value);
                            d.push(data) 
                            AsyncStorage.setItem( 'detailmanagement', JSON.stringify(d)).then(()=>{
                              RNFetchBlob.fetch('POST', 'http://wangkhondaeng.prachinburi.police.go.th/img/uploadimg.php', {
                                Authorization : "Bearer access-token",
                                otherHeader : "foo",
                                'Content-Type' : 'multipart/form-data',
                              }, [
                                // element with property `filename` will be transformed into `file` in form data
                                { name : 'image', filename : this.state.photofilename, data: this.state.photos}
                              ]).then((resp) =>  resp.json()) 
                              .then((resp) => {
                                this.setState({photos:null})
                                this.props.navigation.navigate('Main');
                              })
                            })
                            
                      }else{
                        AsyncStorage.setItem('detailmanagement',  JSON.stringify(arraydata)).then(()=>{
                          RNFetchBlob.fetch('POST', 'http://wangkhondaeng.prachinburi.police.go.th/img/uploadimg.php', {
                            Authorization : "Bearer access-token",
                            otherHeader : "foo",
                            'Content-Type' : 'multipart/form-data',
                          }, [
                            // element with property `filename` will be transformed into `file` in form data
                            { name : 'image', filename : this.state.photofilename, data: this.state.photos}
                          ]).then((resp) =>  resp.json()) 
                          .then((resp) => {
                            this.setState({photos:null})
                            this.props.navigation.navigate('Main');
                          })
                        })
                      }
                    })

                    AsyncStorage.getItem('localdetailmanagement').then((value) =>{
                      if(value !==null){
                            const dd = JSON.parse(value);
                            dd.push(data) 
                            AsyncStorage.setItem('localdetailmanagement', JSON.stringify(dd)).then(()=>{
                         
                            })
                            
                      }else{
                        AsyncStorage.setItem('localdetailmanagement',  JSON.stringify(arraydata)).then(()=>{
                            
                        })
                      }
                    })

                  }catch(err){
                  }
                }
                else{
                  const data ={
                    at_id: this.state.at_id,
                    dm_id : DM_ID,
                    dtd_status : 'ผู้มีพฤติกรรมเสี่ยง',
                    dtd_location : this.state.tagItem.title,
                    dtd_type : this.state.dtd_type,
                    dtd_image : this.state.photofilename,
                    dtd_date : this.state.dates,
                    dtd_comment: '-',
                  }
                  arraydata.push(data);
                  try {
                    AsyncStorage.getItem('detailmanagement').then((value) =>{
                      if(value !==null){
                            const d = JSON.parse(value);
                            d.push(data) 
                            AsyncStorage.setItem( 'detailmanagement', JSON.stringify(d)).then(()=>{
                              RNFetchBlob.fetch('POST', 'http://wangkhondaeng.prachinburi.police.go.th/img/uploadimg.php', {
                                Authorization : "Bearer access-token",
                                otherHeader : "foo",
                                'Content-Type' : 'multipart/form-data',
                              }, [
                                // element with property `filename` will be transformed into `file` in form data
                                { name : 'image', filename : this.state.photofilename, data: this.state.photos}
                              ]).then((resp) =>  resp.json()) 
                              .then((resp) => {
                                this.setState({photos:null})
                                this.setState({tagItem:null})
                                this.setState({dtd_type:null})
                                this.setState({photofilename:null})
                                this.setState({dates:null})
                                this.props.navigation.navigate('Main');
                              })
                            })
                            
                      }else{
                        AsyncStorage.setItem('detailmanagement',  JSON.stringify(arraydata)).then(()=>{
                          RNFetchBlob.fetch('POST', 'http://wangkhondaeng.prachinburi.police.go.th/img/uploadimg.php', {
                            Authorization : "Bearer access-token",
                            otherHeader : "foo",
                            'Content-Type' : 'multipart/form-data',
                          }, [
                            // element with property `filename` will be transformed into `file` in form data
                            { name : 'image', filename : this.state.photofilename, data: this.state.photos}
                          ]).then((resp) =>  resp.json()) 
                          .then((resp) => {
                            this.setState({photos:null})
                            this.setState({tagItem:null})
                            this.setState({dtd_type:null})
                            this.setState({photofilename:null})
                            this.setState({dates:null})
                            this.props.navigation.navigate('Main');
                          })
                        })
                      }
                    })

                    AsyncStorage.getItem('localdetailmanagement').then((value) =>{
                      if(value !==null){
                            const dd = JSON.parse(value);
                            dd.push(data) 
                            AsyncStorage.setItem('localdetailmanagement', JSON.stringify(dd)).then(()=>{
                         
                            })
                            
                      }else{
                        AsyncStorage.setItem('localdetailmanagement',  JSON.stringify(arraydata)).then(()=>{
                            
                        })
                      }
                    })

                  }catch(err){
                  }
                }
                  
              }
              else{
                this.setState({
                  checkstatus:'** กรอกข้อมูลให้ครบ'
                })
              }
          }

    render(){
      const { navigation } = this.props;
      var  {navigate} = this.props.navigation;
      const { showimg } = this.state;
      const id = navigation.getParam('id', '');
        return(
        <Container>
        <Header style={styles.Header}>
          <Body>
            <Title style={styles.headertext}>
            <Image  source={require('../image/small-logo.png')} />
            เพิ่มข้อมูลพฤติกรรมการกระทำผิดกฎหมาย</Title>
          </Body>
        </Header>
        <Content>
         <View style={styles.imgpeople}> 
         {showimg && (
            <Image
              source={{ uri: showimg }}
              style={{ width: 150, height:150,marginTop:10}}
              value={this.state.dm_image}
              onChangeText={(dm_image) => this.changeImage(dm_image)}
            />
          )}
           <Button info  style={styles.submit1} onPress={this.handleChoosePhoto}><Text>  เลือกรูปภาพ</Text></Button>
          </View>
        <Form>
            <Label style={styles.formdatepanel}>วันที่ : {this.state.date} </Label>
            <Item picker style={{color:'rgba(198, 198, 198, 1)'}}>
            <Label style={{marginLeft:15}}>ประเภทผู้มีพฤติกรรมเสี่ยง : </Label>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                placeholder="เลือก คำนำหน้า"
                selectedValue={this.state.dtd_type}
                onValueChange={this.onValueChange2.bind(this)}
              >
                <Picker.Item label="เลือก..." value="สถานบริการ" />
                <Picker.Item label="สถานบริการ" value="สถานบริการ" />
                <Picker.Item label="การค้าประเวณี" value="การค้าประเวณี" />
                <Picker.Item label="ยาเสพติด" value="ยาเสพติด" />
                <Picker.Item label="การพนันทั่วไป" value="การพนันทั่วไป" />
                <Picker.Item label="อาวุธและวัตถุระเบิด" value="อาวุธและวัตถุระเบิด" />
                <Picker.Item label="ลักทรัพย์" value="ลักทรัพย์" />
                <Picker.Item label="รับของโจร" value="รับของโจร" />
                <Picker.Item label="ปล้นทรัพย์" value="ปล้นทรัพย์" />
                <Picker.Item label="อื่นๆ" value="1" />
              </Picker>
            </Item>
            {this.state.dtd_type=='1' ?  <Item floatingLabel style={{marginTop:0}}>
              <Label>ระบุ : </Label>
              <Input 
                value={this.state.auhter_type}
                onChangeText={(auhter_type) => this.risk_type(auhter_type)}
              />
            </Item> :  null }
           <View  style={{ marginTop:10,marginLeft:15 }}>
           <Text  style={{color:'rgba(90, 90, 90, 1)',}}>พื้นที่พบเห็น  </Text>
           <SearchableDropDown
                onTextChange={tag =>  this.location(tag)}
                onItemSelect={item => {
                  this.setState({ tagItem: item });
                }}
                items={this.state.list}
                defaultIndex={0}
                resetValue={false}
                placeholder={'เลือกสถานที่'}
                underlineColorAndroid="transparent"
              />
           </View>
           {
             (this.state.checkstatus!=null ? <Text style={styles.checkstatus}>{this.state.checkstatus}</Text> : null)
           }
            <Button success style={styles.submit} onPress={() => this.Savedata()}>
              <Text>เพิ่มข้อมูล</Text>
            </Button>
          </Form>
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
  checkstatus:{
    marginLeft:'31%',
    marginTop:20,
  },
  formdatepanel:{
    color:'rgba(90, 90, 90, 1)',
    paddingLeft: 15,
  },
  Header:{
    backgroundColor: 'rgba(150, 40, 27, 1)',
    padding:'5%',
    height:60,
  },
  imgpeople:{
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    backgroundColor:'rgba(150, 40, 27, 1)',
    color:'#fff',
  },
  submit:{
    width:  '29%',
    marginLeft: '36%',
    marginVertical: 30,
    borderRadius: 15,
    padding: 10,
    color: '#000',
  },
  
  submit1:{
    width:  '37%',
    marginLeft: '30%',
    marginVertical: 30,
    textAlign: 'center',
    borderRadius: 15,
    padding: 10,
    color: '#000',
  },
});