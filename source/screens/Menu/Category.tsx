import React from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import { COLORS, FONTS, SIZES } from "../../constant";
const CategoryMenu = ({
  label,
  icon,
  onPress,
}: {
  label: string;
  icon: any;
  onPress?: any;
}) => {
  return (
    <View style={{ position: "relative", top: 40 }}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          flexDirection: "column",
          height: 48,
          width: 48,
          marginBottom: SIZES.base,
          paddingLeft: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.white,
        }}
      >
        <Image
          source={icon}
          style={{
            width: 30,
            height: 30,
            marginRight: 10,
            marginTop: 8,
          }}
        />
      </TouchableOpacity>
      <Text
        style={{
          textAlign: "justify",
          color: COLORS.black,
          height: 20,
          fontWeight: "400",
          ...FONTS.h3,
          width: 90,
        }}
      >
        {label}
      </Text>
    </View>
  );
};

export default CategoryMenu;
