import React, { useState } from "react";
import Container from "../../components/Container";
import { View, Text, Image } from "react-native";
import { color } from "../../utils/color";
import Button from "../../components/Button";
import { GlobalStyles } from "../../utils/globalStyles";
import FloatingLabel from "../../components/FloatingLabel";
import common_axios from "../../utils/axios";
import { useDispatch } from "react-redux";
import { setIsUser, setUserData } from "../../redux/actions/main";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { images } from "../../utils/icons";

function Register({ navigation }) {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");

  const handlePress = async () => {
    let isnum = /^\d+$/.test(phone);
    console.log(isnum);
    if (username.length == 0) {
      alert("Enter a valid name");
      return;
    }

    if (phone.length != 10 || !isnum) {
      alert("Enter a valid phone num");
      return;
    }

    try {
      const { data } = await common_axios.post("/auth/login", {
        name: username,
        phone,
      });
      if (data) {
        navigation.navigate("Verification", { phone, type: "register" });
      }
    } catch (e) {
      console.log(e?.response?.data?.message);
      alert("Server error");
    }
  };

  return (
    <Container style={{ justifyContent: "center", alignItems: "center" }}>
      <Image
        style={{ height: 226, width: 226, resizeMode: "contain" }}
        source={images.logo}
      />
      <Text
        style={{
          fontSize: 28,
          color: color.white,
          marginTop: 50,
          ...GlobalStyles.bold_text,
        }}
      >
        Welcome!
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: color.white,
          marginTop: 10,
          ...GlobalStyles.semi_bold_text,
        }}
      >
        Create your account to get started
      </Text>
      <FloatingLabel
        value={username}
        style={{ backgroundColor: color.transparent, marginTop: 50 }}
        label={"Enter your name"}
        autoCapitalize="none"
        onChangeText={(value) => {
          setUsername(value);
        }}
      />
      <FloatingLabel
        value={phone}
        style={{ backgroundColor: color.transparent, marginTop: 40 }}
        label={"Enter mobile number"}
        maxLength={10}
        keyboardType="phone-pad"
        autoCapitalize="none"
        onChangeText={(value) => {
          setPhone(value);
        }}
      />
      {/* <FloatingLabel
                value={email}
                style={{ backgroundColor: color.transparent, marginTop: 40 }}
                label={"Email Address"}
                autoCapitalize="none"
                onChangeText={(value) => {
                    setEmail(value);
                }}
            /> */}
      {/* <FloatingLabel
                value={password}
                secureTextEntry={true}
                style={{ backgroundColor: color.transparent, marginTop: 40 }}
                label={"Password"}
                autoCapitalize="none"
                onChangeText={(value) => {
                    setPassword(value);
                }}
            /> */}
      <Button
        titleStyle={{ fontSize: 16 }}
        style={{ marginTop: 25 }}
        title={"Register"}
        onPress={() => handlePress()}
      />
      <Text
        style={{
          fontSize: 14,
          color: color.light_grey,
          marginTop: 10,
          ...GlobalStyles.regular_text,
        }}
      >
        Already have an account?{" "}
        <Text
          onPress={() => navigation.navigate("Login")}
          style={{ color: color.white }}
        >
          Login
        </Text>
      </Text>
    </Container>
  );
}

export default Register;
