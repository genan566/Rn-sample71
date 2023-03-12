import { Image, Pressable, SafeAreaView, Text, View } from "react-native"
import React from 'react'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

import { utils } from '@react-native-firebase/app';
const PhotoScreen = () => {
    const [photo, setPhoto] = React.useState('')
    const [mpeg, setMpeg] = React.useState('')
    const [lastMpeg, setLastMpeg] = React.useState('')

    // React.useEffect(() => {
    //     console.log("photo", photo)
    // }, [photo])

    const loadCamera = () => {
        let options = {
            storageOptions: {
                path: "images",
                mediaType: "photo",
            },
            includeBase64: true,
        }
        launchCamera(options, (res) => {
            if (res.didCancel) {
                console.log("Cancelled")
            } else if (res.errorCode) {
                console.log("Error Code: " + res.errorCode)
            }

            else {
                const source = { uri: res.assets[0].uri }
                console.log(source)
                setMpeg(res.assets[0])
                setPhoto(source)
            }
        });
    }

    const loadGallery = () => {
        let options = {
            storageOptions: {
                path: "images",
                mediaType: "photo",
            },
            includeBase64: true,
        }
        launchImageLibrary(options, (res) => {
            if (res.didCancel) {
                console.log("Cancelled")
            } else if (res.errorCode) {
                console.log("Error Code: " + res.errorCode)
            }

            else {
                const source = { uri: res.assets[0].uri }
                console.log(source)
                setMpeg(res.assets[0])
                setPhoto(source)
                // console.log("assertPhoto", res.assets[0].uri)
            }
        });
    }

    const deployment = async () => {
        if (Object.keys(lastMpeg).length !== 0) {
            console.log("111")
            const storageRef = storage().ref(`/uploads/${lastMpeg?.fileName}`);
            // await storageRef.putFile(mpeg?.uri.replace("file://", ""));
            const response = await fetch(mpeg?.uri);
            const blob = await response.blob();
            await storageRef.put(blob);
        }
        else {
            console.log("000")
            const reference = storage().ref(`/uploads/${mpeg?.fileName}`);

            setLastMpeg(mpeg)
            await reference.putFile(mpeg?.uri.replace("file://", ""));
            console.log(mpeg)
        }

    }

    return (
        <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 15, gap: 10, backgroundColor: "#1a202c" }}>
            {
                photo && <View>
                    <Image
                        source={photo}
                        style={{ width: 100, height: 100 }} />
                </View>
            }
            <Pressable onPress={() => loadCamera()}
                style={{ width: "100%", paddingVertical: 10, borderRadius: 5, backgroundColor: "red", alignItems: "center", justifyContent: "center", }}>
                <Text style={{ color: "white" }}>Upload By Camera</Text>
            </Pressable>
            <Pressable onPress={() => loadGallery()}
                style={{ width: "100%", paddingVertical: 10, borderRadius: 5, backgroundColor: "red", alignItems: "center", justifyContent: "center", }}>
                <Text style={{ color: "white" }}>Upload By Gallery</Text>
            </Pressable>
            <Pressable onPress={() => deployment()}
                style={{ width: "100%", paddingVertical: 10, borderRadius: 5, backgroundColor: "red", alignItems: "center", justifyContent: "center", }}>
                <Text style={{ color: "white" }}>Deploy to firebase</Text>
            </Pressable>
        </SafeAreaView>
    )
}

export default PhotoScreen