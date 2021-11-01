import React, { useEffect, useState } from "react";
import { View, Text } from "../../../components/Themed";
import { COLORS, FONTS, SIZES } from "../../constant";
import {
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  AsyncStorage,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { Foundation } from "@expo/vector-icons";
import Colors from "../../../constants/Colors";
import moment from "moment";
import axios from "axios";
import { useNavigation } from "@react-navigation/core";
import Tags from "react-native-tags";
const AddEvent = () => {
  const navigation = useNavigation();
  const moment = require("moment-timezone");
  const dateCreate = moment().tz("Asia/Ho_Chi_Minh").format();
  // get token
  const [contentActivity, setContentActivity] = useState();
  const [alumniCreatedId, setAlumniCreatedId] = useState();
  const [schoolId, setSchoolId] = useState();
  const [startDate, setStartDate] = useState(dateCreate);
  const [endDate, setEndDate] = useState(dateCreate);
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [ticketPrice, setTicketPrice] = useState();
  const [createAt, setCreateAt] = useState(dateCreate);
  const [authorize, setAuthorize] = useState();
  const tokenForAuthor = async () => {
    const token = await AsyncStorage.getItem("idToken");
    //
    const infoUser = await AsyncStorage.getItem("infoUser");
    const objUser = JSON.parse(infoUser);
    setAlumniCreatedId(objUser.Id);
    setSchoolId(objUser.SchoolId);
    //
    const headers = {
      Authorization: "Bearer " + token,
      // "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCIsIkFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbiI6IiovKiJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjFxbHM1OFdWaURYN1lDZEUzd0FjVTlwdTlqZjIiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJVc2VyIiwiSWQiOiIxIiwiU2Nob29sSWQiOiIiLCJHcm91cElkIjoiIiwiZXhwIjoxNjM1MjM2OTE4LCJpc3MiOiJsb2NhbGhvc3Q6MTIzNDciLCJhdWQiOiJsb2NhbGhvc3Q6MTIzNDcifQ.oOnpxsz5hYQuFhq1ikw4Gy-UN_vor3y31neyOFehJ_Y",
    };
    setAuthorize(headers);
  };

  const updateDateEventStart = () => {
    const moment = require("moment-timezone");
    const start = moment
      .tz(
        `${dateOfStart.getFullYear()}-${String(dateOfStart.getMonth()).padStart(
          2,
          "0"
        )}-${String(dateOfStart.getDate()).padStart(2, "0")} ${String(
          timeOfStart.getHours()
        ).padStart(2, "0")}:${String(timeOfStart.getMinutes()).padStart(
          2,
          "0"
        )}`,
        "Asia/Ho_Chi_Minh"
      )
      .format();
    return start;
  };
  const updateDateEventEnd = () => {
    const moment = require("moment-timezone");
    const end = moment
      .tz(
        `${dateOfEnd.getFullYear()}-${String(dateOfEnd.getMonth()).padStart(
          2,
          "0"
        )}-${String(dateOfEnd.getDate()).padStart(2, "0")} ${String(
          timeOfEnd.getHours()
        ).padStart(2, "0")}:${String(timeOfEnd.getMinutes()).padStart(2, "0")}`,
        "Asia/Ho_Chi_Minh"
      )
      .format();
    return end;
  };
  // Call Api create Event
  const createEvent = async (headers) => {
    try {
      const response = await axios.post(
        "https://truongxuaapp.online/api/v1/events",
        {
          alumniCreatedId,
          schoolId,
          startDate: updateDateEventStart(),
          endDate: updateDateEventEnd(),
          name,
          description,
          ticketPrice,
          createAt,
        },
        { headers }
      );
      if (response.status === 200) {
        await createActivity(headers, response.data);
      }
    } catch (error) {
      alert("Tạo sự kiện không thành công");
    }
  };

  //Call API create Activity
  const createActivity = async (headers, id) => {
    try {
      const reponse = await axios.post(
        "https://truongxuaapp.online/api/v1/activities",
        { eventId: id, name: contentActivity },
        { headers }
      );
      if (reponse.status === 200) {
        await createImageForEvent(headers, id);
      }
    } catch (error) {
      alert("Tạo hoạt động không thành công");
    }
  };

  //Call Api upload image
  const createImageForEvent = async (headers, id) => {
    try {
      const response = await axios.post(
        "https://truongxuaapp.online/api/v1/images",
        { eventId: id, imageUrl: await uploadImage(image) },
        { headers }
      );
      if (response.status === 200) {
        alert("Tạo sự kiện thành công");
        navigation.navigate("Sự Kiện");
      }
    } catch (error) {
      alert("Up hình không thành công");
    }
  };

  // Open popup date
  const [date, setDate] = useState(new Date(dateCreate));
  const [dateOfStart, setDateOfStart] = useState(new Date(dateCreate));
  const [dateOfEnd, setDateOfEnd] = useState(new Date(dateCreate));
  const [timeOfStart, setTimeOfStart] = useState(new Date(dateCreate));
  const [timeOfEnd, setTimeOfEnd] = useState(new Date(dateCreate));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChangeDateOfStart = (event, selectedDate) => {
    const currentDate = selectedDate || dateOfStart;
    setShow(Platform.OS === "ios");
    setDateOfStart(currentDate);
  };
  const onChangeDateOfEnd = (event, selectedDate) => {
    const currentDate = selectedDate || dateOfEnd;
    setShow(Platform.OS === "ios");
    setDateOfEnd(currentDate);
  };
  const onChangeTimeOfStart = (event, selectedDate) => {
    const currentDate = selectedDate || timeOfStart;
    setShow(Platform.OS === "ios");
    setTimeOfStart(currentDate);
  };
  const onChangeTimeOfEnd = (event, selectedDate) => {
    const currentDate = selectedDate || timeOfEnd;
    setShow(Platform.OS === "ios");
    setTimeOfEnd(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  // End  popup date

  const [image, setImage] = useState(null);
  const pickImg = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const uploadImage = async (imgPick) => {
    let filename = imgPick.split("/").pop();
    let body = new FormData();
    body.append("image", {
      uri: imgPick,
      name: filename,
      type: "image/jpeg",
    });
    try {
      const response = await axios({
        method: "POST",
        url: "https://api.imgbb.com/1/upload?key=8ce611088e16144c16f12e63289df341",
        data: body,
      });
      if (response.status == 200) {
        return response.data.data.display_url;
      }
    } catch (err) {
      alert(err);
    }
  };
  useEffect(() => {
    tokenForAuthor();
    async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    };
  }, []);
  return (
    <View style={style.container}>
      <ScrollView style={{ marginBottom: 100 }}>
        <View
          style={{
            flexDirection: "column",
            backgroundColor: "white",
          }}
        >
          <View
            style={{
              marginHorizontal: 16,
              marginVertical: 18,
              backgroundColor: "white",
            }}
          >
            <View style={style.line} />
            <Text style={style.header}>Tạo Sự Kiện </Text>
          </View>
          <View style={{ marginHorizontal: 16, backgroundColor: "white" }}>
            <TextInput
              placeholder="Tên Sự Kiện"
              style={style.input}
              placeholderTextColor={COLORS.gray}
              onChangeText={(name) => setName(name)}
            />
            <TextInput
              scrollEnabled={true}
              multiline={true}
              placeholder="Miêu Tả "
              placeholderTextColor={COLORS.gray}
              style={style.inputDes}
              onChangeText={(description) => setDescription(description)}
            />

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "white",
              }}
            >
              <TouchableOpacity
                onPress={showDatepicker}
                style={{
                  backgroundColor: "white",
                  width: 180,
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
                    value={dateOfStart}
                    mode={mode}
                    display="default"
                    onChange={onChangeDateOfStart}
                    minimumDate={date}
                  />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={showDatepicker}
                style={{
                  backgroundColor: "white",
                  width: 180,
                  padding: 10,
                  borderWidth: 1,
                  borderColor: "#CCCCCC",
                  borderRadius: 10,
                  marginBottom: 20,
                  height: 60,
                }}
              >
                <Text style={{ color: COLORS.gray }}>Thời gian </Text>
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={timeOfStart}
                    mode="time"
                    display="default"
                    onChange={onChangeTimeOfStart}
                  />
                )}
              </TouchableOpacity>
            </View>
            {/* ======ngay ket thuc ===== */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "white",
              }}
            >
              <TouchableOpacity
                onPress={showDatepicker}
                style={{
                  backgroundColor: "white",
                  width: 180,
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
                    value={dateOfEnd}
                    mode={mode}
                    display="default"
                    onChange={onChangeDateOfEnd}
                    minimumDate={date}
                  />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={showDatepicker}
                style={{
                  width: 180,
                  backgroundColor: "white",
                  padding: 10,
                  borderWidth: 1,
                  borderColor: "#CCCCCC",
                  borderRadius: 10,
                  marginBottom: 20,
                  height: 60,
                }}
              >
                <Text style={{ color: COLORS.gray }}>Thời gian </Text>
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={timeOfEnd}
                    mode="time"
                    display="default"
                    onChange={onChangeTimeOfEnd}
                  />
                )}
              </TouchableOpacity>
            </View>

            {/* <TextInput
              placeholder="Hoạt Động"
              placeholderTextColor={COLORS.gray}
              onChangeText={(contentActivity) =>
                setContentActivity(contentActivity)
              }
              style={{
                backgroundColor: "white",
                padding: 10,
                borderWidth: 1,
                fontSize: 18,
                borderColor: "#CCCCCC",
                borderRadius: 10,
                marginBottom: 20,
                width: 300,
              }}
            /> */}
            {/* begin tag */}
            <Tags
              initialText="monkey"
              textInputProps={{
                placeholder: "Any type of animal",
              }}
              onChangeTags={(tags) => console.log(tags)}
              onTagPress={(index, tagLabel, event, deleted) =>
                console.log(
                  index,
                  tagLabel,
                  event,
                  deleted ? "deleted" : "not deleted"
                )
              }
              containerStyle={{ justifyContent: "center" }}
              inputStyle={{
                backgroundColor: "white",
                borderWidth: 0.6,
                borderColor: "#CCCCCC",
                borderRadius: 8,
              }}
              renderTag={({ tag, index, onPress }) => (
                <TouchableOpacity key={`${tag}-${index}`} onPress={onPress}>
                  <Text>{tag}</Text>
                </TouchableOpacity>
              )}
            />
            {/* ==end tags== */}

            {/* <TouchableOpacity style={style.plusBtn}>
              <Foundation name="plus" style={style.textPlus}></Foundation>
            </TouchableOpacity> */}

            <TextInput
              keyboardType="number-pad"
              placeholder="Giá Vé"
              placeholderTextColor={COLORS.gray}
              style={[style.input, style.top]}
              onChangeText={(ticketPrice) => setTicketPrice(ticketPrice)}
            />
            {/* ======Image Post===== */}
            <View style={{ backgroundColor: "white" }}>
              <TouchableOpacity
                onPress={pickImg}
                style={{ flexDirection: "row" }}
              >
                <Image
                  style={{ width: 40, height: 40 }}
                  source={require("../../assets/icons/imageGallery.png")}
                />
                <Text
                  style={{
                    color: COLORS.gray,
                    fontSize: 18,
                    marginLeft: 10,
                    marginTop: 5,
                  }}
                >
                  Chọn hình ảnh
                </Text>
              </TouchableOpacity>
              <Image
                source={{ uri: image }}
                style={{ width: 200, height: 200, marginTop: 10 }}
              />
            </View>
            {/*  */}
          </View>
        </View>
      </ScrollView>
      {/* ======Button Create ====== */}
      <TouchableOpacity
        onPress={() => createEvent(authorize)}
        style={{
          width: 340,
          alignSelf: "center",
          height: 50,
          backgroundColor: "#088DCD",
          marginTop: 10,
          borderRadius: SIZES.base,
          position: "absolute",
          bottom: 10,
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
  );
};

const style = StyleSheet.create({
  top: {
    marginTop: 20,
  },
  container: {
    backgroundColor: "white",
    flex: 1,
  },
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
