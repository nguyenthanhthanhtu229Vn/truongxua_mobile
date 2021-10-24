// /* eslint-disable react-native/no-inline-styles */
import React from "react";
import { View } from "react-native";
import { icons } from "../../constant";
import constant from "../../constant/constant";
import CategoryMenu from "./Category";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/core";
const Menu: React.FC = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, marginTop: 90, marginLeft: 44 }}>
      <View style={style.container}>
        <CategoryMenu
          icon={icons.home_m}
          label={constant.screens.home}
          onPress={() => navigation.navigate("Trang Chủ")}
        />
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
      </View>
      <View style={style.container}>
        <CategoryMenu
          icon={icons.event}
          label={constant.screens.event}
          onPress={() => {
            navigation.navigate("Event");
          }}
        />
              <CategoryMenu
          icon={icons.school}
          label={constant.screens.school}
          onPress={() => {
            navigation.navigate("About School");
          }}
        />
        <CategoryMenu
          icon={icons.pages}
          label={constant.screens.blog}
          onPress={() => {
            navigation.navigate("BlogPost");
          }}
        />
       
      </View>
      <View style={style.container}>
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
