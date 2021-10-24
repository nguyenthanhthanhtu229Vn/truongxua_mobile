// /* eslint-disable react-native/no-inline-styles */
import React from "react";
import { Dimensions, View } from "react-native";
import { COLORS, icons } from "../../constant";
import constant from "../../constant/constant";
import CategoryMenu from "./Category";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/core";
const Menu: React.FC = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        // height: Dimensions.get("window").height,
        backgroundColor: COLORS.white,
      }}
    >
      <View style={style.container}>
        <CategoryMenu
          icon={icons.profile_m}
          label={constant.screens.profile}
          onPress={() => {
            navigation.navigate("Profile");
          }}
        />
        <CategoryMenu
          icon={icons.groups}
          label={constant.screens.group}
          onPress={() => navigation.navigate("Group")}
        />
        <CategoryMenu
          icon={icons.event}
          label={constant.screens.event}
          onPress={() => {
            navigation.navigate("Event");
          }}
        />
      </View>
      <View style={style.container}>
        <CategoryMenu
          icon={icons.school}
          label={constant.screens.school}
          onPress={() => navigation.navigate("About School")}
        />
        <CategoryMenu
          icon={icons.pages}
          label={constant.screens.blog}
          onPress={() => {
            navigation.navigate("BlogPost");
          }}
        />
        <CategoryMenu
          icon={icons.setting}
          label={constant.screens.setting}
          onPress={() => {
            navigation.navigate("Setting");
          }}
        />
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 30,
    alignItems: "center",
  },
});
export default Menu;
