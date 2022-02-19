import React, { useState } from "react";
import Container from "../../components/Container";
import { View, Text, Image } from "react-native";
import { color } from "../../utils/color";
import Button from "../../components/Button";
import { GlobalStyles } from "../../utils/globalStyles";
import FloatingLabel from "../../components/FloatingLabel";
import Feather from "@expo/vector-icons/Feather";
import common_axios from "../../utils/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setIsUser, setUserData } from "../../redux/actions/main";
import { useDispatch } from "react-redux";
import Toast from "../../utils/toast";
import Timer from "./timer";
import { BottomSheet } from "react-native-btr";
import { icons } from "../../utils/icons";

function Verification({ navigation, route }) {
  const { phone, type } = route.params;
  const [otp, setOtp] = useState("");
  const [bottom, setBottom] = useState(false);
  const [bottomType, setBottomType] = useState("not_available");
  const [loading, setLoading] = useState(false);
  const [pincode, setPincode] = useState("");
  const [pinloading, setPinLoading] = useState(false);
  const dispatch = useDispatch();

  const verify = async () => {
    setLoading(true);
    try {
      const { data } = await common_axios.post("/auth/verify_otp", {
        phone,
        otp,
      });
      console.log(data);
      if (data.status == 200) {
        dispatch(setUserData(data.user));
        //dispatch(setIsUser(true))
        await AsyncStorage.setItem(
          "access_token",
          JSON.stringify(data.user?.api_token)
        );
        await AsyncStorage.setItem("user_data", JSON.stringify(data.user));
        setBottom(true);
        setBottomType("input");
      } else {
        Toast("Invalid Code");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      alert("Invalid Code");
      setLoading(false);
    }
  };

  const verifyPincode = async () => {
    if (pincode.length != 6) {
      alert("Enter a valid pincode.");
      return;
    }
    try {
      const { data } = await common_axios.post("/verify-pincode", {
        pincode,
      });
      if (data.success == "service available") {
        setBottomType("available");
        fetchAddress();
        Toast("Redirecting in 3 seconds");
        setTimeout(() => {
          dispatch(setIsUser(true));
        }, 3000);
      } else {
        setBottomType("not_available");
      }
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  };

  const fetchAddress = async () => {
    try {
      const { data } = await common_axios.get(
        `https://api.postalpincode.in/pincode/${pincode}`
      );
      if (data[0]?.Status == "Success" && data[0].PostOffice.length != 0) {
        await AsyncStorage.setItem(
          "address",
          JSON.stringify(data[0].PostOffice[0])
        );
      }
    } catch (error) {
      console.log(error);
      Toast("An error occured");
    }
  };

  const hideBottomSheet = () => {
    if (bottomType == "input") {
      alert("Please verify your pincode.");
      return;
    }
    setBottom(false);
  };

  return (
    <Container>
      <Feather
        onPress={() => navigation.goBack(null)}
        style={{ position: "absolute", top: 45, left: 20 }}
        name="arrow-left"
        size={24}
        color={color.white}
      />
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 100,
        }}
      >
        <Text
          style={{
            fontSize: 28,
            color: color.white,
            ...GlobalStyles.bold_text,
          }}
        >
          Verification!
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: "center",
            color: color.white,
            maxWidth: "90%",
            marginTop: 10,
            ...GlobalStyles.semi_bold_text,
          }}
        >
          Enter 4 digits code that sent to your {phone} mobile no.
        </Text>
        <View>
          <FloatingLabel
            value={otp}
            style={{ backgroundColor: color.transparent, marginTop: 60 }}
            label={"Enter OTP"}
            autoCapitalize="none"
            keyboard={"phone-pad"}
            maxLength={4}
            onChangeText={(value) => {
              setOtp(value);
            }}
          />
        </View>
        <Button
          loading={loading}
          titleStyle={{ fontSize: 16 }}
          style={{ marginTop: 15 }}
          title={"Verify"}
          onPress={() => verify()}
        />
        <Timer phone={phone} init_seconds={30} api={"/auth/resend_otp"} />
      </View>
      <BottomSheet
        visible={bottom}
        onBackButtonPress={() => hideBottomSheet()}
        onBackdropPress={() => hideBottomSheet()}
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
          {bottomType == "input" ? (
            <View>
              <FloatingLabel
                value={pincode}
                style={{
                  backgroundColor: color.transparent,
                  marginTop: 0,
                  borderColor: color.black,
                  borderWidth: 1,
                  color: color.black,
                }}
                inputStyle={{ color: color.black }}
                label={"Enter Pincode"}
                labelColor={color.black}
                autoCapitalize="none"
                keyboard={"phone-pad"}
                maxLength={6}
                onChangeText={(value) => {
                  setPincode(value);
                }}
              />
              <Button
                loading={pinloading}
                titleStyle={{ fontSize: 16, color: color.white }}
                style={{
                  marginTop: 35,
                  backgroundColor: color.primary,
                  alignSelf: "center",
                }}
                title={"Submit"}
                onPress={() => verifyPincode()}
              />
            </View>
          ) : bottomType == "available" ? (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Image style={{ height: 50, width: 50 }} source={icons.tick} />
              <Text
                style={{
                  fontSize: 20,
                  marginTop: 15,
                  ...GlobalStyles.semi_bold_text,
                }}
              >
                {type == "login"
                  ? "Login successful"
                  : "Successfully  Registered"}
              </Text>
            </View>
          ) : (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Image style={{ height: 50, width: 50 }} source={icons.close} />
              <Text
                style={{
                  fontSize: 20,
                  maxWidth: "80%",
                  color: color.red,
                  marginTop: 15,
                  textAlign: "center",
                  ...GlobalStyles.semi_bold_text,
                }}
              >
                No Service available in your location
              </Text>
              <Text
                onPress={() => setBottomType("input")}
                style={{
                  fontSize: 12,
                  textDecorationLine: "underline",
                  maxWidth: "80%",
                  color: color.black,
                  marginTop: 10,
                  textAlign: "center",
                  ...GlobalStyles.semi_bold_text,
                }}
              >
                Try again
              </Text>
            </View>
          )}
        </View>
      </BottomSheet>
    </Container>
  );
}

export default Verification;
