import { NavigationContainer } from '@react-navigation/native'
import { ApplicationProvider, IconRegistry, Icon as UiKittenIcon } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import React from 'react'
import { Dimensions, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import CustomStack from './SIGNIN'

import * as eva from '@eva-design/eva';
import Toast, { BaseToast, BaseToastProps, ErrorToast } from 'react-native-toast-message';
import { useSelector } from 'react-redux'
import { LoginContextProvider } from '../contexts/LoginContext'
import RenderTabs from './TABS'

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;


const SUPPORTAPP = ({ children }) => {

    const userSelector = useSelector((state) => state.userInfo.value)
    console.log("userSelector: ", userSelector?.mail)

    const toastConfig = {

        success: (props) => (
            <BaseToast
                {...props}
                style={{ borderLeftColor: 'pink' }}
                contentContainerStyle={{ paddingHorizontal: 15 }}
                text1Style={{
                    fontSize: 15,
                    fontWeight: '400'
                }}
            />
        ),

        error: (props) => (
            <ErrorToast
                {...props}
                text1Style={{
                    fontSize: 17
                }}
                text2Style={{
                    fontSize: 15
                }}
            />
        ),

        customToast: ({ text1, text2, props }) => (
            <View style={{
                paddingHorizontal: 15, width: '100%',
                borderColor: "transparent", borderWidth: 5,
            }}>
                <View style={{
                    width: '100%',
                    borderLeftColor: "white",
                    borderRightColor: "transparent",
                    borderBottomColor: "transparent",
                    borderTopColor: "transparent",
                    borderWidth: 2,
                    backgroundColor:
                        props.state ?
                            props.state === "success" ?
                                "#297d7b"
                                : props.state === "warning" ? "#ecc94b" :
                                    "#943a34" : "white",
                    borderRadius: 7, paddingHorizontal: 10,
                    paddingVertical: 8, position: "relative"
                }}>
                    <TouchableOpacity
                        style={{
                            position: "absolute", top: 8, right: 15,
                            backgroundColor: "white", borderRadius: 50,
                            padding: 1.5, zIndex: 11
                        }}

                        onPress={() => {
                            Toast.hide();
                        }}
                    >
                        <UiKittenIcon name="close"
                            style={{
                                width: 15,
                                height: 15,
                                tintColor: "black",
                            }} />
                    </TouchableOpacity>
                    <Text style={{
                        color: "white", fontSize: WIDTH * .04,
                        fontFamily: "Montserrat-Medium",
                    }}>{text1}</Text>
                    <Text style={{
                        color: "white", fontSize: WIDTH * .03,
                        fontFamily: "Montserrat-Medium",
                        marginTop: 2.5
                    }}>{text2}</Text>
                </View>
            </View>
        )
    };
    return (
        <LoginContextProvider>
            <SafeAreaView style={{ flex: 1, backgroundColor: "#1a202c" }}>
                <IconRegistry icons={EvaIconsPack} />
                <ApplicationProvider {...eva} theme={eva.light}>
                    <NavigationContainer>
                        {
                            !userSelector?.mail ? <CustomStack />
                                : <RenderTabs />
                        }
                    </NavigationContainer>
                </ApplicationProvider>
            </SafeAreaView>
            <Toast
                topOffset={10}
                config={toastConfig} />
            {
                children
            }
        </LoginContextProvider>
    )
}

export default SUPPORTAPP