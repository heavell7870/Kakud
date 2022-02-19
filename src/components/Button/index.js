import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { ActivityIndicator } from "react-native";
import { color } from "../../utils/color";
import { GlobalStyles } from "../../utils/globalStyles";

export default function Button({ style, title, onPress, titleStyle, loading }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: "90%",
        height: 48,
        backgroundColor: color.white,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        ...style,
      }}
    >
      {loading ? (
        <ActivityIndicator color={color.white} size={"small"} />
      ) : (
        <Text
          style={{
            color: color.primary,
            fontSize: 20,
            ...GlobalStyles.bold_text,
            ...titleStyle,
          }}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}
