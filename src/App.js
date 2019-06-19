import React, { Component } from 'react';
import Login from './login/index';
import Main from  './main';
import Addpage from './component/add';
import setting from './component/setting'
import update from './component/update'
import Viewdata from './component/Viewdata';
import detile from './component/viewdetil';
import  viewww from './component/viewww';
import { createStackNavigator, createAppContainer  } from  'react-navigation';


const  navigation  = createStackNavigator({
  // Login:{ screen:Login},
  Main: { screen: Main},
  Addpage: { screen: Addpage},
  setting: { screen: setting},
  update: { screen: update},
  Viewdata: { screen: Viewdata},
  viewww:{screen:viewww},
  detile: { screen: detile, path: './component/viewdetil/:data'},
},{ headerMode: 'none' });

export default createAppContainer(navigation);