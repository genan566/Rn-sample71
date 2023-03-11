import { Pressable, Text, View } from "react-native"
import React from 'react'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const PhotoScreen = () => {

    const loadCamera = () => {
        let options = {
            storageOptions: {
                path: "images",
                mediaType: "photo",
            },
            includeBase64: true,
        }
        launchCamera(options, (res) => {
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
        });
    }

    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 15, gap: 10 }}>
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