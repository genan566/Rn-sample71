import React, { useContext } from "react";
import { ActivityIndicator, Dimensions, Image, ScrollView } from "react-native";
import { Pressable, SafeAreaView, Text, TouchableOpacity, View } from "react-native"
import { LoginContext } from "../contexts/LoginContext";

import Toast from "react-native-toast-message";
import * as Animatable from 'react-native-animatable';
import { Icon, Input } from "@ui-kitten/components";
import { userAsyncThunc } from "../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { StyleSheet } from "react-native";

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;

const Signin = ({ navigation }) => {
    function ValidateEmail(input) {

        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (input.match(validRegex)) {

            // alert("Valid email address!");
            // Toast.show({
            //     type: 'customToast',
            //     text1: "Erreur the mail is invalid",
            //     text2: "Your mail is invalid",
            //     props: { state: 'success' }
            // });

            // document.form1.text1.focus();

            return true;

        } else {

            // alert("Invalid email address!");

            // document.form1.text1.focus();

            return false;

        }

    }

    function checkPasswordStrength(password) {
        // Check for a minimum length of 8 characters
        if (password.length < 8) {
            return "Weak";
        }

        // Check for at least one uppercase letter
        if (!/[A-Z]/.test(password)) {
            return "Weak";
        }

        // Check for at least one lowercase letter
        if (!/[a-z]/.test(password)) {
            return "Weak";
        }

        // Check for at least one number
        if (!/\d/.test(password)) {
            return "Weak";
        }

        // Check for at least one special character
        if (!/[~`!@#$%^&*()\-_+={[}\]|\\:;"'<,>.?/]/.test(password)) {
            return "Weak";
        }

        // Password meets all criteria, return strong
        return "Strong";
    }
    const { frame, onChange } = useContext(LoginContext);
    const [loadingOnSignin, setloadingOnSignin] = React.useState(false)
    const [email, setemail] = React.useState("");
    const [password, setpassword] = React.useState("");
    const dispatch = useDispatch()

    console.log("frame: ", frame)
    const myTranslateAnimation = {
        0: {
            opacity: 0,
            // scale: 0,
            transform: [{ translateY: 30 }]
        },
        1: {
            opacity: 1,
            transform: [{ translateY: 0 }]
            // scale: 1,
        }
    }

    const validate_Login = () => {
        setloadingOnSignin(true)
        let checker = checkPasswordStrength(password)
        console.log(checker)
        if ((checker === "Weak")) {
            Toast.show({
                type: 'customToast',
                text1: "Error for the password strength",
                text2: "Your passwork is to short or it should contain at least one uppercase letter,one lowercase letter,one number,one special character",
                props: { state: 'error' }
            });
            setloadingOnSignin(false)
            return;
        }
        else if (!ValidateEmail(email)) {
            Toast.show({
                type: 'customToast',
                text1: "Error the mail is invalid",
                text2: "Your mail is invalid",
                props: { state: 'error' }
            });
            setloadingOnSignin(false)
            return;
        }

        dispatch(userAsyncThunc({ name: "AnonymUserInstance", mail: email }))
        setloadingOnSignin(false)
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#1a202c", justifyContent: "center" }}>

            <View style={{
                height: HEIGHT * .38,
                width: HEIGHT * .38,
                borderRadius: HEIGHT * .38,
                backgroundColor: "rgba(254,254,254,.08)",
                position: "absolute",
                top: -HEIGHT * .25,
                left: WIDTH * .25,
                zIndex: -2.5
            }} />
            <View style={{
                height: HEIGHT * .42,
                width: HEIGHT * .42,
                borderRadius: HEIGHT * .42,
                backgroundColor: "rgba(254,254,254,.1)",
                position: "absolute",
                top: -HEIGHT * .1,
                right: -WIDTH * .49,
                zIndex: -1.5
            }} />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 10, }}>
                <Animatable.View
                    delay={400}
                    duration={300}
                    easing={"ease-out"}

                    animation={myTranslateAnimation}
                >
                    <View style={{ marginBottom: 30, marginTop: 15, alignItems: "center" }}>
                        <Image
                            source={require("../images/logo.png")}
                            style={{ width: WIDTH * .5, height: WIDTH * .5 }}
                            resizeMode="contain"
                        />
                        <Text style={{ fontSize: 20, color: "white", alignSelf: "center" }}>Test App</Text>
                    </View>

                    <View style={{ marginTop: 10, paddingHorizontal: 20, flex: 1, width: "100%" }}>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={{ color: "white", fontSize: 15 }}>Enter your mail</Text>
                        </View>
                        <Input
                            value={email}

                            placeholder="Enter your mail"
                            placeholderTextColor={"rgba(255,255,255,.2)"}
                            status={"control"}
                            accessoryRight={<Icon style={{ with: 10, height: 10 }} name="email" />}
                            onChangeText={nextValue => setemail(nextValue)}
                            style={{ backgroundColor: "transparent", flex: 1 }}
                        />
                    </View>

                    <View style={{ marginTop: 10, paddingHorizontal: 20, flex: 1, width: "100%" }}>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={{ color: "white", fontSize: 15 }}>Enter your password</Text>
                        </View>
                        <Input
                            value={password}
                            placeholder="Enter your password"
                            placeholderTextColor={"rgba(255,255,255,.2)"}
                            status={"control"}
                            secureTextEntry={true}
                            accessoryRight={<Icon style={{ with: 10, height: 10 }} name="eye" />}
                            onChangeText={nextValue => setpassword(nextValue)}
                            style={{ backgroundColor: "transparent", flex: 1 }}
                        />
                    </View>

                    <View style={{ marginTop: 10 }}>
                        <TouchableOpacity
                            activeOpacity={.7}
                            onPress={() => navigation.navigate("ForgotPassword")}
                            style={{
                                backgroundColor: "transparent", display: "flex", alignItems: "center",
                                justifyContent: "center"
                                , paddingHorizontal: 10, borderRadius: 5
                            }}>
                            <Text style={{
                                fontFamily: "Montserrat-Medium", color: "#6434eb"
                            }}>Forgot Password?</Text>
                        </TouchableOpacity>
                    </View>



                    <View style={{ marginHorizontal: 20, marginTop: 15 }}>
                        <TouchableOpacity

                            onPress={() => {
                                validate_Login()
                            }}

                            style={{
                                paddingVertical: 10, borderRadius: 5, flexDirection: "row",
                                backgroundColor: "#6434eb", alignItems: "center", justifyContent: "center",
                            }}>
                            {
                                loadingOnSignin && <ActivityIndicator color={"white"} style={{ marginRight: 5 }} size={17} />
                            }
                            {
                                !loadingOnSignin ? <Text style={{ color: "white" }}>Login</Text> :
                                    <Text style={{ color: "white" }}>Loading...</Text>
                            }
                            {
                                !loadingOnSignin && <Icon name="log-in" style={{ width: 15, height: 15, tintColor: "white", marginLeft: 5 }} />
                            }
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginBottom: 10, paddingHorizontal: 20, marginTop: 15 }}>
                        <Text style={styles.helperText}>The password should contain a minimum length of 8 characters</Text>
                        <Text style={styles.helperText}>The password should contain at least one uppercase letter</Text>
                        <Text style={styles.helperText}>The password should contain at least one lowercase letter</Text>
                        <Text style={styles.helperText}>The password should contain at least one number digit</Text>
                        <Text style={styles.helperText}>The password should contain at least one special character</Text>
                    </View>


                    <Text style={styles.helperText}>@Copyright all right reserved-2023@</Text>
                </Animatable.View>
                <View style={{ marginBottom: 50 }} />
            </ScrollView>
        </SafeAreaView>
    )
}

export default Signin

const styles = StyleSheet.create({
    helperText: { color: "rgba(255,255,255,.5)", textAlign: "center", fontSize: 10, marginBottom: 0 }
})