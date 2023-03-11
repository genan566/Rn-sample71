import { View, Text } from 'react-native'
import React from 'react'

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Drawer = createDrawerNavigator();
// const Tab = createBottomTabNavigator();
const Tab = createMaterialTopTabNavigator();

const Feed = () => {
  return (
    <View>
      <Text>Feed</Text>
    </View>
  )
}

const Article = () => {
  return (
    <View>
      <Text>Article</Text>
    </View>
  )
}

function App() {
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