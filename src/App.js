import React, { Component } from 'react';
import Login from './login/index';
import Main from  './main';
import Addpage from './component/add';
import searchdata from './component/searchdata';
import setting from './component/setting'
import update from './component/update'
import Viewdata from './component/Viewdata';
import detile from './component/viewdetil';
import Add_behavior from './component/Add_behavior';
import update_password from './component/update_password';
import editdata from './component/editdata';
import detail_risk from './component/detail_risk';
import editperson from './component/editperson';
import editrisk from './component/editrisk';
import riskstatus from './component/riskstatus';
import checkpeople from './component/checkpeople';
import new_password from './component/new_password';
import { createStackNavigator, createAppContainer  } from  'react-navigation';
const  navigation  = createStackNavigator({
  Login:{ screen:Login, path: './login/index/:data'},
  new_password: { screen: new_password, path: './component/new_password/:data'},
  Main: { screen: Main},
  Addpage: { screen: Addpage , path: './component/add/:data'},
  setting: { screen: setting},
  checkpeople: { screen: checkpeople},
  searchdata: { screen: searchdata },
  update: { screen: update},
  Add_behavior: { screen: Add_behavior , path: './component/Add_behavior/:data'},
  Viewdata: { screen: Viewdata},
  editdata: { screen: editdata},
  update_password: { screen: update_password},
  detile: { screen: detile, path: './component/viewdetil/:data'},
  detail_risk: { screen: detail_risk, path: './component/detail_risk/:data'},
  editperson: { screen: editperson, path: './component/editperson/:data'},
  editrisk: { screen: editrisk, path: './component/editrisk/:data'},
  riskstatus: { screen: riskstatus, path: './component/riskstatus/:data'}
},{ headerMode: 'none' });

export default createAppContainer(navigation);