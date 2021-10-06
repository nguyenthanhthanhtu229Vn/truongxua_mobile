import React, { useState } from "react";
import { View, Text } from "../../../components/Themed";
import { COLORS, FONTS, SIZES } from "../../constant";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import DropDownPicker from "react-native-dropdown-picker";

const AddGroup = () => {
  // Open image
  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log(pickerResult);
  };

  // Data su kien
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Tao Trang ", value: "Tao Trang" },
    { label: "Tao Nhom", value: "Tao Nhom" },
  ]);
  //  Data category
  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState(null);
  const [cate, setCate] = useState([
    { label: "Doan Nhan", value: "Doanh Nhan" },
    { label: "Am Nhac", value: "Am Nhac" },
  ]);

  return (
    <ScrollView>
      <View style={{ flexDirection: "column" }}>
        <View
          style={{
            backgroundColor: "#088dcd",
            height: 70,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              ...FONTS.h2,
              color: COLORS.white2,
              fontWeight: "700",
              marginLeft: 10,
            }}
          >
            Tạo Trang/Nhóm
          </Text>
          <Text
            style={{
              ...FONTS.h3,
              color: COLORS.white,
              fontWeight: "400",
              marginRight: 10,
            }}
          >
            Tạo Nhóm/ Blog
          </Text>
        </View>
        <View style={{ marginHorizontal: 16, marginVertical: 18 }}>
          <View style={style.line} />
          <Text style={style.header}>Tạo Trang hoặc Nhóm </Text>
        </View>
        <View style={{ marginHorizontal: 16 }}>
          {/* =======Drop down Event===== */}
          <DropDownPicker
            stickyHeader
            style={style.input}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
          />
          <TextInput placeholder="Tên Sự Kiện" style={style.input} />
          {/* ======Drop down Category */}
          <DropDownPicker
            style={style.input}
            open={open1}
            value={value1}
            items={cate}
            setOpen={setOpen1}
            setValue={setValue1}
            setItems={setCate}
          />
          <View style={{ marginTop: 10, marginBottom: 30 }}>
            {/* ======Touch Image ====== */}
            <TouchableOpacity
              onPress={openImagePickerAsync}
              style={{
                backgroundColor: "#088DCD",
                width: 120,
                height: 30,
                borderRadius: 2,
              }}
            >
              <Text style={style.buttonText}>Thêm Ảnh </Text>
            </TouchableOpacity>
          </View>
          <TextInput
            multiline={true}
            placeholder="Miêu Tả "
            style={style.inputDes}
          />
          {/* ======Button Create ====== */}
          <TouchableOpacity
            style={{
              width: 330,
              height: 40,
              backgroundColor: "#088DCD",
              marginHorizontal: 10,
              marginTop: 180,
              borderRadius: SIZES.base,
            }}
          >
            <Text
              style={{
                color: COLORS.white,
                fontSize: 22,
                textAlign: "center",
                paddingTop: 4,
              }}
            >
              Tạo Nhóm
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  header: {
    ...FONTS.h3,
    color: COLORS.black,
    fontWeight: "500",
    fontSize: 20,
    position: "relative",
    bottom: 24,
    left: 8,
  },
  line: {
    height: 22,
    width: 4,
    backgroundColor: "#088dcd",
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderWidth: 1,
    fontFamily: "Roboto",
    fontSize: 18,
    borderColor: "#CCCCCC",
    borderRadius: 10,
    marginBottom: 10,
  },
  inputDes: {
    paddingLeft: 8,
    backgroundColor: "white",
    borderWidth: 1,
    fontFamily: "Roboto",
    fontSize: 18,
    borderColor: "#CCCCCC",
    borderRadius: 10,
    marginBottom: 10,
    height: 100,
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
    paddingLeft: 2,
    textAlign: "center",
    paddingTop: 2,
  },
});
export default AddGroup;
