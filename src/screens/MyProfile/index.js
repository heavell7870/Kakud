import React from "react";
import { View, Text, SafeAreaView, Image } from "react-native";
import { color } from "../../utils/color";
import Header from "../../components/Header";
import { GlobalStyles } from "../../utils/globalStyles";
import { useSelector } from "react-redux";
import Button from "../../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setIsUser, setUserData } from "../../redux/actions/main";
import { icons } from "../../utils/icons";
import { IMAGE_URL } from "../../utils/url";
export default function MyProfile({ navigation }) {
  const { user_data } = useSelector((state) => state.reducer);
  const dispatch = useDispatch();

  const logout = async () => {
    await AsyncStorage.clear();
    dispatch(setIsUser(false));
    dispatch(setUserData({}));
  };

  console.log(user_data);
  return (
    <SafeAreaView style={{ backgroundColor: color.light_primary }}>
      <View
        style={{
          height: "100%",
          width: "100%",
          alignItems: "center",
          backgroundColor: color.white,
        }}
      >
        <Header
          type="custom"
          rightBtnVisible={false}
          right_text={"Edit"}
          onRightBtnPress={() => navigation.navigate("EditProfile")}
          title={"Profile"}
        />
        <View
          style={{
            width: "90%",
            marginTop: 27,
            backgroundColor: color.primary,
            alignItems: "center",
            height: 243,
            borderRadius: 10,
            marginTop: 60,
          }}
        >
          <View>
            <Image
              source={{
                uri: user_data.profile_pic
                  ? `${IMAGE_URL}/${user_data.profile_pic}`
                  : "https://picsum.photos/200",
              }}
              style={{
                height: 121,
                width: 121,
                borderRadius: 80,
                marginTop: -30,
                borderWidth: 3,
                borderColor: color.white,
              }}
            />
            <View
              style={{
                position: "absolute",
                height: 35,
                width: 35,
                backgroundColor: color.white,
                borderRadius: 50,
                bottom: 0,
                right: 0,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image source={icons.camera} style={{ width: 20, height: 16 }} />
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 5,
              marginTop: 31,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: color.white,
                ...GlobalStyles.semi_bold_text,
              }}
            >
              Name:{" "}
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: color.white,
                marginLeft: 10,
                ...GlobalStyles.regular_text,
              }}
            >
              {user_data.name}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 5,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: color.white,
                ...GlobalStyles.semi_bold_text,
              }}
            >
              Phone no:{" "}
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: color.white,
                marginLeft: 10,
                ...GlobalStyles.regular_text,
              }}
            >
              {user_data.phone}
            </Text>
          </View>
          {/* <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                        <Text style={{ fontSize: 16, ...GlobalStyles.dm_sans_regular }}>Email Id: </Text>
                        <Text style={{ fontSize: 16, color: 'rgba(0, 0, 0, 0.6)', marginLeft: 10, ...GlobalStyles.regular_text }}>{user_data.email}</Text>
                    </View> */}
        </View>
        <View
          style={{
            position: "absolute",
            bottom: 15,
            left: "5%",
            right: "5%",
            height: 60,
          }}
        >
          <Button
            onPress={() => navigation.navigate("EditProfile")}
            titleStyle={{
              color: color.white,
              fontSize: 16,
              ...GlobalStyles.dm_sans_bold,
            }}
            title="Edit"
            style={{
              backgroundColor: color.primary,
              width: "100%",
              borderRadius: 5,
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
