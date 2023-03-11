import { View, Text } from 'react-native'
import React from 'react'

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

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
      <Drawer.Navigator>
        <Drawer.Screen name="Feed" component={Feed} />
        <Drawer.Screen name="Article" component={Article} />
      </Drawer.Navigator>
    </NavigationContainer>
    // <Text>sdfjh</Text>
  );
}
export default App