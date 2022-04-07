import React, { useEffect, useState } from "react";
import Container from "../../components/Container";
import { View, Text, Image, Alert, Keyboard } from "react-native";
import { color } from "../../utils/color";
import Button from "../../components/Button";
import { GlobalStyles } from "../../utils/globalStyles";
import FloatingLabel from "../../components/FloatingLabel";
import common_axios from "../../utils/axios";
import { useDispatch } from "react-redux";
import { images } from "../../utils/icons";

function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);

  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const _keyboardDidShow = () => setKeyboardStatus(true);
  const _keyboardDidHide = () => setKeyboardStatus(false);

  const dispatch = useDispatch();

  const handlePress = async () => {
    let isnum = /^\d+$/.test(email);
    if (email.length != 10 || !isnum) {
      alert("Enter a valid mobile number");
      return;
    }

    setLoading(true);
    try {
      const { data } = await common_axios.post("/auth/login", {
        phone: email,
      });
      console.log(data);
      setLoading(false);
      if (data.success == 1) {
        navigation.navigate("Verification", { phone: email, type: "login" });
      } else {
        Alert.alert('', data.message);
      }
    } catch (e) {
      console.log(e.response?.data?.message);
      Alert.alert('', e.response?.data?.message);
      setLoading(false);
    }
  };

  return (
    <Container style={{ justifyContent: "center", alignItems: "center" }}>
      <View
        style={{
          position: "absolute",
          bottom: 70,
          left: 0,
          right: 0,
          zIndex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {!keyboardStatus && <Image
          style={{ height: 226, width: 226, resizeMode: "contain" }}
          source={images.logo}
        />}
        <Text
          style={{
            fontSize: 28,
            color: color.white,
            marginTop: 45,
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
          Create your account or login to start
        </Text>
        <FloatingLabel
          value={email}
          style={{ backgroundColor: color.transparent, marginTop: 50 }}
          label={"Enter mobile number"}
          maxLength={10}
          keyboardType={"phone-pad"}
          autoCapitalize="none"
          onChangeText={(value) => {
            setEmail(value);
          }}
        />
        <Button
          loading={loading}
          titleStyle={{ fontSize: 16 }}
          style={{ marginTop: 15 }}
          title={"Send OTP"}
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
          Doesn’t have an account?{" "}
          <Text
            onPress={() => navigation.navigate("Register")}
            style={{ color: color.white }}
          >
            Register
          </Text>
        </Text>
      </View>
    </Container>
  );
}

export default Login;
