import React from "react";
import { Icon as Ico, Input } from "@ui-kitten/components";
import { ActivityIndicator, Image, SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native"
import { Text } from "react-native"
import Toast from "react-native-toast-message";
import database from '@react-native-firebase/database';

import * as Animatable from 'react-native-animatable';
const TextScreen = () => {
    const [calculatedPrice, setCalculatedPrice] = React.useState("")
    const [data, setdata] = React.useState([])
    const [modalsAddingMessage, setmodalsAddingMessage] = React.useState(false)
    const [update, setupdate] = React.useState(false)
    const [loadingSendToFirebase, setloadingSendToFirebase] = React.useState(false)
    const [currentId, setcurrentId] = React.useState(false)

    const genNumber = () => {
        return (Math.random() * 1000000).toFixed();
    }

    const sendToFirebase = () => {
        setloadingSendToFirebase(true)
        let id = genNumber()
        const dbRef = database().ref('/messaging/' + id);
        dbRef.set({
            message: calculatedPrice,
        })
            .then(() => {
                setmodalsAddingMessage(false)
                setloadingSendToFirebase(false)
                Toast.show({
                    type: 'customToast',
                    text1: "Request successfully",
                    text2: "Creation request successfully",
                    props: { state: 'success' }
                })
            });
    }

    const deleteDataFromDB = (id) => {
        const dbRef = database().ref('/messaging/' + id);
        dbRef.remove()
            .then(() => Toast.show({
                type: 'customToast',
                text1: "Request successfully",
                text2: "Deletion request successful",
                props: { state: 'success' }
            }));
    }

    const updateDataFromDB = () => {
        setloadingSendToFirebase(true)
        const dbRef = database().ref('/messaging/' + currentId);
        dbRef.update({
            message: calculatedPrice
        })
            .then(() => {
                setloadingSendToFirebase(false)
                setmodalsAddingMessage(false)
                Toast.show({
                    type: 'customToast',
                    text1: "Request successfully",
                    text2: "Deletion request successful",
                    props: { state: 'success' }
                })
            });
    }

    React.useEffect(() => {
        database()
            .ref('/messaging/')
            .on('value', snapshot => setdata(snapshot.val()))
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#1a202c", position: "relative" }}>
            <Image
                source={require('../images/logo.png')}
                style={{ width: 50, height: 50, alignSelf: "center" }} />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 10, }}>

                <View style={{ marginTop: 15, marginBottom: 20 }}>
                    <Text style={{ color: "white", fontSize: 12, fontFamily: "Montserrat-Medium", }}>There you can send text message on real time</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start", marginBottom: 10 }}>
                    <TouchableOpacity onPress={() => {
                        setCalculatedPrice("")
                        setmodalsAddingMessage(true)
                    }}
                        style={{
                            paddingVertical: 10, borderRadius: 5, flexDirection: "row", paddingHorizontal: 10,
                            backgroundColor: "#6434eb", alignItems: "center", justifyContent: "center",
                        }}>
                        <Text style={{ color: "white" }}>Create Message</Text>
                        <Ico name="message-square-outline" style={{ width: 15, height: 15, tintColor: "white", marginLeft: 5 }} />
                    </TouchableOpacity>
                </View>
                {
                    Object.keys(data).map(val => {
                        return (
                            <View
                                key={val}
                                style={{
                                    borderColor: "white", borderWidth: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between",
                                    borderRadius: 5, paddingVertical: 10, marginBottom: 10, paddingHorizontal: 10
                                }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ color: "rgba(255,255,255,.2)", fontSize: 12 }}
                                        key={val}
                                    >Message</Text>
                                    <Text style={{ color: "white", fontSize: 16 }}
                                    >{data[val].message}</Text>
                                </View>
                                <TouchableOpacity style={{
                                    width: 25, height: 25, justifyContent: "center",
                                    alignItems: "center", backgroundColor: "white", borderRadius: 100, marginRight: 5
                                }}
                                    onPress={() => {
                                        setmodalsAddingMessage(true)
                                        setupdate(true)
                                        setcurrentId(val)
                                        setCalculatedPrice(data[val].message)
                                    }}
                                >
                                    <Ico name="edit"
                                        style={{
                                            width: 15,
                                            height: 15,
                                            tintColor: "black",
                                        }} />
                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                    width: 25, height: 25, justifyContent: "center",
                                    alignItems: "center", backgroundColor: "white", borderRadius: 100
                                }}
                                    onPress={() => deleteDataFromDB(val)}
                                >
                                    <Ico name="trash"
                                        style={{
                                            width: 15,
                                            height: 15,
                                            tintColor: "#b01c1c",
                                        }} />
                                </TouchableOpacity>
                            </View>
                        )
                    })
                }
            </ScrollView>
            {
                modalsAddingMessage && <Animatable.View
                    animation="fadeIn"
                    style={{
                        flex: 1, backgroundColor: "rgba(10,10,10,.8)", padding: 20, justifyContent: "center",
                        position: "absolute", zIndex: 1, top: 0, left: 0, right: 0, bottom: 0
                    }}
                >
                    <Animatable.View
                        duration={500}
                        // delay={0}
                        // easing={"ease-out"}
                        animation={"slideInDown"}
                        style={{ padding: 20, backgroundColor: "#1a202c", borderRadius: 5, position: "relative" }}>
                        <View style={{
                            display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 20,
                            justifyContent: "space-between"
                        }}>
                            <Text style={{ color: "white", fontFamily: "Montserrat-Medium", fontSize: 16 }}>Send Message Form</Text>
                            <TouchableOpacity style={{ backgroundColor: "white", borderRadius: 100, padding: 1.5 }}
                                onPress={() => setmodalsAddingMessage(!modalsAddingMessage)}
                            >
                                <Ico name="close"
                                    style={{
                                        width: 20,
                                        height: 20,
                                        tintColor: "black",
                                    }} />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <View>
                                <Text style={{ color: "rgba(255,255,255,.5)", fontSize: 12, fontFamily: "Montserrat-Medium", }}>Please write any text</Text>
                            </View>
                            <View style={{ marginTop: 8 }}>
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
                        <View style={{ position: "relative", marginTop: 15, overflow: "hidden" }}>
                            <TouchableOpacity onPress={() => {
                                if (update) {
                                    updateDataFromDB()
                                    setupdate(false)
                                    return;
                                }
                                sendToFirebase()
                            }}
                                style={{
                                    paddingVertical: 10, borderRadius: 5, flexDirection: "row",
                                    backgroundColor: "#6434eb", alignItems: "center", justifyContent: "center",
                                }}>
                                {
                                    loadingSendToFirebase && <ActivityIndicator color={"white"} style={{ marginRight: 5 }} size={17} />
                                }
                                {
                                    !loadingSendToFirebase ? <Text style={{ color: "white" }}>Send to Firestore</Text> :
                                        <Text style={{ color: "white" }}>Loading...</Text>
                                }
                                {
                                    !loadingSendToFirebase && <Ico name="navigation-2-outline" style={{ width: 15, height: 15, tintColor: "white", marginLeft: 5 }} />
                                }
                            </TouchableOpacity>

                            {
                                loadingSendToFirebase || calculatedPrice.length === 0 &&
                                <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 1, backgroundColor: "rgba(10,10,10,.5)" }} />
                            }
                        </View>
                    </Animatable.View>
                </Animatable.View>
            }
        </SafeAreaView >
    )
}

export default TextScreen 