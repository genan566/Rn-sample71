import { Pressable, View } from "react-native"
import PushNotification from "react-native-push-notification"
import { Text } from "react-native"
import AwesomeLoading from 'react-native-awesome-loading';
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
                {/* <AwesomeLoading indicatorId={2} size={50} isActive={true} text="loading" /> */}
            </Pressable>
        </View>
    )
}

export default NotificationScreen