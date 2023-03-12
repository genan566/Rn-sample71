import { View, Text, Pressable } from 'react-native'
import React from 'react'

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import * as eva from '@eva-design/eva';
import PushNotification from "react-native-push-notification";
import { ApplicationProvider, Icon, IconRegistry } from '@ui-kitten/components';
import IconAwesome5 from 'react-native-vector-icons/FontAwesome';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import PhotoScreen from './screens/PhotoScreen';
import CalculatorScreen from './screens/Calculator';
import TextScreen from './screens/TextScreen';
import NotificationScreen from './screens/NotificationScreen';
import SplashScreen from 'react-native-splash-screen';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

// const Tab = createMaterialTopTabNavigator();

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

      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>
          {/* <Tab.Navigator>
        <Drawer.Screen name="Notification" component={Notification} />
        <Drawer.Screen name="dgg" component={Notification} />
        <Drawer.Screen name="PhotoScreen" component={PhotoScreen} />
      </Tab.Navigator> */}
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
                  <Icon name="bell-outline" style={{
                    width: focused ? 25 : 20,
                    height: focused ? 25 : 20,
                    tintColor: focused ? "#38b2ac" : "white",
                  }} />
                  // <IconMaterial name="event" size={} color={color} />
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
                  <Icon name="camera" style={{
                    width: focused ? 25 : 20,
                    height: focused ? 25 : 20,
                    tintColor: focused ? "#38b2ac" : "white",
                  }} />
                  // <IconMaterial name="event" size={} color={color} />
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
                  <Icon name="file-text-outline" style={{
                    width: focused ? 25 : 20,
                    height: focused ? 25 : 20,
                    tintColor: focused ? "#38b2ac" : "white",
                  }} />
                  // <IconMaterial name="event" size={} color={color} />
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
                  <IconAwesome5 name="rocket"
                    // style={{
                    //   width: focused ? 25 : 20,
                    //   height: focused ? 25 : 20,
                    // }}
                    size={30}
                    color={focused ? "#38b2ac" : "white"}
                  />
                  // <IconMaterial name="event" size={ } color={color} />
                )
              }}
            />

            {/* <Tab.Screen
          name={"Mes Ordres"}
          component={MyOrders}
          options={{
            tabBarLabelStyle: {
              fontSize: 11.3,
              fontFamily: "Montserrat-SemiBold",
            },
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <Icon name="list" style={{
                width: focused ? 25 : 20,
                height: focused ? 25 : 20,
                tintColor: focused ? "#38b2ac" : "white",
              }} />
              // <IconMaterial name="event" size={} color={color} />
            )
          }}
        /> */}
          </Tab.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </>
    // <Text>sdfjh</Text>
  );
}
export default App