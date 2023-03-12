import { Icon, Input } from "@ui-kitten/components";
import React from "react";
import { SafeAreaView, TouchableOpacity, View } from "react-native"
import { Text } from "react-native"
import { SelectList } from "react-native-dropdown-select-list";

const CalculatorScreen = () => {

    const [selected, setSelected] = React.useState("");

    const data = [
        // { key: '1', value: 'Mobiles', disabled: true },
        { key: '1', value: 'Addition +' },
        { key: '2', value: 'Multiplication x' },
        { key: '3', value: 'Substraction -' },
        { key: '4', value: 'Division /' },
    ]
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#1a202c", position: "relative", padding: 10 }}>
            <Text>CalculatorScreen</Text>

            <View style={{ marginTop: 10 }}>
                <View>
                    <Text style={{ color: "white", fontSize: 12, fontFamily: "Montserrat-Medium", }}>Please enter the first number</Text>
                </View>
                <View style={{ marginTop: 5 }}>
                    <Input
                        // value={calculatedPrice}
                        placeholder="Write any text"
                        placeholderTextColor={"#4b4d4f"}
                        // keyboardType={"number-pad"}
                        // onChangeText={nextText => {
                        //     setCalculatedPrice(nextText)
                        // }}
                        style={{ backgroundColor: "transparent", fontSize: 8 }}
                        status={"control"}
                    />
                </View>
            </View>
            <View style={{ marginTop: 10 }}>
                <View>
                    <Text style={{ color: "white", fontSize: 12, fontFamily: "Montserrat-Medium", }}>Please enter the second number</Text>
                </View>
                <View style={{ marginTop: 5 }}>
                    <Input
                        // value={calculatedPrice}
                        placeholder="Write any text"
                        placeholderTextColor={"#4b4d4f"}
                        // keyboardType={"number-pad"}
                        // onChangeText={nextText => {
                        //     setCalculatedPrice(nextText)
                        // }}
                        style={{ backgroundColor: "transparent", fontSize: 8 }}
                        status={"control"}
                    />
                </View>
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
                dropdownStyles={{ borderRadius: 5, }}
                boxStyles={{ borderRadius: 5, marginTop: 15 }}
                setSelected={(val: React.SetStateAction<string>) => setSelected(val)}
                data={data}
                dropdownTextStyles={{ color: "white" }}
                fontFamily='lato'
            />
            <View style={{ marginTop: 15 }}>
                <TouchableOpacity
                    // onPress={() => sendToFirebase()}
                    activeOpacity={.7}
                    style={{ backgroundColor: "#319795", padding: 10, paddingVertical: 8, display: "flex", alignItems: "center", borderRadius: 5 }}>
                    <Text style={{ fontFamily: "Montserrat-Medium", color: "white", }}>Validate</Text>
                </TouchableOpacity>
            </View>

            <View style={{ marginTop: 20, display: "flex", alignItems: "center", flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ color: "white", fontSize: 14, fontFamily: "Montserrat-Medium", flex: 1 }}>The result of your operation is: </Text>
                <Text style={{ color: "white", fontSize: 18, fontFamily: "Montserrat-Medium", textDecorationLine:"underline" }}>15</Text>
            </View>
        </SafeAreaView>
    )
}

export default CalculatorScreen