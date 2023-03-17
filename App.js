import { View, Text, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'

import { createDrawerNavigator } from '@react-navigation/drawer';
import PushNotification from "react-native-push-notification";
import SplashScreen from 'react-native-splash-screen';

import { Provider, } from 'react-redux';
import store from './redux/store';
import SUPPORTAPP from './Stacks/SUPPORTAPP';

function App() {

  const createChannel = () => {
    PushNotification.createChannel(
      {
        channelId: "test-channel",
        channelName: "Test Channel",
      }, (created) => {
        console.log("Created", created)
      }
    )
  }

  React.useEffect(() => {
    createChannel()
  }, [])

  React.useEffect(() => {
    SplashScreen.hide();
  }, [])


  return (
    <>
      <Provider store={store}>
        <SUPPORTAPP />
      </Provider>
    </>

  );
}
export default App