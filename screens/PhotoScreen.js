import { Image, Pressable, Text, View } from "react-native"
import React from 'react'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const PhotoScreen = () => {
    const [photo, setPhoto] = React.useState('')

    React.useEffect(() => {
        console.log("photo", photo)
    }, [photo])

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
                setPhoto(source)
                // console.log("assertPhoto", res.assets[0].uri)
            }
        });
    }

    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 15, gap: 10 }}>
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
        </View>
    )
}

export default PhotoScreen