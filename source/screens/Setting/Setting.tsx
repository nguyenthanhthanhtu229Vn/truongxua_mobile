import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../../config/firebase";
import SignIn from "../SignInUp/SignIn";
import SettingGeneral from "./SettingGeneral";
import SettingProfile from "./SettingProfile";
const listTab = [
  { status: "Chung" },
  { status: "Hồ sơ" },
  { status: "Riêng tư" },
  { status: "Thông báo" },
];
const Setting = ({ navigation }) => {
  const [status, setStatus] = useState("Chung");
  const setStatusFilter = (status) => {
    setStatus(status);
  };
  const confirmLogout = () => {
    Alert.alert("Đăng xuất", "Bạn chắc chắn muốn đăng xuất", [
      {
        text: "Hủy",
        style: "cancel",
      },
      { text: "OK", onPress: () => Logout() },
    ]);
  };
  const Logout = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate("SignIn");
      })
      .catch((error) => {
        alert(error);
      });
  };
  return (
    <View style={style.container}>
      <ScrollView>
        <View style={style.title}>
          <Text style={style.textTitle}>Cài đặt tài khoản</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 20,
            justifyContent: "space-between",
          }}
        >
          {listTab.map((e) => (
            <TouchableOpacity
              style={status === e.status ? style.settingActive : style.setting}
              onPress={() => setStatusFilter(e.status)}
            >
              <Text
                style={
                  status === e.status
                    ? style.settingNameActive
                    : style.settingName
                }
              >
                {e.status}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={style.containerFluid}>
          {status == "Chung" ? <SettingGeneral /> : <SettingProfile />}
          <TouchableOpacity
            style={style.logOutBtn}
            onPress={() => {
              confirmLogout();
            }}
          >
            <Text style={style.logOutText}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  container: { padding: 10, backgroundColor: "#ffffff", flex: 1 },
  containerFluid: {
    backgroundColor: "#eeeeee",
    marginTop: 20,
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  title: {
    marginTop: 20,
  },
  textTitle: {
    fontFamily: "Roboto",
    borderLeftWidth: 5,
    borderLeftColor: "#088dcd",
    fontSize: 20,
    paddingLeft: 15,
    color: "black",
    fontWeight: "600",
  },
  more: {
    fontFamily: "Roboto",
    color: "#088dcd",
    fontSize: 15,
  },
  setting: {
    paddingLeft: 18,
    paddingRight: 18,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#eeeeee",
    borderRadius: 20,
  },
  settingActive: {
    paddingLeft: 18,
    paddingRight: 18,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#088dcd",
    borderRadius: 20,
  },
  settingName: {
    fontFamily: "Roboto",
    color: "black",
    fontSize: 16,
  },
  settingNameActive: {
    fontFamily: "Roboto",
    color: "white",
    fontSize: 16,
  },
  logOutBtn: {
    backgroundColor: "#088dcd",
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
  },
  logOutText: {
    fontFamily: "Roboto",
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
});
export default Setting;
