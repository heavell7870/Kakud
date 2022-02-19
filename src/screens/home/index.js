import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Linking,
  Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import { getCommodities } from "../../redux/actions/main";
import { color } from "../../utils/color";
import { GlobalStyles } from "../../utils/globalStyles";
import { icons, images } from "../../utils/icons";
import { IMAGE_URL } from "../../utils/url";
import Ionicons from "@expo/vector-icons/Ionicons";
import Toast from "../../utils/toast";

export default function Home({ navigation }) {
  const [data, setData] = useState([
    {
      id: "1",
      title: "Dummy",
      description: "Dummy text",
      image: "https://picsum.photos/200",
    },
    {
      id: "2",
      title: "Dummy",
      description: "Dummy text",
      image: "https://picsum.photos/200",
    },
    {
      id: "3",
      title: "Dummy",
      description: "Dummy text",
      image: "https://picsum.photos/200",
    },
    {
      id: "4",
      title: "Dummy",
      description: "Dummy text",
      image: "https://picsum.photos/200",
    },
    {
      id: "5",
      title: "Dummy",
      description: "Dummy text",
      image: "https://picsum.photos/200",
    },
    {
      id: "6",
      title: "Dummy",
      description: "Dummy text",
      image: "https://picsum.photos/200",
    },
    {
      id: "7",
      title: "Dummy",
      description: "Dummy text",
      image: "https://picsum.photos/200",
    },
  ]);
  const { commodities } = useSelector((state) => state.reducer);
  const [address, setAddress] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCommodities());
  }, []);

  useEffect(() => {
    fetchAddress();
  }, []);

  const fetchAddress = async () => {
    const raw_address = await AsyncStorage.getItem("address");
    const address = JSON.parse(raw_address);
    setAddress(address);
  };

  const callNumber = (phone) => {
    let phoneNumber;
    if (Platform.OS !== "android") {
      phoneNumber = `telprompt:${phone}`;
    } else {
      phoneNumber = `tel:${phone}`;
    }
    Linking.openURL(phoneNumber);
    // Linking.canOpenURL(phoneNumber)
    //   .then((supported) => {
    //     if (!supported) {
    //       Toast("Phone number is not available");
    //     } else {
    //       return Linking.openURL(phoneNumber);
    //     }
    //   })
    //   .catch((err) => console.log(err));
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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color.light_primary }}>
      <View style={{ height: "100%", width: "100%" }}>
        <View style={{ backgroundColor: color.white }}>
          <Header
            onBagPress={() => navigation.navigate("MyOrders")}
            bagVisible={true}
            type="menu"
            searchVisible={true}
          />
        </View>
        <TouchableOpacity
          onPress={() => openWhatsapp()}
          style={{ position: "absolute", bottom: 100, right: 20, zIndex: 10 }}
        >
          <Image style={{ height: 67, width: 67 }} source={icons.whatsapp} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => callNumber("918748855850")}
          style={{ position: "absolute", bottom: 20, right: 20, zIndex: 10 }}
        >
          <Image style={{ height: 67, width: 67 }} source={icons.call} />
        </TouchableOpacity>
        <FlatList
          data={commodities}
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: color.white }}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={() => <ListHeader address={address} />}
          ListFooterComponent={() => <View style={{ marginBottom: 10 }} />}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Category", {
                  id: item.id,
                  name: item.name,
                })
              }
              style={{
                padding: 5,
                borderRadius: 10,
                elevation: 5,
                shadowColor: color.black,
                shadowOpacity: 0.4,
                shadowOffset: { height: 3, width: 0 },
                shadowRadius: 3,
                backgroundColor: color.white,
                marginTop: 10,
                marginHorizontal: 15,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={{ uri: `${IMAGE_URL}${item.category_image}` }}
                style={{ height: 70, width: 70, borderRadius: 5 }}
              />
              <View style={{ marginLeft: 20, maxWidth: "75%" }}>
                <Text
                  numberOfLines={1}
                  style={{
                    color: color.black,
                    fontSize: 16,
                    ...GlobalStyles.dm_sans_bold,
                  }}
                >
                  {item.name}
                </Text>
                <Text
                  numberOfLines={2}
                  style={{
                    color: color.grey,
                    fontSize: 12,
                    marginTop: 2,
                    ...GlobalStyles.dm_sans_regular,
                  }}
                >
                  ({item.products} {item.products == 1 ? "Product" : "Products"}
                  )
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const ListHeader = ({ address }) => (
  <View style={{ width: "100%", backgroundColor: color.white }}>
    <View style={{ marginTop: 0 }}>
      <View style={{ padding: 15, paddingTop: 10 }}>
        {address && (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons size={16} name={"ios-location-outline"} />
            <Text style={{ fontSize: 16, ...GlobalStyles.semi_bold_text600 }}>
              {address?.District}, {address?.Pincode}
            </Text>
          </View>
        )}
        <View
          style={{
            width: "100%",
            borderRadius: 10,
            marginTop: 10,
            backgroundColor: color.primary,
            justifyContent: "space-between",
            alignItems: "center",
            padding: 15,
            flexDirection: "row",
          }}
        >
          <View style={{ width: "70%" }}>
            <Text
              style={{
                fontSize: 25,
                color: color.white,
                maxWidth: "100%",
                textAlign: "left",
                ...GlobalStyles.bold_text,
              }}
            >
              Flat 100 Rs OFF!
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: color.white,
                marginTop: 5,
                maxWidth: "100%",
                textAlign: "left",
                ...GlobalStyles.semi_bold_text600,
              }}
            >
              Browse best suited organic fertilizers for your fields.
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flexDirection: "column" }}>
              <Image
                source={images.spray}
                style={{ height: 142, width: 89, borderRadius: 10 }}
              />
            </View>
          </View>
        </View>
      </View>
      <View style={{ marginTop: 5 }}>
        <Text
          style={{
            fontSize: 18,
            textAlign: "left",
            marginLeft: 15,
            ...GlobalStyles.semi_bold_text600,
          }}
        >
          Categories
        </Text>
      </View>
    </View>
  </View>
);
