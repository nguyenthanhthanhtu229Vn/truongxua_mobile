/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from "react";
import { AsyncStorage, Image, ImageBackground, Text, View } from "react-native";
import {
  FlatList,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import {
  AntDesign,
  Feather,
  SimpleLineIcons,
  EvilIcons,
} from "@expo/vector-icons";
import Animated from "react-native-reanimated";
import { Dimensions } from "react-native";
import { useRoute } from "@react-navigation/core";
import axios from "axios";

var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full height
const EventDetail: React.FC = () => {
  const [idUser, setIdUser] = useState<string>();
  const route = useRoute();
  const [eventDetail, setEventDetail] = useState<string>("");
  const [listImg, setListImg] = useState<string>();
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
    await listEventDetail(headers);
    await featchImageEvent(headers);
    await featchAlumni(headers);
    await featchActivity(headers);
  };

  // Call Api Alumni
  const [alumni, setAlumni] = useState<string>("");
  const alumniURL =
    "https://truongxuaapp.online/api/v1/alumni?pageNumber=0&pageSize=0";
  const featchAlumni = async (headers) => {
    try {
      const response = await axios.get(alumniURL, { headers });
      if (response.status === 200) {
        setAlumni(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getNameAlumni = (alumniId) => {
    let name = "";
    for (let i = 0; i < alumni.length; i++) {
      if (alumni[i].id == alumniId) {
        name = alumni[i].name;
        break;
      }
    }
    return name;
  };

  // Call API event detail
  const listEventDetail = async (headers) => {
    try {
      const response = await axios.get(
        "https://truongxuaapp.online/api/v1/events/" + route.params.id,
        { headers }
      );
      if (response.status === 200) {
        setEventDetail(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Call API for Image
  const featchImageEvent = async (headers) => {
    try {
      const response = await axios.get(
        "https://truongxuaapp.online/api/v1/images?pageNumber=0&pageSize=0",
        { headers }
      );
      if (response.status === 200) {
        setListImg(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Call API Activity
  const [listActivity, setListActivity] = useState();
  const featchActivity = async (headers, id) => {
    try {
      const response = await axios.get(
        "https://truongxuaapp.online/api/v1/activities/eventid?eventId=" +
          route.params.id,
        { headers }
      );
      if (response.status === 200) {
        setListActivity(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //

  const getImageByEvent = (eventID) => {
    let imgLink = "";
    for (let i = 0; i < listImg?.length; i++) {
      if (listImg[i].eventId == eventID) {
        imgLink = listImg[i].imageUrl;
        break;
      }
    }
    return imgLink;
  };

  // ======Format Date====
  const formatDay = (date) => {
    const day = new Date(date);
    return String(day.getDate()).padStart(2, "0");
  };
  const formatMonth = (date) => {
    const day = new Date(date);
    return String(day.getMonth() + 1).padStart(2, "0");
  };
  const formatYear = (date) => {
    const day = new Date(date);
    return day.getFullYear();
  };
  const formatDate = (date) => {
    const day = new Date(date);
    return (
      String(day.getHours()).padStart(2, "0") +
      "h" +
      String(day.getMinutes()).padStart(2, "0") +
      ", " +
      String(day.getDate()).padStart(2, "0") +
      "." +
      String(day.getMonth() + 1).padStart(2, "0") +
      "." +
      day.getFullYear()
    );
  };
  useEffect(() => {
    tokenForAuthor();
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        <View style={{ position: "relative" }}>
          <Image
            source={{ uri: getImageByEvent(eventDetail.id) }}
            style={{
              width: width,
              height: 250,
              marginTop: 30,
              resizeMode: "cover",
            }}
          ></Image>
          <View
            style={{
              backgroundColor: "#088dcd",
              padding: 10,
              width: 100,
              alignItems: "center",
              position: "absolute",
              bottom: -50,
              right: 10,
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: "white",
              }}
            >
              {formatDay(eventDetail.startDate)}
            </Text>
            <Text
              style={{
                marginTop: 5,

                fontSize: 22,
                color: "white",
                fontWeight: "bold",
              }}
            >
              Th{formatMonth(eventDetail.startDate)}
            </Text>
            <Text
              style={{
                fontSize: 18,
                color: "white",
                marginTop: 5,
                textAlign: "center",
              }}
            >
              {formatYear(eventDetail.startDate)}
            </Text>
          </View>
        </View>
        <View style={{ padding: 10 }}>
          <View
            style={{
              marginTop: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <AntDesign
              name="clockcircleo"
              style={{
                color: "#088dcd",

                fontSize: 18,
                fontWeight: "bold",
              }}
            ></AntDesign>
            <Text
              style={{
                color: "#088dcd",

                fontSize: 18,
                fontWeight: "bold",
                marginLeft: 10,
              }}
            >
              Diễn ra: {formatDate(eventDetail.startDate)}
            </Text>
          </View>
          <View
            style={{
              marginTop: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <AntDesign
              name="clockcircleo"
              style={{
                color: "#088dcd",

                fontSize: 18,
                fontWeight: "bold",
              }}
            ></AntDesign>
            <Text
              style={{
                color: "#088dcd",

                fontSize: 18,
                fontWeight: "bold",
                marginLeft: 10,
              }}
            >
              Kết thúc: <Text>{formatDate(eventDetail.endDate)}</Text>
            </Text>
          </View>
          <View
            style={{
              marginTop: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Feather
              name="user"
              style={{
                color: "#6d757a",

                fontSize: 20,
              }}
            ></Feather>
            <Text
              style={{
                color: "#6d757a",

                fontSize: 18,
                marginLeft: 10,
              }}
            >
              Người tạo: {getNameAlumni(eventDetail.alumniCreatedId)}
            </Text>
          </View>
          <View
            style={{
              marginTop: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <EvilIcons
              name="location"
              style={{
                color: "#6d757a",

                fontSize: 20,
              }}
            ></EvilIcons>
            <Text
              style={{
                color: "#6d757a",

                fontSize: 18,
                marginLeft: 10,
              }}
            >
              Trường THPT Gia Định
            </Text>
          </View>
          <Text
            style={{
              color: "black",
              fontWeight: "500",
              fontSize: 20,
              marginTop: 20,
            }}
          >
            Sự kiện: {eventDetail.name}
          </Text>
          <Text
            style={{
              color: "#6d757a",

              fontSize: 16,
              marginTop: 20,
              lineHeight: 25,
            }}
          >
            {eventDetail.description}
          </Text>
          <View>
            <Text
              style={{
                borderLeftColor: "#088dcd",
                borderLeftWidth: 3,
                color: "black",

                fontSize: 18,
                marginTop: 20,
                fontWeight: "bold",
                marginBottom: 20,
              }}
            >
              Hình ảnh liên quan
            </Text>
            <ScrollView horizontal style={{ flexDirection: "row" }}>
              <FlatList
                numColumns={10}
                data={listImg}
                keyExtractor={({ id }, index) => id}
                renderItem={({ item, index }) => {
                  if (eventDetail.id == item.eventId) {
                    return (
                      <Image
                        style={{
                          width: 200,
                          height: 200,
                          marginRight: 20,
                          resizeMode: "cover",
                        }}
                        source={{ uri: item.imageUrl }}
                      ></Image>
                    );
                  }
                }}
              />
            </ScrollView>
            <Text
              style={{
                borderLeftColor: "#088dcd",
                borderLeftWidth: 3,
                color: "black",
                fontSize: 18,
                marginTop: 20,
                fontWeight: "bold",
              }}
            >
              Những hoạt động về sự kiện
            </Text>
            <FlatList
              data={listActivity}
              renderItem={({ item, index }) => {
                return (
                  <View>
                    <Text
                      style={{
                        color: "#6d757a",

                        fontSize: 16,
                        marginTop: 10,
                        lineHeight: 25,
                      }}
                    >
                      + {item.name}
                    </Text>
                  </View>
                );
              }}
            />
            <Text
              style={{
                color: "black",

                fontSize: 18,
                marginTop: 20,
              }}
            >
              Đã có 50 người đăng ký để tham gia sự kiện này
            </Text>
            <TouchableOpacity>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 10,
                  backgroundColor: "#088dcd",
                  borderRadius: 10,
                  marginTop: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    color: "white",
                  }}
                >
                  Tham gia
                </Text>
                <AntDesign
                  name="arrowright"
                  style={{
                    fontSize: 18,
                    color: "white",
                    marginLeft: 10,
                    marginTop: 5,
                  }}
                ></AntDesign>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default EventDetail;
