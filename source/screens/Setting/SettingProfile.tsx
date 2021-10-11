import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { COLORS, FONTS, icons, SIZES } from "../../constant";
const listGender = [{ status: "Nam" }, { status: "Nữ" }, { status: "Khác" }];
const SettingProfile = () => {
  const [status, setStatus] = useState("Nam");
  const setStatusFilter = (status) => {
    setStatus(status);
  };
  return (
    <View>
      <Text style={style.title}>Chỉnh sửa hồ sơ</Text>
      <Text style={style.desc}>
        Mọi người sẽ biết bạn qua thông tin bên dưới
      </Text>
      <View
        style={{ flexDirection: "row", marginTop: 20, alignItems: "center" }}
      >
        <Image
          source={require("../../assets/images/avatar.jpeg")}
          style={style.avtImg}
        ></Image>
        <TouchableOpacity>
          <Text style={style.changeImg}>Đổi hình ảnh</Text>
        </TouchableOpacity>
      </View>
      <Text style={style.subTitle}>Họ và tên</Text>
      <TextInput style={style.input}>Nguyen Van A</TextInput>
      <Text style={style.subTitle}>Năm sinh</Text>
      <TextInput value="20/10/1999" style={style.input}></TextInput>
      <Text style={style.subTitle}>Giới tính</Text>
      <View>
        {listGender.map((e) => (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => setStatusFilter(e.status)}
              style={
                status === e.status ? style.btnGenderActive : style.btnGender
              }
            >
              <View
                style={
                  status === e.status
                    ? style.btnInGenderActive
                    : style.btnInGender
                }
              ></View>
            </TouchableOpacity>
            <Text style={style.subTitle}>{e.status}</Text>
          </View>
        ))}
      </View>
      <View style={{ flexDirection: "row", marginTop: 20, marginBottom: 10 }}>
        <TouchableOpacity style={style.saveBtn}>
          <Text style={style.saveText}>Lưu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.cancelBtn}>
          <Text style={style.cancelText}>Hủy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  avtImg: {
    borderRadius: SIZES.largeTitle,
    height: 70,
    width: 70,
    borderColor: "black",
    borderWidth: 2,
  },
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
  changeImg: {
    fontSize: 16,
    color: "#088dcd",
    marginLeft: 20,
  },
  subTitle: {
    marginTop: 10,
    fontSize: 18,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderWidth: 1,
    fontSize: 18,
    borderColor: "#ddd",
    borderRadius: 10,
    marginTop: 10,
  },
  btnGender: {
    backgroundColor: "white",
    borderWidth: 1,
    width: 25,
    height: 25,
    borderRadius: SIZES.largeTitle,
    marginRight: 20,
    marginTop: 15,
  },
  btnGenderActive: {
    borderColor: "#088dcd",
    borderWidth: 1,
    width: 25,
    height: 25,
    borderRadius: SIZES.largeTitle,
    marginRight: 20,
    marginTop: 15,
  },
  btnInGenderActive: {
    position: "absolute",
    top: 4,
    left: 5,
    width: 14,
    height: 14,
    borderRadius: SIZES.largeTitle,
    backgroundColor: "#088dcd",
  },
  btnInGender: {
    borderColor: "white",
    borderWidth: 1,
    width: 25,
    height: 25,
    borderRadius: SIZES.largeTitle,
    marginRight: 20,
    marginTop: 15,
  },
});
export default SettingProfile;
