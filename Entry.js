import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
  Poppins_500Medium,
  Poppins_800ExtraBold,
  Poppins_600SemiBold,
  Poppins_300Light,
  Poppins_900Black,
} from "@expo-google-fonts/poppins";
import AppLoading from "expo-app-loading";
import { GlobalStyles } from "./src/utils/globalStyles";
import Navigation from "./src/navigation";
import {
  DMSans_400Regular,
  DMSans_400Regular_Italic,
  DMSans_500Medium,
  DMSans_500Medium_Italic,
  DMSans_700Bold,
  DMSans_700Bold_Italic,
} from "@expo-google-fonts/dm-sans";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setIsUser, setUserData } from "./src/redux/actions/main";
export default function Entry() {
  const dispatch = useDispatch();
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
    Poppins_500Medium,
    Poppins_800ExtraBold,
    Poppins_600SemiBold,
    Poppins_300Light,
    Poppins_900Black,
    DMSans_400Regular,
    DMSans_400Regular_Italic,
    DMSans_500Medium,
    DMSans_500Medium_Italic,
    DMSans_700Bold,
    DMSans_700Bold_Italic,
  });

  useEffect(() => {
    check_auth();
  }, []);

  const fetchAddress = async () => {
    const raw_address = await AsyncStorage.getItem("address");
    console.log("raw_address", raw_address);
    if (raw_address) {
      alert(JSON.stringify(raw_address))
    } else {
      await AsyncStorage.clear();
    }
  };
  
  const check_auth = async () => {
    const val = await AsyncStorage.getItem("access_token");
    const new_val = JSON.parse(val);
    console.log("new_val", new_val);
    if (new_val) {
      const user_data = await AsyncStorage.getItem("user_data");
      dispatch(setUserData(JSON.parse(user_data)));
      console.log("user_data", user_data);
      dispatch(setIsUser(true));
      // fetchAddress();
    } else {
      dispatch(setIsUser(false));
    }
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return <Navigation />;
}
