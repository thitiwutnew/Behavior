import React, { Component } from 'react';
import Login from './login/index';
import Main from  './main';
import Addpage from './component/add';
import setting from './component/setting'
import update from './component/update'
import { createStackNavigator, createAppContainer  } from  'react-navigation';


const  navigation  = createStackNavigator({

  Main: { screen: Main},
  Addpage: { screen: Addpage},
  setting: { screen: setting},
  update: { screen: update},
},{ headerMode: 'none' });

export default createAppContainer(navigation);