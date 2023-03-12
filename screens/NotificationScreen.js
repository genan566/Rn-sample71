import { ActivityIndicator, Dimensions, Image, Pressable, SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native"
import PushNotification from "react-native-push-notification"
import { Text } from "react-native"
import AwesomeLoading from 'react-native-awesome-loading';
import { Icon } from "@ui-kitten/components";
import React from "react";


const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;

const NotificationScreen = () => {
    const [loading, setLoading] = React.useState(false)
    const handleNotification = () => {
        PushNotification.localNotification({
            channelId: "test-channel",
            message: 'Hello there this is a test for local notification',
            title: "Test Notification"
        })
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#1a202c", paddingVertical: 5 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Image
                    source={require('../images/logo.png')}
                    style={{ width: 50, height: 50, alignSelf: "center" }} />
                <View style={{ flex: 1, paddingHorizontal: 15 }}>
                    <View style={{ alignItems: "center" }}>
                        <Image
                            style={{
                                width: WIDTH * .80,
                                height: HEIGHT * .42,
                                // borderRadius: WIDTH * .5
                            }}
                            resizeMode="contain"
                            source={require("../images/2.png")}
                        />
                    </View>
                    <Text style={{
                        color: "white", marginBottom: 15, textAlign: "center",
                        fontSize: 18
                    }}>There, with this button you can send notification to your own device</Text>
                    <Text style={{
                        color: "rgba(255,255,255,.6)", marginBottom: 25,
                        textAlign: "center", fontSize: 14
                    }}>Clic on the button to do this.</Text>
                    <TouchableOpacity
                        style={{
                            backgroundColor: "red", alignItems: "center", paddingVertical: 15,
                            marginHorizontal: 10, borderRadius: 5, flexDirection: "row", justifyContent: "center", gap: 5
                        }}
                        onPress={() => {
                            handleNotification()
                            // Toast.show({
                            //     type: 'customToast',
                            //     text1: "dfvf",
                            //     text2: "dfgdfgfd",
                            //     props: { state: 'error' }
                            // });
                        }}>
                        <Text style={{ color: "white", textTransform: "uppercase" }}>Send Notification</Text>
                        <Icon style={{ tintColor: 'white', width: 15, height: 15 }}
                            name="bell-outline" />
                    </TouchableOpacity>
                </View>
                <View style={{height:WIDTH * .05}} />
            </ScrollView>
        </SafeAreaView>
    )
}

export default NotificationScreen