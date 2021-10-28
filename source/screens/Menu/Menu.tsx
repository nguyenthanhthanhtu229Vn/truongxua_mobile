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
    <View style={{ marginTop: 40 }}>
      <View style={style.container}>
        <CategoryMenu
          icon={icons.home_n}
          label={constant.screens.home}
          onPress={() => navigation.navigate("Trang Chủ")}
        />
        <CategoryMenu
          icon={icons.profile_n}
          label={constant.screens.profile}
          onPress={() => {
            navigation.navigate("Hồ Sơ");
          }}
        />
        <CategoryMenu
          icon={icons.group_n}
          label={constant.screens.group}
          onPress={() => navigation.navigate("Nhóm")}
        />
      </View>
      <View style={style.container}>
        <CategoryMenu
          icon={icons.event_n}
          label={constant.screens.event}
          onPress={() => {
            navigation.navigate("Sự Kiện");
          }}
        />
        <CategoryMenu
          icon={icons.school_n}
          label={constant.screens.school}
          onPress={() => {
            navigation.navigate("Thông Tin Trường");
          }}
        />
        <CategoryMenu
          icon={icons.news_n}
          label={constant.screens.blog}
          onPress={() => {
            navigation.navigate("BlogPost");
          }}
        />
      </View>
      <View style={style.container}>
        <CategoryMenu
          icon={icons.setting_n}
          label={constant.screens.setting}
          onPress={() => {
            navigation.navigate("Cài Đặt");
          }}
        />
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 30,
    alignItems: "center",
  },
});
export default Menu;
