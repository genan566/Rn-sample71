import { Pressable, View } from "react-native"
import PushNotification from "react-native-push-notification"
import { Text } from "react-native"

const NotificationScreen = () => {
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
                }}>
                <Text>NotificationScreen</Text>
            </Pressable>
        </View>
    )
}

export default NotificationScreen