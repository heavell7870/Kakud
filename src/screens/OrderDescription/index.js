import React, { useCallback, useEffect, useState } from "react";
import {
    View,
    SafeAreaView,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
    Dimensions,
    ScrollView,
} from "react-native";
import WebView from "react-native-webview";
import { useSelector } from "react-redux";
import Header from "../../components/Header";
import common_axios from "../../utils/axios";
import { color } from "../../utils/color";
import { GlobalStyles } from "../../utils/globalStyles";
import Toast from "../../utils/toast";
import { IMAGE_URL } from "../../utils/url";
import Carousel from "react-native-banner-carousel";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Picker } from "@react-native-picker/picker";
import { icons } from "../../utils/icons";

const OrderDescription = ({ navigation, route }) => {
    const order = route.params?.order
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: color.light_primary }}>
            <View
                style={{ width: "100%", backgroundColor: color.white, height: "100%" }}
            >
                <Header
                    title={'Order Description'}
                    bagVisible={true}
                    notifyVisible={false}
                    searchVisible={false}
                    type="back"
                />
                <ScrollView>
                    <View style={{
                        height: 27
                    }} />
                    <FlatList
                        data={order?.items}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <View style={{
                                marginHorizontal: 16,
                                marginVertical: 10,
                                borderRadius: 20,
                                elevation: 1,
                                shadowColor: color.black,
                                elevation: 5,
                                backgroundColor: color.white,
                                shadowOffset: { height: 3, width: 3 },
                                shadowOpacity: 0.5,
                                shadowRadius: 3,
                            }}>
                                <View
                                    style={{
                                        maxHeight: 150,
                                        backgroundColor: color.white,
                                        flexDirection: "row",
                                        padding: 2,
                                        borderRadius: 20,
                                    }}
                                >
                                    <View
                                        style={{
                                            borderRadius: 18,
                                            margin: 7,
                                            width: "30%",
                                            backgroundColor: "#EBEBEB",
                                        }}
                                    >
                                        <Image
                                            source={{
                                                uri:
                                                    item.images?.length > 0
                                                        ? item.images[0].file
                                                        : "",
                                            }}
                                            style={{
                                                height: "100%",
                                                width: "100%",
                                                resizeMode: "contain",
                                            }}
                                        />
                                    </View>
                                    <View
                                        style={{
                                            width: "64%",
                                            justifyContent: "center",
                                            marginLeft: "4%",
                                        }}
                                    >
                                        <Text
                                            style={{ ...GlobalStyles.semi_bold_text600 }}
                                            numberOfLines={1}
                                        >
                                            {item.product_name}
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: 10,
                                                color: color.grey,
                                                marginTop: 3,
                                                maxWidth: "75%",
                                                ...GlobalStyles.regular_text,
                                            }}
                                            numberOfLines={1}
                                        >
                                             (₹{item.price} X {item.quantity})
                                        </Text>
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                alignItems: "center",
                                                marginTop: 5,
                                            }}
                                        >
                                            <Text style={{ fontWeight: "600" }}>
                                                ₹
                                                <Text style={{ ...GlobalStyles.semi_bold_text600 }}>
                                                {item.quantity * parseInt(item.price)}
                                                </Text>
                                            </Text>
                                            <Text
                                                style={{
                                                    fontSize: 10,
                                                    color: color.grey,
                                                    textDecorationLine: "line-through",
                                                    marginLeft: 5,
                                                }}
                                            ></Text>
                                        </View>
                                        <Text
                                            style={{
                                                color: "#4B4B4B",
                                                fontSize: 12,
                                                ...GlobalStyles.regular_text,
                                            }}
                                        >
                                            Quantity:{" "}
                                            <Text style={{ ...GlobalStyles.semi_bold_text600 }}>
                                                {item.variant}
                                            </Text>
                                        </Text>
                                        <Text
                                            style={{
                                                color: "#4B4B4B",
                                                fontSize: 12,
                                                ...GlobalStyles.regular_text,
                                            }}
                                        >
                                            Order id: {order.order_number}
                                        </Text>
                                        <Text
                                            style={{
                                                color: "#4B4B4B",
                                                fontSize: 12,
                                                marginTop: 5,
                                                ...GlobalStyles.regular_text,
                                            }}
                                        >
                                            Ordered on{" "}
                                            {new Date(
                                                order.created_date
                                                    ? order.created_date
                                                    : "03 jan 2020"
                                            ).toDateString()}
                                        </Text>
                                    </View>
                                </View>
                                {index == order.items?.length - 1 ? null : (
                                    <View
                                        style={{
                                            borderBottomWidth: 0.5,
                                            marginVertical: 5,
                                            borderBottomColor: "rgba(0, 0, 0, 0.1)",
                                        }}
                                    />
                                )}
                            </View>
                        )}
                    />

                    <View style={{
                        marginHorizontal: 16,
                        marginBottom: 15,
                        marginTop: 12,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 18,
                        paddingTop: 6,
                        paddingBottom: 5,
                        backgroundColor: order.order_status == "Delivered" ? "#42BE65" : "#FFD809"
                    }}>
                        <Image
                            style={{ height: 18, width: 18, marginRight: 40 }}
                            source={icons.delivered_white}
                        />
                        <View>
                            <Text style={[{
                                lineHeight: 20,
                                fontSize: 12,
                                color: color.white,
                            }, GlobalStyles.bold_text]}>{order.order_status}</Text>
                            <Text style={[{
                                lineHeight: 20,
                                fontSize: 10,
                                color: color.white,
                            }, GlobalStyles.regular_text]}>on {new Date(order.order_status_date).toDateString()}</Text>
                        </View>
                    </View>

                    <View style={{
                        marginHorizontal: 16,
                        marginVertical: 10,
                        paddingVertical: 14,
                        paddingHorizontal: 17,
                        borderRadius: 20,
                        elevation: 1,
                        shadowColor: color.black,
                        elevation: 5,
                        backgroundColor: color.white,
                        shadowOffset: { height: 3, width: 3 },
                        shadowOpacity: 0.5,
                        shadowRadius: 3,
                    }}>
                        <Text style={[{
                            lineHeight: 21,
                            fontSize: 14,
                            color: color.black,
                            marginBottom: 4
                        }, GlobalStyles.bold_text]}>Delivery Address</Text>

                        <Text style={[{
                            lineHeight: 20,
                            fontSize: 13,
                            color: color.black,
                            marginBottom: 12
                        }, GlobalStyles.regular_text]}>{order.address.address}, {order.address.city}, {order.address.locality}, {order.address.state} {order.address.pincode}</Text>

                        <Text style={[{
                            lineHeight: 18,
                            fontSize: 12,
                            color: color.black,
                        }, GlobalStyles.bold_text]}>Mobile Number: <Text style={GlobalStyles.regular_text}>{order.address.phone}</Text></Text>

                        <Text style={[{
                            lineHeight: 18,
                            fontSize: 12,
                            color: color.black,
                        }, GlobalStyles.bold_text]}>Google pay Number: <Text style={GlobalStyles.regular_text}>{order.address.google_pay}</Text></Text>
                    </View>


                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default OrderDescription