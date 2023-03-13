
import { ApplicationProvider, Icon as UiKittenIcon, IconRegistry } from '@ui-kitten/components';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NotificationScreen from '../screens/NotificationScreen';
import PhotoScreen from '../screens/PhotoScreen';
import TextScreen from '../screens/TextScreen';
import CalculatorScreen from '../screens/Calculator';
const RenderTabs = () => {

    const Tab = createBottomTabNavigator();

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
                            tintColor: focused ? "#6434eb" : "white",
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
                            tintColor: focused ? "#6434eb" : "white",
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
                            tintColor: focused ? "#6434eb" : "white",
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
                            tintColor: focused ? "#6434eb" : "white",
                        }} />
                    )
                }}
            />
        </Tab.Navigator>
    )
}

export default RenderTabs