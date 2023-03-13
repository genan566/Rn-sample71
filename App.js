import { View, Text, Pressable, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'

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
import { LoginContextProvider } from './contexts/LoginContext';
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

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

  const renderTabs = () => {
    return (

      <Tab.Navigator
        initialRouteName='Notification'

        screenOptions={{
          tabBarStyle: {
            backgroundColor: "#1a202c",
            borderColor: "transparent",
            borderWidth: 0,
            borderTopColor: "transparent",
          },

          // showLabel: false,
          tabBarShowLabel: false,

        }}
      >

        <Tab.Screen
          name={"Notification"}
          component={NotificationScreen}
          // options={{

          // }}

          options={{
            tabBarLabelStyle: {
              fontSize: 11.3,
              fontFamily: "Montserrat-SemiBold",
            },
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <UiKittenIcon name="bell-outline" style={{
                width: focused ? 25 : 20,
                height: focused ? 25 : 20,
                tintColor: focused ? "#38b2ac" : "white",
              }} />
            )
          }}
        />

        <Tab.Screen
          name={"Photo"}
          component={PhotoScreen}
          options={{
            tabBarLabelStyle: {
              fontSize: 11.3,
              fontFamily: "Montserrat-SemiBold",
            },
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <UiKittenIcon name="camera" style={{
                width: focused ? 25 : 20,
                height: focused ? 25 : 20,
                tintColor: focused ? "#38b2ac" : "white",
              }} />
            )
          }}
        />

        <Tab.Screen
          name={"Text"}
          component={TextScreen}
          options={{
            tabBarLabelStyle: {
              fontSize: 11.3,
              fontFamily: "Montserrat-SemiBold",
            },
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <UiKittenIcon name="file-text-outline" style={{
                width: focused ? 25 : 20,
                height: focused ? 25 : 20,
                tintColor: focused ? "#38b2ac" : "white",
              }} />
            )
          }}
        />

        <Tab.Screen
          name={"Calculator"}
          component={CalculatorScreen}
          options={{
            tabBarLabelStyle: {
              fontSize: 11.3,
              fontFamily: "Montserrat-SemiBold",
            },
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <UiKittenIcon name="smartphone-outline" style={{
                width: focused ? 25 : 20,
                height: focused ? 25 : 20,
                tintColor: focused ? "#38b2ac" : "white",
              }} />
            )
          }}
        />
      </Tab.Navigator>
    )
  }

  return (
    <>
      <LoginContextProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: "#1a202c" }}>

          <IconRegistry icons={EvaIconsPack} />
          <ApplicationProvider {...eva} theme={eva.light}>
            <NavigationContainer>
            </NavigationContainer>
          </ApplicationProvider>
        </SafeAreaView>

        <Toast
          topOffset={10}
          config={toastConfig} />
      </LoginContextProvider>
    </>

  );
}
export default App