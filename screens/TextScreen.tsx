import React from "react";
import { Icon, Input } from "@ui-kitten/components";
import { SafeAreaView, TouchableOpacity, View } from "react-native"
import { Text } from "react-native"
import database from '@react-native-firebase/database';

import * as Animatable from 'react-native-animatable';
const TextScreen = () => {
    const [calculatedPrice, setCalculatedPrice] = React.useState("")

    const genNumber = () => {
        return (Math.random() * 1000000).toFixed();
    }

    const sendToFirebase = () => {
        let id = genNumber()
        const dbRef = database().ref('/messaging/' + id);
        dbRef.set({
            message: calculatedPrice,
        })
            .then(() => console.log('Data set.'));
    }

    React.useEffect(() => {
        database()
            .ref('/messaging/')
            .on('value', snapshot => {
                console.log('Messaging data: ', snapshot.val());
            });
    }, [])


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#1a202c", position: "relative" }}>
            <Text style={{ color: "white" }}> TextScreen</Text>
            <Animatable.View
                animation="fadeIn"
                style={{
                    flex: 1, backgroundColor: "rgba(10,10,10,.5)", padding: 20, justifyContent: "center",
                    position: "absolute", zIndex: 1, top: 0, left: 0, right: 0, bottom: 0
                }}
            >
                <Animatable.View
                    duration={1000}
                    delay={0}
                    easing={"ease-out"}
                    animation={"bounceIn"}
                    style={{ padding: 20, backgroundColor: "#1a202c", borderRadius: 5, position: "relative" }}>
                    <View style={{
                        display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 10,
                        justifyContent: "space-between"
                    }}>
                        <Text style={{ color: "white", fontFamily: "Montserrat-Medium", fontSize: 16 }}>Send Message Form</Text>
                        <TouchableOpacity
                        // onPress={() => setShowModalAdd(!showModalAdd)}
                        >
                            <Icon name="close"
                                style={{
                                    width: 20,
                                    height: 20,
                                    tintColor: "white",
                                }} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <View>
                            <Text style={{ color: "white", fontSize: 12, fontFamily: "Montserrat-Medium", }}>Please write any text</Text>
                        </View>
                        <View style={{ marginTop: 5 }}>
                            <Input
                                value={calculatedPrice}
                                placeholder="Write any text"
                                placeholderTextColor={"#4b4d4f"}
                                // keyboardType={"number-pad"}
                                onChangeText={nextText => {
                                    setCalculatedPrice(nextText)
                                }}
                                style={{ backgroundColor: "transparent", fontSize: 8 }}
                                status={"control"}
                            />
                        </View>
                    </View>

                    <View style={{ marginTop: 15 }}>
                        <TouchableOpacity
                            onPress={() => sendToFirebase()}
                            activeOpacity={.7}
                            style={{ backgroundColor: "#319795", padding: 10, paddingVertical: 8, display: "flex", alignItems: "center", borderRadius: 5 }}>
                            <Text style={{ fontFamily: "Montserrat-Medium", color: "white", }}>Send to Firestore</Text>
                        </TouchableOpacity>
                    </View>
                </Animatable.View>
            </Animatable.View>
        </SafeAreaView >
    )
}

export default TextScreen 