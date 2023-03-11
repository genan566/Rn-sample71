import { View, Text, Pressable } from 'react-native'
import React from 'react'

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import PushNotification from "react-native-push-notification";

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
// const Tab = createMaterialTopTabNavigator();

const Feed = () => {
  return (
    <View>
      <Text>Feed</Text>
    </View>
  )
}

const Article = () => {

  const handleNotification = () => {
    PushNotification.localNotification({
      channelId: "test-channel",
      message: 'Ouais',
      title: "Test Notification"
    })
  }
  return (
    <View>
      <Pressable
        onPress={() => {
          handleNotification()
        }}
      >
        <Text>Article</Text>
      </Pressable>
    </View>
  )
}

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

  return (

    <NavigationContainer>
      <Tab.Navigator>
        <Drawer.Screen name="Feed" component={Feed} />
        <Drawer.Screen name="dgg" component={Feed} />
        <Drawer.Screen name="Article" component={Article} />
      </Tab.Navigator>
    </NavigationContainer>
    // <Text>sdfjh</Text>
  );
}
export default App