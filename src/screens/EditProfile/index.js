import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import { color } from "../../utils/color";
import Header from "../../components/Header";
import { GlobalStyles } from "../../utils/globalStyles";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button";
import AntDesign from "@expo/vector-icons/AntDesign";
import FloatingLabel from "../../components/FloatingLabel";
import * as ImagePicker from "expo-image-picker";
import common_axios from "../../utils/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BACKEND_URL, IMAGE_URL } from "../../utils/url";
import { setUserData } from "../../redux/actions/main";
import { icons } from "../../utils/icons";
import Toast from "../../utils/toast";
import HideWithKeyboard from "react-native-hide-with-keyboard";
import { BottomSheet } from "react-native-btr";

export default function EditProfile({ navigation }) {
  const { user_data } = useSelector((state) => state.reducer);
  console.log(user_data);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");
  const [edited, setEdited] = useState(false);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    setPhone(user_data.phone);
    setName(user_data.name);
    setImage(user_data.profile_pic ? user_data.profile_pic : "");
  }, []);

  const pick_image = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Photos,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const update = async () => {
    setProcessing(true);
    let isnum = /^\d+$/.test(phone);
    let form_data = new FormData();
    if (!isnum) {
      alert("Enter a valid number.");
      return;
    }
    if (name?.length != 0 && user_data.name != name) {
      form_data.append("name", name);
    }
    if (image?.length != 0 && user_data.profile_pic != image) {
      form_data.append("profile_pic", {
        type: "image/png",
        name: `${user_data.name}.png`,
        uri: image,
      });
    }

    // const { data } = await common_axios.post('/auth/update_profile', form_data);
    // console.log(data, 'data');
    const token = await AsyncStorage.getItem("access_token");
    fetch(`${BACKEND_URL}/auth/update_profile`, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
      body: form_data,
    })
      .then((res) => res.json())
      .then(async (json) => {
        dispatch(setUserData(json.data));
        console.log(json);
        await AsyncStorage.setItem("user_data", JSON.stringify(json.data));
        setEdited(true);
        setProcessing(false);
        setTimeout(() => {
          setEdited(false);
          navigation.goBack(null);
        }, 3000);
      })
      .catch((e) => {
        Toast("Failed to update");
        setProcessing(false);
        console.log(e);
      });
  };

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
          onRightBtnPress={() => console.log("Hii")}
          title={"Profile"}
        />
        <View
          style={{
            width: "90%",
            backgroundColor: color.primary,
            alignItems: "center",
            height: 312,
            borderRadius: 10,
            marginTop: 90,
          }}
        >
          <View>
            <Image
              source={{
                uri: image
                  ? image.includes("file://")
                    ? image
                    : `${IMAGE_URL}/${image}`
                  : "https://picsum.photos/200",
              }}
              style={{
                height: 121,
                width: 121,
                borderRadius: 80,
                marginTop: -60,
                borderWidth: 3,
                borderColor: color.white,
              }}
            />
            <TouchableOpacity
              onPress={pick_image}
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
            </TouchableOpacity>
          </View>
          <View style={{ width: "90%" }}>
            <FloatingLabel
              value={name}
              style={{
                backgroundColor: color.transparent,
                marginTop: 50,
                borderColor: "#c4c4c4",
                borderRadius: 5,
                width: "100%",
              }}
              label={"Name"}
              labelColor={color.white}
              autoCapitalize="none"
              inputStyle={{ color: color.white, fontSize: 12 }}
              onChangeText={(value) => {
                setName(value);
              }}
            />
            <FloatingLabel
              value={phone}
              style={{
                backgroundColor: color.transparent,
                marginTop: 50,
                borderColor: "#c4c4c4",
                borderRadius: 5,
                color: "rgba(0, 0, 0, 0.6)",
                width: "100%",
              }}
              maxLength={10}
              editable={false}
              keyboardType={"phone-pad"}
              label={"Phone Number"}
              autoCapitalize="none"
              inputStyle={{ color: color.white, fontSize: 12 }}
              labelColor={color.white}
              onChangeText={(value) => {
                setPhone(value);
              }}
            />
          </View>
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
          <HideWithKeyboard>
            <Button
              onPress={() => update()}
              loading={processing}
              titleStyle={{
                color: color.white,
                fontSize: 16,
                ...GlobalStyles.dm_sans_bold,
              }}
              title="Update"
              style={{
                backgroundColor: color.primary,
                width: "100%",
                borderRadius: 5,
              }}
            />
          </HideWithKeyboard>
        </View>
      </View>
      <BottomSheet
        visible={edited}
        onBackButtonPress={() => setEdited(false)}
        onBackdropPress={() => setEdited(false)}
      >
        <View
          style={{
            width: "100%",
            backgroundColor: color.white,
            paddingVertical: 40,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          }}
        >
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Image style={{ height: 50, width: 50 }} source={icons.tick} />
            <Text
              style={{
                fontSize: 20,
                marginTop: 15,
                ...GlobalStyles.semi_bold_text,
              }}
            >
              {"Your profile updated successfuly."}
            </Text>
          </View>
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
}
