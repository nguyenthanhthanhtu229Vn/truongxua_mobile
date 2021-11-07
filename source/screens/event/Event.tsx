import React, { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
  RefreshControl,
} from "react-native";
import { COLORS, FONTS, SIZES } from "../../constant";
import { StyleSheet } from "react-native";
import MyCarousel from "../carousel/MyCarousel";
import { Foundation } from "@expo/vector-icons";
import { useIsFocused, useNavigation } from "@react-navigation/core";
import axios from "axios";

const Event: React.FC = (props) => {
  const isFocused = useIsFocused();
  const [authorize, setAuthorize] = useState();
  const [schoolId, setSchoolId] = useState();
  const [visible, setVisible] = useState(false);
  const tokenForAuthor = async () => {
    const token = await AsyncStorage.getItem("idToken");
    const infoUser = await AsyncStorage.getItem("infoUser");
    const objUser = JSON.parse(infoUser);
    setSchoolId(objUser.SchoolId);
    const headers = {
      Authorization: "Bearer " + token,
      // "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCIsIkFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbiI6IiovKiJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjFxbHM1OFdWaURYN1lDZEUzd0FjVTlwdTlqZjIiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJVc2VyIiwiSWQiOiIxIiwiU2Nob29sSWQiOiIiLCJHcm91cElkIjoiIiwiZXhwIjoxNjM1MjM2OTE4LCJpc3MiOiJsb2NhbGhvc3Q6MTIzNDciLCJhdWQiOiJsb2NhbGhvc3Q6MTIzNDcifQ.oOnpxsz5hYQuFhq1ikw4Gy-UN_vor3y31neyOFehJ_Y",
    };
    console.log(infoUser);
    setAuthorize(headers);

    await featchEvent(headers, objUser.SchoolId);
    await featchImageEvent(headers);
    await featchAlumni(headers);
    return schoolId;
  };
  const imageURL =
    "https://truongxuaapp.online/api/v1/images?pageNumber=0&pageSize=0";
  const [event, setData] = useState({});
  const [listImg, setListImg] = useState<string>();
  async function featchEvent(headers, schoolID) {
    try {
      const response = await axios.get(
        "https://truongxuaapp.online/api/v1/schools/" +
          schoolID +
          "/events?sort=desc",
        { headers }
      );
      if (response.status === 200) {
        setData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

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

  async function featchImageEvent(headers) {
    try {
      const response = await axios.get(imageURL, { headers });
      if (response.status === 200) {
        setListImg(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

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
  useEffect(() => {
    tokenForAuthor();
  }, [isFocused]);

  // ======Format Date====
  const formatDate = (date) => {
    const day = new Date(date);
    return (
      "Vào lúc: " +
      String(day.getDate()).padStart(2, "0") +
      "/" +
      String(day.getMonth() + 1).padStart(2, "0") +
      "/" +
      day.getFullYear() +
      ", " +
      String(day.getHours()).padStart(2, "0") +
      ":" +
      String(day.getMinutes()).padStart(2, "0")
    );
  };

  const navigation = useNavigation();
  return (
    <View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl onRefresh={() => tokenForAuthor()} />}
      >
        <MyCarousel />
        {/* Plust Btn */}
        {/* <TouchableOpacity
          style={style.plusBtn}
          onPress={() => {
            navigation.navigate("Tạo Sự Kiện");
          }}
        >
          <Foundation name="plus" style={style.textPlus}></Foundation>
        </TouchableOpacity> */}

        <View style={style.container}>
          <FlatList
            contentContainerStyle={{
              flexDirection: "column",
            }}
            extraData={visible}
            data={event}
            renderItem={({ item, index }) => {
              return (
                <View
                  style={{
                    flexDirection: "row",
                    paddingBottom: 20,
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                  key={item.id}
                >
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Chi Tiết Sự Kiện", {
                        id: item.id,
                      });
                    }}
                  >
                    <Image
                      source={{ uri: getImageByEvent(item.id) }}
                      style={{
                        height: SIZES.height / 5,
                        borderRadius: 5,
                        width: SIZES.width / 3,
                        resizeMode: "cover",
                      }}
                    />
                  </TouchableOpacity>
                  <View style={{ marginLeft: 10, width: SIZES.width / 2 }}>
                    <Text
                      numberOfLines={2}
                      ellipsizeMode="tail"
                      style={{
                        color: COLORS.black,
                        marginLeft: 4,
                        ...FONTS.h3,
                        fontWeight: "600",
                        fontSize: 19,
                        width: SIZES.width / 2.3,
                      }}
                    >
                      {item.name}
                    </Text>
                    <Text
                      numberOfLines={2}
                      ellipsizeMode="tail"
                      style={{
                        color: "black",
                        marginLeft: 4,
                        ...FONTS.h3,
                        fontWeight: "500",
                        fontSize: 16,
                        width: SIZES.width / 2.3,
                        marginTop: 10,
                        marginBottom: 10,
                      }}
                    >
                      {item.description}
                    </Text>
                    <Text
                      numberOfLines={1}
                      style={{
                        color: COLORS.darkGray,
                        marginLeft: 4,
                        ...FONTS.h4,
                        fontWeight: "500",
                        marginBottom: 10,
                      }}
                    >
                      Người tạo: {getNameAlumni(item.alumniCreatedId)}
                    </Text>
                    <Text
                      style={{
                        color: COLORS.darkGray,
                        marginLeft: 4,
                        ...FONTS.h4,
                        fontWeight: "500",
                      }}
                    >
                      {formatDate(item.startDate)}
                    </Text>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 40,
  },
  plusBtn: {
    backgroundColor: "#088dcd",
    height: 45,
    width: 45,
    borderRadius: SIZES.largeTitle,
    position: "absolute",
    right: 10,
    top: 210,
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

export default Event;
