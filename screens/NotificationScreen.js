import { Pressable, SafeAreaView, View } from "react-native"
import PushNotification from "react-native-push-notification"
import { Text } from "react-native"
import AwesomeLoading from 'react-native-awesome-loading';
// import Toast from "react-native-toast-message";
const NotificationScreen = () => {
    const handleNotification = () => {
        PushNotification.localNotification({
            channelId: "test-channel",
            message: 'Ouais',
            title: "Test Notification"
        })
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#1a202c", paddingVertical: 10 }}>
            <Pressable
                style={{
                    backgroundColor: "red", alignItems: "center", paddingVertical: 10,
                    marginHorizontal: 10, borderRadius: 5
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
                <Text style={{ color: "white" }}>NotificationScreen</Text>
                {/* <AwesomeLoading indicatorId={2} size={50} isActive={true} text="loading" /> */}
            </Pressable>
        </SafeAreaView>
    )
}

export default NotificationScreen