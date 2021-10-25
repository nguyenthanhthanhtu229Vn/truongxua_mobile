import React, { useEffect, useState } from "react";
import { View, Text } from "../../../components/Themed";
import { COLORS, FONTS, SIZES } from "../../constant";
import {
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { Foundation } from "@expo/vector-icons";

const ImagePost = () => {
  const [image, setImage] = useState(null);
  useEffect(() => {
    async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    };
  }, []);
  const pickImg = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  return (
    <View>
      <TouchableOpacity onPress={pickImg}>
        <Image
          style={{ width: 25, height: 25 }}
          source={require("../../assets/icons/imageGallery.png")}
        />
      </TouchableOpacity>
      {image && (
        <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />
      )}
    </View>
  );
};

const AddEvent = () => {

  // Open popup date
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };
  // End  popup date

  return (
    <ScrollView>
      <View style={{ flexDirection: "column" }}>
        <View style={{ marginHorizontal: 16, marginVertical: 18 }}>
          <View style={style.line} />
          <Text style={style.header}>Tạo Sự Kiện </Text>
        </View>
        <View style={{ marginHorizontal: 16 }}>
          <TextInput placeholder="Tên Sự Kiện" style={style.input} />
          <TextInput
            scrollEnabled={true}
            multiline={true}
            placeholder="Miêu Tả "
            style={style.inputDes}
          />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              onPress={showDatepicker}
              style={{
                backgroundColor: "white",
                width: 140,
                padding: 10,
                borderWidth: 1,
                borderColor: "#CCCCCC",
                borderRadius: 10,
                marginBottom: 20,
                height: 60,
              }}
            >
              <Text style={{ color: COLORS.gray }}>Ngày Bắt Đầu </Text>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  display="default"
                  onChange={onChange}
                />
              )}
            </TouchableOpacity>
            <TextInput
              placeholder="Giờ "
              style={{
                backgroundColor: "white",
                width: 100,
                padding: 10,
                borderWidth: 1,
                fontSize: 18,
                borderColor: "#CCCCCC",
                borderRadius: 10,
                marginBottom: 10,
              }}
            />
            <TextInput
              placeholder="Phút "
              style={{
                backgroundColor: "white",
                width: 100,
                padding: 10,
                borderWidth: 1,
                fontSize: 18,
                borderColor: "#CCCCCC",
                borderRadius: 10,
                marginBottom: 10,
              }}
            />
          </View>
          {/* ======ngay ket thuc ===== */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              onPress={showDatepicker}
              style={{
                backgroundColor: "white",
                width: 140,
                padding: 10,
                borderWidth: 1,
                borderColor: "#CCCCCC",
                borderRadius: 10,
                marginBottom: 20,
                height: 60,
              }}
            >
              <Text style={{ color: COLORS.gray }}>Ngày Kết Thúc </Text>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  display="default"
                  onChange={onChange}
                />
              )}
            </TouchableOpacity>
            <TextInput
              placeholder="Giờ "
              style={{
                backgroundColor: "white",
                width: 100,
                padding: 10,
                borderWidth: 1,
                fontSize: 18,
                borderColor: "#CCCCCC",
                borderRadius: 10,
                marginBottom: 10,
              }}
            />
            <TextInput
              placeholder="Phút "
              style={{
                backgroundColor: "white",
                width: 100,
                padding: 10,
                borderWidth: 1,
                fontSize: 18,
                borderColor: "#CCCCCC",
                borderRadius: 10,
                marginBottom: 10,
              }}
            />
          </View>

          <TextInput placeholder="Hoạt Động" style={{
              backgroundColor: "white",
              padding: 10,
              borderWidth: 1,
              fontSize: 18,
              borderColor: "#CCCCCC",
              borderRadius: 10,
              marginBottom: 20,
              width: 300
          }} />

          <TouchableOpacity style={style.plusBtn}>
            <Foundation name="plus" style={style.textPlus}></Foundation>
          </TouchableOpacity>

          <TextInput
            keyboardType="number-pad"
            placeholder="Giá Vé"
            style={style.input}
          />
          {/* ======Image Post===== */}
          <ImagePost />

          {/* ======Button Create ====== */}
          <TouchableOpacity
            style={{
              width: 340,
              height: 50,
              backgroundColor: "#088DCD",
              marginHorizontal: 10,
              marginTop: 10,
              borderRadius: SIZES.base,
            }}
          >
            <Text
              style={{
                color: COLORS.white,
                fontSize: 22,
                textAlign: "center",
                paddingTop: 10,
              }}
            >
              Tạo Sự Kiện
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
    fontSize: 18,
    borderColor: "#CCCCCC",
    borderRadius: 10,
    marginBottom: 20,
  },
  inputDes: {
    paddingLeft: 8,
    backgroundColor: "white",
    borderWidth: 1,
    fontSize: 18,
    borderColor: "#CCCCCC",
    borderRadius: 10,
    marginBottom: 20,
    height: 100,
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
    paddingLeft: 2,
    textAlign: "center",
    paddingTop: 2,
  },
  plusBtn: {
    backgroundColor: "#088dcd",
    height: 45,
    width: 45,
    borderRadius: SIZES.largeTitle,
    position: "absolute",
    right: 0,
    top: 340,
  },
  textPlus: {
    position: "absolute",
    fontSize: 18,
    top: 14,
    left: 16,
    zIndex: 2,
    color: "white",
  },
});

export default AddEvent;
