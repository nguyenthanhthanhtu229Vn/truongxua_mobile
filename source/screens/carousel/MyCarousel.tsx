import {
  FlatList,
  Text,
  View,
  ImageBackground,
  AsyncStorage,
} from "react-native";
import { FONTS, SIZES } from "../../constant";
import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";

const MyCarousel: React.FC = () => {
  const [authorize, setAuthorize] = useState();
  const [schoolId, setSchoolId] = useState();
  const tokenForAuthor = async () => {
    const token = await AsyncStorage.getItem("idToken");
    const infoUser = await AsyncStorage.getItem("infoUser");
    const objUser = JSON.parse(infoUser);
    setSchoolId(objUser.SchoolId);
    const headers = {
      Authorization: "Bearer " + token,
      // "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCIsIkFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbiI6IiovKiJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjFxbHM1OFdWaURYN1lDZEUzd0FjVTlwdTlqZjIiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJVc2VyIiwiSWQiOiIxIiwiU2Nob29sSWQiOiIiLCJHcm91cElkIjoiIiwiZXhwIjoxNjM1MjM2OTE4LCJpc3MiOiJsb2NhbGhvc3Q6MTIzNDciLCJhdWQiOiJsb2NhbGhvc3Q6MTIzNDcifQ.oOnpxsz5hYQuFhq1ikw4Gy-UN_vor3y31neyOFehJ_Y",
    };
    setAuthorize(headers);

    await featchEvent(headers);
    await featchImageEvent(headers);
    return schoolId;
  };
  const eventURL =
    "https://truongxuaapp.online/api/v1/events?sort=desc&pageNumber=0&pageSize=0";
  const imageURL =
    "https://truongxuaapp.online/api/v1/images?pageNumber=0&pageSize=0";
  const [event, setData] = useState({});
  const [listImg, setListImg] = useState<string>();
  async function featchEvent(headers) {
    try {
      const response = await axios.get(eventURL, { headers });
      if (response.status === 200) {
        setData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

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
  }, []);

  return (
    <View style={{ height: SIZES.height / 3 }}>
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        horizontal={true}
        contentContainerStyle={{
          flexDirection: "row",
        }}
        data={event}
        renderItem={({ item, index }) => {
          if (schoolId == item.schoolId) {
            return (
              <View style={{ position: "relative" }}>
                <ImageBackground
                  style={{
                    width: SIZES.width,
                    height: SIZES.height / 3,
                    // resizeMode: "stretch",
                    borderRadius: 10,
                  }}
                  source={{ uri: getImageByEvent(item.id) }}
                />

                <View
                  style={{
                    position: "absolute",
                    bottom: 20,
                    paddingLeft: 20,
                    width: SIZES.width - 40,
                  }}
                >
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{ color: "white", ...FONTS.h2, fontWeight: "500" }}
                  >
                    {item.name}
                  </Text>
                  <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={{ color: "white", ...FONTS.h3, fontWeight: "500" }}
                  >
                    {item.description}
                  </Text>
                </View>
              </View>
            );
          }
          return null;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  items: {
    width: SIZES.width,
    height: SIZES.height / 3,
    position: "relative",
  },
});
export default MyCarousel;
