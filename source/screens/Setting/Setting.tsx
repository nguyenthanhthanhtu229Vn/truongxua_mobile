import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import { View, Text, StyleSheet, Alert, AsyncStorage } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { auth } from "../../config/firebase";
import SettingGeneral from "./SettingGeneral";
import SettingProfile from "./SettingProfile";
const listTab = [
  { status: "Hồ sơ" },
  // { status: "Chung" },
  // { status: "Thông báo" },
];
const Setting = () => {
  const navigation = useNavigation();
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
  const removeItemValue = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (exception) {
      return false;
    }
  };
  const Logout = () => {
    auth
      .signOut()
      .then(() => {
        removeItemValue("idToken");
        removeItemValue("infoUser");
        navigation.reset({
          index: 0,
          routes: [{ name: "SignIn" }],
        });
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
            // justifyContent: "space-around",
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
          <SettingProfile />
          {/* {status == "Chung" ? <SettingGeneral /> : <SettingProfile />} */}
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
    borderLeftWidth: 5,
    borderLeftColor: "#088dcd",
    fontSize: 20,
    paddingLeft: 15,
    color: "black",
    fontWeight: "600",
  },
  more: {
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
    color: "black",
    fontSize: 16,
  },
  settingNameActive: {
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
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
});
export default Setting;
