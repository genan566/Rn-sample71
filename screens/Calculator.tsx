import { Icon, Input } from "@ui-kitten/components";
import React from "react";
import { ActivityIndicator, Image, SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native"
import { Text } from "react-native"
import { SelectList } from "react-native-dropdown-select-list";

const CalculatorScreen = () => {

    const [firstNumber, setfirstNumber] = React.useState("");
    const [secondNumber, setsecondNumber] = React.useState("");
    const [selected, setSelected] = React.useState("");
    const [responseData, setresponseData] = React.useState("");
    const [loadSendRequestToBackend, setloadSendRequestToBackend] = React.useState(false)

    const data = [
        // { key: '1', value: 'Mobiles', disabled: true },
        { key: '1', value: 'Addition +' },
        { key: '2', value: 'Multiplication *' },
        { key: '3', value: 'Substraction -' },
        { key: '4', value: 'Division /' },
    ]

    const calculate = async (data: any) => {
        return fetch(
            "https://genan566.pythonanywhere.com/api/v1/myview/",
            {
                method: "POST",
                headers: {
                    'Content-Type': "application/json;charset=utf-8"
                },
                body: JSON.stringify(data)
            }
        )
            .then((js) => js.json())
            .then((res) => {
                if (res.non_field_errors) {
                    return { error: res.non_field_errors }
                }
                return res;
            })
    }

    const requestCalculateData = () => {
        setloadSendRequestToBackend(true)
        if (firstNumber && secondNumber && selected) {
            let retrieveOperation = data.findIndex(it => it.key === selected) === 0 ? "+"
                : data.findIndex(it => it.key === selected) === 1 ? "*"
                    : data.findIndex(it => it.key === selected) === 2 ? "-"
                        : "/"
            console.log(retrieveOperation)
            calculate({
                "first_input": parseInt(firstNumber),
                "second_input": parseInt(secondNumber),
                "operation": retrieveOperation
            }).then((data) => {
                setloadSendRequestToBackend(false)
                setresponseData(data.data)
            })
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#1a202c", position: "relative", padding: 10 }}>
            <Image
                source={require('../images/logo.png')}
                style={{ width: 50, height: 50, alignSelf: "center" }} />

            <ScrollView showsVerticalScrollIndicator={false}>

                {/* <View>
                    <Text style={{
                        color: "white", fontSize: 12, fontFamily: "Montserrat-Medium", marginTop: 5, borderRadius: 50, paddingHorizontal: 15,
                        backgroundColor: "#6434eb", textAlign: "center", alignSelf: "center", padding: 5
                    }}>Calculate</Text>
                </View> */}


                <View style={{ marginTop: 15 }}>
                    <Text style={{ color: "white", fontSize: 12, fontFamily: "Montserrat-Medium", }}>There you have to enter two inputs and we automatically calculate the value to you from our API</Text>
                </View>
                <View style={{ marginTop: 10 }}>
                    <View>
                        <Text style={{ color: "white", fontSize: 12, fontFamily: "Montserrat-Medium", }}>Please enter the first number</Text>
                    </View>
                    <View style={{ marginTop: 8 }}>
                        <Input
                            value={firstNumber}
                            placeholder="Write any number"
                            placeholderTextColor={"#4b4d4f"}
                            keyboardType={"number-pad"}
                            onChangeText={nextText => {
                                setfirstNumber(nextText)
                            }}
                            style={{ backgroundColor: "transparent", fontSize: 8 }}
                            status={"control"}
                        />
                    </View>
                </View>
                <View style={{ marginTop: 10 }}>
                    <View>
                        <Text style={{ color: "white", fontSize: 12, fontFamily: "Montserrat-Medium", }}>Please enter the second number</Text>
                    </View>
                    <View style={{ marginTop: 8 }}>
                        <Input
                            value={secondNumber}
                            placeholder="Write any number"
                            placeholderTextColor={"#4b4d4f"}
                            keyboardType={"number-pad"}
                            onChangeText={nextText => {
                                setsecondNumber(nextText)
                            }}
                            style={{ backgroundColor: "transparent", fontSize: 8 }}
                            status={"control"}
                        />
                    </View>
                </View>
                <View>
                    <Text style={{ color: "white", fontSize: 12, fontFamily: "Montserrat-Medium", marginTop: 15 }}>Please select an operation</Text>
                </View>
                <SelectList
                    inputStyles={{ color: "white" }}
                    closeicon={<Icon name="close"
                        style={{
                            width: 18,
                            height: 18,
                            tintColor: "white",
                        }} />}

                    searchicon={<Icon name="search"
                        style={{
                            width: 18,
                            height: 18,
                            tintColor: "white",
                        }} />}

                    arrowicon={<Icon name="chevron-down"
                        style={{
                            width: 18,
                            height: 18,
                            tintColor: "white",
                        }} />}
                    defaultOption={{ key: '1', value: 'Addition +' }}
                    dropdownStyles={{ borderRadius: 5, }}
                    boxStyles={{ borderRadius: 5, marginTop: 10 }}
                    setSelected={(val: React.SetStateAction<string>) => setSelected(val)}
                    data={data}
                    dropdownTextStyles={{ color: "white" }}
                    fontFamily='lato'
                />

                <View style={{ position: "relative", marginTop: 15, overflow: "hidden" }}>
                    <TouchableOpacity onPress={() => {
                        requestCalculateData()
                    }}
                        style={{
                            paddingVertical: 10, borderRadius: 5, flexDirection: "row",
                            backgroundColor: "#6434eb", alignItems: "center", justifyContent: "center",
                        }}>
                        {
                            loadSendRequestToBackend && <ActivityIndicator color={"white"} style={{ marginRight: 5 }} size={17} />
                        }
                        {
                            !loadSendRequestToBackend ? <Text style={{ color: "white" }}>Calculate</Text> :
                                <Text style={{ color: "white" }}>Requesting...</Text>
                        }
                        {
                            !loadSendRequestToBackend && <Icon name="smartphone-outline" style={{ width: 15, height: 15, tintColor: "white", marginLeft: 5 }} />
                        }
                    </TouchableOpacity>

                    {
                        (loadSendRequestToBackend || firstNumber.length === 0 || secondNumber.length === 0) &&
                        <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 1, backgroundColor: "rgba(10,10,10,.5)" }} />
                    }
                </View>

                {
                    !loadSendRequestToBackend && responseData && <View style={{ marginTop: 20, display: "flex", alignItems: "center", flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ color: "white", fontSize: 14, fontFamily: "Montserrat-Medium", flex: 1 }}>The result of your operation is: </Text>
                        <Text style={{ color: "#6434eb", fontSize: 18, fontFamily: "Montserrat-Medium", textDecorationLine: "underline" }}>{responseData.toFixed(2)}</Text>
                    </View>
                }
                <View style={{ marginBottom: 20 }} />
            </ScrollView>
        </SafeAreaView>
    )
}

export default CalculatorScreen