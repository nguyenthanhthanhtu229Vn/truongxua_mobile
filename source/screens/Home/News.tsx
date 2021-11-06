/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  Animated,
  AsyncStorage,
  Pressable,
} from "react-native";
import { COLORS, FONTS, icons, SIZES } from "../../constant";
import { StyleSheet } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/core";
import axios from "axios";

const News: React.FC = () => {
  const moment = require("moment-timezone");
  const dateCreate = moment().tz("Asia/Ho_Chi_Minh").format();
  const [visible, setVisible] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [statusList, setStatusList] = useState(false);
  const isFocused = useIsFocused();
  useEffect(() => {
    tokenForAuthor();
  }, [isFocused, statusList, visible]);
  const [authorize, setAuthorize] = useState();
  const tokenForAuthor = async () => {
    const token = await AsyncStorage.getItem("idToken");
    //
    const infoUser = await AsyncStorage.getItem("infoUser");
    const objUser = JSON.parse(infoUser);
    const headers = {
      Authorization: "Bearer " + token,
      // "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCIsIkFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbiI6IiovKiJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjFxbHM1OFdWaURYN1lDZEUzd0FjVTlwdTlqZjIiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJVc2VyIiwiSWQiOiIxIiwiU2Nob29sSWQiOiIiLCJHcm91cElkIjoiIiwiZXhwIjoxNjM1MjM2OTE4LCJpc3MiOiJsb2NhbGhvc3Q6MTIzNDciLCJhdWQiOiJsb2NhbGhvc3Q6MTIzNDcifQ.oOnpxsz5hYQuFhq1ikw4Gy-UN_vor3y31neyOFehJ_Y",
    };
    setAuthorize(headers);
    await featchNews(headers, objUser.SchoolId);
  };

  const featchNews = async (headers, schoolId) => {
    try {
      const response = await axios.get(
        "https://truongxuaapp.online/api/v1/news/schoolid?schoolId=" +
          schoolId +
          "&sort=desc",
        { headers }
      );
      if (response.status === 200) {
        setData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const formatDate = (date) => {
    const day = new Date(date);
    return (
      String(day.getDate()).padStart(2, "0") +
      " tháng " +
      String(day.getMonth() + 1).padStart(2, "0") +
      ", " +
      day.getFullYear() +
      " lúc " +
      String(day.getHours()).padStart(2, "0") +
      ":" +
      String(day.getMinutes()).padStart(2, "0")
    );
  };

  return (
    <View style={{ padding: 10 }}>
      <View
        style={{
          zIndex: 1,
          borderRadius: 10,
          padding: 10,
          margin: 5,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "700" }}>Tin tức mới</Text>
      </View>
      {/*  <TouchableOpacity>
          <Pressable onPress={() => navigation.navigate("Tạo Tin Tức")}>
            <View
              style={{
                borderRadius: 250,
                borderColor: "#d0d0d0",
                borderWidth: 1,
                backgroundColor: "#fff",
                padding: 10,
                flexDirection: "row",
              }}
            >
              <Image
                style={{
                  width: 15,
                  height: 15,
                  alignItems: "center",
                  marginTop: 3,
                  marginLeft: 5,
                }}
                source={require("../../assets/icons/pencil.png")}
              />
              <Text style={{ fontSize: 15, color: "#808080", marginLeft: 10 }}>
                Tạo Bài Viết
              </Text>
            </View>
          </Pressable>
        </TouchableOpacity>*/}
      <FlatList
        extraData={visible}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                backgroundColor: COLORS.white2,
                marginBottom: 16,
                padding: 20,
                paddingLeft: 10,
                paddingRight: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Image
                    source={icons.calendar}
                    style={{ height: 16, width: 16 }}
                  />
                  <Text style={{ marginLeft: 8 }}>
                    {formatDate(item.createAt)}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 15,
                    alignItems: "center",
                    marginBottom: 20,
                  }}
                >
                  <Image
                    source={icons.nTitle}
                    style={{ height: 14, width: 14 }}
                  />
                  <Text
                    style={{
                      ...FONTS.h3,
                      color: COLORS.black,
                      fontWeight: "500",
                      marginLeft: 8,
                    }}
                  >
                    {item.title}
                  </Text>
                </View>

                <Text
                  style={{
                    ...FONTS.h3,
                    color: COLORS.black,
                  }}
                >
                  {item.content}
                </Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

const style = StyleSheet.create({
  btn: {
    width: 100,
    height: 30,
    backgroundColor: "#eeecec",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 6,
    shadowOpacity: 0.2,
  },
  icon: {
    height: 14,
    width: 14,
    marginLeft: 8,
  },
  iconf: {
    height: 20,
    width: 20,
  },
  text: {
    ...FONTS.h4,
    fontWeight: "500",
    marginLeft: 10,
  },
  modalBackGround: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  header: {
    width: "100%",
    height: 40,
    alignItems: "flex-end",
    justifyContent: "center",
  },
});
export default News;
