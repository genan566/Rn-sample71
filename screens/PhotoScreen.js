import { ActivityIndicator, Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React from 'react'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
const HEIGHT = Dimensions.get("screen").height;
import { Icon } from "@ui-kitten/components";
import Toast from "react-native-toast-message";

const PhotoScreen = () => {
    const [photo, setPhoto] = React.useState('')
    const [mpeg, setMpeg] = React.useState('')
    const [lastMpeg, setLastMpeg] = React.useState('')
    const [loadingCamera, setLoadingCamera] = React.useState(false)
    const [loadingGallery, setLoadingGallery] = React.useState(false)
    const [loadingSendToFirebase, setloadingSendToFirebase] = React.useState('')


    const loadCamera = () => {
        setLoadingCamera(true);
        let options = {
            storageOptions: {
                path: "images",
                mediaType: "photo",
            },
            includeBase64: true,
        }
        setTimeout(() => {
            launchCamera(options, (res) => {
                if (res.didCancel) {
                    setLoadingCamera(false);
                } else if (res.errorCode) {
                    setLoadingCamera(false);
                }
                else {
                    const source = { uri: res.assets[0].uri }
                    setMpeg(res.assets[0])
                    setPhoto(source)
                    setLoadingCamera(false);
                }
            });
        }, 1000)
    }

    const loadGallery = () => {
        setLoadingGallery(true);
        let options = {
            storageOptions: {
                path: "images",
                mediaType: "photo",
            },
            includeBase64: true,
        }
        setTimeout(() => {
            launchImageLibrary(options, (res) => {
                if (res.didCancel) {
                    setLoadingGallery(false);
                } else if (res.errorCode) {
                    setLoadingGallery(false);
                }

                else {
                    const source = { uri: res.assets[0].uri }
                    setMpeg(res.assets[0])
                    setPhoto(source)
                    setLoadingGallery(false);
                }
            });
        }, 1000)
    }

    const sendIMGToFirebase = async () => {
        setloadingSendToFirebase(true)
        if (Object.keys(lastMpeg).length !== 0) {
            const storageRef = storage().ref(`/uploads/${lastMpeg?.fileName}`);
            const response = await fetch(mpeg?.uri);
            const blob = await response.blob();
            storageRef.put(blob).then(() => {
                setloadingSendToFirebase(false)
                Toast.show({
                    type: 'customToast',
                    text1: "Request successfully",
                    text2: "Your update request was successfully done",
                    props: { state: 'success' }
                });
            }).catch((er) => {
                setloadingSendToFirebase(false)
                Toast.show({
                    type: 'customToast',
                    text1: "Request failed",
                    text2: "Your update request failed",
                    props: { state: 'error' }
                });
            })
        }
        else {
            const reference = storage().ref(`/uploads/${mpeg?.fileName}`);

            setLastMpeg(mpeg)
            reference.putFile(mpeg?.uri.replace("file://", "")).then(() => {
                setloadingSendToFirebase(false)
                Toast.show({
                    type: 'customToast',
                    text1: "Request successfully",
                    text2: "Your request was successfully done",
                    props: { state: 'success' }
                });
            }).catch((er) => {
                setloadingSendToFirebase(false)
                Toast.show({
                    type: 'customToast',
                    text1: "Request failed",
                    text2: "Your request failed",
                    props: { state: 'error' }
                });
            })
        }

    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#1a202c", paddingHorizontal: 15 }}>


            <Image
                source={require('../images/logo.png')}
                style={{ width: 50, height: 50, alignSelf: "center" }} />

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ marginTop: 15, marginBottom: 20 }}>
                    <Text style={styles.helperText}>There you can upload, update image and send it to Firebase storage</Text>
                </View>

                <View style={styles.imgContainer}>


                    {
                        photo ? <View>
                            <Image
                                source={photo}
                                style={{ width: "100%", height: "100%" }} />
                        </View> : <Image
                            source={require('../images/34.png')}
                            style={styles.imgD} />
                    }
                </View>

                <Text style={{
                    color: "rgb(255,255,255)", marginBottom: 25,
                    textAlign: "center", fontSize: 14
                }}>There you can upload image and send it to firebase store</Text>

                <View style={{ display: "flex", gap: 10, marginTop: 20, flexDirection: "row" }}>
                    <TouchableOpacity onPress={() => loadCamera()}
                        style={styles.actionBtn}>
                        {
                            loadingCamera ? <ActivityIndicator color={"white"} style={{ marginRight: 5 }} size={17} /> :
                                <Icon name="camera" style={{ width: 15, height: 15, tintColor: "white" }} />
                        }
                        <Text style={{ color: "white", marginLeft: 5 }}>Open Camera</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => loadGallery()}
                        style={styles.actionBtn}>
                        {
                            loadingGallery ? <ActivityIndicator color={"white"} style={{ marginRight: 5 }} size={17} /> :
                                <Icon name="camera" style={{ width: 15, height: 15, tintColor: "white" }} />
                        }
                        <Text style={{ color: "white", marginLeft: 5 }}>Open Gallery</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ position: "relative", marginTop: 15, overflow: "hidden" }}>
                    <TouchableOpacity onPress={() => sendIMGToFirebase()}
                        style={styles.btn}>
                        {
                            loadingSendToFirebase && <ActivityIndicator color={"white"} style={{ marginRight: 5 }} size={17} />
                        }
                        {
                            !loadingSendToFirebase ? <Text
                                style={{ color: "white" }}>{Object.keys(lastMpeg).length !== 0 ?
                                    "Update image on firebase" : "Send to firebase"}</Text> :
                                <Text style={{ color: "white" }}>Uploading image to firestore...</Text>
                        }
                        {
                            !loadingSendToFirebase && <Icon
                                name="navigation-2-outline"
                                style={{ width: 15, height: 15, tintColor: "white", marginLeft: 5 }} />
                        }
                    </TouchableOpacity>
                    {
                        loadingSendToFirebase || Object.keys(mpeg).length === 0 &&
                        <View style={styles.disabledView} />
                    }

                    {
                        loadingSendToFirebase &&
                        <View style={styles.disabledView} />
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default PhotoScreen

const styles = StyleSheet.create({
    disabledView: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 1, backgroundColor: "rgba(10,10,10,.5)" },
    btn: {
        paddingVertical: 10, borderRadius: 5, flexDirection: "row",
        backgroundColor: "#6434eb", alignItems: "center", justifyContent: "center",
    },
    actionBtn: {
        flex: 1, paddingVertical: 10, borderRadius: 5, flexDirection: "row",
        backgroundColor: "#6434eb", alignItems: "center", justifyContent: "center",
    },
    helperText: {
        color: "white", fontSize: 12,
        fontFamily: "Montserrat-Medium",
    },
    imgD: { width: "100%", height: "100%", alignSelf: "center" },
    imgContainer: {
        height: HEIGHT * .35, borderColor: "rgba(255,255,255,.2)", overflow: "hidden",
        borderWidth: 1, width: "100%", marginBottom: 10, borderRadius: 5
    }
})