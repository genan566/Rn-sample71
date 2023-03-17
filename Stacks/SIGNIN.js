import { createStackNavigator } from "@react-navigation/stack";
import { Component } from "react";
import ForgotPassword from "../screens/ForgotPassword";
import Signin from "../screens/Signin";

const RegistrationStack = createStackNavigator();

class CustomStack extends Component {
    render() {
        return (
            <RegistrationStack.Navigator
                screenOptions={{
                    headerShown: false
                }}


                initialRouteName={'SignIn'}
            >
                <RegistrationStack.Screen name="SignIn" component={Signin} />
                <RegistrationStack.Screen name="ForgotPassword" component={ForgotPassword} />
            </RegistrationStack.Navigator>
        )
    }
}

export default CustomStack