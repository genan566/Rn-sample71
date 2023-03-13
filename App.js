import { View, Text, Pressable, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import * as eva from '@eva-design/eva';
import PushNotification from "react-native-push-notification";
import { ApplicationProvider, Icon as UiKittenIcon, IconRegistry } from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/FontAwesome';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import PhotoScreen from './screens/PhotoScreen';
import CalculatorScreen from './screens/Calculator';
import TextScreen from './screens/TextScreen';
import NotificationScreen from './screens/NotificationScreen';
import SplashScreen from 'react-native-splash-screen';

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;
import Toast, { BaseToast, BaseToastProps, ErrorToast } from 'react-native-toast-message';
import { LoginContext, LoginContextProvider } from './contexts/LoginContext';
import { createStackNavigator } from '@react-navigation/stack';
import CustomStack from './Stacks/SIGNIN';
import { Provider, useSelector } from 'react-redux';
import store from './redux/store';
import SUPPORTAPP from './Stacks/SUPPORTAPP';
const Drawer = createDrawerNavigator();
// const Tab = createMaterialTopTabNavigator();

function App() {

  const toastConfig = {

    success: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: 'pink' }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 15,
          fontWeight: '400'
        }}
      />
    ),

    error: (props) => (
      <ErrorToast
        {...props}
        text1Style={{
          fontSize: 17
        }}
        text2Style={{
          fontSize: 15
        }}
      />
    ),

    customToast: ({ text1, text2, props }) => (
      <View style={{
        paddingHorizontal: 15, width: '100%',
        borderColor: "transparent", borderWidth: 5,
      }}>
        <View style={{
          width: '100%',
          borderLeftColor: "white",
          borderRightColor: "transparent",
          borderBottomColor: "transparent",
          borderTopColor: "transparent",
          borderWidth: 2,
          backgroundColor:
            props.state ?
              props.state === "success" ?
                "#297d7b"
                : props.state === "warning" ? "#ecc94b" :
                  "#943a34" : "white",
          borderRadius: 7, paddingHorizontal: 10,
          paddingVertical: 8, position: "relative"
        }}>
          <TouchableOpacity
            style={{
              position: "absolute", top: 8, right: 15,
              backgroundColor: "white", borderRadius: 50,
              padding: 1.5, zIndex: 11
            }}

            onPress={() => {
              Toast.hide();
            }}
          >
            <UiKittenIcon name="close"
              style={{
                width: 15,
                height: 15,
                tintColor: "black",
              }} />
          </TouchableOpacity>
          <Text style={{
            color: "white", fontSize: WIDTH * .04,
            fontFamily: "Montserrat-Medium",
          }}>{text1}</Text>
          <Text style={{
            color: "white", fontSize: WIDTH * .03,
            fontFamily: "Montserrat-Medium",
            marginTop: 2.5
          }}>{text2}</Text>
        </View>
      </View>
    )
  };
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




  const { frame, onChange } = useContext(LoginContext);
  React.useEffect(() => {
    console.log("frame: ", frame?.mail)
  }, [frame])


  return (
    <>

      <Provider store={store}>
        <SUPPORTAPP />
      </Provider>
    </>

  );
}
export default App