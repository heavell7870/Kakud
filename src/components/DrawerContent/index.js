import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import React from "react";
import { View, Text, SafeAreaView, Image, Linking } from "react-native";
import { color } from "../../utils/color";
import { GlobalStyles } from "../../utils/globalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { setIsUser, setUserData } from "../../redux/actions/main";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import Toast from "../../utils/toast";
import { IMAGE_URL } from "../../utils/url";

export default function DrawerContent(props) {
  const dispatch = useDispatch();

  const logout = async () => {
    await AsyncStorage.clear();
    dispatch(setIsUser(false));
    dispatch(setUserData({}));
  };

  const openWhatsapp = () => {
    Linking.canOpenURL("whatsapp://send?text=Hello&phone=+918748855850")
      .then((supported) => {
        if (!supported) {
          Toast("This feature is not supported in this phone");
        } else {
          return Linking.openURL(
            "whatsapp://send?text=Hello&phone=+918748855850"
          );
        }
      })
      .catch((err) => console.log(err));
  };

  const callNumber = (phone) => {
    let phoneNumber = phone;
    if (Platform.OS !== "android") {
      phoneNumber = `telprompt:${phone}`;
    } else {
      phoneNumber = `tel:${phone}`;
    }
    Linking.canOpenURL(phoneNumber)
      .then((supported) => {
        if (!supported) {
          Toast("Phone number is not available");
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch((err) => console.log(err));
  };

  const { user_data } = useSelector((state) => state.reducer);

  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          height: 55,
          width: "100%",
          backgroundColor: color.white,
          alignItems: "center",
          flexDirection: "row",
          paddingHorizontal: 20,
          marginTop: 10,
        }}
      >
        <Image
          style={{ height: 55, width: 55, borderRadius: 30 }}
          source={{
            uri: user_data.profile_pic
              ? `${IMAGE_URL}/${user_data.profile_pic}`
              : "https://picsum.photos/200",
          }}
        />
        <View style={{ marginLeft: 10 }}>
          <Text style={{ ...GlobalStyles.bold_text }}>{user_data.name}</Text>
          <Text
            style={{ color: color.semiBlack, ...GlobalStyles.regular_text }}
          >
            {user_data.phone}
          </Text>
        </View>
      </View>
      <View style={{ height: 20 }} />
      <DrawerItemList {...props} />
      <DrawerItem
        label="Help"
        icon={() => <Feather name="phone" color={color.black} size={18} />}
        onPress={() => callNumber("+918748855850")}
        labelStyle={{
          marginLeft: -10,
          fontSize: 16,
          color: color.black,
          ...GlobalStyles.dm_sans_regular,
        }}
        style={{
          marginHorizontal: "7%",
          marginTop: 0,
          borderBottomWidth: 1,
          borderBottomColor: "rgba(0, 0, 0, 0.1)",
        }}
      />
      <DrawerItem
        label="Whatsapp"
        icon={() => (
          <Ionicons name="logo-whatsapp" color={color.black} size={18} />
        )}
        onPress={() => openWhatsapp()}
        labelStyle={{
          marginLeft: -10,
          fontSize: 16,
          color: color.black,
          ...GlobalStyles.dm_sans_regular,
        }}
        style={{
          marginHorizontal: "7%",
          marginTop: 0,
          borderBottomWidth: 1,
          borderBottomColor: "rgba(0, 0, 0, 0.1)",
        }}
      />
      <DrawerItem
        label="Logout"
        icon={() => <Feather name="lock" color={color.black} size={18} />}
        onPress={() => logout()}
        labelStyle={{
          marginLeft: -10,
          fontSize: 16,
          color: color.black,
          ...GlobalStyles.dm_sans_regular,
        }}
        style={{ marginHorizontal: "7%", marginTop: 0 }}
      />
    </DrawerContentScrollView>
  );
}
