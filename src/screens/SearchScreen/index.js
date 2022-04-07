import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import Product from "../../components/Product";
import common_axios from "../../utils/axios";
import { color } from "../../utils/color";
import { BACKEND_URL } from "../../utils/url";

export default function SearchScreen() {
  const [text, setText] = useState("");
  const [data, setData] = useState([]);

  const onSearch = async () => {
    console.log('searchcallled')
    try {
      const { data } = await common_axios.get(
        `${BACKEND_URL}/product-search/${text}`
      );
      console.log('response', data.data);
      setData(data.data);
    } catch (err) {
      console.log(err);
      console.log(err?.response?.data?.message);
    }
  };

  useEffect(() => {
    if (text != '') {
      onSearch()
    } else {
      setData([])
    }
  }, [text])

  return (
    <SafeAreaView style={{ backgroundColor: color.primary }}>
      <View
        style={{ height: "100%", width: "100%", backgroundColor: color.white }}
      >
        <Header
          onKeyPress={() => onSearch()}
          value={text}
          setValue={setText}
          type="search"
        />
        <FlatList
          data={data}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-evenly" }}
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: color.white }}
          keyExtractor={(item) => item.id}
          ListFooterComponent={() => <View style={{ marginBottom: 10 }} />}
          renderItem={({ item, index }) => (
            <Product item={item} name={"Product"} index={index} />
          )}
        />
      </View>
    </SafeAreaView>
  );
}
