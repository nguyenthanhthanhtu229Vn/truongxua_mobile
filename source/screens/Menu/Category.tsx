import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { COLORS, SIZES } from "../../constant";
import { StyleSheet } from "react-native";
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
    <View style={{ top: 60 }}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          flexDirection: "column",
          marginBottom: SIZES.base,
          alignItems: "center",
        }}
      >
        <Image source={icon} style={style.icon} />
        <Text style={style.label}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  label: {
    textAlign: "center",
    color: COLORS.white,
    height: 20,
    fontWeight: "600",
    fontSize: 17,
    width: 90,
    marginTop: 8,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
    marginTop: 8,
  },
});
export default CategoryMenu;
