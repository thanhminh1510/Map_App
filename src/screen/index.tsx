/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable curly */
/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import {
    Text,
    StyleSheet,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    SafeAreaView,
    FlatList,
    Pressable,
    View,
} from "react-native";


import { Location } from "../types/location";

export default function TabTwoScreen() {
    const [input, setInput] = useState<string>();
    const [data, setData] = useState<Location[]>([]);

    const onChangeText = async (text: string) => {
        setInput(text);
        // get host from localhost:19002 above the qrcode
        if (text.length > 2) {
            const endpoint = `https://maps.vietmap.vn/api/autocomplete?api-version=1.1&apikey=c0faa23a3ec54da8f8ccd840c472032746264eeb6fa1a74b&focus.point.lat=10.794567615086677&focus.point.lon=106.63550558739446&region=Thành Phố Hồ Chí Minh&text=${input}`;
            let res = await fetch(endpoint);
            if (res) {
                // console.log(res);
                let data: Location[] = await res.json();
                setData(data.data.features);
            }
        }
        // console.log(data);
    };

    const getItemText = (item: Location) => {

        let mainText = item.properties.label;

        // if (item.type === "city" && item.address.state)
        //     mainText += ", " + item.address.state;
        // let mainText =
        // "afnjoei aeorin faiernae ireon erinfe oiener oifreiingr weinwe woienwwf rmtpogoperm iorenoire wfwoiene oienrgerr ";

        return (
            <View style={{ flexDirection: "row", alignItems: "center", padding: 15 }}>
                <View style={{ marginLeft: 10, flexShrink: 1 }}>
                    <Text style={{ fontWeight: "700" }}>{mainText}</Text>

                </View>
            </View>
        );
    };


    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <SafeAreaView style={{ flex: 1 }}>
                <Text style={{ marginLeft: 12, marginVertical: 5, fontSize: 12 }}>
                    Search Locations
                </Text>
                <TextInput
                    onChangeText={onChangeText}
                    value={input}
                    style={{
                        height: 40,
                        marginHorizontal: 12,
                        borderWidth: 1,
                        paddingHorizontal: 10,
                        borderRadius: 5,
                    }}
                    placeholder="Find a Location"
                />
                {input && data.length > 0 ? (
                    <FlatList
                        data={data}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, index }) => (
                            <Pressable
                                style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
                                onPress={() =>
                                    alert("navigate to page passing in " + JSON.stringify(item))
                                }
                            >
                                {getItemText(item)}
                            </Pressable>
                        )}
                        keyExtractor={(item, index) => item.Id + index}
                    />
                ) : null}
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}