import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native"
import PushNotification from "react-native-push-notification"
import { Text } from "react-native"
import { Icon } from "@ui-kitten/components";
import React from "react";


const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;

const NotificationScreen = () => {
    const handleNotification = () => {
        PushNotification.localNotification({
            channelId: "test-channel",
            message: 'Hello there this is a test for local notification',
            title: "Test Notification"
        })
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#1a202c", paddingVertical: 5 }}>

            <View style={styles.roundedStyledBox} />
            <View style={styles.roundedStyledBox2} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <Image
                    source={require('../images/logo.png')}
                    style={styles.img} />
                <View style={styles.container}>
                    <View style={{ alignItems: "center" }}>
                        <Image
                            style={styles.undraw}
                            resizeMode="contain"
                            source={require("../images/2.png")}
                        />
                    </View>
                    <Text style={styles.explicit1}>There, with this button you can send notification to your own device</Text>
                    <Text style={styles.explicit2}>Clic on the button to do this.</Text>
                    <TouchableOpacity
                        style={styles.btnAction}
                        onPress={() => {
                            handleNotification()
                        }}>
                        <Text style={styles.btnText}>Send Notification</Text>
                        <Icon style={styles.btnIcon}
                            name="bell-outline" />
                    </TouchableOpacity>
                </View>
                <View style={{ height: WIDTH * .05 }} />
            </ScrollView>
        </SafeAreaView>
    )
}

export default NotificationScreen

const styles = StyleSheet.create({
    container:{ flex: 1, paddingHorizontal: 15 },
    btnText: { color: "white", textTransform: "uppercase" },
    btnIcon: { tintColor: 'white', width: 15, height: 15 },
    roundedStyledBox: {
        height: HEIGHT * .38,
        width: HEIGHT * .38,
        borderRadius: HEIGHT * .38,
        backgroundColor: "rgba(254,254,254,.08)",
        position: "absolute",
        top: -HEIGHT * .25,
        left: WIDTH * .25,
        zIndex: -2.5
    },
    roundedStyledBox2: {
        height: HEIGHT * .42,
        width: HEIGHT * .42,
        borderRadius: HEIGHT * .42,
        backgroundColor: "rgba(254,254,254,.1)",
        position: "absolute",
        top: -HEIGHT * .1,
        right: -WIDTH * .49,
        zIndex: -1.5
    },
    img: { width: 50, height: 50, alignSelf: "center" },
    undraw: {
        width: WIDTH * .80,
        height: HEIGHT * .42,
    },
    explicit1: {
        color: "white", marginBottom: 15, textAlign: "center",
        fontSize: 18
    },
    explicit2: {
        color: "rgba(255,255,255,.6)", marginBottom: 25,
        textAlign: "center", fontSize: 14
    },
    btnAction: {
        backgroundColor: "red", alignItems: "center", paddingVertical: 15,
        marginHorizontal: 10, borderRadius: 5, flexDirection: "row", justifyContent: "center", gap: 5
    }
})