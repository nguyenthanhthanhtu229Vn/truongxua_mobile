// /* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from "react";
import { AsyncStorage, View, ImageBackground,Dimensions } from "react-native";
import { icons } from "../../constant";
import constant from "../../constant/constant";
import CategoryMenu from "./Category";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/core";
const Menu: React.FC = () => {
  const [idUser, setIdUser] = useState();
  const tokenForAuthor = async () => {
    const token = await AsyncStorage.getItem("idToken");
    //
    const infoUser = await AsyncStorage.getItem("infoUser");
    const objUser = JSON.parse(infoUser);
    setIdUser(objUser.Id);
    //
    const headers = {
      Authorization: "Bearer " + token,
      // "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCIsIkFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbiI6IiovKiJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjFxbHM1OFdWaURYN1lDZEUzd0FjVTlwdTlqZjIiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJVc2VyIiwiSWQiOiIxIiwiU2Nob29sSWQiOiIiLCJHcm91cElkIjoiIiwiZXhwIjoxNjM1MjM2OTE4LCJpc3MiOiJsb2NhbGhvc3Q6MTIzNDciLCJhdWQiOiJsb2NhbGhvc3Q6MTIzNDcifQ.oOnpxsz5hYQuFhq1ikw4Gy-UN_vor3y31neyOFehJ_Y",
    };
  };
  useEffect(() => {
    tokenForAuthor();
  }, []);
  const navigation = useNavigation();
  return (
        <ImageBackground
      source={require("../../assets/images/blue_background.jpeg")}
      style={{
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width,
      }}
    >
    <View style={{ marginTop: 190 }}>
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
            navigation.navigate("Hồ Sơ", { idProfile: idUser });
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
          icon={icons.setting_n}
          label={constant.screens.setting}
          onPress={() => {
            navigation.navigate("Cài Đặt");
          }}
        />
        {/* <CategoryMenu
          icon={icons.news_n}
          label={constant.screens.blog}
          onPress={() => {
            navigation.navigate("BlogPost");
          }}
        /> */}
      </View>
      <View style={style.container}></View>
    </View>
    </ImageBackground>
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