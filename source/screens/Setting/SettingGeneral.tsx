import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Switch, TouchableOpacity } from "react-native-gesture-handler";
const SettingGeneral = () => {
  return (
    <View>
      <Text style={style.title}>Cài đặt chung</Text>
      <Text style={style.desc}>
        Đặt tùy chọn đăng nhập của bạn, giúp chúng tôi cá nhân hóa trải nghiệm
        của bạn và thực hiện thay đổi tài khoản lớn tại đây.
      </Text>
      <Text style={style.title}>Gửi thông báo</Text>
      <View style={{ flexDirection: "row", width: "100%" }}>
        <Text style={style.desc}>
          Bạn sẽ nghe thấy âm thanh thông báo khi ai đó gửi tin nhắn riêng tư
          cho bạn
        </Text>
        <Switch style={style.toggleBtn}></Switch>
      </View>
      <Text style={style.title}>Tắt tiếng thông báo</Text>
      <View style={{ flexDirection: "row", width: "100%" }}>
        <Text style={style.desc}>
          Bạn sẽ nghe thấy âm thanh thông báo khi ai đó gửi tin nhắn riêng tư
          cho bạn
        </Text>
        <Switch style={style.toggleBtn}></Switch>
      </View>
      <View style={{ flexDirection: "row", marginTop: 10, marginBottom: 10 }}>
        <TouchableOpacity style={style.saveBtn}>
          <Text style={style.saveText}>Lưu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.cancelBtn}>
          <Text style={style.cancelText}>Hủy</Text>
        </TouchableOpacity>
      </View>
      <Text style={style.title}>Về tài khoản</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={style.descAcount}>Xóa tài khoản và dữ liệu của bạn</Text>
        <TouchableOpacity style={style.deleteBtn}>
          <Text style={style.deleteText}>Xóa tài khoản</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  title: {
    color: "black",
    fontSize: 18,
    // borderLeftColor: "#088dcd",
  },
  desc: {
    color: "#4d4d82",
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
    lineHeight: 20,
    flex: 2,
  },
  toggleBtn: {
    flex: 1,
  },
  saveBtn: {
    backgroundColor: "#088dcd",
    borderRadius: 10,
    marginRight: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 7,
    paddingBottom: 7,
  },
  cancelText: {
    color: "#088dcd",
    fontSize: 18,
  },
  saveText: {
    color: "white",
    fontSize: 18,
  },
  cancelBtn: {
    borderColor: "#088dcd",
    borderWidth: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 7,
    paddingBottom: 7,
    borderRadius: 10,
  },
  descAcount: {
    color: "#4d4d82",
    fontSize: 16,
    marginTop: 10,
  },
  deleteBtn: {
    backgroundColor: "#088dcd",
    borderRadius: 10,
    padding: 10,
  },
  deleteText: {
    color: "white",
    fontSize: 16,
  },
  logOutBtn: {
    backgroundColor: "#088dcd",
    borderRadius: 10,
    padding: 10,
    marginTop: 15,
  },
  logOutText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
});
export default SettingGeneral;
